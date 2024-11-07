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
                    <TableHead className="sticky left-0 bg-white z-20 min-w-[60px] pl-1 pr-2">DATE</TableHead>
                    <TableHead className="px-4 md:px-0">OPP</TableHead>
                    <TableHead className="px-4 md:px-0">RESULT</TableHead>
                    <TableHead className="text-center px-2 md:px-0">MIN</TableHead>
                    <TableHead className="text-center px-2 md:px-0">PTS</TableHead>
                    <TableHead className="text-center px-2 md:px-0 truncate">FGM-FGA</TableHead>
                    <TableHead className="text-center px-2 md:px-0">FG%</TableHead>
                    <TableHead className="text-center px-2 md:px-0 truncate">3PM-3PA</TableHead>
                    <TableHead className="text-center px-2 md:px-0">3P%</TableHead>
                    <TableHead className="text-center px-2 md:px-0 truncate">FTM-FTA</TableHead>
                    <TableHead className="text-center px-2 md:px-0">FT%</TableHead>
                    <TableHead className="text-center px-2 md:px-0">REB</TableHead>
                    <TableHead className="text-center px-2 md:px-0">AST</TableHead>
                    <TableHead className="text-center px-2 md:px-0">BLK</TableHead>
                    <TableHead className="text-center px-2 md:px-0">STL</TableHead>
                    <TableHead className="text-center px-2 md:px-0">PF</TableHead>
                    <TableHead className="text-center px-2 md:px-0">TO</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    games.map((item) => {

                        return (
                            <TableRow key={item.game_id}>
                                <TableCell className="sticky left-0 bg-white z-20 min-w-[60px] w-fit truncate pl-1 pr-2">{convertDateGameLog(item.day_of_week, item.game_date)}</TableCell>
                                <TableCell className="px-4">
                                    <div className="flex gap-x-1 items-center">
                                        {item.game_location === "HOME" ? <p>vs</p> : <p>@</p>}
                                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${item.opp_team_abbreviation.toLowerCase()}?view=home`} className="flex items-center gap-x-1 hover:underline hover:font-semibold">
                                            <TeamLogo team_id={item.opp_team_id} abbreviation={item.opp_team_abbreviation} logoClass="size-5 object-contain" />
                                            <p>{item.opp_team_abbreviation}</p>
                                        </Link>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 truncate">
                                    <Link to={`/nba/games/game_id/${item.game_id}?view=team-stats`} className="hover:underline">
                                        <div className="flex items-center gap-x-1">
                                            {item.game_result === "W" ? <span className="text-green-700">W</span> : <span className="text-red-700">L</span>}

                                            {item.game_result === "W" ? <p>{item.player_team_score} - {item.opp_team_score}</p> : <p>{item.opp_team_score} - {item.player_team_score}</p>}
                                        </div>
                                    </Link>
                                </TableCell>
                                <TableCell className="text-center px-1 md:px-0">{item.minutes}</TableCell>
                                <TableCell className="text-center px-1 md:px-0">{item.pts}</TableCell>
                                <TableCell className="text-center px-1 md:px-0">{item.fgm}-{item.fga}</TableCell>
                                <TableCell className="text-center px-1 md:px-0">{item.fg_percentage}%</TableCell>
                                <TableCell className="text-center px-1 md:px-0">{item.tpm}-{item.tpa}</TableCell>
                                <TableCell className="text-center px-1 md:px-0">{item.tp_percentage}%</TableCell>
                                <TableCell className="text-center px-1 md:px-0">{item.ftm}-{item.fta}</TableCell>
                                <TableCell className="text-center px-1 md:px-0">{item.ft_percentage}%</TableCell>
                                <TableCell className="text-center px-1 md:px-0">{item.reb}</TableCell>
                                <TableCell className="text-center px-1 md:px-0">{item.ast}</TableCell>
                                <TableCell className="text-center px-1 md:px-0">{item.blk}</TableCell>
                                <TableCell className="text-center px-1 md:px-0">{item.stl}</TableCell>
                                <TableCell className="text-center px-1 md:px-0">{item.pf}</TableCell>
                                <TableCell className="text-center px-1 md:px-0">{item.turnovers}</TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
            <TableFooter>
                <TableRow className="font-bold">
                    <TableCell className="sticky left-0 bg-slate-50 z-20 min-w-[60px]">{ convertNumberToFullMonth(month)}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-center px-1 md:px-0">{avg_stats.avg_minutes}</TableCell>
                    <TableCell className="text-center px-1 md:px-0">{avg_stats.avg_pts}</TableCell>
                    <TableCell className="text-center px-1 md:px-0">{avg_stats.avg_fgm}-{avg_stats.avg_fga}</TableCell>
                    <TableCell className="text-center px-1 md:px-0">{avg_stats.avg_fg_percentage}%</TableCell>
                    <TableCell className="text-center px-1 md:px-0">{avg_stats.avg_tpm}-{avg_stats.avg_tpa}</TableCell>
                    <TableCell className="text-center px-1 md:px-0">{avg_stats.avg_tp_percentage}%</TableCell>
                    <TableCell className="text-center px-1 md:px-0">{avg_stats.avg_ftm}-{avg_stats.avg_fta}</TableCell>
                    <TableCell className="text-center px-1 md:px-0">{avg_stats.avg_ft_percentage}%</TableCell>
                    <TableCell className="text-center px-1 md:px-0">{avg_stats.avg_reb}</TableCell>
                    <TableCell className="text-center px-1 md:px-0">{avg_stats.avg_ast}</TableCell>
                    <TableCell className="text-center px-1 md:px-0">{avg_stats.avg_blk}</TableCell>
                    <TableCell className="text-center px-1 md:px-0">{avg_stats.avg_stl}</TableCell>
                    <TableCell className="text-center px-1 md:px-0">{avg_stats.avg_pf}</TableCell>
                    <TableCell className="text-center px-1 md:px-0">{avg_stats.avg_turnovers}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default PlayerGameLogTable