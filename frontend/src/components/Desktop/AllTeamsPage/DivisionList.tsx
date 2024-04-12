import React from "react";

// type import
import { Team } from "../../../types"
import TeamItem from "./TeamItem";

const DivisionList = (props: { division: string, teams: Team[] | undefined }) => {

    // Sort teams alphabetically by team name
    const sortedTeams = props.teams ? [...props.teams].sort((a, b) => a.full_name.localeCompare(b.full_name)) : [];

    return (
        <div className="w-full mx-2">
            <p className="mb-2 text-xl font-bold">{props.division}</p>

            {/* teams div */}
            <div>

                {sortedTeams.map((team) => (
                    <TeamItem team={team} key={team.team_id} />
                ))}
            </div>
        </div>
    )
}

export default DivisionList