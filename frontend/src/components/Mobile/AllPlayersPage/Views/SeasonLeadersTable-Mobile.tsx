import React from "react";
import { Link } from "react-router-dom";

// type imports
import { SeasonLeaderTableProps } from "@/types";

// utils imports
import { shortenPlayerName } from "../../../../Utils/utils";

// ui imports
import { Card, CardContent } from "../../../ui/card"
import { Table, TableHeader, TableRow, TableCell, TableHead, TableBody } from "../../../ui/table"
import TeamLogo from "../../../ui/TeamLogo"

const SeasonLeadersTableMobile: React.FC<SeasonLeaderTableProps> = ({ tableData, statCategory, perMode, tableClass }) => {

    return (
        <Card className={tableClass}>
            <CardContent>
                <Table className="text-xs">
                    <TableHeader>
                        <TableRow className="uppercase">
                            <TableHead className="text-left sticky left-0 z-10 bg-white w-24">PLAYER</TableHead>
                            <TableHead className="text-center px-2 truncate">TEAM</TableHead>
                            <TableHead className="text-center px-2">GP</TableHead>
                            <TableHead className="text-center px-2">Min</TableHead>
                            <TableHead className={statCategory === "pts" ? "bg-slate-100 text-center px-2" : "text-center px-2"}>PTS</TableHead>
                            <TableHead className={statCategory === "fgm" ? "bg-slate-100 text-center px-2 truncate" : "text-center px-2 truncate"}>FGM-FGA</TableHead>
                            <TableHead className={statCategory === "fg_percentage" ? "bg-slate-100 text-center px-2" : "text-center px-2"}>FG%</TableHead>
                            <TableHead className={statCategory === "tpm" ? "bg-slate-100 text-center px-2 truncate" : "text-center px-2 truncate"}>3PM-3PA</TableHead>
                            <TableHead className={statCategory === "tp_percentage" ? "bg-slate-100 text-center px-2" : "text-center px-2"}>3P%</TableHead>
                            {/* <TableHead classN{statCategory === "pts" ? "bg-slate-100 text-center" : "text-center"}ter">FTM-FTA</TableHead> */}
                            <TableHead className={statCategory === "ft_percentage" ? "bg-slate-100 text-center px-2" : "text-center px-2"}>FT%</TableHead>
                            <TableHead className={statCategory === "reb" ? "bg-slate-100 text-center px-2" : "text-center px-2"}>REB</TableHead>
                            <TableHead className={statCategory === "ast" ? "bg-slate-100 text-center px-2" : "text-center px-2"}>AST</TableHead>
                            <TableHead className={statCategory === "stl" ? "bg-slate-100 text-center px-2" : "text-center px-2"}>STL</TableHead>
                            <TableHead className={statCategory === "blk" ? "bg-slate-100 text-center px-2" : "text-center px-2"}>BLK</TableHead>
                            <TableHead className={statCategory === "pf" ? "bg-slate-100 text-center px-2" : "text-center px-2"}>PF</TableHead>
                            <TableHead className={statCategory === "turnovers" ? "bg-slate-100 text-center px-2" : "text-center px-2"}>TO</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            tableData.map((player) => (
                                <TableRow key={`${player.name}`}>
                                    <TableCell className="text-left sticky left-0 z-10 bg-white pr-2 border-r-2 max-w-24 truncate text-blue-500">
                                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player.player_id}/${player.name.toLowerCase().replace(" ", "-")}`} className="hover:underline">
                                            {shortenPlayerName(player.name)}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-center px-4">
                                        <Link className="flex gap-x-2 justify-center items-center hover:underline" to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${player.abbreviation.toLowerCase()}?view=home`}>
                                            <TeamLogo team_id={player.team_id} abbreviation={player.abbreviation} logoClass="size-5 object-contain" />
                                            <p>{player.abbreviation}</p>
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-center px-2">{player.gp}</TableCell>
                                    <TableCell className="text-center">{player.avg_min}</TableCell>
                                    <TableCell className={statCategory === "pts" ? "bg-slate-100 text-center px-2" : "text-center px-2"}>{perMode === "average" ? player.avg_pts : player.pts}</TableCell>
                                    <TableCell className={statCategory === "fgm" ? "bg-slate-100 text-center px-2 truncate" : "text-center px-2 truncate"}>{perMode === "average" ? `${player.avg_fgm}-${player.avg_fga}` : `${player.fgm}-${player.fga}`}</TableCell>
                                    <TableCell className={statCategory === "fg_percentage" ? "bg-slate-100 text-center px-2" : "text-center px-2"}>{player.avg_fg_percentage}%</TableCell>
                                    <TableCell className={statCategory === "tpm" ? "bg-slate-100 text-center px-2 truncate" : "text-center px-2 truncate"}>{perMode === "average" ? `${player.avg_tpm}-${player.avg_tpa}` : `${player.tpm}-${player.tpa}`}</TableCell>
                                    <TableCell className={statCategory === "tp_percentage" ? "bg-slate-100 text-center px-2" : "text-center px-2"}>{player.avg_tp_percentage}%</TableCell>
                                    {/* <TableCell className="text-center">{perMode === "average" ? `${player.avg_ftm}-${player.avg_fta}` : `${player.ftm}-${player.fta}`}</TableCell> */}
                                    <TableCell className={statCategory === "ft_percentage" ? "bg-slate-100 text-center px-2" : "text-center px-2"}>{player.avg_ft_percentage}%</TableCell>
                                    <TableCell className={statCategory === "reb" ? "bg-slate-100 text-center px-2" : "text-center px-2"}>{perMode === "average" ? player.avg_reb : player.reb}</TableCell>
                                    <TableCell className={statCategory === "ast" ? "bg-slate-100 text-center px-2" : "text-center px-2"}>{perMode === "average" ? player.avg_ast : player.ast}</TableCell>
                                    <TableCell className={statCategory === "stl" ? "bg-slate-100 text-center px-2" : "text-center px-2"}>{perMode === "average" ? player.avg_stl : player.stl}</TableCell>
                                    <TableCell className={statCategory === "blk" ? "bg-slate-100 text-center px-2" : "text-center px-2"}>{perMode === "average" ? player.avg_blk : player.blk}</TableCell>
                                    <TableCell className={statCategory === "pf" ? "bg-slate-100 text-center px-2" : "text-center px-2"}>{perMode === "average" ? player.avg_pf : player.pf}</TableCell>
                                    <TableCell className={statCategory === "turnovers" ? "bg-slate-100 text-center px-2" : "text-center px-2"}>{perMode === "average" ? player.avg_turnovers : player.turnovers}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>

            </CardContent>
        </Card>
    )
}

export default SeasonLeadersTableMobile