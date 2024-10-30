import React, { useState } from "react";
import { Link } from "react-router-dom";

// type imports
import { TeamStatsTableProps, PlayerStatsObject, TeamStatsObject } from "@/types";

// utils imports
import { convertPlayerPosition, shortenPlayerName } from "../../../../Utils/utils";

// ui imports
import { Table, TableHead, TableHeader, TableBody, TableFooter, TableRow, TableCell } from "../../../ui/table"
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";

const TeamAllStatsTableMobile: React.FC<TeamStatsTableProps> = ({ playerStats, teamStats, playoffs }) => {
    const [showContent, setShowContent] = useState<Boolean>(true)

    const toggleShowContent = () => {
        setShowContent(!showContent)
    }

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <p className="font-semibold text-lg">All Stats</p>
                <div onClick={() => toggleShowContent()} className="md:hidden flex gap-x-2 items-center">
                    <p className="text-sm">{showContent ? "Hide" : "Show"}</p>
                    {showContent ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
                </div>
            </div>

            {
                showContent &&
                <Table>
                    <TableHeader>
                        <TableHead className="text-left sticky left-0 z-10 bg-white pr-2 border-r-2 w-28">NAME</TableHead>
                        <TableHead className="text-center px-2">GP</TableHead>
                        {!playoffs && <TableHead className="text-center px-2">GS</TableHead>}
                        <TableHead className="text-center px-2">MIN</TableHead>
                        <TableHead className="text-center px-2">PTS</TableHead>
                        <TableHead className="text-center px-2">OR</TableHead>
                        <TableHead className="text-center px-2">DR</TableHead>
                        <TableHead className="text-center px-2">REB</TableHead>
                        <TableHead className="text-center px-2">AST</TableHead>
                        <TableHead className="text-center px-2">STL</TableHead>
                        <TableHead className="text-center px-2">BLK</TableHead>
                        <TableHead className="text-center px-2">TO</TableHead>
                        <TableHead className="text-center px-2">PF</TableHead>
                        <TableHead className="text-center px-2">AST/TO</TableHead>
                    </TableHeader>

                    <TableBody>

                        {playerStats.map((player) => {

                            return (
                                <TableRow key={player.name + " " + player.player_id} >

                                    <TableCell className="text-left sticky left-0 z-10 bg-white pr-2 border-r-2 w-28 text-blue-500">
                                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player.player_id}/${player.name.toLowerCase().replace(" ", "-")}`} className="flex">
                                            <p className="max-w-24 truncate">{shortenPlayerName(player.name)}</p>
                                            <p className="font-thin ml-1 text-gray-900">{convertPlayerPosition(player.player_position)}</p>
                                        </Link>
                                    </TableCell>

                                    <TableCell className="text-center px-2">{player.gp}</TableCell>
                                    {!playoffs && <TableCell className="text-center px-2">{player.gs}</TableCell>}
                                    <TableCell className="text-center px-2">{player.avg_min}</TableCell>
                                    <TableCell className="text-center px-2">{player.avg_pts}</TableCell>
                                    <TableCell className="text-center px-2">{player.avg_orb}</TableCell>
                                    <TableCell className="text-center px-2">{player.avg_drb}</TableCell>
                                    <TableCell className="text-center px-2">{player.avg_reb}</TableCell>
                                    <TableCell className="text-center px-2">{player.avg_ast}</TableCell>
                                    <TableCell className="text-center px-2">{player.avg_stl}</TableCell>
                                    <TableCell className="text-center px-2">{player.avg_blk}</TableCell>
                                    <TableCell className="text-center px-2">{player.avg_turnovers}</TableCell>
                                    <TableCell className="text-center px-2">{player.avg_pf}</TableCell>
                                    <TableCell className="text-center px-2">{player.ast_to_ratio}</TableCell>

                                </TableRow>
                            )
                        })}

                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell className="sticky left-0 bg-gray-50 z-10 pr-2 border-r-2 max-w-24">Total</TableCell>
                            <TableCell className="text-center px-2">{teamStats.gp}</TableCell>
                            {!playoffs && <TableCell></TableCell>}
                            <TableCell></TableCell>
                            <TableCell className="text-center px-2">{teamStats.avg_pts}</TableCell>
                            <TableCell className="text-center px-2">{teamStats.avg_orb}</TableCell>
                            <TableCell className="text-center px-2">{teamStats.avg_drb}</TableCell>
                            <TableCell className="text-center px-2">{teamStats.avg_reb}</TableCell>
                            <TableCell className="text-center px-2">{teamStats.avg_ast}</TableCell>
                            <TableCell className="text-center px-2">{teamStats.avg_stl}</TableCell>
                            <TableCell className="text-center px-2">{teamStats.avg_blk}</TableCell>
                            <TableCell className="text-center px-2">{teamStats.avg_turnovers}</TableCell>
                            <TableCell className="text-center px-2">{teamStats.avg_pf}</TableCell>
                            <TableCell className="text-center px-2">{(+teamStats.avg_ast / +teamStats.avg_turnovers).toFixed(1)}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            }
        </>
    )
}

export default TeamAllStatsTableMobile