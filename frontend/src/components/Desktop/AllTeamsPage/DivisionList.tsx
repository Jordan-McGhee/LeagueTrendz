import React from "react";

// type import
import { Team } from "../../../types"
import TeamItem from "./TeamItem";

const DivisionList = (props: { division: string, teams: Team[] | undefined }) => {

    return (
        <div className="w-full mx-2">
            <p className="mb-2 text-xl font-bold">{ props.division }</p>

            {/* teams div */}
            <div>

                { props.teams?.map((team) => (
                    <TeamItem team={team} />
                ))}
            </div>
        </div>
    )
}

export default DivisionList