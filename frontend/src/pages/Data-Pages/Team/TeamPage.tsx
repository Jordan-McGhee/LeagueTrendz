import React from "react";
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

// hook imports
import { useFetch } from "../../../Hooks/useFetch"

// type imports
import { TeamExpanded, TeamGames, TeamHistoryState, TeamPlayersState } from "../../../types"

// ui imports
import { Card, CardHeader, CardContent } from "../../../components/ui/card"
import { Menubar, MenubarMenu, MenubarTrigger } from "../../../components/ui/menubar"

// views imports
import TeamHome from "./Views/TeamHome";
import Roster from "./Views/Roster";
import Stats from "./Views/Stats"
import TeamSchedule from "./Views/TeamSchedule";
import History from "./Views/History";

// component imports
import TeamHeader from "../../../components/Desktop/TeamPage/TeamHeader"
import ErrorModal from "../../../components/ui/ErrorModal"
import LoadingPage from "../../LoadingPage"

// mobile component imports
import TeamHeaderMobile from "../../../components/Mobile/TeamPage/TeamHeader-Mobile"

// team dummy data imports
const teams = require("../../../DUMMYDATA/NBA_Teams.json")

const SingleTeamPage = () => {

    // pull abbreviation from params
    const { abbreviation } = useParams<{ abbreviation: string }>()

    // grab query params from url if any
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const view = queryParams.get('view');
    const navigate = useNavigate()

    // data states
    const [team, setTeam] = useState<TeamExpanded | undefined>()
    const [games, setGames] = useState<TeamGames[] | undefined>()
    const [players, setPlayers] = useState<TeamPlayersState | undefined>()
    const [history, setHistory] = useState<TeamHistoryState | undefined>()

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch from database
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/teams/${abbreviation}`

        let responseData: any

        const fetchTeam = async () => {
            try {
                responseData = await sendRequest(url)
                setTeam(responseData.team)
                setGames(responseData.games)
                setPlayers(responseData.players)
                setHistory(responseData.history)
            } catch (error) {

            }
        }

        fetchTeam()
    }, [abbreviation, sendRequest])

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
        navigate(`/nba/teams/${abbreviation}?view=${option}`);
    }


    return (
        <div className="md:pb-8 pb-24">
            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {/* loading state */}
            {isLoading && <LoadingPage />}

            {
                team && games && players && history &&
                <Card>
                    <CardHeader>

                        {/* mobile header */}
                        <TeamHeaderMobile team={team} abbreviation={abbreviation} selectedMenuItem={selectedMenuItem} className="flex flex-col gap-y-3 md:hidden" />
                        

                        {/* desktop header */}
                        <TeamHeader team={team} abbreviation={abbreviation} selectedMenuItem={selectedMenuItem} className="hidden md:flex justify-between items-start" />

                        {/* mobile menubar */}
                        <Menubar className="flex w-full md:hidden z-0">
                            <MenubarMenu>
                                <MenubarTrigger
                                    style={selectedMenuItem === "home" ? { backgroundColor: team.main_color, color: "white" } : {}}
                                    className="text-xs px-2"
                                    onClick={() => handleMenuClick('home')}>Home</MenubarTrigger>
                            </MenubarMenu>

                            <MenubarMenu>
                                <MenubarTrigger
                                    style={selectedMenuItem === "stats" ? { backgroundColor: team.main_color, color: "white" } : {}}
                                    className="text-xs px-2"
                                    onClick={() => handleMenuClick('stats')}>Stats</MenubarTrigger>
                            </MenubarMenu>

                            <MenubarMenu>
                                <MenubarTrigger
                                    style={selectedMenuItem === "schedule" ? { backgroundColor: team.main_color, color: "white" } : {}}
                                    className="text-xs px-2"
                                    onClick={() => handleMenuClick('schedule')}>Schedule</MenubarTrigger>
                            </MenubarMenu>

                            <MenubarMenu>
                                <MenubarTrigger
                                    style={selectedMenuItem === "roster" ? { backgroundColor: team.main_color, color: "white" } : {}}
                                    className="text-xs px-2"
                                    onClick={() => handleMenuClick('roster')}>Roster</MenubarTrigger>
                            </MenubarMenu>

                            <MenubarMenu>
                                <MenubarTrigger
                                    style={selectedMenuItem === "history" ? { backgroundColor: team.main_color, color: "white" } : {}}
                                    className="text-xs px-2"
                                    onClick={() => handleMenuClick('history')}>History</MenubarTrigger>
                            </MenubarMenu>

                        </Menubar>

                        {/* desktop menubar */}
                        <Menubar className="hidden md:flex w-fit">
                            <MenubarMenu>
                                <MenubarTrigger
                                    style={selectedMenuItem === "home" ? { backgroundColor: team.main_color, color: "white" } : {}}
                                    onClick={() => handleMenuClick('home')}>Home</MenubarTrigger>
                            </MenubarMenu>

                            <MenubarMenu>
                                <MenubarTrigger
                                    style={selectedMenuItem === "stats" ? { backgroundColor: team.main_color, color: "white" } : {}}
                                    onClick={() => handleMenuClick('stats')}>Stats</MenubarTrigger>
                            </MenubarMenu>

                            <MenubarMenu>
                                <MenubarTrigger
                                    style={selectedMenuItem === "schedule" ? { backgroundColor: team.main_color, color: "white" } : {}}
                                    onClick={() => handleMenuClick('schedule')}>Schedule</MenubarTrigger>
                            </MenubarMenu>

                            <MenubarMenu>
                                <MenubarTrigger
                                    style={selectedMenuItem === "roster" ? { backgroundColor: team.main_color, color: "white" } : {}}
                                    onClick={() => handleMenuClick('roster')}>Roster</MenubarTrigger>
                            </MenubarMenu>

                            <MenubarMenu>
                                <MenubarTrigger
                                    style={selectedMenuItem === "history" ? { backgroundColor: team.main_color, color: "white" } : {}}
                                    onClick={() => handleMenuClick('history')}>History</MenubarTrigger>
                            </MenubarMenu>

                        </Menubar>


                    </CardHeader>

                    <CardContent className="z-0">
                        {selectedMenuItem === "home" && <TeamHome team={team} games={games} players={players} history={history} />}
                        {selectedMenuItem === "stats" && <Stats team={team} players={players} />}
                        {selectedMenuItem === "schedule" && <TeamSchedule team={team} />}
                        {selectedMenuItem === "roster" && <Roster team={team} />}
                        {selectedMenuItem === "history" && <History team={team} />}
                    </CardContent>
                </Card>
            }
        </div>
    )
}

export default SingleTeamPage