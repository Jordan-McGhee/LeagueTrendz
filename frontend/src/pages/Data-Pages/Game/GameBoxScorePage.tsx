import React from "react"
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";

// hook imports
import { useFetch } from "../../../Hooks/useFetch"

// types
import { GameBoxScoreState, StandingsDataState } from "@/types";

// utils
import { convertDateGameBoxScore } from "../../../Utils/utils";

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../components/ui/card"
import { Menubar, MenubarMenu, MenubarTrigger } from "../../../components/ui/menubar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"

// views imports
import BoxScoreView from "./Views/BoxScoreView";
import TeamStatsView from "./Views/TeamStatsView";

// component imports
import TeamLogo from "../../../components/ui/TeamLogo"
import ErrorModal from "../../../components/ui/ErrorModal"
import LoadingPage from "../../LoadingPage"
import GameHeader from "../../../components/Desktop/GamePage/GameHeader"

// mobile component imports
import GameHeaderMobile from "../../../components/Mobile/GamePage/GameHeader-Mobile"

const GameBoxScorePage = () => {

    // pull abbreviation from params
    const { game_id } = useParams<{ game_id: string }>()

    // grab query params from url if any
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const view = queryParams.get('view');
    const navigate = useNavigate()


    // states
    const [game, setGame] = useState<GameBoxScoreState | undefined>()
    const [standingsData, setStandingsData] = useState<StandingsDataState | undefined>()

    // fetch from database
    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    useEffect(() => {

        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/games/game_id/${game_id}`

        let responseData: any

        const fetchGame = async () => {
            try {
                responseData = await sendRequest(url)
                setGame(responseData.game)
                setStandingsData(responseData.standingsData)
            } catch (error) {

            }
        }

        fetchGame()

    }, [game_id, sendRequest])

    // MENUBAR
    const [selectedMenuItem, setSelectedMenuItem] = useState<string>('team-stats')

    // update menubar state based on query param
    useEffect(() => {
        if (view) {
            setSelectedMenuItem(view);
        }
    }, [view]);

    const handleMenuClick = (option: string) => {
        setSelectedMenuItem(option)
        navigate(`/nba/games/game_id/${game_id}?view=${option}`);
    }


    return (
        <div className="pb-16 md:pb-8 h-fit min-h-svh">
            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {/* loading state */}
            {isLoading && <LoadingPage />}

            {
                game && standingsData &&
                <Card className="rounded-none md:rounded-xl">
                    <CardHeader className="flex flex-col gap-y-4">
                        
                        {/* MOBILE */}
                        <GameHeaderMobile game={game} standingsData={standingsData} headerClass="grid grid-cols-7 items-center md:hidden"/>

                        {/* DESKTOP */}
                        <GameHeader game={game} standingsData={standingsData} headerClass="hidden md:grid grid-cols-7 items-center" />


                        <Menubar className="w-full md:w-fit mx-auto">
                            {/* <MenubarMenu>
                                <MenubarTrigger
                                    style={selectedMenuItem === "gamecast" ? { backgroundColor: "black", color: "white" } : {}}
                                    onClick={() => handleMenuClick('gamecast')}
                                    className="w-[100px]"
                                >Gamecast</MenubarTrigger>
                            </MenubarMenu> */}

                            <MenubarMenu>
                                <MenubarTrigger
                                    style={selectedMenuItem === "team-stats" ? { backgroundColor: "black", color: "white" } : {}}
                                    onClick={() => handleMenuClick('team-stats')}
                                    className="w-[200px]"
                                >Team Stats</MenubarTrigger>
                            </MenubarMenu>

                            <MenubarMenu>
                                <MenubarTrigger
                                    style={selectedMenuItem === "box-score" ? { backgroundColor: "black", color: "white" } : {}}
                                    onClick={() => handleMenuClick('box-score')}
                                    className="w-[200px]"
                                >Box Score</MenubarTrigger>
                            </MenubarMenu>
                        </Menubar>
                    </CardHeader>

                    <CardContent>
                        {selectedMenuItem === "team-stats" && <TeamStatsView teamData={game}  />}
                        {selectedMenuItem === "box-score" && <BoxScoreView teamData={game} />}
                    </CardContent>
                </Card>
            }
        </div>
    )

}

export default GameBoxScorePage