// type imports
import { OverviewSplitsTableProps } from "../../../../types"

// ui imports
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../../../ui/table"

const OverviewSplitsTable: React.FC<OverviewSplitsTableProps> = ({ splits, showHome, showWins, showConference, showDivision }) => {

    console.log(splits)

    return (
        <div>
            <Table className="text-xs">
                <TableHeader>
                    <TableRow>
                        <TableHead>SPLITS</TableHead>
                        <TableHead>GP</TableHead>
                        <TableHead>PTS</TableHead>
                        <TableHead>MIN</TableHead>
                        <TableHead>FG%</TableHead>
                        <TableHead>3P%</TableHead>
                        <TableHead>FT%</TableHead>
                        <TableHead>REB</TableHead>
                        <TableHead>AST</TableHead>
                        <TableHead>BLK</TableHead>
                        <TableHead>STL</TableHead>
                        <TableHead>PF</TableHead>
                        <TableHead>TO</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {/* home/away */}
                    {
                        showHome ?
                            (<TableRow>
                                <TableCell>HOME</TableCell>
                                <TableCell>{splits.home_averages.gp}</TableCell>
                                <TableCell>{splits.home_averages.avg_pts}</TableCell>
                                <TableCell>{splits.home_averages.avg_minutes}</TableCell>
                                <TableCell>{splits.home_averages.avg_fg_percentage || '00.0'}%</TableCell>
                                <TableCell>{splits.home_averages.avg_tp_percentage || '00.0'}%</TableCell>
                                <TableCell>{splits.home_averages.avg_ft_percentage || '00.0'}%</TableCell>
                                <TableCell>{splits.home_averages.avg_reb}</TableCell>
                                <TableCell>{splits.home_averages.avg_ast}</TableCell>
                                <TableCell>{splits.home_averages.avg_blk}</TableCell>
                                <TableCell>{splits.home_averages.avg_stl}</TableCell>
                                <TableCell>{splits.home_averages.avg_pf}</TableCell>
                                <TableCell>{splits.home_averages.avg_turnovers}</TableCell>
                            </TableRow>)
                            :
                            (<TableRow>
                                <TableCell>ROAD</TableCell>
                                <TableCell>{splits.away_averages.gp}</TableCell>
                                <TableCell>{splits.away_averages.avg_pts}</TableCell>
                                <TableCell>{splits.away_averages.avg_minutes}</TableCell>
                                <TableCell>{splits.away_averages.avg_fg_percentage || '00.0'}%</TableCell>
                                <TableCell>{splits.away_averages.avg_tp_percentage || '00.0'}%</TableCell>
                                <TableCell>{splits.away_averages.avg_ft_percentage || '00.0'}%</TableCell>
                                <TableCell>{splits.away_averages.avg_reb}</TableCell>
                                <TableCell>{splits.away_averages.avg_ast}</TableCell>
                                <TableCell>{splits.away_averages.avg_blk}</TableCell>
                                <TableCell>{splits.away_averages.avg_stl}</TableCell>
                                <TableCell>{splits.away_averages.avg_pf}</TableCell>
                                <TableCell>{splits.away_averages.avg_turnovers}</TableCell>
                            </TableRow>)
                    }

                    {/* wins/losses */}
                    {
                        showWins ?
                            (<TableRow>
                                <TableCell>WINS</TableCell>
                                <TableCell>{splits.win_averages.gp}</TableCell>
                                <TableCell>{splits.win_averages.avg_pts}</TableCell>
                                <TableCell>{splits.win_averages.avg_minutes}</TableCell>
                                <TableCell>{splits.win_averages.avg_fg_percentage || '00.0'}%</TableCell>
                                <TableCell>{splits.win_averages.avg_tp_percentage || '00.0'}%</TableCell>
                                <TableCell>{splits.win_averages.avg_ft_percentage || '00.0'}%</TableCell>
                                <TableCell>{splits.win_averages.avg_reb}</TableCell>
                                <TableCell>{splits.win_averages.avg_ast}</TableCell>
                                <TableCell>{splits.win_averages.avg_blk}</TableCell>
                                <TableCell>{splits.win_averages.avg_stl}</TableCell>
                                <TableCell>{splits.win_averages.avg_pf}</TableCell>
                                <TableCell>{splits.win_averages.avg_turnovers}</TableCell>
                            </TableRow>)
                            :
                            (<TableRow>
                                <TableCell>LOSSES</TableCell>
                                <TableCell>{splits.loss_averages.gp}</TableCell>
                                <TableCell>{splits.loss_averages.avg_pts}</TableCell>
                                <TableCell>{splits.loss_averages.avg_minutes}</TableCell>
                                <TableCell>{splits.loss_averages.avg_fg_percentage || '00.0'}%</TableCell>
                                <TableCell>{splits.loss_averages.avg_tp_percentage || '00.0'}%</TableCell>
                                <TableCell>{splits.loss_averages.avg_ft_percentage || '00.0'}%</TableCell>
                                <TableCell>{splits.loss_averages.avg_reb}</TableCell>
                                <TableCell>{splits.loss_averages.avg_ast}</TableCell>
                                <TableCell>{splits.loss_averages.avg_blk}</TableCell>
                                <TableCell>{splits.loss_averages.avg_stl}</TableCell>
                                <TableCell>{splits.loss_averages.avg_pf}</TableCell>
                                <TableCell>{splits.loss_averages.avg_turnovers}</TableCell>
                            </TableRow>)
                    }

                    {
                        showConference &&
                        (<TableRow>
                            <TableCell>CONFERENCE</TableCell>
                            <TableCell>{splits.conference_averages.gp}</TableCell>
                            <TableCell>{splits.conference_averages.avg_pts}</TableCell>
                            <TableCell>{splits.conference_averages.avg_minutes}</TableCell>
                            <TableCell>{splits.conference_averages.avg_fg_percentage || '00.0'}%</TableCell>
                            <TableCell>{splits.conference_averages.avg_tp_percentage || '00.0'}%</TableCell>
                            <TableCell>{splits.conference_averages.avg_ft_percentage || '00.0'}%</TableCell>
                            <TableCell>{splits.conference_averages.avg_reb}</TableCell>
                            <TableCell>{splits.conference_averages.avg_ast}</TableCell>
                            <TableCell>{splits.conference_averages.avg_blk}</TableCell>
                            <TableCell>{splits.conference_averages.avg_stl}</TableCell>
                            <TableCell>{splits.conference_averages.avg_pf}</TableCell>
                            <TableCell>{splits.conference_averages.avg_turnovers}</TableCell>
                        </TableRow>)
                    }

                    {
                        showDivision &&
                        (<TableRow>
                            <TableCell>DIVISION</TableCell>
                            <TableCell>{splits.division_averages.gp}</TableCell>
                            <TableCell>{splits.division_averages.avg_pts}</TableCell>
                            <TableCell>{splits.division_averages.avg_minutes}</TableCell>
                            <TableCell>{splits.division_averages.avg_fg_percentage || '00.0'}%</TableCell>
                            <TableCell>{splits.division_averages.avg_tp_percentage || '00.0'}%</TableCell>
                            <TableCell>{splits.division_averages.avg_ft_percentage || '00.0'}%</TableCell>
                            <TableCell>{splits.division_averages.avg_reb}</TableCell>
                            <TableCell>{splits.division_averages.avg_ast}</TableCell>
                            <TableCell>{splits.division_averages.avg_blk}</TableCell>
                            <TableCell>{splits.division_averages.avg_stl}</TableCell>
                            <TableCell>{splits.division_averages.avg_pf}</TableCell>
                            <TableCell>{splits.division_averages.avg_turnovers}</TableCell>
                        </TableRow>)
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell>REGULAR SEASON</TableCell>
                        <TableCell>{splits.overall_averages.gp}</TableCell>
                        <TableCell>{splits.overall_averages.avg_pts}</TableCell>
                        <TableCell>{splits.overall_averages.avg_minutes}</TableCell>
                        <TableCell>{splits.overall_averages.avg_fg_percentage || '00.0'}%</TableCell>
                        <TableCell>{splits.overall_averages.avg_tp_percentage || '00.0'}%</TableCell>
                        <TableCell>{splits.overall_averages.avg_ft_percentage || '00.0'}%</TableCell>
                        <TableCell>{splits.overall_averages.avg_reb}</TableCell>
                        <TableCell>{splits.overall_averages.avg_ast}</TableCell>
                        <TableCell>{splits.overall_averages.avg_blk}</TableCell>
                        <TableCell>{splits.overall_averages.avg_stl}</TableCell>
                        <TableCell>{splits.overall_averages.avg_pf}</TableCell>
                        <TableCell>{splits.overall_averages.avg_turnovers}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export default OverviewSplitsTable