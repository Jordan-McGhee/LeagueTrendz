// type imports
import { SplitsTableProps } from "../../../../types"

// ui imports
import { Table, TableHeader, TableRow, TableCell, TableHead, TableBody } from "../../../ui/table"

const PlayerSplitsTable: React.FC<SplitsTableProps> = ({ data }) => {

    return (
        <Table className="text-xs mb-2">
            <TableHeader>
                <TableRow>
                    <TableHead>SPLIT</TableHead>
                    <TableHead>GP</TableHead>
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

                {/* overall */}
                <TableRow key='split_overall'>
                    <TableCell>2023-24 Season</TableCell>
                    <TableCell>{data?.overall_averages.gp}</TableCell>
                    <TableCell className="text-center">{data?.overall_averages.avg_minutes}</TableCell>
                    <TableCell className="text-center">{data?.overall_averages.avg_pts}</TableCell>
                    <TableCell className="text-center">{data?.overall_averages.avg_fgm}-{data?.overall_averages.avg_fga}</TableCell>
                    <TableCell className="text-center">{data?.overall_averages.avg_fg_percentage}%</TableCell>
                    <TableCell className="text-center">{data?.overall_averages.avg_tpm}-{data?.overall_averages.avg_tpa}</TableCell>
                    <TableCell className="text-center">{data?.overall_averages.avg_tp_percentage}%</TableCell>
                    <TableCell className="text-center">{data?.overall_averages.avg_ftm}-{data?.overall_averages.avg_fta}</TableCell>
                    <TableCell className="text-center">{data?.overall_averages.avg_ft_percentage}%</TableCell>
                    <TableCell className="text-center">{data?.overall_averages.avg_reb}</TableCell>
                    <TableCell className="text-center">{data?.overall_averages.avg_ast}</TableCell>
                    <TableCell className="text-center">{data?.overall_averages.avg_blk}</TableCell>
                    <TableCell className="text-center">{data?.overall_averages.avg_stl}</TableCell>
                    <TableCell className="text-center">{data?.overall_averages.avg_pf}</TableCell>
                    <TableCell className="text-center">{data?.overall_averages.avg_turnovers}</TableCell>
                </TableRow>

                {/* regular season */}
                <TableRow key='split_overall'>
                    <TableCell>Regular Season</TableCell>
                    <TableCell>{data?.regular_season_averages.gp}</TableCell>
                    <TableCell className="text-center">{data?.regular_season_averages.avg_minutes}</TableCell>
                    <TableCell className="text-center">{data?.regular_season_averages.avg_pts}</TableCell>
                    <TableCell className="text-center">{data?.regular_season_averages.avg_fgm}-{data?.overall_averages.avg_fga}</TableCell>
                    <TableCell className="text-center">{data?.regular_season_averages.avg_fg_percentage}%</TableCell>
                    <TableCell className="text-center">{data?.regular_season_averages.avg_tpm}-{data?.overall_averages.avg_tpa}</TableCell>
                    <TableCell className="text-center">{data?.regular_season_averages.avg_tp_percentage}%</TableCell>
                    <TableCell className="text-center">{data?.regular_season_averages.avg_ftm}-{data?.overall_averages.avg_fta}</TableCell>
                    <TableCell className="text-center">{data?.regular_season_averages.avg_ft_percentage}%</TableCell>
                    <TableCell className="text-center">{data?.regular_season_averages.avg_reb}</TableCell>
                    <TableCell className="text-center">{data?.regular_season_averages.avg_ast}</TableCell>
                    <TableCell className="text-center">{data?.regular_season_averages.avg_blk}</TableCell>
                    <TableCell className="text-center">{data?.regular_season_averages.avg_stl}</TableCell>
                    <TableCell className="text-center">{data?.regular_season_averages.avg_pf}</TableCell>
                    <TableCell className="text-center">{data?.regular_season_averages.avg_turnovers}</TableCell>
                </TableRow>

                {/* playoffs - check if they have more than 0 playoff gp */}
                {
                    (data?.postseason_averages.gp && data?.postseason_averages.gp > 0) ?
                    <TableRow key='split_overall'>
                        <TableCell>Playoffs</TableCell>
                        <TableCell>{data?.postseason_averages.gp}</TableCell>
                        <TableCell className="text-center">{data?.postseason_averages.avg_minutes}</TableCell>
                        <TableCell className="text-center">{data?.postseason_averages.avg_pts}</TableCell>
                        <TableCell className="text-center">{data?.postseason_averages.avg_fgm}-{data?.overall_averages.avg_fga}</TableCell>
                        <TableCell className="text-center">{data?.postseason_averages.avg_fg_percentage}%</TableCell>
                        <TableCell className="text-center">{data?.postseason_averages.avg_tpm}-{data?.overall_averages.avg_tpa}</TableCell>
                        <TableCell className="text-center">{data?.postseason_averages.avg_tp_percentage}%</TableCell>
                        <TableCell className="text-center">{data?.postseason_averages.avg_ftm}-{data?.overall_averages.avg_fta}</TableCell>
                        <TableCell className="text-center">{data?.postseason_averages.avg_ft_percentage}%</TableCell>
                        <TableCell className="text-center">{data?.postseason_averages.avg_reb}</TableCell>
                        <TableCell className="text-center">{data?.postseason_averages.avg_ast}</TableCell>
                        <TableCell className="text-center">{data?.postseason_averages.avg_blk}</TableCell>
                        <TableCell className="text-center">{data?.postseason_averages.avg_stl}</TableCell>
                        <TableCell className="text-center">{data?.postseason_averages.avg_pf}</TableCell>
                        <TableCell className="text-center">{data?.postseason_averages.avg_turnovers}</TableCell>
                    </TableRow> 
                    :
                    null
                }

                {/* home */}
                <TableRow key='split_overall'>
                    <TableCell>Home</TableCell>
                    <TableCell>{data?.home_averages.gp}</TableCell>
                    <TableCell className="text-center">{data?.home_averages.avg_minutes}</TableCell>
                    <TableCell className="text-center">{data?.home_averages.avg_pts}</TableCell>
                    <TableCell className="text-center">{data?.home_averages.avg_fgm}-{data?.home_averages.avg_fga}</TableCell>
                    <TableCell className="text-center">{data?.home_averages.avg_fg_percentage}%</TableCell>
                    <TableCell className="text-center">{data?.home_averages.avg_tpm}-{data?.home_averages.avg_tpa}</TableCell>
                    <TableCell className="text-center">{data?.home_averages.avg_tp_percentage}%</TableCell>
                    <TableCell className="text-center">{data?.home_averages.avg_ftm}-{data?.home_averages.avg_fta}</TableCell>
                    <TableCell className="text-center">{data?.home_averages.avg_ft_percentage}%</TableCell>
                    <TableCell className="text-center">{data?.home_averages.avg_reb}</TableCell>
                    <TableCell className="text-center">{data?.home_averages.avg_ast}</TableCell>
                    <TableCell className="text-center">{data?.home_averages.avg_blk}</TableCell>
                    <TableCell className="text-center">{data?.home_averages.avg_stl}</TableCell>
                    <TableCell className="text-center">{data?.home_averages.avg_pf}</TableCell>
                    <TableCell className="text-center">{data?.home_averages.avg_turnovers}</TableCell>
                </TableRow>

                {/* away */}
                <TableRow key='split_overall'>
                    <TableCell>Away</TableCell>
                    <TableCell>{data?.away_averages.gp}</TableCell>
                    <TableCell className="text-center">{data?.away_averages.avg_minutes}</TableCell>
                    <TableCell className="text-center">{data?.away_averages.avg_pts}</TableCell>
                    <TableCell className="text-center">{data?.away_averages.avg_fgm}-{data?.away_averages.avg_fga}</TableCell>
                    <TableCell className="text-center">{data?.away_averages.avg_fg_percentage}%</TableCell>
                    <TableCell className="text-center">{data?.away_averages.avg_tpm}-{data?.away_averages.avg_tpa}</TableCell>
                    <TableCell className="text-center">{data?.away_averages.avg_tp_percentage}%</TableCell>
                    <TableCell className="text-center">{data?.away_averages.avg_ftm}-{data?.away_averages.avg_fta}</TableCell>
                    <TableCell className="text-center">{data?.away_averages.avg_ft_percentage}%</TableCell>
                    <TableCell className="text-center">{data?.away_averages.avg_reb}</TableCell>
                    <TableCell className="text-center">{data?.away_averages.avg_ast}</TableCell>
                    <TableCell className="text-center">{data?.away_averages.avg_blk}</TableCell>
                    <TableCell className="text-center">{data?.away_averages.avg_stl}</TableCell>
                    <TableCell className="text-center">{data?.away_averages.avg_pf}</TableCell>
                    <TableCell className="text-center">{data?.away_averages.avg_turnovers}</TableCell>
                </TableRow>

                {/* conference */}
                <TableRow key='split_overall'>
                    <TableCell>Conference</TableCell>
                    <TableCell>{data?.conference_averages.gp}</TableCell>
                    <TableCell className="text-center">{data?.conference_averages.avg_minutes}</TableCell>
                    <TableCell className="text-center">{data?.conference_averages.avg_pts}</TableCell>
                    <TableCell className="text-center">{data?.conference_averages.avg_fgm}-{data?.conference_averages.avg_fga}</TableCell>
                    <TableCell className="text-center">{data?.conference_averages.avg_fg_percentage}%</TableCell>
                    <TableCell className="text-center">{data?.conference_averages.avg_tpm}-{data?.conference_averages.avg_tpa}</TableCell>
                    <TableCell className="text-center">{data?.conference_averages.avg_tp_percentage}%</TableCell>
                    <TableCell className="text-center">{data?.conference_averages.avg_ftm}-{data?.conference_averages.avg_fta}</TableCell>
                    <TableCell className="text-center">{data?.conference_averages.avg_ft_percentage}%</TableCell>
                    <TableCell className="text-center">{data?.conference_averages.avg_reb}</TableCell>
                    <TableCell className="text-center">{data?.conference_averages.avg_ast}</TableCell>
                    <TableCell className="text-center">{data?.conference_averages.avg_blk}</TableCell>
                    <TableCell className="text-center">{data?.conference_averages.avg_stl}</TableCell>
                    <TableCell className="text-center">{data?.conference_averages.avg_pf}</TableCell>
                    <TableCell className="text-center">{data?.conference_averages.avg_turnovers}</TableCell>
                </TableRow>

                {/* division */}
                <TableRow key='split_overall'>
                    <TableCell>Division</TableCell>
                    <TableCell>{data?.division_averages.gp}</TableCell>
                    <TableCell className="text-center">{data?.division_averages.avg_minutes}</TableCell>
                    <TableCell className="text-center">{data?.division_averages.avg_pts}</TableCell>
                    <TableCell className="text-center">{data?.division_averages.avg_fgm}-{data?.division_averages.avg_fga}</TableCell>
                    <TableCell className="text-center">{data?.division_averages.avg_fg_percentage}%</TableCell>
                    <TableCell className="text-center">{data?.division_averages.avg_tpm}-{data?.division_averages.avg_tpa}</TableCell>
                    <TableCell className="text-center">{data?.division_averages.avg_tp_percentage}%</TableCell>
                    <TableCell className="text-center">{data?.division_averages.avg_ftm}-{data?.division_averages.avg_fta}</TableCell>
                    <TableCell className="text-center">{data?.division_averages.avg_ft_percentage}%</TableCell>
                    <TableCell className="text-center">{data?.division_averages.avg_reb}</TableCell>
                    <TableCell className="text-center">{data?.division_averages.avg_ast}</TableCell>
                    <TableCell className="text-center">{data?.division_averages.avg_blk}</TableCell>
                    <TableCell className="text-center">{data?.division_averages.avg_stl}</TableCell>
                    <TableCell className="text-center">{data?.division_averages.avg_pf}</TableCell>
                    <TableCell className="text-center">{data?.division_averages.avg_turnovers}</TableCell>
                </TableRow>

                {/* wins */}
                <TableRow key='split_overall'>
                    <TableCell>Wins</TableCell>
                    <TableCell>{data?.win_averages.gp}</TableCell>
                    <TableCell className="text-center">{data?.win_averages.avg_minutes}</TableCell>
                    <TableCell className="text-center">{data?.win_averages.avg_pts}</TableCell>
                    <TableCell className="text-center">{data?.win_averages.avg_fgm}-{data?.win_averages.avg_fga}</TableCell>
                    <TableCell className="text-center">{data?.win_averages.avg_fg_percentage}%</TableCell>
                    <TableCell className="text-center">{data?.win_averages.avg_tpm}-{data?.win_averages.avg_tpa}</TableCell>
                    <TableCell className="text-center">{data?.win_averages.avg_tp_percentage}%</TableCell>
                    <TableCell className="text-center">{data?.win_averages.avg_ftm}-{data?.win_averages.avg_fta}</TableCell>
                    <TableCell className="text-center">{data?.win_averages.avg_ft_percentage}%</TableCell>
                    <TableCell className="text-center">{data?.win_averages.avg_reb}</TableCell>
                    <TableCell className="text-center">{data?.win_averages.avg_ast}</TableCell>
                    <TableCell className="text-center">{data?.win_averages.avg_blk}</TableCell>
                    <TableCell className="text-center">{data?.win_averages.avg_stl}</TableCell>
                    <TableCell className="text-center">{data?.win_averages.avg_pf}</TableCell>
                    <TableCell className="text-center">{data?.win_averages.avg_turnovers}</TableCell>
                </TableRow>

                {/* losses */}
                <TableRow key='split_overall'>
                    <TableCell>Losses</TableCell>
                    <TableCell>{data?.loss_averages.gp}</TableCell>
                    <TableCell className="text-center">{data?.loss_averages.avg_minutes}</TableCell>
                    <TableCell className="text-center">{data?.loss_averages.avg_pts}</TableCell>
                    <TableCell className="text-center">{data?.loss_averages.avg_fgm}-{data?.loss_averages.avg_fga}</TableCell>
                    <TableCell className="text-center">{data?.loss_averages.avg_fg_percentage}%</TableCell>
                    <TableCell className="text-center">{data?.loss_averages.avg_tpm}-{data?.loss_averages.avg_tpa}</TableCell>
                    <TableCell className="text-center">{data?.loss_averages.avg_tp_percentage}%</TableCell>
                    <TableCell className="text-center">{data?.loss_averages.avg_ftm}-{data?.loss_averages.avg_fta}</TableCell>
                    <TableCell className="text-center">{data?.loss_averages.avg_ft_percentage}%</TableCell>
                    <TableCell className="text-center">{data?.loss_averages.avg_reb}</TableCell>
                    <TableCell className="text-center">{data?.loss_averages.avg_ast}</TableCell>
                    <TableCell className="text-center">{data?.loss_averages.avg_blk}</TableCell>
                    <TableCell className="text-center">{data?.loss_averages.avg_stl}</TableCell>
                    <TableCell className="text-center">{data?.loss_averages.avg_pf}</TableCell>
                    <TableCell className="text-center">{data?.loss_averages.avg_turnovers}</TableCell>
                </TableRow>

            </TableBody>
        </Table>
    )
}

export default PlayerSplitsTable