import React, { useState, useEffect } from "react";

// hooks import
import { useFetch } from "../../../../Hooks/useFetch";

// type imports
import { TeamPlayersProps } from "../../../../types";

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

// dummy data import
const data = require("../../../../DUMMYDATA/NBA_Roster.json")

const Stats: React.FC<TeamPlayersProps> = ({ team, players }) => {

    const [ showPlayoffs, setShowPlayoffs ] = useState<boolean>(false)
    const [ playerStats, setPlayerStats ] = useState()

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch roster from database
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/teams/${team.team_id}/stats`

        let responseData: any

        const fetchRoster = async () => {
            try {
                responseData = await sendRequest(url)
                setPlayerStats(responseData.stats)
            } catch (error) {

            }
        }

        fetchRoster()
    }, [team, sendRequest])

    return (
        <div>
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
                    <p className="my-4 font-semibold text-lg">Player Stats - All Splits</p>
                    <div className="min-h-96 w-full bg-blue-200 rounded-sm p-4">
                        <p>All Stats Table Placeholder</p>
                    </div>

                    {/* shooting stats table placeholder */}
                    {/* <p className="my-4 font-semibold text-lg">Shooting Stats - All Splits</p>
                    <div className="min-h-96 w-full bg-blue-200 mt-4 rounded-sm p-4">
                        <p>Shooting Stats Table Placeholder</p>
                    </div> */}

                </CardContent>

                <CardFooter>

                </CardFooter>
            </Card>
        </div>
    )
}

export default Stats