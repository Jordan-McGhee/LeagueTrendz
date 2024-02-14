import React from "react";

// ui imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import StandingsTable from "./StandingsTable";

// dummy import
const teams = require("../../../DUMMYDATA/NBA_Teams.json")

type Team = {
    team_id: number,
    name: string,
    abbreviation: string,
    league_id: number,
    description: string,
    record: string,
    conference: string,
    division: string
}

const StandingsContent = () => {

    // full league
    const fullLeague: { teams: Team[] } = teams

    // conferences
    const easternConference = fullLeague.teams.filter((team: Team) =>
        team.conference === "Eastern"
    )
    const westernConference = fullLeague.teams.filter((team: Team) =>
        team.conference === "Western"
    )

    // divisions
    const atlanticTeams: Team[] = fullLeague.teams.filter((team: Team) => team.division === "Atlantic")
    const centralTeams: Team[] = fullLeague.teams.filter((team: Team) => team.division === "Central")
    const southeastTeams: Team[] = fullLeague.teams.filter((team: Team) => team.division === "Southeast")

    // WESTERN CONFERENCE

    const northwestTeams: Team[] = fullLeague.teams.filter((team: Team) => team.division === "Northwest")
    const pacificTeams: Team[] = fullLeague.teams.filter((team: Team) => team.division === "Pacific")
    const southwestTeams: Team[] = fullLeague.teams.filter((team: Team) => team.division === "Southwest")


    return (
        <div>
            <Tabs defaultValue="conference">
                <TabsList>
                    <TabsTrigger value="league">League</TabsTrigger>
                    <TabsTrigger value="conference">Conference</TabsTrigger>
                    <TabsTrigger value="division">Division</TabsTrigger>
                </TabsList>

                {/* LEAGUE CONTENT */}
                <TabsContent value="league">

                    <StandingsTable
                        teams={fullLeague.teams}
                        selection="league"
                        conference="National Basketball Association"
                    />

                </TabsContent>

                {/* CONFERENCE CONTENT */}
                <TabsContent value="conference">

                    <StandingsTable
                        teams={easternConference}
                        selection="conference"
                        conference="Eastern Conference"
                    />

                    <StandingsTable
                        teams={westernConference}
                        selection="conference"
                        conference="Western Conference"
                    />

                </TabsContent>

                {/* DIVISIONS CONTENT */}
                <TabsContent value="division">

                    <StandingsTable
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
                    />

                </TabsContent>
            </Tabs>
        </div>
    )
}

export default StandingsContent