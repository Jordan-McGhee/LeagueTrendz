import React from "react";
import { Link } from "react-router-dom";

// type imports
import { TeamPageProps } from "../../../../types"

// utils imports
import { countStreak } from "../../../../Utils/utils"

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/table"
import TeamLogo from "../../../ui/TeamLogo"

const Standings: React.FC<TeamPageProps> = ({ team }) => {

    const currentTeam = team.team_id
    const mainColor = team.main_color

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-bold">
                    2023-24 {team.division} Standings
                </CardTitle>
            </CardHeader>

            <CardContent>
                <Table className="text-sm md:text-base">
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
                        {team.team_standings.map((team) =>
                            <TableRow key={team.full_name} className={team.team_id === currentTeam ? "font-bold md:font-black bg-slate-50" : ""} style={team.team_id === currentTeam ? { color: mainColor } : {}}>
                                <TableCell className="text-left">
                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${team.abbreviation.toLowerCase()}`} className="flex items-center gap-x-1 hover:underline">
                                        <TeamLogo abbreviation={team.abbreviation} team_id={team.team_id} logoClass="size-6 md:size-7 object-contain" />
                                        {team.abbreviation}
                                    </Link>
                                </TableCell>
                                <TableCell className="text-center">{team.wins}</TableCell>
                                <TableCell className="text-center">{team.losses}</TableCell>
                                <TableCell className="text-center">{team.pct}</TableCell>
                                <TableCell className="text-center">{team.gb === 0 ? "—" : team.gb}</TableCell>
                                <TableCell className="text-center">{countStreak(team.last_10)}</TableCell>
                            </TableRow>
                        )}

                    </TableBody>
                </Table>
            </CardContent>

            <CardFooter className="justify-center md:justify-start font-semibold text-blue-500 pb-4">
                <Link to="/nba/standings">
                    See Full Standings
                </Link>
            </CardFooter>

        </Card>
    )
}

export default Standings