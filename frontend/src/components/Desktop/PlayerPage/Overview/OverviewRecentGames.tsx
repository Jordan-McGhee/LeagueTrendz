import React from "react"
import { Link } from "react-router-dom"

// type import
import { OverviewRecentGamesProps } from "../../../../types"

// utils import
import { convertDateGameLog } from "../../../../Utils/utils"

// ui imports
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card"
import TeamLogo from "../../../ui/TeamLogo"

const OverviewRecentGames: React.FC<OverviewRecentGamesProps> = ({ player, games }) => {

    // name for url navigation for menubar
    const urlName: string | undefined = player?.name.toLowerCase().replace(" ", "-")

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between">
                        <p>Recent Games</p>
                        <Link to={`/nba/players/id/${player.player_id}/${urlName}?view=log`} className="text-blue-500">
                            See Game Log
                        </Link>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table className="text-xs">
                    <TableHeader>
                        <TableRow>
                            <TableHead>DATE</TableHead>
                            <TableHead>OPP</TableHead>
                            <TableHead>RESULT</TableHead>
                            <TableHead className="text-center">MIN</TableHead>
                            <TableHead className="text-center">PTS</TableHead>
                            <TableHead className="text-center">FG%</TableHead>
                            <TableHead className="text-center">3P%</TableHead>
                            <TableHead className="text-center">FT%</TableHead>
                            <TableHead className="text-center">REB</TableHead>
                            <TableHead className="text-center">AST</TableHead>
                            <TableHead className="text-center">BLK</TableHead>
                            <TableHead className="text-center">STL</TableHead>
                            <TableHead className="text-center">PF</TableHead>
                            <TableHead className="text-center">TO</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            games.map((item) => {

                                return (
                                    <TableRow key={item.game_id}>
                                        <TableCell>{convertDateGameLog(item.day_of_week, item.game_date.split("T")[0])}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-x-1 items-center">
                                                {item.game_location === "HOME" ? <p>VS</p> : <p>@</p>}
                                                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${item.opp_team_abbreviation.toLowerCase()}?view=home`} className="flex items-center gap-x-1 hover:underline hover:font-semibold">
                                                    <TeamLogo team_id={item.opp_team_id} abbreviation={item.opp_team_abbreviation} logoClass="size-5 object-contain" />
                                                    <p>{item.opp_team_abbreviation}</p>
                                                </Link>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Link to={`/nba/games/game_id/${item.game_id}?view=team-stats`} className="hover:underline">
                                                <div className="flex items-center gap-x-1">
                                                    {item.game_result === "W" ? <span className="text-green-700">W</span> : <span className="text-red-700">L</span>}

                                                    {item.game_result === "W" ? <p>{item.player_team_score} - {item.opp_team_score}</p> : <p>{item.opp_team_score} - {item.player_team_score}</p>}
                                                </div>
                                            </Link>
                                        </TableCell>
                                        <TableCell className="text-center">{item.minutes}</TableCell>
                                        <TableCell className="text-center">{item.pts}</TableCell>
                                        <TableCell className="text-center">{item.fg_percentage}%</TableCell>
                                        <TableCell className="text-center">{item.tp_percentage}%</TableCell>
                                        <TableCell className="text-center">{item.ft_percentage}%</TableCell>
                                        <TableCell className="text-center">{item.reb}</TableCell>
                                        <TableCell className="text-center">{item.ast}</TableCell>
                                        <TableCell className="text-center">{item.blk}</TableCell>
                                        <TableCell className="text-center">{item.stl}</TableCell>
                                        <TableCell className="text-center">{item.pf}</TableCell>
                                        <TableCell className="text-center">{item.turnovers}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default OverviewRecentGames