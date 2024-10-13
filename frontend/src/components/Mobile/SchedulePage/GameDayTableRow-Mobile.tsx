import React, { useState } from "react";
import { Link } from "react-router-dom";

// type imports
import { GameDayTableRowProps } from "@/types";

// utils imports
import { shortenPlayerName, shortenTeamName } from "../../../Utils/utils";

// ui imports
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { TableRow, TableCell } from "../../ui/table"
import TeamLogo from "../../ui/TeamLogo"

const GameDayTableRowMobile: React.FC<GameDayTableRowProps> = ({ game }) => {

    const [showContent, setShowContent] = useState<boolean>(false)

    const toggleShowContent = () => {
        setShowContent(!showContent)
    }

    return (
        <>
            <TableRow key={game.game_id}>
                {/* match up cell */}
                <TableCell>

                    <div className="flex items-center gap-x-2">

                        {/* away team */}
                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${game.away_team_abbreviation.toLowerCase()}?view=home`} className="flex items-center gap-x-2 hover:underline">
                            <TeamLogo abbreviation={game.away_team_abbreviation} team_id={game.away_team_id} logoClass="size-6 object-contain" />
                            <p>{game.away_team_abbreviation}</p>
                        </Link>

                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/games/game_id/${game.game_id}?view=team-stats`} className="text-blue-500 flex gap-x-1 items-center"><span className={+game.away_team_score > +game.home_team_score ? "font-bold" : ""}>{game.away_team_score}</span>@<span className={+game.away_team_score < +game.home_team_score ? "font-bold" : ""}>{game.home_team_score}</span></Link>

                        {/* home team */}
                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${game.home_team_abbreviation.toLowerCase()}?view=home`} className="flex items-center gap-x-2 hover:underline">
                            <TeamLogo abbreviation={game.home_team_abbreviation} team_id={game.home_team_id} logoClass="size-6 object-contain" />
                            <p>{game.home_team_abbreviation}</p>
                        </Link>

                    </div>


                </TableCell>

                {/* MVP toggle cell */}
                <TableCell>

                    <div onClick={() => toggleShowContent()} className="flex gap-x-2 items-center">
                        <p className="text-sm">{showContent ? "Hide" : "Show"}</p>
                        {showContent ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
                    </div>

                </TableCell>

            </TableRow>

            {/* SHOW CONTENT  */}
            {showContent &&
                <>
                    <TableRow className="bg-gray-50">
                        <TableCell colSpan={2} className="px-2">
                            <div className="flex items-center gap-x-2">
                                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${game.away_best_player_id}/${game.away_best_player_name.toLowerCase().replace(" ", "-")}?view=overview`} className="flex items-center gap-x-2 hover:underline">

                                    <div className="flex items-center gap-x-2">
                                        <div className="flex -space-x-4 items-center">
                                            <TeamLogo logoClass="size-6 object-contain" team_id={game.away_team_id} abbreviation={game.away_team_abbreviation} />
                                            <img src={game.away_best_player_photo} alt={game.away_best_player_name} className="size-8 object-contain" />
                                        </div>
                                        <p className="max-w-24 truncate font-bold">{shortenPlayerName(game.away_best_player_name)}</p>
                                        <p>{game.away_best_player_pts} PTS, {game.away_best_player_reb} REB, {game.away_best_player_ast} AST</p>
                                    </div>
                                </Link>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-50">
                        <TableCell colSpan={2} className="px-2">
                            <div className="flex items-center gap-x-2">
                                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${game.home_best_player_id}/${game.home_best_player_name.toLowerCase().replace(" ", "-")}?view=overview`} className="flex items-center gap-x-2 hover:underline">

                                    <div className="flex items-center gap-x-2">
                                        <div className="flex -space-x-4 items-center">
                                            <TeamLogo logoClass="size-6 object-contain" team_id={game.home_team_id} abbreviation={game.home_team_abbreviation} />
                                            <img src={game.home_best_player_photo} alt={game.home_best_player_name} className="size-8 object-contain" />
                                        </div>
                                        <p className="max-w-24 truncate font-bold">{shortenPlayerName(game.home_best_player_name)}</p>
                                        <p>{game.home_best_player_pts} PTS, {game.home_best_player_reb} REB, {game.home_best_player_ast} AST</p>
                                    </div>
                                </Link>
                            </div>
                        </TableCell>
                    </TableRow>
                </>
            }
        </>
    )
}

export default GameDayTableRowMobile
