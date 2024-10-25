import React, { useState } from "react";
import { Link } from "react-router-dom";

// type imports
import { TeamScheduleObject } from "@/types";

// utils imports
import { convertDateTeamSchedule } from "../../../../Utils/utils";

// ui imports
import { TableRow, TableCell } from "../../../ui/table"
import TeamLogo from "../../../ui/TeamLogo"
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";

const TeamScheduleTableRowMobile = ({ game }: { game: TeamScheduleObject }) => {

    const [showContent, setShowContent] = useState<boolean>(false)

    const toggleShowContent = () => {
        setShowContent(!showContent)
    }

    return (
        <TableRow key={`${game.game_id}-${game.team_abbreviation}-${game.opponent_team_abbreviation}`}>
            <TableCell className="pr-1">{convertDateTeamSchedule(game.game_date.split("T")[0])}</TableCell>
            <TableCell className="px-1">
                <div className="flex gap-x-1 items-center">
                    <p>{game.game_location === "HOME" ? 'vs' : '@'}</p>
                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${game.opponent_team_abbreviation.toLowerCase()}?view=home`} className="flex items-center gap-x-1 hover:underline hover:font-semibold">
                        <TeamLogo abbreviation={game.opponent_team_abbreviation} team_id={game.opponent_team_id} logoClass="size-5 object-contain" />
                        <p>{game.opponent_team_abbreviation}</p>
                    </Link>
                </div>
            </TableCell>


            <TableCell className="px-1">
                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/games/game_id/${game.game_id}?view=team-stats`} className="hover:underline">
                    <div className="flex items-center gap-x-1">
                        {game.result === "W" ? <span className="text-green-700">W</span> : <span className="text-red-700">L</span>}

                        {game.result === "W" ? <p className="text-blue-500">{game.team_score} - {game.opponent_score}</p> : <p className="text-blue-500">{game.opponent_score} - {game.team_score}</p>}
                    </div>
                </Link>
            </TableCell>

            <TableCell className="pl-1">
                {game.wins}-{game.losses}
            </TableCell>
        </TableRow>
    )
}

export default TeamScheduleTableRowMobile