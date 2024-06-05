import React, { useEffect, useState } from "react";

// hook imports
import { useFetch } from "../../../Hooks/useFetch";

// type imports
import { StandingsTeamItem } from "@/types";

// utils imports
import { countStreak, lastTenConverter } from "../../../Utils/utils";

// ui imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../ui/DataTable"
import { CaretSortIcon } from "@radix-ui/react-icons";

// component imports
import ErrorModal from "../../ui/ErrorModal"
import LoadingPage from "../../../pages/LoadingPage"

const StandingsContent = () => {

    // data
    const [view, setView] = useState<"standings" | "expanded" | "division">("standings")
    const [data, setData] = useState<StandingsTeamItem[] | undefined>()

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/teams/${view}`

        let responseData: any

        const fetchTeam = async () => {
            try {
                responseData = await sendRequest(url)
                setData(responseData.standings)
            } catch (error) {

            }
        }

        fetchTeam()
    }, [sendRequest, view])

    let fullLeague: StandingsTeamItem[], easternConference: StandingsTeamItem[], westernConference: StandingsTeamItem[], atlanticTeams: StandingsTeamItem[], centralTeams: StandingsTeamItem[], southeastTeams: StandingsTeamItem[], northwestTeams: StandingsTeamItem[], pacificTeams: StandingsTeamItem[], southwestTeams: StandingsTeamItem[]

    if (data) {
        // full league
        fullLeague = data

        // conferences
        easternConference = data.filter((team: StandingsTeamItem) => team.conference === "Eastern")
        westernConference = data.filter((team: StandingsTeamItem) => team.conference === "Western")

        // divisions
        // EASTERN CONFERENCE
        atlanticTeams = data.filter((team: StandingsTeamItem) => team.division === "Atlantic")
        centralTeams = data.filter((team: StandingsTeamItem) => team.division === "Central")
        southeastTeams = data.filter((team: StandingsTeamItem) => team.division === "Southeast")

        // WESTERN CONFERENCE
        northwestTeams = data.filter((team: StandingsTeamItem) => team.division === "Northwest")
        pacificTeams = data.filter((team: StandingsTeamItem) => team.division === "Pacific")
        southwestTeams = data.filter((team: StandingsTeamItem) => team.division === "Southwest")
    }

    // define columns for data table
    if (view === "standings") {
        const columns: ColumnDef<StandingsTeamItem>[] = [

            // team name

            // wins --

            // losses --

            // gb --

            // home

            // away

            // conference

            // division

            // ppg --

            // opp ppg --

            // diff --

            // streak --

            // l10
            
        ]
    }



    return (
        <>
            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {/* loading state */}
            {isLoading && <LoadingPage />}


            {data &&
                <Tabs defaultValue="conference">
                    <TabsList>
                        <TabsTrigger value="league">League</TabsTrigger>
                        <TabsTrigger value="conference">Conference</TabsTrigger>
                        <TabsTrigger value="division">Division</TabsTrigger>
                    </TabsList>

                    {/* LEAGUE CONTENT */}
                    <TabsContent value="league">

                        {/* <StandingsTable
                            teams={data}
                            selection="league"
                            conference="National Basketball Association"
                        /> */}

                    </TabsContent>

                    {/* CONFERENCE CONTENT */}
                    <TabsContent value="conference">

                        {/* <StandingsTable
                            teams={easternConference}
                            selection="conference"
                            conference="Eastern Conference"
                        />

                        <StandingsTable
                            teams={westernConference}
                            selection="conference"
                            conference="Western Conference"
                        /> */}

                    </TabsContent>

                    {/* DIVISIONS CONTENT */}
                    <TabsContent value="division">

                        {/* <StandingsTable
                            teams={atlanticTeams}
                            selection="division"
                            conference="Eastern Conference"
                            division="Atlantic"
                        />

                        <StandingsTable
                            teams={centralTeams}
                            selection="division"
                            division="Central"
                        />

                        <StandingsTable
                            teams={southeastTeams}
                            selection="division"
                            division="Southeast"
                        />

                        <StandingsTable
                            teams={northwestTeams}
                            selection="division"
                            conference="Western Conference"
                            division="Northwest"
                        />

                        <StandingsTable
                            teams={pacificTeams}
                            selection="division"
                            division="Pacific"
                        />

                        <StandingsTable
                            teams={southwestTeams}
                            selection="division"
                            division="Southwest"
                        /> */}

                    </TabsContent>
                </Tabs>
            }
        </>
    )
}

export default StandingsContent