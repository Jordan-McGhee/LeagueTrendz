// types
import { PlayerStatsTableAveragesProps } from "@/types"

// ui imports
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "../../../../ui/table"

// component imports
import TeamLogo from "../../../../ui/TeamLogo"

// dummy data for team info
const teams = require("../../../../../DUMMYDATA/NBA_Teams.json")

const PlayerStatsTableTotalsMobile: React.FC<PlayerStatsTableAveragesProps> = ({ data, currentData }) => {

    let dataTotals: any = {
        // "gp": currentData?.gp || 0,
        // "gs": currentData?.gs || 0,
        // "min": currentData?.min || 0,
        "pts": currentData?.pts ? +currentData.pts : 0,
        "fgm": currentData?.fgm ? +currentData.fgm : 0,
        "fga": currentData?.fga ? +currentData.fga : 0,
        "tpm": currentData?.tpm ? +currentData.tpm : 0,
        "tpa": currentData?.tpa ? +currentData.tpa : 0,
        "ftm": currentData?.ftm ? +currentData.ftm : 0,
        "fta": currentData?.fta ? +currentData.fta : 0,
        "orb": currentData?.orb ? +currentData.orb : 0,
        "drb": currentData?.drb ? +currentData.drb : 0,
        "ast": currentData?.ast ? +currentData.ast : 0,
        "blk": currentData?.blk ? +currentData.blk : 0,
        "stl": currentData?.stl ? +currentData.stl : 0,
        "pf": currentData?.pf ? +currentData.pf : 0,
        "turnovers": currentData?.turnovers ? +currentData.turnovers : 0
    }

    return (
        <div>
            <Table className="text-xs">
                <TableHeader>
                    <TableRow>
                        <TableHead className="sticky left-0 z-10 bg-white border-r whitespace-nowrap w-fit px-2">SEASON</TableHead>
                        <TableHead className="px-3">TEAM</TableHead>
                        {/* <TableHead className="text-center px-2">GP</TableHead> */}
                        {/* <TableHead className="text-center">GS</TableHead> */}
                        {/* <TableHead className="text-center px-2">MIN</TableHead> */}
                        <TableHead className="text-center px-2">PTS</TableHead>
                        <TableHead className="text-center px-2 truncate">FGM-FGA</TableHead>
                        <TableHead className="text-center px-2">FG%</TableHead>
                        <TableHead className="text-center px-2 truncate">3PM-3PA</TableHead>
                        <TableHead className="text-center px-2">3P%</TableHead>
                        <TableHead className="text-center px-2 truncate">FTM-FTA</TableHead>
                        <TableHead className="text-center px-2">FT%</TableHead>
                        <TableHead className="text-center px-2">OR</TableHead>
                        <TableHead className="text-center px-2">DR</TableHead>
                        <TableHead className="text-center px-2">REB</TableHead>
                        <TableHead className="text-center px-2">AST</TableHead>
                        <TableHead className="text-center px-2">BLK</TableHead>
                        <TableHead className="text-center px-2">STL</TableHead>
                        <TableHead className="text-center px-2">PF</TableHead>
                        <TableHead className="text-center px-2">TO</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {/* PLAYER DATA FROM BEFORE CURRENT SEASON */}
                    {
                        data?.map((season) => {

                            if (season.gp === 0) {
                                return null
                            }

                            // update totals
                            dataTotals['pts'] += +season.pts
                            dataTotals['fgm'] += +season.fg
                            dataTotals['fga'] += +season.fga
                            dataTotals['tpm'] += +season.tp
                            dataTotals['tpa'] += +season.tpa
                            dataTotals['ftm'] += +season.ft
                            dataTotals['fta'] += +season.fta
                            dataTotals['orb'] += +season.orb
                            dataTotals['drb'] += +season.drb
                            dataTotals['ast'] += +season.ast
                            dataTotals['blk'] += +season.blk
                            dataTotals['stl'] += +season.stl
                            dataTotals['pf'] += +season.pf
                            dataTotals['turnovers'] += +season.tov

                            // season cell: get season, subtract one for year season started (ex: turn 2017 into '16-17)
                            let seasonStart = (season.season - 1).toString().slice(2)
                            let seasonString = `'${seasonStart.toString()}-${season.season.toString().slice(2)}`

                            // team (logo + abbreviation) cell
                            const seasonTeam = teams.teams.filter((team: any) => team.team_id === season.tid)[0]
                            const seasonTeamCell = seasonTeam.abbreviation && (
                                <TableCell className="flex items-center gap-x-1 px-2">
                                    <TeamLogo team_id={seasonTeam.team_id} abbreviation={seasonTeam.abbreviation} logoClass="size-5 object-contain" />
                                    <p>{seasonTeam.abbreviation}</p>
                                </TableCell>
                            )

                            const fgPercentage = +season.fg / +season.fga || 0
                            const tpPercentage = +season.tp / +season.tpa || 0
                            const ftPercentage = +season.ft / +season.fta || 0

                            return (
                                <TableRow key={`${seasonString}-totals-mobile`}>
                                    <TableCell className="sticky left-0 z-10 bg-white border-r whitespace-nowrap w-fit px-2">{seasonString}</TableCell>
                                    {seasonTeamCell}
                                    {/* <TableCell className="text-center">{season.gp}</TableCell>
                                    <TableCell className="text-center">{season.gs}</TableCell> */}
                                    {/* <TableCell className="text-center">{season.min}</TableCell> */}
                                    <TableCell className="text-center">{season.pts}</TableCell>
                                    <TableCell className="text-center">{season.fg}-{season.fga}</TableCell>
                                    <TableCell className="text-center">{(fgPercentage * 100).toFixed(1)}%</TableCell>
                                    <TableCell className="text-center">{season.tp}-{season.tpa}</TableCell>
                                    <TableCell className="text-center">{(tpPercentage * 100).toFixed(1)}%</TableCell>
                                    <TableCell className="text-center">{season.ft}-{season.fta}</TableCell>
                                    <TableCell className="text-center">{(100 * ftPercentage).toFixed(1)}%</TableCell>
                                    <TableCell className="text-center">{season.orb}</TableCell>
                                    <TableCell className="text-center">{season.drb}</TableCell>
                                    <TableCell className="text-center">{season.orb + season.drb}</TableCell>
                                    <TableCell className="text-center">{season.ast}</TableCell>
                                    <TableCell className="text-center">{season.blk}</TableCell>
                                    <TableCell className="text-center">{season.stl}</TableCell>
                                    <TableCell className="text-center">{season.pf}</TableCell>
                                    <TableCell className="text-center">{season.tov}</TableCell>
                                </TableRow>
                            )
                        })
                    }

                    {/* CURRENT SEASON */}
                    {
                        currentData &&
                        <TableRow>
                            <TableCell className="sticky left-0 z-10 bg-white border-r whitespace-nowrap w-fit px-2">'23-24</TableCell>
                            <TableCell className="flex items-center gap-x-1 px-2">
                                <TeamLogo team_id={currentData.team_id} abbreviation={currentData.abbreviation} logoClass="size-5 object-contain" />
                                <p>{currentData.abbreviation}</p>
                            </TableCell>
                            {/* <TableCell className="text-center">{currentData.gp}</TableCell>
                            <TableCell className="text-center">{currentData.gs}</TableCell> */}
                            {/* <TableCell className="text-center">{currentData.min}</TableCell> */}
                            <TableCell className="text-center">{currentData.pts}</TableCell>
                            <TableCell className="text-center">{currentData.fgm}-{currentData.fga}</TableCell>
                            <TableCell className="text-center">{currentData.avg_fg_percentage}%</TableCell>
                            <TableCell className="text-center">{currentData.tpm}-{currentData.tpa}</TableCell>
                            <TableCell className="text-center">{currentData.avg_tp_percentage}%</TableCell>
                            <TableCell className="text-center">{currentData.ftm}-{currentData.fta}</TableCell>
                            <TableCell className="text-center">{currentData.avg_ft_percentage}%</TableCell>
                            <TableCell className="text-center">{currentData.orb}</TableCell>
                            <TableCell className="text-center">{currentData.drb}</TableCell>
                            <TableCell className="text-center">{currentData.reb}</TableCell>
                            <TableCell className="text-center">{currentData.ast}</TableCell>
                            <TableCell className="text-center">{currentData.blk}</TableCell>
                            <TableCell className="text-center">{currentData.stl}</TableCell>
                            <TableCell className="text-center">{currentData.pf}</TableCell>
                            <TableCell className="text-center">{currentData.turnovers}</TableCell>
                        </TableRow>
                    }

                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell className="sticky left-0 z-10 bg-slate-50 whitespace-nowrap w-fit px-2">CAREER</TableCell>
                        <TableCell></TableCell>
                        {/* <TableCell className="text-center">81</TableCell>
                        <TableCell className="text-center">81</TableCell> */}
                        {/* <TableCell className="text-center">{dataTotals['min']}</TableCell> */}
                        <TableCell className="text-center px-2">{dataTotals['pts']}</TableCell>
                        <TableCell className="text-center px-2">{dataTotals['fgm']}-{dataTotals['fga']}</TableCell>
                        <TableCell className="text-center px-2">{((dataTotals['fgm'] / dataTotals['fga']) * 100).toFixed(1)}%</TableCell>
                        <TableCell className="text-center px-2">{dataTotals['tpm']}-{dataTotals['tpa']}</TableCell>
                        <TableCell className="text-center px-2">{((dataTotals['tpm'] / dataTotals['tpa']) * 100).toFixed(1)}%</TableCell>
                        <TableCell className="text-center px-2">{dataTotals['ftm']}-{dataTotals['fta']}</TableCell>
                        <TableCell className="text-center px-2">{((dataTotals['ftm'] / dataTotals['fta']) * 100).toFixed(1)}%</TableCell>
                        <TableCell className="text-center px-2">{dataTotals['orb']}</TableCell>
                        <TableCell className="text-center px-2">{dataTotals['drb']}</TableCell>
                        <TableCell className="text-center px-2">{dataTotals['orb'] + dataTotals['drb']}</TableCell>
                        <TableCell className="text-center px-2">{dataTotals['ast']}</TableCell>
                        <TableCell className="text-center px-2">{dataTotals['blk']}</TableCell>
                        <TableCell className="text-center px-2">{dataTotals['stl']}</TableCell>
                        <TableCell className="text-center px-2">{dataTotals['pf']}</TableCell>
                        <TableCell className="text-center px-2">{dataTotals['turnovers']}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export default PlayerStatsTableTotalsMobile