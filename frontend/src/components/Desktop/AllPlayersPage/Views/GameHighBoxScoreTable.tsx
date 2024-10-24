import React from "react";
import { Link } from "react-router-dom";

// type imports
import { GameHighBoxScoreTableProps } from "@/types";

// utils imports
import { shortenPlayerName, convertDateTeamSchedule } from "../../../../Utils/utils";

// ui imports
import { Card, CardContent } from "../../../ui/card"
import { Table, TableHeader, TableRow, TableCell, TableHead, TableBody } from "../../../ui/table"
import TeamLogo from "../../../ui/TeamLogo"

const GameHighBoxScoreTable: React.FC<GameHighBoxScoreTableProps> = ({ tableData, statCategory, tableClass }) => {

    return (
        <Card className={tableClass}>
            <CardContent>
                <Table className="">
                    <TableHeader>
                        <TableRow className="uppercase">
                            <TableHead>PLAYER</TableHead>
                            <TableHead>MATCH UP</TableHead>
                            <TableHead className="text-center px-1.5">DATE</TableHead>
                            <TableHead className="text-center px-1.5">W/L</TableHead>
                            <TableHead className="text-center px-1.5">MIN</TableHead>
                            <TableHead className={statCategory === "pts" ? "bg-slate-100 text-center px-1.5" : "text-center px-1.5"}>PTS</TableHead>
                            <TableHead className="text-center px-1.5">FGM-FGA</TableHead>
                            <TableHead className="text-center px-1.5">FG%</TableHead>
                            <TableHead className={statCategory === "tpm" ? "bg-slate-100 text-center px-1.5" : "text-center px-1.5"}>3PM-3PA</TableHead>
                            <TableHead className="text-center px-1.5">3P%</TableHead>
                            {/* <TableHead classN{statCategory === "pts" ? "bg-slate-100 text-center" : "text-center"}ter">FTM-FTA</TableHead> */}
                            <TableHead className="text-center px-1.5">FT%</TableHead>
                            <TableHead className={statCategory === "reb" ? "bg-slate-100 text-center px-1.5" : "text-center px-1.5"}>REB</TableHead>
                            <TableHead className={statCategory === "ast" ? "bg-slate-100 text-center px-1.5" : "text-center px-1.5"}>AST</TableHead>
                            <TableHead className={statCategory === "stl" ? "bg-slate-100 text-center px-1.5" : "text-center px-1.5"}>STL</TableHead>
                            <TableHead className={statCategory === "blk" ? "bg-slate-100 text-center px-1.5" : "text-center px-1.5"}>BLK</TableHead>
                            <TableHead className="text-center px-1.5">PF</TableHead>
                            <TableHead className="text-center px-1.5">TO</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {
                            tableData.map((player) => (
                                <TableRow key={`${player.player_name}-${player.game_id}`}>
                                    <TableCell>
                                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player.player_id}/${player.player_name.toLowerCase().replace(" ", "-")}`} className="hover:underline">
                                            {shortenPlayerName(player.player_name)}
                                        </Link>
                                    </TableCell>
                                    <TableCell>

                                        <Link className="flex gap-x-1 items-center hover:underline" to={`${process.env.REACT_APP_FRONTEND_URL}/nba/games/game_id/${player.game_id}?view=team-stats`}>

                                            {/* player team */}
                                            <TeamLogo team_id={player.player_team_id} abbreviation={player.player_team_abbreviation} logoClass="size-4 object-contain" />
                                            <p>{player.player_team_abbreviation}</p>

                                            {/* game location */}
                                            <p>{player.game_location === "HOME" ? "VS" : "@"}</p>

                                            {/* player team */}
                                            <TeamLogo team_id={player.opp_team_id} abbreviation={player.opp_team_abbreviation} logoClass="size-4 object-contain" />
                                            <p>{player.opp_team_abbreviation}</p>
                                        </Link>
                                    </TableCell>

                                    <TableCell className="text-center">{convertDateTeamSchedule(player.game_date, true)}</TableCell>
                                    <TableCell className={player.game_result === "W" ? "text-center text-green-500" : "text-center text-red-500"}>{player.game_result}</TableCell>
                                    <TableCell className="text-center">{player.minutes}</TableCell>
                                    <TableCell className={statCategory === "pts" ? "bg-slate-100 text-center" : "text-center"}>{player.pts}</TableCell>
                                    <TableCell className="text-center">{`${player.fgm}-${player.fga}`}</TableCell>
                                    <TableCell className="text-center">{player.fg_percentage}%</TableCell>
                                    <TableCell className={statCategory === "tpm" ? "bg-slate-100 text-center" : "text-center"}>{`${player.tpm}-${player.tpa}`}</TableCell>
                                    <TableCell className="text-center">{player.tp_percentage}%</TableCell>
                                    {/* <TableCell className="text-center">{perMode === "average" ? `${player.avg_ftm}-${player.avg_fta}` : `${player.ftm}-${player.fta}`}</TableCell> */}
                                    <TableCell className="text-center">{player.ft_percentage}%</TableCell>
                                    <TableCell className={statCategory === "reb" ? "bg-slate-100 text-center" : "text-center"}>{player.reb}</TableCell>
                                    <TableCell className={statCategory === "ast" ? "bg-slate-100 text-center" : "text-center"}>{player.ast}</TableCell>
                                    <TableCell className={statCategory === "stl" ? "bg-slate-100 text-center" : "text-center"}>{player.stl}</TableCell>
                                    <TableCell className={statCategory === "blk" ? "bg-slate-100 text-center" : "text-center"}>{player.blk}</TableCell>
                                    <TableCell className="text-center">{player.pf}</TableCell>
                                    <TableCell className="text-center">{player.turnovers}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default GameHighBoxScoreTable