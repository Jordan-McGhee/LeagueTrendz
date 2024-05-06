import React from "react";
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

// hook imports
import { useFetch } from "../../../Hooks/useFetch"

// type imports
import { Team } from "../../../types"

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button";
import { Menubar, MenubarMenu, MenubarTrigger } from "../../../components/ui/menubar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"

// views imports
import TeamHome from "./Views/TeamHome";
import Roster from "./Views/Roster";
import Stats from "./Views/Stats"
import TeamSchedule from "./Views/TeamSchedule";

// component imports
import TeamLogo from "../../../components/ui/TeamLogo"
import ErrorModal from "../../../components/ui/ErrorModal"
import LoadingPage from "../../LoadingPage"

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
    const [team, setTeam] = useState<Team | undefined>()
    const [currentAbbreviation, setCurrentAbbreviation] = useState<string | undefined>(abbreviation)

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch from database
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/teams/${currentAbbreviation}`

        let responseData: any

        const fetchTeam = async () => {
            try {
                responseData = await sendRequest(url)
                setTeam(responseData.team)
                console.log(team)
            } catch (error) {

            }
        }

        fetchTeam()
    }, [currentAbbreviation, sendRequest])

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



    // team name consts
    let teamNameFirst: string | undefined, teamNameLast: string | undefined

    // assigning these variables for displying the team name up top
    // special cases for golden state, LAC, LAL, NYK, NOP, OKC, SAS and portland because their team names are 3 words long

    // golden state, NY, NOP, SAS, LAL, OKC cases
    if (team?.team_id === 9 || team?.team_id === 12 || team?.team_id === 13 || team?.team_id === 18 || team?.team_id === 19 || team?.team_id === 20 || team?.team_id === 26) {
        teamNameFirst = [team.full_name.split(' ')[0], team.full_name.split(' ')[1]].join(' ')
        teamNameLast = team.full_name.split(' ')[2]
    } else if (team?.team_id === 24) {
        // portland case
        teamNameFirst = team.full_name.split(' ')[0]
        teamNameLast = [team.full_name.split(' ')[1], team.full_name.split(' ')[2]].join(' ')
    } else {
        teamNameFirst = team?.full_name.split(' ')[0]
        teamNameLast = team?.full_name.split(' ')[1]
    }


    const teamSelectHandler = (value: string) => {
        setCurrentAbbreviation(value)
        navigate(`/nba/teams/${value}?view=${selectedMenuItem}`)
    }

    return (
        <div className="h-full min-h-svh">
            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {/* loading state */}
            {isLoading && <LoadingPage />}

            {
                team &&
                <Card>
                    <CardHeader>

                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-x-4 mb-4">

                                {/* logo placeholder */}
                                <TeamLogo team_id={team.team_id} abbreviation={team.abbreviation} logoClass="size-20 object-contain" />

                                <div className="flex flex-col gap-y-2">
                                    <div>
                                        <CardTitle className="text-2xl font-light uppercase">{teamNameFirst} <span style={{ color: team.main_color }} className="font-bold">{teamNameLast}</span></CardTitle>
                                    </div>

                                    {/* team info div */}
                                    <div className="flex items-center gap-x-2 text-sm">
                                        {/* <Button style={{ backgroundColor: team.main_color }}>Add to Favorites</Button> */}
                                        <p>{team.wins}-{team.losses}</p>
                                        <p>|</p>
                                        <p><span className="font-semibold">3rd</span> in Southeast Division</p>
                                    </div>
                                </div>

                            </div>

                            {/* SELECT A DIFFERENT TEAM */}
                            <Select onValueChange={(newValue) => teamSelectHandler(newValue)}>
                                <SelectTrigger className="w-[300px]">
                                    <SelectValue placeholder='Change NBA Teams' defaultValue={team.full_name} />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        teams.teams.map((team: any) => {

                                            if (team.team_id >= 0) {

                                                return (
                                                    <SelectItem value={team.abbreviation.toLowerCase()}>{team.name}</SelectItem>
                                                )
                                            }

                                        })
                                    }
                                </SelectContent>
                            </Select>
                        </div>


                        {/* menubar */}
                        <Menubar className="w-fit">
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

                    <CardContent>
                        {selectedMenuItem === "home" && <TeamHome />}
                        {selectedMenuItem === "stats" && <Stats />}
                        {selectedMenuItem === "schedule" && <TeamSchedule team={team} />}
                        {selectedMenuItem === "roster" && <Roster team={team} />}
                        {selectedMenuItem === "history" && <TeamHome />}

                    </CardContent>
                </Card>
            }
        </div>
    )
}

export default SingleTeamPage