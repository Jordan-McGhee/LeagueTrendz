// type imports
import { OverviewSplitsTableProps } from "../../../../types"

// ui imports
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../../../ui/table"

const OverviewSplitsTableMobile: React.FC<OverviewSplitsTableProps> = ({ splits, showHome, showWins, showConference, showDivision }) => {

    return (
        <div>
            <Table className="text-xs">
                <TableHeader>
                    <TableRow>
                        <TableHead>SPLITS</TableHead>
                        <TableHead className="text-center px-1">GP</TableHead>
                        <TableHead className="text-center px-1">MIN</TableHead>
                        <TableHead className="text-center px-1">PTS</TableHead>
                        {/* <TableHead className="text-center px-1">FG%</TableHead> */}
                        {/* <TableHead className="text-center px-1">3P%</TableHead> */}
                        {/* <TableHead className="text-center">FT%</TableHead> */}
                        <TableHead className="text-center px-1">REB</TableHead>
                        <TableHead className="text-center px-1">AST</TableHead>
                        {/* <TableHead className="text-center px-1">BLK</TableHead> */}
                        {/* <TableHead className="text-center px-1">STL</TableHead> */}
                        {/* <TableHead className="text-center">PF</TableHead> */}
                        {/* <TableHead className="text-center">TO</TableHead> */}
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {/* home/away */}
                    {
                        showHome ?
                            (<TableRow>
                                <TableCell>HOME</TableCell>
                                <TableCell className="text-center">{splits.home_averages.gp}</TableCell>
                                <TableCell className="text-center">{splits.home_averages.avg_minutes}</TableCell>
                                <TableCell className="text-center">{splits.home_averages.avg_pts}</TableCell>
                                {/* <TableCell className="text-center">{splits.home_averages.avg_fg_percentage || '00.0'}%</TableCell> */}
                                {/* <TableCell className="text-center">{splits.home_averages.avg_tp_percentage || '00.0'}%</TableCell> */}
                                {/* <TableCell className="text-center">{splits.home_averages.avg_ft_percentage || '00.0'}%</TableCell> */}
                                <TableCell className="text-center">{splits.home_averages.avg_reb}</TableCell>
                                <TableCell className="text-center">{splits.home_averages.avg_ast}</TableCell>
                                {/* <TableCell className="text-center">{splits.home_averages.avg_blk}</TableCell> */}
                                {/* <TableCell className="text-center">{splits.home_averages.avg_stl}</TableCell> */}
                                {/* <TableCell className="text-center">{splits.home_averages.avg_pf}</TableCell> */}
                                {/* <TableCell className="text-center">{splits.home_averages.avg_turnovers}</TableCell> */}
                            </TableRow>)
                            :
                            (<TableRow>
                                <TableCell>AWAY</TableCell>
                                <TableCell className="text-center">{splits.away_averages.gp}</TableCell>
                                <TableCell className="text-center">{splits.away_averages.avg_minutes}</TableCell>
                                <TableCell className="text-center">{splits.away_averages.avg_pts}</TableCell>
                                {/* <TableCell className="text-center">{splits.away_averages.avg_fg_percentage || '00.0'}%</TableCell> */}
                                {/* <TableCell className="text-center">{splits.away_averages.avg_tp_percentage || '00.0'}%</TableCell> */}
                                {/* <TableCell className="text-center">{splits.away_averages.avg_ft_percentage || '00.0'}%</TableCell> */}
                                <TableCell className="text-center">{splits.away_averages.avg_reb}</TableCell>
                                <TableCell className="text-center">{splits.away_averages.avg_ast}</TableCell>
                                {/* <TableCell className="text-center">{splits.away_averages.avg_blk}</TableCell> */}
                                {/* <TableCell className="text-center">{splits.away_averages.avg_stl}</TableCell> */}
                                {/* <TableCell className="text-center">{splits.away_averages.avg_pf}</TableCell> */}
                                {/* <TableCell className="text-center">{splits.away_averages.avg_turnovers}</TableCell> */}
                            </TableRow>)
                    }

                    {/* wins/losses */}
                    {
                        showWins ?
                            (<TableRow>
                                <TableCell>WINS</TableCell>
                                <TableCell className="text-center">{splits.win_averages.gp}</TableCell>
                                <TableCell className="text-center">{splits.win_averages.avg_minutes}</TableCell>
                                <TableCell className="text-center">{splits.win_averages.avg_pts}</TableCell>
                                {/* <TableCell className="text-center">{splits.win_averages.avg_fg_percentage || '00.0'}%</TableCell> */}
                                {/* <TableCell className="text-center">{splits.win_averages.avg_tp_percentage || '00.0'}%</TableCell> */}
                                {/* <TableCell className="text-center">{splits.win_averages.avg_ft_percentage || '00.0'}%</TableCell> */}
                                <TableCell className="text-center">{splits.win_averages.avg_reb}</TableCell>
                                <TableCell className="text-center">{splits.win_averages.avg_ast}</TableCell>
                                {/* <TableCell className="text-center">{splits.win_averages.avg_blk}</TableCell> */}
                                {/* <TableCell className="text-center">{splits.win_averages.avg_stl}</TableCell> */}
                                {/* <TableCell className="text-center">{splits.win_averages.avg_pf}</TableCell> */}
                                {/* <TableCell className="text-center">{splits.win_averages.avg_turnovers}</TableCell> */}
                            </TableRow>)
                            :
                            (<TableRow>
                                <TableCell>LOSSES</TableCell>
                                <TableCell className="text-center">{splits.loss_averages.gp}</TableCell>
                                <TableCell className="text-center">{splits.loss_averages.avg_minutes}</TableCell>
                                <TableCell className="text-center">{splits.loss_averages.avg_pts}</TableCell>
                                {/* <TableCell className="text-center">{splits.loss_averages.avg_fg_percentage || '00.0'}%</TableCell> */}
                                {/* <TableCell className="text-center">{splits.loss_averages.avg_tp_percentage || '00.0'}%</TableCell> */}
                                {/* <TableCell className="text-center">{splits.loss_averages.avg_ft_percentage || '00.0'}%</TableCell> */}
                                <TableCell className="text-center">{splits.loss_averages.avg_reb}</TableCell>
                                <TableCell className="text-center">{splits.loss_averages.avg_ast}</TableCell>
                                {/* <TableCell className="text-center">{splits.loss_averages.avg_blk}</TableCell> */}
                                {/* <TableCell className="text-center">{splits.loss_averages.avg_stl}</TableCell> */}
                                {/* <TableCell className="text-center">{splits.loss_averages.avg_pf}</TableCell> */}
                                {/* <TableCell className="text-center">{splits.loss_averages.avg_turnovers}</TableCell> */}
                            </TableRow>)
                    }

                    {
                        showConference &&
                        (<TableRow>
                            <TableCell>CONF</TableCell>
                            <TableCell className="text-center">{splits.conference_averages.gp}</TableCell>
                            <TableCell className="text-center">{splits.conference_averages.avg_minutes}</TableCell>
                            <TableCell className="text-center">{splits.conference_averages.avg_pts}</TableCell>
                            {/* <TableCell className="text-center">{splits.conference_averages.avg_fg_percentage || '00.0'}%</TableCell> */}
                            {/* <TableCell className="text-center">{splits.conference_averages.avg_tp_percentage || '00.0'}%</TableCell> */}
                            {/* <TableCell className="text-center">{splits.conference_averages.avg_ft_percentage || '00.0'}%</TableCell> */}
                            <TableCell className="text-center">{splits.conference_averages.avg_reb}</TableCell>
                            <TableCell className="text-center">{splits.conference_averages.avg_ast}</TableCell>
                            {/* <TableCell className="text-center">{splits.conference_averages.avg_blk}</TableCell> */}
                            {/* <TableCell className="text-center">{splits.conference_averages.avg_stl}</TableCell> */}
                            {/* <TableCell className="text-center">{splits.conference_averages.avg_pf}</TableCell> */}
                            {/* <TableCell className="text-center">{splits.conference_averages.avg_turnovers}</TableCell> */}
                        </TableRow>)
                    }

                    {
                        showDivision &&
                        (<TableRow>
                            <TableCell>DIV</TableCell>
                            <TableCell className="text-center">{splits.division_averages.gp}</TableCell>
                            <TableCell className="text-center">{splits.division_averages.avg_minutes}</TableCell>
                            <TableCell className="text-center">{splits.division_averages.avg_pts}</TableCell>
                            {/* <TableCell className="text-center">{splits.division_averages.avg_fg_percentage || '00.0'}%</TableCell> */}
                            {/* <TableCell className="text-center">{splits.division_averages.avg_tp_percentage || '00.0'}%</TableCell> */}
                            {/* <TableCell className="text-center">{splits.division_averages.avg_ft_percentage || '00.0'}%</TableCell> */}
                            <TableCell className="text-center">{splits.division_averages.avg_reb}</TableCell>
                            <TableCell className="text-center">{splits.division_averages.avg_ast}</TableCell>
                            {/* <TableCell className="text-center">{splits.division_averages.avg_blk}</TableCell> */}
                            {/* <TableCell className="text-center">{splits.division_averages.avg_stl}</TableCell> */}
                            {/* <TableCell className="text-center">{splits.division_averages.avg_pf}</TableCell> */}
                            {/* <TableCell className="text-center">{splits.division_averages.avg_turnovers}</TableCell> */}
                        </TableRow>)
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell>'23-24</TableCell>
                        <TableCell className="text-center">{splits.overall_averages.gp}</TableCell>
                        <TableCell className="text-center">{splits.overall_averages.avg_minutes}</TableCell>
                        <TableCell className="text-center">{splits.overall_averages.avg_pts}</TableCell>
                        {/* <TableCell className="text-center">{splits.overall_averages.avg_fg_percentage || '00.0'}%</TableCell> */}
                        {/* <TableCell className="text-center">{splits.overall_averages.avg_tp_percentage || '00.0'}%</TableCell> */}
                        {/* <TableCell className="text-center">{splits.overall_averages.avg_ft_percentage || '00.0'}%</TableCell> */}
                        <TableCell className="text-center">{splits.overall_averages.avg_reb}</TableCell>
                        <TableCell className="text-center">{splits.overall_averages.avg_ast}</TableCell>
                        {/* <TableCell className="text-center">{splits.overall_averages.avg_blk}</TableCell> */}
                        {/* <TableCell className="text-center">{splits.overall_averages.avg_stl}</TableCell> */}
                        {/* <TableCell className="text-center">{splits.overall_averages.avg_pf}</TableCell> */}
                        {/* <TableCell className="text-center">{splits.overall_averages.avg_turnovers}</TableCell> */}
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export default OverviewSplitsTableMobile