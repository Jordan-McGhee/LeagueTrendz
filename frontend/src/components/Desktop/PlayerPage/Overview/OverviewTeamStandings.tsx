import React from "react";
import { Link } from "react-router-dom";

// type imports
import { OverviewStandingsProps } from "../../../../types"

// utils imports
import { countStreak } from "../../../../Utils/utils"

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/table"
import TeamLogo from "../../../ui/TeamLogo"

const OverviewTeamStandings: React.FC<OverviewStandingsProps> = ({ currentTeam, standings }) => {

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-bold">
                    2023-24 {currentTeam.division} Standings
                </CardTitle>
            </CardHeader>

            <CardContent>
                <Table className="text-xs">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-left">Team</TableHead>
                            <TableHead className="text-center">W</TableHead>
                            <TableHead className="text-center">L</TableHead>
                            <TableHead className="text-center">PCT</TableHead>
                            <TableHead className="text-center">GB</TableHead>
                            <TableHead className="text-center">STRK</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {standings.map((team) =>
                            <TableRow key={team.full_name} className={team.team_id === currentTeam.team_id ? "font-bold" : ""}>
                                <TableCell className="text-left">
                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${team.abbreviation.toLowerCase()}`} className="flex items-center gap-x-1 hover:underline">
                                        <TeamLogo abbreviation={team.abbreviation} team_id={team.team_id} logoClass="size-4 object-contain" />
                                        {team.abbreviation}
                                    </Link>
                                </TableCell>
                                <TableCell className="text-center">{team.wins}</TableCell>
                                <TableCell className="text-center">{team.losses}</TableCell>
                                <TableCell className="text-center">{team.pct}</TableCell>
                                <TableCell className="text-center">{team.gb === '0' ? "—" : team.gb}</TableCell>
                                <TableCell className="text-center">{countStreak(team.last_10)}</TableCell>
                            </TableRow>
                        )}

                    </TableBody>
                </Table>
            </CardContent>

            <CardFooter className="text-sm font-semibold text-blue-700 pb-4">
                <Link to="/nba/standings">
                    See Full Standings
                </Link>
            </CardFooter>

        </Card>
    )
}

export default OverviewTeamStandings