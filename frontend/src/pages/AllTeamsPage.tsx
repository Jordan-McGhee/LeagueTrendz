import React from "react";

import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"

import Division from "../components/Desktop/AllTeamsPage/Division";

// DUMMY IMPORT
const teams = require("../DUMMYDATA/NBA_Teams.json")

console.log(teams)

const AllTeamsPage = () => {

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

    const teamsData: { teams: Team[] } = teams

    // EASTERN CONFERENCE

    const atlanticTeams: Team[] = teamsData.teams.filter((team: Team) => team.division === "Atlantic")
    const centralTeams: Team[] = teamsData.teams.filter((team: Team) => team.division === "Central")
    const southeastTeams: Team[] = teamsData.teams.filter((team: Team) => team.division === "Southeast")

    // WESTERN CONFERENCE

    const northwestTeams: Team[] = teamsData.teams.filter((team: Team) => team.division === "Northwest")
    const pacificTeams: Team[] = teamsData.teams.filter((team: Team) => team.division === "Pacific")
    const southwestTeams: Team[] = teamsData.teams.filter((team: Team) => team.division === "Southwest")



    return (
        <Card className="">
            <CardHeader>
                <CardTitle className="text-2xl">
                    NBA Teams
                </CardTitle>

                <CardContent className="px-0">

                    {/* EASTERN CONFERENCE */}
                    <div className="w-full flex justify-between py-4">
                        <Division division="Atlantic" teams={atlanticTeams} />

                        <Division division="Central" teams={centralTeams} />

                        <Division division="Southeast" teams={southeastTeams} />
                    </div>


                    {/* WESTERN CONFERENCE */}

                    <div className="w-full flex justify-between py-4">
                        <Division division="Northwest" teams={northwestTeams} />

                        <Division division="Pacific" teams={pacificTeams} />

                        <Division division="Southwest" teams={southwestTeams} />
                    </div>


                </CardContent>

            </CardHeader>
        </Card>
    )
}

export default AllTeamsPage