// types
import { PlayerStatsTableAveragesProps } from "../../../../types"

// ui imports
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "../../../ui/table"

// component imports
import TeamLogo from "../../../ui/TeamLogo"

// dummy data for team info
const teams = require("../../../../DUMMYDATA/NBA_Teams.json")

const PlayerStatsTableAverages: React.FC<PlayerStatsTableAveragesProps> = ({ title, data }) => {

    return (
        <div>
            <p className="font-bold text-xl">{title}</p>
            <Table className="text-xs">
                <TableHeader>
                    <TableRow>
                        <TableHead>SEASON</TableHead>
                        <TableHead>TEAM</TableHead>
                        <TableHead className="text-center">GP</TableHead>
                        <TableHead className="text-center">GS</TableHead>
                        <TableHead className="text-center">PTS</TableHead>
                        <TableHead className="text-center">MIN</TableHead>
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

                    {
                        data?.map((season) => {

                            // season cell: get season, subtract one for year season started (ex: turn 2017 into 2016-17)
                            let seasonStart = season.season - 1
                            let seasonString = seasonStart.toString() + "-" + season.season.toString().slice(2)

                            // team (logo + abbreviation) cell
                            const seasonTeam = teams.teams.filter((team: any) => team.team_id === season.tid)[0]
                            const seasonTeamCell = seasonTeam.abbreviation && (
                                <TableCell className="flex items-center gap-x-1">
                                    <TeamLogo team_id={seasonTeam.team_id} abbreviation={seasonTeam.abbreviation} logoClass="size-5 object-contain" />
                                    <p>{seasonTeam.abbreviation}</p>
                                </TableCell>
                            )

                            // to find average, need to find total games played
                            // use that number to divide given totals for each metric

                            const avgPts = season.pts / season.gp || 0
                            const avgMin = season.min / season.gp || 0
                            const avgFGM = season.fg / season.gp || 0
                            const avgFGA = season.fga / season.gp || 0
                            const fgPercentage = season.fg / season.fga || 0
                            const avgTPM = season.tp / season.gp || 0
                            const avgTPA = season.tpa / season.gp || 0
                            const tpPercentage = season.tp / season.tpa || 0
                            const avgFTM = season.ft / season.gp || 0
                            const avgFTA = season.fta / season.gp || 0
                            const ftPercentage = season.ft / season.fta || 0
                            const avgOR = season.orb / season.gp || 0
                            const avgDR = season.drb / season.gp || 0
                            const avgReb = (season.orb + season.drb) / season.gp || 0
                            const avgAst = season.ast / season.gp || 0
                            const avgBlk = season.blk / season.gp || 0
                            const avgStl = season.stl / season.gp || 0
                            const avgPF = season.pf / season.gp || 0
                            const avgTO = season.tov / season.gp || 0

                            return (
                                <TableRow>
                                    <TableCell>{seasonString}</TableCell>
                                    <TableCell>{seasonTeamCell}</TableCell>
                                    <TableCell className="text-center">{season.gp}</TableCell>
                                    <TableCell className="text-center">{season.gs}</TableCell>
                                    <TableCell className="text-center">{avgPts.toFixed(1)}</TableCell>
                                    <TableCell className="text-center">{avgMin.toFixed(1)}</TableCell>
                                    <TableCell className="text-center">{avgFGM.toFixed(1)}-{avgFGA.toFixed(1)}</TableCell>
                                    <TableCell className="text-center">{fgPercentage.toFixed(1)}</TableCell>
                                    <TableCell className="text-center">{avgTPM.toFixed(1)}-{avgTPA.toFixed(1)}</TableCell>
                                    <TableCell className="text-center">{tpPercentage.toFixed(1)}</TableCell>
                                    <TableCell className="text-center">{avgFTM.toFixed(1)}-{avgFTA.toFixed(1)}</TableCell>
                                    <TableCell className="text-center">{ftPercentage.toFixed(1)}</TableCell>
                                    <TableCell className="text-center">{avgOR.toFixed(1)}</TableCell>
                                    <TableCell className="text-center">{avgDR.toFixed(1)}</TableCell>
                                    <TableCell className="text-center">{avgReb.toFixed(1)}</TableCell>
                                    <TableCell className="text-center">{avgAst.toFixed(1)}</TableCell>
                                    <TableCell className="text-center">{avgBlk.toFixed(1)}</TableCell>
                                    <TableCell className="text-center">{avgStl.toFixed(1)}</TableCell>
                                    <TableCell className="text-center">{avgPF.toFixed(1)}</TableCell>
                                    <TableCell className="text-center">{avgTO.toFixed(1)}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={2}>CAREER</TableCell>
                        <TableCell className="text-center">81</TableCell>
                        <TableCell className="text-center">81</TableCell>
                        <TableCell className="text-center">19.1</TableCell>
                        <TableCell className="text-center">30.9</TableCell>
                        <TableCell className="text-center">6.5-15.5</TableCell>
                        <TableCell className="text-center">41.8</TableCell>
                        <TableCell className="text-center">1.9-6.0</TableCell>
                        <TableCell className="text-center">32.4</TableCell>
                        <TableCell className="text-center">4.2-5.1</TableCell>
                        <TableCell className="text-center">82.8</TableCell>
                        <TableCell className="text-center">0.8</TableCell>
                        <TableCell className="text-center">2.9</TableCell>
                        <TableCell className="text-center">3.7</TableCell>
                        <TableCell className="text-center">8.1</TableCell>
                        <TableCell className="text-center">0.2</TableCell>
                        <TableCell className="text-center">0.9</TableCell>
                        <TableCell className="text-center">1.7</TableCell>
                        <TableCell className="text-center">3.8</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export default PlayerStatsTableAverages