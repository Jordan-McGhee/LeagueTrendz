import React, { useState, useEffect } from "react";

// hooks import
import { useFetch } from "../../../../Hooks/useFetch";

// type imports
import { TeamPlayersProps, PlayerStatsObject, TeamStatsObject } from "../../../../types";

// utils imports
import { convertPlayerPosition } from "../../../../Utils/utils";

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../../components/ui/card"
import { Button } from "../../../../components/ui/button"
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import ErrorModal from "../../../../components/ui/ErrorModal"

// component imports
import { DataTable } from "../../../../components/ui/DataTable";
import StatsTeamLeaders from "../../../../components/Desktop/SingleTeamPage/Stats/StatsTeamLeaders"
import LoadingPage from "../../../LoadingPage"
import TeamAllStatsTable from "../../../../components/Desktop/SingleTeamPage/Stats/TeamAllStatsTable";

// dummy data import
const data = require("../../../../DUMMYDATA/NBA_Roster.json")

const Stats: React.FC<TeamPlayersProps> = ({ team, players }) => {

    const [showPlayoffs, setShowPlayoffs] = useState<boolean>(false)
    const [playerStats, setPlayerStats] = useState<PlayerStatsObject | undefined>()
    const [teamStats, setTeamStats] = useState<TeamStatsObject | undefined>()

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch roster from database
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/teams/${team.team_id}/stats-regular`

        let responseData: any

        const fetchRoster = async () => {
            try {
                responseData = await sendRequest(url)
                setPlayerStats(responseData.player_stats)
                setTeamStats(responseData.team_stats)
            } catch (error) {

            }
        }

        fetchRoster()
    }, [team, sendRequest])

    return (
        <>

            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {isLoading && <LoadingPage />}

            {
                playerStats && teamStats &&
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between">
                            2023-24 Stats and Leaders

                            {/* drop down place holder for playoff/regular season */}
                            <div className="h-8 w-36 bg-red-500 rounded-full" />
                        </CardTitle>
                    </CardHeader>

                    <CardContent>

                        <StatsTeamLeaders team={team} players={players} />

                        {/* all stats table placeholder */}
                        <p className="my-8 font-semibold text-lg">Player Stats - All Splits</p>
                        <TeamAllStatsTable playerStats={playerStats} teamStats={teamStats} />


                        {/* shooting stats table placeholder */}
                        {/* <p className="my-4 font-semibold text-lg">Shooting Stats - All Splits</p>
                    <div className="min-h-96 w-full bg-blue-200 mt-4 rounded-sm p-4">
                        <p>Shooting Stats Table Placeholder</p>
                    </div> */}

                    </CardContent>

                    <CardFooter>
                        <div className="w-full pt-2">

                            <p className="text-xs font-semibold">GLOSSARY:</p>

                            {/* GLOSSARY */}
                            <div className="text-xs mt-4 flex justify-between">

                                <div className="flex flex-col gap-y-1">
                                    <p><span className="font-bold">2P%:</span> 2-Point Field Goal Percentage</p>
                                    <p><span className="font-bold">2PA:</span> 2-Point Field Goals Attempted Per Game</p>
                                    <p><span className="font-bold">2PM:</span> 2-Point Field Goals Made Per Game</p>
                                    <p><span className="font-bold">3P%:</span> 3-Point Field Goal Percentage</p>
                                    <p><span className="font-bold">3PA:</span> 3-Point Field Goals Attempted Per Game</p>
                                    <p><span className="font-bold">3PM:</span> 3-Point Field Goals Made Per Game</p>
                                    <p><span className="font-bold">AST:</span> Assists Per Game</p>
                                    <p><span className="font-bold">AST/TO:</span> Assist to Turnover Ratio</p>
                                    <p><span className="font-bold">BLK:</span> Blocks Per Game</p>
                                </div>

                                <div className="flex flex-col gap-y-1">
                                    <p><span className="font-bold">DR:</span> Defensive Rebounds Per Game</p>
                                    <p><span className="font-bold">FGA:</span> Field Goal Attempts Per Game</p>
                                    <p><span className="font-bold">FGM:</span> Field Goals Made Per Game</p>
                                    <p><span className="font-bold">FG%:</span> Field Goal Percentage</p>
                                    <p><span className="font-bold">FT%:</span> Free Throw Percentage</p>
                                    <p><span className="font-bold">FTA:</span> Free Throw Attempts Per Game</p>
                                    <p><span className="font-bold">FTM:</span> Free Throws Made Per Game</p>
                                    <p><span className="font-bold">GP:</span> Games Played</p>
                                </div>

                                <div className="flex flex-col gap-y-1">
                                    <p><span className="font-bold">GS:</span> Games Started</p>
                                    <p><span className="font-bold">MIN:</span> Minutes Per Game</p>
                                    <p><span className="font-bold">OR:</span> Offensive Rebounds Per Game</p>
                                    <p><span className="font-bold">PF:</span> Fouls Per Game</p>
                                    <p><span className="font-bold">PTS:</span> Points Per Game</p>
                                    <p><span className="font-bold">REB:</span> Rebounds Per Game</p>
                                    <p><span className="font-bold">STL:</span> Steals Per Game</p>
                                    <p><span className="font-bold">TO:</span> Turnovers Per Game</p>
                                </div>

                            </div>
                        </div>
                    </CardFooter>
                </Card>
            }
        </>
    )
}

export default Stats