// types
import { PlayerStatsTableAveragesProps } from "@/types"

// ui imports
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "../../../../ui/table"

// component imports
import TeamLogo from "../../../../ui/TeamLogo"

// dummy data for team info
const teams = require("../../../../../DUMMYDATA/NBA_Teams.json")

const PlayerStatsTableAverages: React.FC<PlayerStatsTableAveragesProps> = ({ title, data, currentData }) => {

    let dataTotals: any = {
        "gp": currentData?.gp ? +currentData.gp : 0,
        "gs": currentData?.gs ? +currentData.gs : 0,
        "min": currentData?.min ? +currentData.min : 0,
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
                        <TableHead className="text-center px-2">GP</TableHead>
                        {/* <TableHead className="text-center">GS</TableHead> */}
                        <TableHead className="text-center px-2">MIN</TableHead>
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

                    {
                        data?.map((season) => {

                            if (season.gp === 0) {
                                return null
                            }

                            // update totals
                            dataTotals['gp'] += +season.gp
                            dataTotals['gs'] += +season.gs
                            dataTotals['min'] += +season.min
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

                            // to find average, need to find total games played
                            // use that number to divide given totals for each metric

                            const avgPts = +season.pts / +season.gp || 0
                            const avgMin = +season.min / +season.gp || 0
                            const avgFGM = +season.fg / +season.gp || 0
                            const avgFGA = +season.fga / +season.gp || 0
                            const fgPercentage = +season.fg / +season.fga || 0
                            const avgTPM = +season.tp / +season.gp || 0
                            const avgTPA = +season.tpa / +season.gp || 0
                            const tpPercentage = +season.tp / +season.tpa || 0
                            const avgFTM = +season.ft / +season.gp || 0
                            const avgFTA = +season.fta / +season.gp || 0
                            const ftPercentage = +season.ft / +season.fta || 0
                            const avgOR = +season.orb / +season.gp || 0
                            const avgDR = +season.drb / +season.gp || 0
                            const avgReb = (+season.orb + +season.drb) / +season.gp || 0
                            const avgAst = +season.ast / +season.gp || 0
                            const avgBlk = +season.blk / +season.gp || 0
                            const avgStl = +season.stl / +season.gp || 0
                            const avgPF = +season.pf / +season.gp || 0
                            const avgTO = +season.tov / +season.gp || 0

                            return (
                                <TableRow key={`${seasonString}-averages-mobile`}>
                                    <TableCell className="sticky left-0 z-10 bg-white border-r whitespace-nowrap w-fit px-2">{seasonString}</TableCell>
                                    {seasonTeamCell}
                                    <TableCell className="text-center px-2">{season.gp}</TableCell>
                                    {/* <TableCell className="text-center">{season.gs}</TableCell> */}
                                    <TableCell className="text-center px-2">{avgMin.toFixed(1)}</TableCell>
                                    <TableCell className="text-center px-2">{avgPts.toFixed(1)}</TableCell>
                                    <TableCell className="text-center px-2">{avgFGM.toFixed(1)}-{avgFGA.toFixed(1)}</TableCell>
                                    <TableCell className="text-center px-2">{(fgPercentage * 100).toFixed(1)}%</TableCell>
                                    <TableCell className="text-center px-2">{avgTPM.toFixed(1)}-{avgTPA.toFixed(1)}</TableCell>
                                    <TableCell className="text-center px-2">{(tpPercentage * 100).toFixed(1)}%</TableCell>
                                    <TableCell className="text-center px-2">{avgFTM.toFixed(1)}-{avgFTA.toFixed(1)}</TableCell>
                                    <TableCell className="text-center px-2">{(100 * ftPercentage).toFixed(1)}%</TableCell>
                                    <TableCell className="text-center px-2">{avgOR.toFixed(1)}</TableCell>
                                    <TableCell className="text-center px-2">{avgDR.toFixed(1)}</TableCell>
                                    <TableCell className="text-center px-2">{avgReb.toFixed(1)}</TableCell>
                                    <TableCell className="text-center px-2">{avgAst.toFixed(1)}</TableCell>
                                    <TableCell className="text-center px-2">{avgBlk.toFixed(1)}</TableCell>
                                    <TableCell className="text-center px-2">{avgStl.toFixed(1)}</TableCell>
                                    <TableCell className="text-center px-2">{avgPF.toFixed(1)}</TableCell>
                                    <TableCell className="text-center px-2">{avgTO.toFixed(1)}</TableCell>
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
                            <TableCell className="text-center">{currentData.gp}</TableCell>
                            {/* <TableCell className="text-center">{currentData.gs}</TableCell> */}
                            <TableCell className="text-center px-2">{currentData.avg_min}</TableCell>
                            <TableCell className="text-center px-2">{currentData.avg_pts}</TableCell>
                            <TableCell className="text-center px-2">{currentData.avg_fgm}-{currentData.avg_fga}</TableCell>
                            <TableCell className="text-center px-2">{currentData.avg_fg_percentage}%</TableCell>
                            <TableCell className="text-center px-2">{currentData.avg_tpm}-{currentData.avg_tpa}</TableCell>
                            <TableCell className="text-center px-2">{currentData.avg_tp_percentage}%</TableCell>
                            <TableCell className="text-center px-2">{currentData.avg_ftm}-{currentData.avg_fta}</TableCell>
                            <TableCell className="text-center px-2">{currentData.avg_ft_percentage}%</TableCell>
                            <TableCell className="text-center px-2">{currentData.avg_orb}</TableCell>
                            <TableCell className="text-center px-2">{currentData.avg_drb}</TableCell>
                            <TableCell className="text-center px-2">{currentData.avg_reb}</TableCell>
                            <TableCell className="text-center px-2">{currentData.avg_ast}</TableCell>
                            <TableCell className="text-center px-2">{currentData.avg_blk}</TableCell>
                            <TableCell className="text-center px-2">{currentData.avg_stl}</TableCell>
                            <TableCell className="text-center px-2">{currentData.avg_pf}</TableCell>
                            <TableCell className="text-center px-2">{currentData.avg_turnovers}</TableCell>
                        </TableRow>
                    }


                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell className="sticky left-0 z-10 bg-slate-50 whitespace-nowrap w-fit px-2">CAREER</TableCell>
                        <TableCell></TableCell>
                        <TableCell className="text-center">{dataTotals['gp']}</TableCell>
                        {/* <TableCell className="text-center">{dataTotals['gs']}</TableCell> */}
                        <TableCell className="text-center">{((dataTotals['min'] / dataTotals['gp'])).toFixed(1)}</TableCell>
                        <TableCell className="text-center">{((dataTotals['pts'] / dataTotals['gp']).toFixed(1))}</TableCell>
                        <TableCell className="text-center">{((dataTotals['fgm'] / dataTotals['gp']).toFixed(1))}-{((dataTotals['fga'] / dataTotals['gp']).toFixed(1))}</TableCell>
                        <TableCell className="text-center">{((dataTotals['fgm'] / dataTotals['fga']) * 100).toFixed(1)}%</TableCell>
                        <TableCell className="text-center">{((dataTotals['tpm'] / dataTotals['gp']).toFixed(1))}-{((dataTotals['tpa'] / dataTotals['gp']).toFixed(1))}</TableCell>
                        <TableCell className="text-center">{((dataTotals['tpm'] / dataTotals['tpa']) * 100).toFixed(1)}%</TableCell>
                        <TableCell className="text-center">{((dataTotals['ftm'] / dataTotals['gp']).toFixed(1))}-{((dataTotals['fta'] / dataTotals['gp']).toFixed(1))}</TableCell>
                        <TableCell className="text-center">{((dataTotals['ftm'] / dataTotals['fta']) * 100).toFixed(1)}%</TableCell>
                        <TableCell className="text-center">{((dataTotals['orb'] / dataTotals['gp']).toFixed(1))}</TableCell>
                        <TableCell className="text-center">{((dataTotals['drb'] / dataTotals['gp']).toFixed(1))}</TableCell>
                        <TableCell className="text-center">{(((dataTotals['orb'] + dataTotals['drb']) / dataTotals['gp']).toFixed(1))}</TableCell>
                        <TableCell className="text-center">{((dataTotals['ast'] / dataTotals['gp']).toFixed(1))}</TableCell>
                        <TableCell className="text-center">{((dataTotals['blk'] / dataTotals['gp']).toFixed(1))}</TableCell>
                        <TableCell className="text-center">{((dataTotals['stl'] / dataTotals['gp']).toFixed(1))}</TableCell>
                        <TableCell className="text-center">{((dataTotals['pf'] / dataTotals['gp']).toFixed(1))}</TableCell>
                        <TableCell className="text-center">{((dataTotals['turnovers'] / dataTotals['gp']).toFixed(1))}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export default PlayerStatsTableAverages