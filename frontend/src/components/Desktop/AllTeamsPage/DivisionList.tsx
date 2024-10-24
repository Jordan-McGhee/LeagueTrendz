import React, { useState } from "react";

// ui imports
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";

// type import
import { Team } from "../../../types"
import TeamItem from "./TeamItem";

const DivisionList = (props: { division: string, teams: Team[] | undefined }) => {

    const [showContent, setShowContent] = useState<Boolean>(true)

    const toggleShowContent = () => {
        setShowContent(!showContent)
    }

    // Sort teams alphabetically by team name
    const sortedTeams = props.teams ? [...props.teams].sort((a, b) => a.full_name.localeCompare(b.full_name)) : [];

    return (
        <div className="w-full md:mx-2">

            <div className="flex items-center justify-between">
                <p className=" md:mb-2 text-xl font-bold">{props.division}</p>

                <div onClick={() => toggleShowContent()} className="md:hidden flex gap-x-2 items-center">
                    <p className="text-sm">{showContent ? "Hide" : "Show"}</p>
                    {showContent ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
                </div>
            </div>

            {/* teams div */}
            <div>
                {showContent && sortedTeams.map((team) => (
                    <TeamItem team={team} key={team.team_id} />
                ))}
            </div>
        </div>
    )
}

export default DivisionList