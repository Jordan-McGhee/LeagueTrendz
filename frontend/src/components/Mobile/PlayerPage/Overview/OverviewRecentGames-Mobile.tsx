import React, { useState } from "react"
import { Link } from "react-router-dom"

// type import
import { OverviewRecentGamesProps } from "../../../../types"

// utils import
import { convertDateGameLog } from "../../../../Utils/utils"

// ui imports
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../ui/card"
import TeamLogo from "../../../ui/TeamLogo"
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";

const OverviewRecentGamesMobile: React.FC<OverviewRecentGamesProps> = ({ player, games }) => {
    const urlName: string | undefined = player?.name.toLowerCase().replace(" ", "-")

    const [showContent, setShowContent] = useState<Boolean>(true)

    const toggleShowContent = () => {
        setShowContent(!showContent)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between">
                    Recent Games

                    <div onClick={() => toggleShowContent()} className="md:hidden flex gap-x-2 items-center">
                        <p className="text-sm">{showContent ? "Hide" : "Show"}</p>
                        {showContent ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
                    </div>
                </CardTitle>
            </CardHeader>

            {
                showContent &&
                <>
                    <CardContent className="">
                        <div className="overflow-x-auto relative">
                            <Table className="text-xs">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="sticky left-0 z-20 bg-white border-r w-fit px-2">DATE</TableHead>
                                        <TableHead className="px-2">OPP</TableHead>
                                        <TableHead className="px-6 text-center">RESULT</TableHead>
                                        <TableHead className="text-center px-2">MIN</TableHead>
                                        <TableHead className="text-center px-2">PTS</TableHead>
                                        <TableHead className="text-center px-2">FG%</TableHead>
                                        <TableHead className="text-center px-2">3P%</TableHead>
                                        <TableHead className="text-center px-2">FT%</TableHead>
                                        <TableHead className="text-center px-2">REB</TableHead>
                                        <TableHead className="text-center px-2">AST</TableHead>
                                        <TableHead className="text-center px-2">BLK</TableHead>
                                        <TableHead className="text-center px-2">STL</TableHead>
                                        <TableHead className="text-center px-2">PF</TableHead>
                                        <TableHead className="text-center px-2">TO</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {games.map((item) => (
                                        <TableRow key={item.game_id}>
                                            <TableCell className="sticky left-0 z-10 bg-white border-r whitespace-nowrap w-fit px-2">
                                                {convertDateGameLog(item.day_of_week, item.game_date.split("T")[0])}
                                            </TableCell>
                                            <TableCell className="whitespace-nowrap w-fit px-2">
                                                <div className="flex gap-x-1 items-center">
                                                    {item.game_location === "HOME" ? <p>vs</p> : <p>@</p>}
                                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${item.opp_team_abbreviation.toLowerCase()}?view=home`} className="flex items-center gap-x-1 hover:underline hover:font-semibold">
                                                        <TeamLogo team_id={item.opp_team_id} abbreviation={item.opp_team_abbreviation} logoClass="size-5 object-contain" />
                                                        <p>{item.opp_team_abbreviation}</p>
                                                    </Link>
                                                </div>
                                            </TableCell>
                                            <TableCell className="w-fit pl-6 text-center">
                                                <Link to={`/nba/games/game_id/${item.game_id}?view=team-stats`} className="hover:underline whitespace-nowrap">
                                                    <div className="flex items-center gap-x-1">
                                                        {item.game_result === "W" ? <span className="text-green-700">W</span> : <span className="text-red-700">L</span>}
                                                        {item.game_result === "W" ? <p className="text-blue-500">{item.player_team_score} - {item.opp_team_score}</p> : <p className="text-blue-500">{item.opp_team_score} - {item.player_team_score}</p>}
                                                    </div>
                                                </Link>
                                            </TableCell>
                                            <TableCell className="text-center px-2">{item.minutes}</TableCell>
                                            <TableCell className="text-center px-2">{item.pts}</TableCell>
                                            <TableCell className="text-center px-2">{item.fg_percentage}%</TableCell>
                                            <TableCell className="text-center px-2">{item.tp_percentage}%</TableCell>
                                            <TableCell className="text-center px-2">{item.ft_percentage}%</TableCell>
                                            <TableCell className="text-center px-2">{item.reb}</TableCell>
                                            <TableCell className="text-center px-2">{item.ast}</TableCell>
                                            <TableCell className="text-center px-2">{item.blk}</TableCell>
                                            <TableCell className="text-center px-2">{item.stl}</TableCell>
                                            <TableCell className="text-center px-2">{item.pf}</TableCell>
                                            <TableCell className="text-center px-2">{item.turnovers}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>

                    <CardFooter className="justify-center mt-1 -mb-1">
                        <Link to={`/nba/players/id/${player.player_id}/${urlName}?view=log`} className="font-semibold text-blue-500">
                            See Game Log
                        </Link>
                    </CardFooter>
                </>
            }
        </Card>
    )
}

export default OverviewRecentGamesMobile