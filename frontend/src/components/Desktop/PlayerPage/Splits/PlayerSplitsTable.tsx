// type imports
import { SplitsTableProps } from "../../../../types"

// ui imports
import { Table, TableHeader, TableRow, TableCell, TableHead, TableBody } from "../../../ui/table"

const PlayerSplitsTable: React.FC<SplitsTableProps> = ({ data, className }) => {

    return (
        <Table className={`${className} w-full`}>
            <TableHeader>
                <TableRow>
                    <TableHead className="sticky left-0 bg-white z-20 min-w-[110px]">SPLIT</TableHead>
                    <TableHead className="px-2 md:px-0">GP</TableHead>
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
                {/* overall */}
                <TableRow key="split_overall">
                    <TableCell className="sticky left-0 bg-white z-20 font-medium">'23-24</TableCell>
                    <TableCell className="px-2 md:px-0">{data?.overall_averages.gp}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.overall_averages.avg_minutes}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.overall_averages.avg_pts}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.overall_averages.avg_fgm}-{data?.overall_averages.avg_fga}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.overall_averages.avg_fg_percentage}%</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.overall_averages.avg_tpm}-{data?.overall_averages.avg_tpa}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.overall_averages.avg_tp_percentage}%</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.overall_averages.avg_ftm}-{data?.overall_averages.avg_fta}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.overall_averages.avg_ft_percentage}%</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.overall_averages.avg_reb}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.overall_averages.avg_ast}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.overall_averages.avg_blk}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.overall_averages.avg_stl}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.overall_averages.avg_pf}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.overall_averages.avg_turnovers}</TableCell>
                </TableRow>

                {/* regular season */}
                <TableRow key="split_regular">
                    <TableCell className="sticky left-0 bg-white z-20 font-medium">Regular Season</TableCell>
                    <TableCell className="px-2 md:px-0">{data?.regular_season_averages.gp}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.regular_season_averages.avg_minutes}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.regular_season_averages.avg_pts}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.regular_season_averages.avg_fgm}-{data?.regular_season_averages.avg_fga}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.regular_season_averages.avg_fg_percentage}%</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.regular_season_averages.avg_tpm}-{data?.regular_season_averages.avg_tpa}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.regular_season_averages.avg_tp_percentage}%</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.regular_season_averages.avg_ftm}-{data?.regular_season_averages.avg_fta}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.regular_season_averages.avg_ft_percentage}%</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.regular_season_averages.avg_reb}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.regular_season_averages.avg_ast}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.regular_season_averages.avg_blk}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.regular_season_averages.avg_stl}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.regular_season_averages.avg_pf}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.regular_season_averages.avg_turnovers}</TableCell>
                </TableRow>

                {/* playoffs */}
                {(data?.postseason_averages.gp && data?.postseason_averages.gp > 0) ? (
                    <TableRow key="split_playoffs">
                        <TableCell className="sticky left-0 bg-white z-20 font-medium">Playoffs</TableCell>
                        <TableCell className="px-2 md:px-0">{data?.postseason_averages.gp}</TableCell>
                        <TableCell className="text-center px-2 md:px-0">{data?.postseason_averages.avg_minutes}</TableCell>
                        <TableCell className="text-center px-2 md:px-0">{data?.postseason_averages.avg_pts}</TableCell>
                        <TableCell className="text-center px-2 md:px-0">{data?.postseason_averages.avg_fgm}-{data?.postseason_averages.avg_fga}</TableCell>
                        <TableCell className="text-center px-2 md:px-0">{data?.postseason_averages.avg_fg_percentage}%</TableCell>
                        <TableCell className="text-center px-2 md:px-0">{data?.postseason_averages.avg_tpm}-{data?.postseason_averages.avg_tpa}</TableCell>
                        <TableCell className="text-center px-2 md:px-0">{data?.postseason_averages.avg_tp_percentage}%</TableCell>
                        <TableCell className="text-center px-2 md:px-0">{data?.postseason_averages.avg_ftm}-{data?.postseason_averages.avg_fta}</TableCell>
                        <TableCell className="text-center px-2 md:px-0">{data?.postseason_averages.avg_ft_percentage}%</TableCell>
                        <TableCell className="text-center px-2 md:px-0">{data?.postseason_averages.avg_reb}</TableCell>
                        <TableCell className="text-center px-2 md:px-0">{data?.postseason_averages.avg_ast}</TableCell>
                        <TableCell className="text-center px-2 md:px-0">{data?.postseason_averages.avg_blk}</TableCell>
                        <TableCell className="text-center px-2 md:px-0">{data?.postseason_averages.avg_stl}</TableCell>
                        <TableCell className="text-center px-2 md:px-0">{data?.postseason_averages.avg_pf}</TableCell>
                        <TableCell className="text-center px-2 md:px-0">{data?.postseason_averages.avg_turnovers}</TableCell>
                    </TableRow>
                ) : null}

                {/* home */}
                <TableRow key="split_home">
                    <TableCell className="sticky left-0 bg-white z-20 font-medium">Home</TableCell>
                    <TableCell className="px-2 md:px-0">{data?.home_averages.gp}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.home_averages.avg_minutes}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.home_averages.avg_pts}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.home_averages.avg_fgm}-{data?.home_averages.avg_fga}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.home_averages.avg_fg_percentage}%</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.home_averages.avg_tpm}-{data?.home_averages.avg_tpa}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.home_averages.avg_tp_percentage}%</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.home_averages.avg_ftm}-{data?.home_averages.avg_fta}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.home_averages.avg_ft_percentage}%</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.home_averages.avg_reb}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.home_averages.avg_ast}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.home_averages.avg_blk}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.home_averages.avg_stl}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.home_averages.avg_pf}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.home_averages.avg_turnovers}</TableCell>
                </TableRow>

                {/* away */}
                <TableRow key="split_away">
                    <TableCell className="sticky left-0 bg-white z-20 font-medium">Away</TableCell>
                    <TableCell className="px-2 md:px-0">{data?.away_averages.gp}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.away_averages.avg_minutes}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.away_averages.avg_pts}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.away_averages.avg_fgm}-{data?.away_averages.avg_fga}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.away_averages.avg_fg_percentage}%</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.away_averages.avg_tpm}-{data?.away_averages.avg_tpa}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.away_averages.avg_tp_percentage}%</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.away_averages.avg_ftm}-{data?.away_averages.avg_fta}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.away_averages.avg_ft_percentage}%</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.away_averages.avg_reb}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.away_averages.avg_ast}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.away_averages.avg_blk}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.away_averages.avg_stl}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.away_averages.avg_pf}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.away_averages.avg_turnovers}</TableCell>
                </TableRow>

                {/* conference */}
                <TableRow key='split_conference'>
                    <TableCell className="sticky left-0 bg-white z-20 font-medium">Conference</TableCell>
                    <TableCell>{data?.conference_averages.gp}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.conference_averages.avg_minutes}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.conference_averages.avg_pts}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.conference_averages.avg_fgm}-{data?.conference_averages.avg_fga}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.conference_averages.avg_fg_percentage}%</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.conference_averages.avg_tpm}-{data?.conference_averages.avg_tpa}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.conference_averages.avg_tp_percentage}%</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.conference_averages.avg_ftm}-{data?.conference_averages.avg_fta}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.conference_averages.avg_ft_percentage}%</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.conference_averages.avg_reb}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.conference_averages.avg_ast}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.conference_averages.avg_blk}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.conference_averages.avg_stl}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.conference_averages.avg_pf}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.conference_averages.avg_turnovers}</TableCell>
                </TableRow>

                {/* division */}
                <TableRow key='split_division'>
                    <TableCell className="sticky left-0 bg-white z-20 font-medium">Division</TableCell>
                    <TableCell>{data?.division_averages.gp}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.division_averages.avg_minutes}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.division_averages.avg_pts}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.division_averages.avg_fgm}-{data?.division_averages.avg_fga}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.division_averages.avg_fg_percentage}%</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.division_averages.avg_tpm}-{data?.division_averages.avg_tpa}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.division_averages.avg_tp_percentage}%</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.division_averages.avg_ftm}-{data?.division_averages.avg_fta}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.division_averages.avg_ft_percentage}%</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.division_averages.avg_reb}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.division_averages.avg_ast}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.division_averages.avg_blk}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.division_averages.avg_stl}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.division_averages.avg_pf}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.division_averages.avg_turnovers}</TableCell>
                </TableRow>

                {/* wins */}
                <TableRow key='split_wins'>
                    <TableCell className="sticky left-0 bg-white z-20 font-medium">Wins</TableCell>
                    <TableCell>{data?.win_averages.gp}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.win_averages.avg_minutes}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.win_averages.avg_pts}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.win_averages.avg_fgm}-{data?.win_averages.avg_fga}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.win_averages.avg_fg_percentage}%</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.win_averages.avg_tpm}-{data?.win_averages.avg_tpa}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.win_averages.avg_tp_percentage}%</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.win_averages.avg_ftm}-{data?.win_averages.avg_fta}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.win_averages.avg_ft_percentage}%</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.win_averages.avg_reb}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.win_averages.avg_ast}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.win_averages.avg_blk}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.win_averages.avg_stl}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.win_averages.avg_pf}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.win_averages.avg_turnovers}</TableCell>
                </TableRow>

                {/* losses */}
                <TableRow key='split_losses'>
                    <TableCell className="sticky left-0 bg-white z-20 font-medium">Losses</TableCell>
                    <TableCell>{data?.loss_averages.gp}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.loss_averages.avg_minutes}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.loss_averages.avg_pts}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.loss_averages.avg_fgm}-{data?.loss_averages.avg_fga}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.loss_averages.avg_fg_percentage}%</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.loss_averages.avg_tpm}-{data?.loss_averages.avg_tpa}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.loss_averages.avg_tp_percentage}%</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.loss_averages.avg_ftm}-{data?.loss_averages.avg_fta}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.loss_averages.avg_ft_percentage}%</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.loss_averages.avg_reb}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.loss_averages.avg_ast}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.loss_averages.avg_blk}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.loss_averages.avg_stl}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.loss_averages.avg_pf}</TableCell>
                    <TableCell className="text-center px-2 md:px-0">{data?.loss_averages.avg_turnovers}</TableCell>
                </TableRow>

            </TableBody>
        </Table>
    )
}

export default PlayerSplitsTable