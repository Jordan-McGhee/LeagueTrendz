import React from "react"
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

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

// component imports
import TeamLogo from "../../../components/ui/TeamLogo"
import ErrorModal from "../../../components/ui/ErrorModal"
import LoadingPage from "../../LoadingPage"

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

    // console.log(game)

    // MENUBAR
    const [selectedMenuItem, setSelectedMenuItem] = useState<string>('home')

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

    // home team / away team variables


    return (
        <div className="h-full min-h-svh">
            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {/* loading state */}
            {isLoading && <LoadingPage />}

            {
                game && standingsData &&
                <Card>
                    <CardHeader>

                        <div className="flex mx-auto gap-x-8 items-center my-4">

                            <div className="flex justify-evenly items-center gap-x-6">
                                {/* AWAY TEAM */}

                                {/* name/record */}
                                <div className="text-right">
                                    <p className="text-2xl font-bold">{game.away_team_full_name}</p>
                                    <p className="text-sm font-light">{`${standingsData.away_team_wins}-${standingsData.away_team_losses}, ${standingsData.away_team_away_wins}-${standingsData.away_team_away_losses} Away`}</p>
                                </div>

                                <TeamLogo team_id={game.away_team_id} abbreviation={game.away_team_abbreviation} logoClass="size-12 object-contain" />

                                <p className={+game.away_team_score > +game.home_team_score ? "text-5xl font-bold text-black" : "text-5xl font-bold text-gray-600"}>{game.away_team_score}</p>
                            </div>


                            {/* DATE & OUTCOME */}
                            <div className="text-center">
                                <p className="text-2xl font-bold">FINAL</p>
                                <p className="text-sm font-light">{convertDateGameBoxScore(game.game_date)}</p>
                            </div>

                            <div className="flex justify-evenly items-center gap-x-6">
                                {/* HOME TEAM */}

                                <p className={+game.home_team_score > +game.away_team_score ? "text-5xl font-bold text-black" : "text-5xl font-bold text-gray-600"}>{game.home_team_score}</p>

                                <TeamLogo team_id={game.home_team_id} abbreviation={game.home_team_abbreviation} logoClass="size-12 object-contain" />

                                {/* name/record */}
                                <div className="text-left">
                                    <p className="text-2xl font-bold">{game.home_team_full_name}</p>
                                    <p className="text-sm font-light">{`${standingsData.home_team_wins}-${standingsData.home_team_losses}, ${standingsData.home_team_home_wins}-${standingsData.home_team_home_losses} Home`}</p>
                                </div>

                            </div>
                        </div>


                        <Menubar className="w-fit">
                            <MenubarMenu>
                                <MenubarTrigger
                                    style={selectedMenuItem === "gamecast" ? { backgroundColor: "black", color: "white" } : {}}
                                    onClick={() => handleMenuClick('gamecast')}
                                >Gamecast</MenubarTrigger>
                            </MenubarMenu>

                            <MenubarMenu>
                                <MenubarTrigger
                                    style={selectedMenuItem === "boxscore" ? { backgroundColor: "black", color: "white" } : {}}
                                    onClick={() => handleMenuClick('boxscore')}
                                >Box Score</MenubarTrigger>
                            </MenubarMenu>

                            <MenubarMenu>
                                <MenubarTrigger
                                    style={selectedMenuItem === "team-stats" ? { backgroundColor: "black", color: "white" } : {}}
                                    onClick={() => handleMenuClick('team-stats')}
                                >Team Stats</MenubarTrigger>
                            </MenubarMenu>
                        </Menubar>
                    </CardHeader>

                    <CardContent>
                        {/* {selectedMenuItem === "" && < />} */}
                        {/* {selectedMenuItem === "" && < />} */}
                        {/* {selectedMenuItem === "" && < />} */}
                    </CardContent>
                </Card>
            }
        </div>
    )

}

export default GameBoxScorePage