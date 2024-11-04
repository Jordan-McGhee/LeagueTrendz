// type imports
import { OverviewSplitsTableProps } from "../../../../types"

// ui imports
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../../../ui/table"

const OverviewSplitsTable: React.FC<OverviewSplitsTableProps> = ({ splits, showHome, showWins, showConference, showDivision }) => {

    return (
        <div>
            <Table className="text-xs">
                <TableHeader>
                    <TableRow>
                        <TableHead>SPLITS</TableHead>
                        <TableHead className="text-center">GP</TableHead>
                        <TableHead className="text-center">PTS</TableHead>
                        <TableHead className="text-center">MIN</TableHead>
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

                    {/* home/away */}
                    {
                        showHome ?
                            (<TableRow>
                                <TableCell>HOME</TableCell>
                                <TableCell className="text-center">{splits.home_averages.gp}</TableCell>
                                <TableCell className="text-center">{splits.home_averages.avg_pts}</TableCell>
                                <TableCell className="text-center">{splits.home_averages.avg_minutes}</TableCell>
                                <TableCell className="text-center">{splits.home_averages.avg_fg_percentage || '00.0'}%</TableCell>
                                <TableCell className="text-center">{splits.home_averages.avg_tp_percentage || '00.0'}%</TableCell>
                                <TableCell className="text-center">{splits.home_averages.avg_ft_percentage || '00.0'}%</TableCell>
                                <TableCell className="text-center">{splits.home_averages.avg_reb}</TableCell>
                                <TableCell className="text-center">{splits.home_averages.avg_ast}</TableCell>
                                <TableCell className="text-center">{splits.home_averages.avg_blk}</TableCell>
                                <TableCell className="text-center">{splits.home_averages.avg_stl}</TableCell>
                                <TableCell className="text-center">{splits.home_averages.avg_pf}</TableCell>
                                <TableCell className="text-center">{splits.home_averages.avg_turnovers}</TableCell>
                            </TableRow>)
                            :
                            (<TableRow>
                                <TableCell>AWAY</TableCell>
                                <TableCell className="text-center">{splits.away_averages.gp}</TableCell>
                                <TableCell className="text-center">{splits.away_averages.avg_pts}</TableCell>
                                <TableCell className="text-center">{splits.away_averages.avg_minutes}</TableCell>
                                <TableCell className="text-center">{splits.away_averages.avg_fg_percentage || '00.0'}%</TableCell>
                                <TableCell className="text-center">{splits.away_averages.avg_tp_percentage || '00.0'}%</TableCell>
                                <TableCell className="text-center">{splits.away_averages.avg_ft_percentage || '00.0'}%</TableCell>
                                <TableCell className="text-center">{splits.away_averages.avg_reb}</TableCell>
                                <TableCell className="text-center">{splits.away_averages.avg_ast}</TableCell>
                                <TableCell className="text-center">{splits.away_averages.avg_blk}</TableCell>
                                <TableCell className="text-center">{splits.away_averages.avg_stl}</TableCell>
                                <TableCell className="text-center">{splits.away_averages.avg_pf}</TableCell>
                                <TableCell className="text-center">{splits.away_averages.avg_turnovers}</TableCell>
                            </TableRow>)
                    }

                    {/* wins/losses */}
                    {
                        showWins ?
                            (<TableRow>
                                <TableCell>WINS</TableCell>
                                <TableCell className="text-center">{splits.win_averages.gp}</TableCell>
                                <TableCell className="text-center">{splits.win_averages.avg_pts}</TableCell>
                                <TableCell className="text-center">{splits.win_averages.avg_minutes}</TableCell>
                                <TableCell className="text-center">{splits.win_averages.avg_fg_percentage || '00.0'}%</TableCell>
                                <TableCell className="text-center">{splits.win_averages.avg_tp_percentage || '00.0'}%</TableCell>
                                <TableCell className="text-center">{splits.win_averages.avg_ft_percentage || '00.0'}%</TableCell>
                                <TableCell className="text-center">{splits.win_averages.avg_reb}</TableCell>
                                <TableCell className="text-center">{splits.win_averages.avg_ast}</TableCell>
                                <TableCell className="text-center">{splits.win_averages.avg_blk}</TableCell>
                                <TableCell className="text-center">{splits.win_averages.avg_stl}</TableCell>
                                <TableCell className="text-center">{splits.win_averages.avg_pf}</TableCell>
                                <TableCell className="text-center">{splits.win_averages.avg_turnovers}</TableCell>
                            </TableRow>)
                            :
                            (<TableRow>
                                <TableCell>LOSSES</TableCell>
                                <TableCell className="text-center">{splits.loss_averages.gp}</TableCell>
                                <TableCell className="text-center">{splits.loss_averages.avg_pts}</TableCell>
                                <TableCell className="text-center">{splits.loss_averages.avg_minutes}</TableCell>
                                <TableCell className="text-center">{splits.loss_averages.avg_fg_percentage || '00.0'}%</TableCell>
                                <TableCell className="text-center">{splits.loss_averages.avg_tp_percentage || '00.0'}%</TableCell>
                                <TableCell className="text-center">{splits.loss_averages.avg_ft_percentage || '00.0'}%</TableCell>
                                <TableCell className="text-center">{splits.loss_averages.avg_reb}</TableCell>
                                <TableCell className="text-center">{splits.loss_averages.avg_ast}</TableCell>
                                <TableCell className="text-center">{splits.loss_averages.avg_blk}</TableCell>
                                <TableCell className="text-center">{splits.loss_averages.avg_stl}</TableCell>
                                <TableCell className="text-center">{splits.loss_averages.avg_pf}</TableCell>
                                <TableCell className="text-center">{splits.loss_averages.avg_turnovers}</TableCell>
                            </TableRow>)
                    }

                    {
                        showConference &&
                        (<TableRow>
                            <TableCell>CONFERENCE</TableCell>
                            <TableCell className="text-center">{splits.conference_averages.gp}</TableCell>
                            <TableCell className="text-center">{splits.conference_averages.avg_pts}</TableCell>
                            <TableCell className="text-center">{splits.conference_averages.avg_minutes}</TableCell>
                            <TableCell className="text-center">{splits.conference_averages.avg_fg_percentage || '00.0'}%</TableCell>
                            <TableCell className="text-center">{splits.conference_averages.avg_tp_percentage || '00.0'}%</TableCell>
                            <TableCell className="text-center">{splits.conference_averages.avg_ft_percentage || '00.0'}%</TableCell>
                            <TableCell className="text-center">{splits.conference_averages.avg_reb}</TableCell>
                            <TableCell className="text-center">{splits.conference_averages.avg_ast}</TableCell>
                            <TableCell className="text-center">{splits.conference_averages.avg_blk}</TableCell>
                            <TableCell className="text-center">{splits.conference_averages.avg_stl}</TableCell>
                            <TableCell className="text-center">{splits.conference_averages.avg_pf}</TableCell>
                            <TableCell className="text-center">{splits.conference_averages.avg_turnovers}</TableCell>
                        </TableRow>)
                    }

                    {
                        showDivision &&
                        (<TableRow>
                            <TableCell>DIVISION</TableCell>
                            <TableCell className="text-center">{splits.division_averages.gp}</TableCell>
                            <TableCell className="text-center">{splits.division_averages.avg_pts}</TableCell>
                            <TableCell className="text-center">{splits.division_averages.avg_minutes}</TableCell>
                            <TableCell className="text-center">{splits.division_averages.avg_fg_percentage || '00.0'}%</TableCell>
                            <TableCell className="text-center">{splits.division_averages.avg_tp_percentage || '00.0'}%</TableCell>
                            <TableCell className="text-center">{splits.division_averages.avg_ft_percentage || '00.0'}%</TableCell>
                            <TableCell className="text-center">{splits.division_averages.avg_reb}</TableCell>
                            <TableCell className="text-center">{splits.division_averages.avg_ast}</TableCell>
                            <TableCell className="text-center">{splits.division_averages.avg_blk}</TableCell>
                            <TableCell className="text-center">{splits.division_averages.avg_stl}</TableCell>
                            <TableCell className="text-center">{splits.division_averages.avg_pf}</TableCell>
                            <TableCell className="text-center">{splits.division_averages.avg_turnovers}</TableCell>
                        </TableRow>)
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell>2023-24 SEASON</TableCell>
                        <TableCell className="text-center">{splits.overall_averages.gp}</TableCell>
                        <TableCell className="text-center">{splits.overall_averages.avg_pts}</TableCell>
                        <TableCell className="text-center">{splits.overall_averages.avg_minutes}</TableCell>
                        <TableCell className="text-center">{splits.overall_averages.avg_fg_percentage || '00.0'}%</TableCell>
                        <TableCell className="text-center">{splits.overall_averages.avg_tp_percentage || '00.0'}%</TableCell>
                        <TableCell className="text-center">{splits.overall_averages.avg_ft_percentage || '00.0'}%</TableCell>
                        <TableCell className="text-center">{splits.overall_averages.avg_reb}</TableCell>
                        <TableCell className="text-center">{splits.overall_averages.avg_ast}</TableCell>
                        <TableCell className="text-center">{splits.overall_averages.avg_blk}</TableCell>
                        <TableCell className="text-center">{splits.overall_averages.avg_stl}</TableCell>
                        <TableCell className="text-center">{splits.overall_averages.avg_pf}</TableCell>
                        <TableCell className="text-center">{splits.overall_averages.avg_turnovers}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export default OverviewSplitsTable