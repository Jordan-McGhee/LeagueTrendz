import React, { useState } from "react";
import { Link } from "react-router-dom";

// type imports
import { TeamStatsTableProps, PlayerStatsObject, TeamStatsObject } from "@/types";

// utils imports
import { convertPlayerPosition, shortenPlayerName } from "../../../../Utils/utils";

// ui imports
import { Table, TableHead, TableHeader, TableBody, TableFooter, TableRow, TableCell } from "../../../ui/table"
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";


const TeamShootingStatsTableMobile: React.FC<TeamStatsTableProps> = ({ playerStats, teamStats, playoffs }) => {

    const [showContent, setShowContent] = useState<Boolean>(true)

    const toggleShowContent = () => {
        setShowContent(!showContent)
    }

    return (
        <>
            <div className="flex justify-between items-center my-4">
                <p className="font-semibold text-lg">Shooting Stats</p>
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
                        <TableHead className="text-center px-2">FGM</TableHead>
                        <TableHead className="text-center px-2">FGA</TableHead>
                        <TableHead className="text-center px-2">FG%</TableHead>
                        <TableHead className="text-center px-2">3PM</TableHead>
                        <TableHead className="text-center px-2">3PA</TableHead>
                        <TableHead className="text-center px-2">3P%</TableHead>
                        <TableHead className="text-center px-2">FTM</TableHead>
                        <TableHead className="text-center px-2">FTA</TableHead>
                        <TableHead className="text-center px-2">FT%</TableHead>
                        <TableHead className="text-center px-2">2PM</TableHead>
                        <TableHead className="text-center px-2">2PA</TableHead>
                        <TableHead className="text-center px-2">2P%</TableHead>
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

                                    <TableCell className="text-center px-2">{player.avg_fgm}</TableCell>
                                    <TableCell className="text-center px-2">{player.avg_fga}</TableCell>
                                    <TableCell className="text-center px-2">{player.avg_fg_percentage}</TableCell>
                                    <TableCell className="text-center px-2">{player.avg_tpm}</TableCell>
                                    <TableCell className="text-center px-2">{player.avg_tpa}</TableCell>
                                    <TableCell className="text-center px-2">{player.avg_tp_percentage}</TableCell>
                                    <TableCell className="text-center px-2">{player.avg_ftm}</TableCell>
                                    <TableCell className="text-center px-2">{player.avg_fta}</TableCell>
                                    <TableCell className="text-center px-2">{player.avg_ft_percentage}</TableCell>
                                    <TableCell className="text-center px-2">{player.player_avg_two_m}</TableCell>
                                    <TableCell className="text-center px-2">{player.player_avg_two_a}</TableCell>
                                    <TableCell className="text-center px-2">{player.player_avg_two_percentage}</TableCell>

                                </TableRow>
                            )
                        })}

                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell className="sticky left-0 bg-gray-50 z-10 pr-2 border-r-2 max-w-24">Total</TableCell>
                            <TableCell className="text-center px-2">{teamStats.avg_fgm}</TableCell>
                            <TableCell className="text-center px-2">{teamStats.avg_fga}</TableCell>
                            <TableCell className="text-center px-2">{teamStats.avg_fg_percentage}%</TableCell>
                            <TableCell className="text-center px-2">{teamStats.avg_tpm}</TableCell>
                            <TableCell className="text-center px-2">{teamStats.avg_tpa}</TableCell>
                            <TableCell className="text-center px-2">{teamStats.avg_tp_percentage}%</TableCell>
                            <TableCell className="text-center px-2">{teamStats.avg_ftm}</TableCell>
                            <TableCell className="text-center px-2">{teamStats.avg_fta}</TableCell>
                            <TableCell className="text-center px-2">{teamStats.avg_ft_percentage}</TableCell>
                            <TableCell className="text-center px-2">{(+teamStats.avg_fgm - +teamStats.avg_tpm).toFixed(1)}</TableCell>
                            <TableCell className="text-center px-2">{(+teamStats.avg_fga - +teamStats.avg_tpa).toFixed(1)}</TableCell>
                            <TableCell className="text-center px-2">{((+teamStats.avg_fgm - +teamStats.avg_tpm) / (+teamStats.avg_fga - +teamStats.avg_tpa) * 100).toFixed(1)}%</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            }
        </>
    )
}

export default TeamShootingStatsTableMobile