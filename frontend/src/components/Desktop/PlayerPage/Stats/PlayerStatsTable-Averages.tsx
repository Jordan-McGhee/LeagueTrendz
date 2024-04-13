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
            <p>{title}</p>
            <Table className="text-xs">
                <TableHeader>
                    <TableRow>
                        <TableHead>SEASON</TableHead>
                        <TableHead>TEAM</TableHead>
                        <TableHead>GP</TableHead>
                        <TableHead>GS</TableHead>
                        <TableHead>PTS</TableHead>
                        <TableHead>MIN</TableHead>
                        <TableHead>FGM</TableHead>
                        <TableHead>FGA</TableHead>
                        <TableHead>FG%</TableHead>
                        <TableHead>3PM</TableHead>
                        <TableHead>3PA</TableHead>
                        <TableHead>3P%</TableHead>
                        <TableHead>FTM</TableHead>
                        <TableHead>FTA</TableHead>
                        <TableHead>FT%</TableHead>
                        <TableHead>OR</TableHead>
                        <TableHead>DR</TableHead>
                        <TableHead>REB</TableHead>
                        <TableHead>AST</TableHead>
                        <TableHead>BLK</TableHead>
                        <TableHead>STL</TableHead>
                        <TableHead>PF</TableHead>
                        <TableHead>TO</TableHead>
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
                                    <TableCell>{season.gp}</TableCell>
                                    <TableCell>{season.gs}</TableCell>
                                    <TableCell>{avgPts.toFixed(1)}</TableCell>
                                    <TableCell>{avgMin.toFixed(1)}</TableCell>
                                    <TableCell>{avgFGM.toFixed(1)}</TableCell>
                                    <TableCell>{avgFGA.toFixed(1)}</TableCell>
                                    <TableCell>{fgPercentage.toFixed(1)}</TableCell>
                                    <TableCell>{avgTPM.toFixed(1)}</TableCell>
                                    <TableCell>{avgTPA.toFixed(1)}</TableCell>
                                    <TableCell>{tpPercentage.toFixed(1)}</TableCell>
                                    <TableCell>{avgFTM.toFixed(1)}</TableCell>
                                    <TableCell>{avgFTA.toFixed(1)}</TableCell>
                                    <TableCell>{ftPercentage.toFixed(1)}</TableCell>
                                    <TableCell>{avgOR.toFixed(1)}</TableCell>
                                    <TableCell>{avgDR.toFixed(1)}</TableCell>
                                    <TableCell>{avgReb.toFixed(1)}</TableCell>
                                    <TableCell>{avgAst.toFixed(1)}</TableCell>
                                    <TableCell>{avgBlk.toFixed(1)}</TableCell>
                                    <TableCell>{avgStl.toFixed(1)}</TableCell>
                                    <TableCell>{avgPF.toFixed(1)}</TableCell>
                                    <TableCell>{avgTO.toFixed(1)}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={2}>CAREER</TableCell>
                        <TableCell>81</TableCell>
                        <TableCell>81</TableCell>
                        <TableCell>19.1</TableCell>
                        <TableCell>30.9</TableCell>
                        <TableCell>6.5</TableCell>
                        <TableCell>15.5</TableCell>
                        <TableCell>41.8</TableCell>
                        <TableCell>1.9</TableCell>
                        <TableCell>6.0</TableCell>
                        <TableCell>32.4</TableCell>
                        <TableCell>4.2</TableCell>
                        <TableCell>5.1</TableCell>
                        <TableCell>82.8</TableCell>
                        <TableCell>0.8</TableCell>
                        <TableCell>2.9</TableCell>
                        <TableCell>3.7</TableCell>
                        <TableCell>8.1</TableCell>
                        <TableCell>0.2</TableCell>
                        <TableCell>0.9</TableCell>
                        <TableCell>1.7</TableCell>
                        <TableCell>3.8</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export default PlayerStatsTableAverages