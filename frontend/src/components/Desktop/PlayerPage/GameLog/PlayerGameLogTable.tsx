import { Link } from "react-router-dom"

// type imports
import { PlayerGameLogProps } from "../../../../types"

// utils import
import { convertDateGameLog, convertNumberToFullMonth } from "../../../../Utils/utils"

// ui imports
import { Table, TableHeader, TableRow, TableCell, TableHead, TableFooter, TableBody } from "../../../ui/table"

// component imports
import TeamLogo from "../../../ui/TeamLogo"

const PlayerGameLogTable: React.FC<PlayerGameLogProps> = ({ month, games, avg_stats }) => {

    return (
        <Table className="text-xs mb-2">
            <TableHeader>
                <TableRow>
                    <TableHead>DATE</TableHead>
                    <TableHead>OPP</TableHead>
                    <TableHead>RESULT</TableHead>
                    <TableHead className="text-center">MIN</TableHead>
                    <TableHead className="text-center">PTS</TableHead>
                    <TableHead className="text-center">FG</TableHead>
                    <TableHead className="text-center">FG%</TableHead>
                    <TableHead className="text-center">3P</TableHead>
                    <TableHead className="text-center">3P%</TableHead>
                    <TableHead className="text-center">FT</TableHead>
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
                                <TableCell>{convertDateGameLog(item.day_of_week, item.game_date)}</TableCell>
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
                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${item.opp_team_abbreviation.toLowerCase()}`}>
                                        <div className="flex items-center gap-x-1">
                                            {item.game_result === "W" ? <span className="text-green-700">W</span> : <span className="text-red-700">L</span>}

                                            {item.game_result === "W" ? <p>{item.player_team_score} - {item.opp_team_score}</p> : <p>{item.opp_team_score} - {item.player_team_score}</p>}
                                        </div>
                                    </Link>
                                </TableCell>
                                <TableCell className="text-center">{item.minutes}</TableCell>
                                <TableCell className="text-center">{item.pts}</TableCell>
                                <TableCell className="text-center">{item.fgm}-{item.fga}</TableCell>
                                <TableCell className="text-center">{item.fg_percentage}%</TableCell>
                                <TableCell className="text-center">{item.tpm}-{item.tpa}</TableCell>
                                <TableCell className="text-center">{item.tp_percentage}%</TableCell>
                                <TableCell className="text-center">{item.fgm}-{item.fga}</TableCell>
                                <TableCell className="text-center">{item.fg_percentage}%</TableCell>
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
            <TableFooter>
                <TableRow className="font-bold">
                    <TableCell colSpan={3}>{ convertNumberToFullMonth(month)}</TableCell>
                    <TableCell className="text-center">{avg_stats.avg_minutes}</TableCell>
                    <TableCell className="text-center">{avg_stats.avg_pts}</TableCell>
                    <TableCell className="text-center">{avg_stats.avg_fgm}-{avg_stats.avg_fga}</TableCell>
                    <TableCell className="text-center">{avg_stats.avg_fg_percentage}%</TableCell>
                    <TableCell className="text-center">{avg_stats.avg_tpm}-{avg_stats.avg_tpa}</TableCell>
                    <TableCell className="text-center">{avg_stats.avg_tp_percentage}%</TableCell>
                    <TableCell className="text-center">{avg_stats.avg_ftm}-{avg_stats.avg_fta}</TableCell>
                    <TableCell className="text-center">{avg_stats.avg_ft_percentage}%</TableCell>
                    <TableCell className="text-center">{avg_stats.avg_reb}</TableCell>
                    <TableCell className="text-center">{avg_stats.avg_ast}</TableCell>
                    <TableCell className="text-center">{avg_stats.avg_blk}</TableCell>
                    <TableCell className="text-center">{avg_stats.avg_stl}</TableCell>
                    <TableCell className="text-center">{avg_stats.avg_pf}</TableCell>
                    <TableCell className="text-center">{avg_stats.avg_turnovers}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default PlayerGameLogTable