import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// hook imports
import { useFetch } from "../../../Hooks/useFetch"

// type imports
import { Team } from "../../../types"

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button";
import { Menubar, MenubarMenu, MenubarTrigger } from "../../../components/ui/menubar"

// views imports
import TeamHome from "./Views/TeamHome";
import Roster from "./Views/Roster";
import Stats from "./Views/Stats"

// component imports
import TeamLogo from "../../../components/ui/TeamLogo"
import ErrorModal from "../../../components/ui/ErrorModal"
import LoadingPage from "../../LoadingPage"

const SingleTeamPage = () => {

    // pull abbreviation from params
    const { abbreviation } = useParams()

    // data state
    const [team, setTeam] = useState<Team | undefined>()

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch from database
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/teams/${abbreviation}`

        let responseData: any

        const fetchTeam = async () => {
            try {
                responseData = await sendRequest(url)
                setTeam(responseData.team)
            } catch (error) {

            }
        }

        fetchTeam()
    }, [])

    // menu item type
    type MenuItem = "home" | "stats" | "schedule" | "roster" | "injuries"

    const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem>('home')

    const handleMenuClick = (option: MenuItem) => {
        setSelectedMenuItem(option)
    }

    // team name consts
    let teamNameFirst: string | undefined, teamNameLast: string | undefined

    // assigning these variables for displying the team name up top
    // special cases for golden state and portland because their team names are 3 words long
    
    // golden state, NY, NOP, SAS, LAL, OKC cases
    if (team?.team_id === 9 || team?.team_id === 13 || team?.team_id === 18 || team?.team_id === 19 || team?.team_id === 20 || team?.team_id === 26) {
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

                        <div className="flex items-center gap-x-4 mb-4">

                            {/* logo placeholder */}
                            <TeamLogo team_id={team.team_id} abbreviation={team.abbreviation} logoClass="size-20 object-contain"/>

                            <div className="flex flex-col gap-y-2">
                                <div>
                                    <CardTitle className="text-2xl font-light uppercase">{teamNameFirst} <span style={{ color: team.main_color}} className="font-bold">{teamNameLast}</span></CardTitle>
                                </div>

                                {/* team info div */}
                                <div className="flex items-center gap-x-2 text-sm">
                                    <Button style={{ backgroundColor: team.main_color}}>Add to Favorites</Button>
                                    <p>{team.wins}-{team.losses}</p>
                                    <p>|</p>
                                    <p><span className="font-semibold">3rd</span> in Southeast Division</p>
                                </div>
                            </div>

                        </div>

                        {/* menubar */}
                        <Menubar className="w-fit">
                            <MenubarMenu>
                                <MenubarTrigger onClick={() => handleMenuClick('home')}>Home</MenubarTrigger>
                            </MenubarMenu>

                            <MenubarMenu>
                                <MenubarTrigger onClick={() => handleMenuClick('stats')}>Stats</MenubarTrigger>
                            </MenubarMenu>

                            <MenubarMenu>
                                <MenubarTrigger onClick={() => handleMenuClick('schedule')}>Schedule</MenubarTrigger>
                            </MenubarMenu>

                            <MenubarMenu>
                                <MenubarTrigger onClick={() => handleMenuClick('roster')}>Roster</MenubarTrigger>
                            </MenubarMenu>

                            <MenubarMenu>
                                <MenubarTrigger onClick={() => handleMenuClick('injuries')}>Injuries</MenubarTrigger>
                            </MenubarMenu>

                        </Menubar>


                    </CardHeader>

                    <CardContent>
                        {selectedMenuItem === "home" && <TeamHome />}
                        {selectedMenuItem === "stats" && <Stats />}
                        {/* { selectedMenuItem === "schedule" && <TeamHome />} */}
                        {selectedMenuItem === "roster" && <Roster team={team} />}
                        {/* { selectedMenuItem === "injuries" && <TeamHome />} */}

                    </CardContent>
                </Card>
            }
        </div>
    )
}

export default SingleTeamPage