import React from "react";
import { Link } from "react-router-dom";

// type imports
import { CareerHistoryItemProps } from "../../../../types";

// utils imports
import { shortenYears } from "../../../../Utils/utils";

// team dummy data imports
import teams from "../../../../DUMMYDATA/NBA_Teams.json"

// component imports
import TeamLogo from "../../../ui/TeamLogo"

const CareerHistoryItem: React.FC<CareerHistoryItemProps> = ({ team_id, years }) => {

    const team = teams.teams.filter((team) => team.team_id === team_id)

    return (
        <Link
            to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${team[0].abbreviation.toLowerCase()}`}
            className="flex items-center gap-x-2 w-1/2 group"
        >
            <TeamLogo abbreviation={team[0].abbreviation} team_id={team_id} logoClass="size-12 object-contain" />
            <div className="">
                <p className="font-semibold group-hover:underline">{team[0].name}</p>
                <p className="text-xs font-light uppercase">{shortenYears(years)}</p>
            </div>
        </Link>
    )
}

export default CareerHistoryItem