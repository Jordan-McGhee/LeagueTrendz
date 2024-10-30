import React from "react";

// type imports
import { Team, TeamHistoryState } from "@/types";

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card"
import { Table, TableHeader, TableRow, TableCell, TableHead, TableFooter, TableBody } from "../../../../components/ui/table"
import TeamLogo from "../../../../components/ui/TeamLogo"

const TeamHistoryTable = ({ team, history, className }: { team: Team, history: TeamHistoryState, className: string}) => (
    <Card className={className}>
        <CardHeader>
            <CardTitle>
                {team.full_name} History
            </CardTitle>
        </CardHeader>
        <CardContent className="max-h-[750px] overflow-y-scroll">
            <Table className="text-xs">
                <TableHeader>
                    <TableRow>
                        <TableHead className=""></TableHead>
                        <TableHead className="w-4/12">TEAM NAME</TableHead>
                        <TableHead className="w-1/12">W</TableHead>
                        <TableHead className="w-1/12">L</TableHead>
                        <TableHead className="w-1/12">PCT</TableHead>
                        <TableHead className="w-4/12">OUTCOME</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        history?.seasons.map((season) => {

                            let teamNameCell, outcomeCell

                            if (season.team_name === team.full_name) {
                                teamNameCell = (
                                    <div className="flex gap-x-2 items-center">
                                        <TeamLogo abbreviation={team.abbreviation} team_id={team.team_id} logoClass="size-5 object-contain" />
                                        <p>{season.team_name}</p>
                                    </div>
                                )
                            } else {
                                teamNameCell = (
                                    <div className="flex gap-x-2 items-center">
                                        <img src={season.img_url_small || undefined} alt={`${season.team_name} logo`} className="size-5 object-contain" />
                                        <p>{season.team_name}</p>
                                    </div>
                                )
                            }

                            if (season.playoffs < 0) {
                                outcomeCell = (
                                    <p>Missed Playoffs</p>
                                )
                            } else if (season.playoffs === 0) {
                                outcomeCell = (
                                    <p>Eliminated First Round</p>
                                )
                            } else if (season.playoffs === 1) {
                                outcomeCell = (
                                    <p>Eliminated Second Round</p>
                                )
                            } else if (season.playoffs === 2) {
                                outcomeCell = (
                                    <p>Eliminated Conference Finals</p>
                                )
                            } else if (season.playoffs === 3) {
                                outcomeCell = (
                                    <p>{team.conference} Conference Champions</p>
                                )
                            } else {
                                outcomeCell = (
                                    <div className="flex items-center gap-x-1">
                                        <p>Won Championship</p>
                                        <img src={require("../../../../nba-trophies/larry-obrien-champion.png")} className="size-5 object-contain" alt="champ trophy" />
                                    </div>
                                )
                            }

                            return (
                                <TableRow key={`${season.team_name}-${season.season}`}>
                                    <TableCell className="font-semibold">{season.season}</TableCell>
                                    <TableCell>{teamNameCell}</TableCell>
                                    <TableCell>{season.wins}</TableCell>
                                    <TableCell>{season.losses}</TableCell>
                                    <TableCell>{season.pct}</TableCell>
                                    <TableCell>{outcomeCell}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </CardContent>
    </Card>
)

export default TeamHistoryTable