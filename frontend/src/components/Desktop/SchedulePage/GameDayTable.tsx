import React from "react";
import { Link } from "react-router-dom";

// type imports
import { GameDayTableProps } from "@/types";

// utils imports
import { shortenPlayerName, shortenTeamName } from "../../../Utils/utils";

// component imports

// ui imports
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"
import TeamLogo from "../../ui/TeamLogo"


const GameDayTable: React.FC<GameDayTableProps> = ({ games }) => {

    return (
        <div className="mb-4">
            <Table className="text-xs">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[20%]">MATCHUP</TableHead>
                        <TableHead className="w-[15%]">RESULT</TableHead>
                        <TableHead className="w-[30%]">AWAY MVP</TableHead>
                        <TableHead className="w-[30%]">HOME MVP</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {games.map((game, index) => (
                        <TableRow key={index}>

                            {/* match up cell */}
                            <TableCell>

                                <div className="flex items-center gap-x-2">

                                    {/* away team */}
                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${game.away_team_abbreviation.toLowerCase()}?view=home`} className="flex items-center gap-x-2 hover:underline">
                                        <TeamLogo abbreviation={game.away_team_abbreviation} team_id={game.away_team_id} logoClass="size-6 object-contain" />
                                        <p>{shortenTeamName(game.away_team_id)}</p>
                                    </Link>

                                    <p>@</p>

                                    {/* home team */}
                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${game.home_team_abbreviation.toLowerCase()}?view=home`} className="flex items-center gap-x-2 hover:underline">
                                        <TeamLogo abbreviation={game.home_team_abbreviation} team_id={game.home_team_id} logoClass="size-6 object-contain" />
                                        <p>{shortenTeamName(game.home_team_id)}</p>
                                    </Link>

                                </div>


                            </TableCell>

                            {/* result cell */}
                            <TableCell>

                                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/games/game_id/${game.game_id}?view=team-stats`} className="flex items-center gap-x-1 text-blue-500 hover:underline">
                                    {/* away score */}
                                    <p className={game.away_team_score > game.home_team_score ? "font-bold" : ""}>{game.away_team_score} {game.away_team_abbreviation},</p>

                                    {/* home score */}
                                    <p className={game.away_team_score < game.home_team_score ? "font-bold" : ""}>{game.home_team_score} {game.home_team_abbreviation}</p>
                                </Link>

                            </TableCell>

                            {/* winner mvp */}
                            <TableCell>
                                <div className="flex items-center gap-x-2">

                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${game.away_best_player_id}/${game.away_best_player_name.toLowerCase().replace(" ", "-")}?view=overview`} className="flex items-center gap-x-2 font-bold hover:underline">
                                        <img src={game.away_best_player_photo} alt={game.away_best_player_name} className="size-8 object-contain" />
                                        {shortenPlayerName(game.away_best_player_name)}
                                    </Link>
                                    <p>{game.away_best_player_pts} PTS, {game.away_best_player_reb} REB, {game.away_best_player_ast} AST</p>

                                </div>

                            </TableCell>

                            {/* loser mvp */}
                            <TableCell>
                                <div className="flex items-center gap-x-2">

                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${game.home_best_player_id}/${game.home_best_player_name.toLowerCase().replace(" ", "-")}?view=overview`} className="flex items-center gap-x-2 font-bold hover:underline">
                                        <img src={game.home_best_player_photo} alt={game.home_best_player_name} className="size-8 object-contain" />
                                        {shortenPlayerName(game.home_best_player_name)}
                                    </Link>
                                    <p className="">{game.home_best_player_pts} PTS, {game.home_best_player_reb} REB, {game.home_best_player_ast} AST</p>

                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};


export default GameDayTable