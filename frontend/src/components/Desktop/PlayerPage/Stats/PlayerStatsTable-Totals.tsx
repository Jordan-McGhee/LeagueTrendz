// types
import { PlayerStatsTableAveragesProps } from "../../../../types"

// ui imports
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "../../../ui/table"

// component imports
import TeamLogo from "../../../ui/TeamLogo"

// dummy data for team info
const teams = require("../../../../DUMMYDATA/NBA_Teams.json")

const PlayerStatsTableTotals: React.FC<PlayerStatsTableAveragesProps> = ({ title, data, currentData }) => {

    let dataTotals: any = {
        // "gp": currentData?.gp || 0,
        // "gs": currentData?.gs || 0,
        // "min": currentData?.min || 0,
        "pts": currentData?.pts || 0,
        "fgm": currentData?.fgm || 0,
        "fga": currentData?.fga || 0,
        "tpm": currentData?.tpm || 0,
        "tpa": currentData?.tpa || 0,
        "ftm": currentData?.ftm || 0,
        "fta": currentData?.fta || 0,
        "orb": currentData?.orb || 0,
        "drb": currentData?.drb || 0,
        "ast": currentData?.ast || 0,
        "blk": currentData?.blk || 0,
        "stl": currentData?.stl || 0,
        "pf": currentData?.pf || 0,
        "turnovers": currentData?.turnovers || 0
    }

    return (
        <div>
            <p className="font-bold text-xl">{title}</p>
            <Table className="text-xs">
                <TableHeader>
                    <TableRow>
                        <TableHead>SEASON</TableHead>
                        <TableHead>TEAM</TableHead>
                        {/* <TableHead className="text-center">GP</TableHead>
                        <TableHead className="text-center">GS</TableHead> */}
                        {/* <TableHead className="text-center">MIN</TableHead> */}
                        <TableHead className="text-center">PTS</TableHead>
                        <TableHead className="text-center">FGM-FGA</TableHead>
                        <TableHead className="text-center">FG%</TableHead>
                        <TableHead className="text-center">3PM-3PA</TableHead>
                        <TableHead className="text-center">3P%</TableHead>
                        <TableHead className="text-center">FTM-FTA</TableHead>
                        <TableHead className="text-center">FT%</TableHead>
                        <TableHead className="text-center">OR</TableHead>
                        <TableHead className="text-center">DR</TableHead>
                        <TableHead className="text-center">REB</TableHead>
                        <TableHead className="text-center">AST</TableHead>
                        <TableHead className="text-center">BLK</TableHead>
                        <TableHead className="text-center">STL</TableHead>
                        <TableHead className="text-center">PF</TableHead>
                        <TableHead className="text-center">TO</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {/* PLAYER DATA FROM BEFORE CURRENT SEASON */}
                    {
                        data?.map((season) => {

                            // update totals
                            dataTotals['pts'] += season.pts
                            dataTotals['fgm'] += season.fg
                            dataTotals['fga'] += season.fga
                            dataTotals['tpm'] += season.tp
                            dataTotals['tpa'] += season.tpa
                            dataTotals['ftm'] += season.ft
                            dataTotals['fta'] += season.fta
                            dataTotals['orb'] += season.orb
                            dataTotals['drb'] += season.drb
                            dataTotals['ast'] += season.ast
                            dataTotals['blk'] += season.blk
                            dataTotals['stl'] += season.stl
                            dataTotals['pf'] += season.pf
                            dataTotals['turnovers'] += season.tov

                            // season cell: get season, subtract one for year season started (ex: turn 2017 into 2016-17)
                            let seasonStart = season.season - 1
                            let seasonString = seasonStart.toString() + "-" + season.season.toString().slice(2)

                            // team (logo + abbreviation) cell
                            const seasonTeam = teams.teams.filter((team: any) => team.team_id === season.tid)[0]
                            const seasonTeamCell = seasonTeam.abbreviation && (
                                <div className="flex items-center gap-x-1">
                                    <TeamLogo team_id={seasonTeam.team_id} abbreviation={seasonTeam.abbreviation} logoClass="size-5 object-contain" />
                                    <p>{seasonTeam.abbreviation}</p>
                                </div>
                            )
                            const fgPercentage = season.fg / season.fga || 0
                            const tpPercentage = season.tp / season.tpa || 0
                            const ftPercentage = season.ft / season.fta || 0

                            return (
                                <TableRow>
                                    <TableCell>{seasonString}</TableCell>
                                    <TableCell>{seasonTeamCell}</TableCell>
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
                            <TableCell>2023-24</TableCell>
                            <TableCell className="flex items-center gap-x-1">
                                <TeamLogo team_id={currentData.team_id} abbreviation={currentData.abbreviation} logoClass="size-5 object-contain" />
                                <p>{currentData.abbreviation}</p>
                            </TableCell>
                            {/* <TableCell className="text-center">{currentData.gp}</TableCell>
                            <TableCell className="text-center">{currentData.gs}</TableCell> */}
                            {/* <TableCell className="text-center">{currentData.min}</TableCell> */}
                            <TableCell className="text-center">{currentData.pts}</TableCell>
                            <TableCell className="text-center">{currentData.fgm}-{currentData.fga}</TableCell>
                            <TableCell className="text-center">{currentData.fg_percentage}%</TableCell>
                            <TableCell className="text-center">{currentData.tpm}-{currentData.tpa}</TableCell>
                            <TableCell className="text-center">{currentData.tp_percentage}%</TableCell>
                            <TableCell className="text-center">{currentData.ftm}-{currentData.fta}</TableCell>
                            <TableCell className="text-center">{currentData.ft_percentage}%</TableCell>
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
                        <TableCell colSpan={2}>CAREER</TableCell>
                        {/* <TableCell className="text-center">81</TableCell>
                        <TableCell className="text-center">81</TableCell> */}
                        {/* <TableCell className="text-center">{dataTotals['min']}</TableCell> */}
                        <TableCell className="text-center">{dataTotals['pts']}</TableCell>
                        <TableCell className="text-center">{dataTotals['fgm']}-{dataTotals['fga']}</TableCell>
                        <TableCell className="text-center">{((dataTotals['fgm']/dataTotals['fga'])*100).toFixed(1)}%</TableCell>
                        <TableCell className="text-center">{dataTotals['tpm']}-{dataTotals['tpa']}</TableCell>
                        <TableCell className="text-center">{((dataTotals['tpm']/dataTotals['tpa'])*100).toFixed(1)}%</TableCell>
                        <TableCell className="text-center">{dataTotals['ftm']}-{dataTotals['fta']}</TableCell>
                        <TableCell className="text-center">{((dataTotals['ftm']/dataTotals['fta'])*100).toFixed(1)}%</TableCell>
                        <TableCell className="text-center">{dataTotals['orb']}</TableCell>
                        <TableCell className="text-center">{dataTotals['drb']}</TableCell>
                        <TableCell className="text-center">{dataTotals['orb'] + dataTotals['drb']}</TableCell>
                        <TableCell className="text-center">{dataTotals['ast']}</TableCell>
                        <TableCell className="text-center">{dataTotals['blk']}</TableCell>
                        <TableCell className="text-center">{dataTotals['stl']}</TableCell>
                        <TableCell className="text-center">{dataTotals['pf']}</TableCell>
                        <TableCell className="text-center">{dataTotals['turnovers']}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export default PlayerStatsTableTotals