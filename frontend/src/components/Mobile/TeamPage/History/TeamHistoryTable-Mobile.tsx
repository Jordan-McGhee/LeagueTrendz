import React from "react";

// type imports
import { Team, TeamHistoryState } from "@/types";

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card"
import { Table, TableHeader, TableRow, TableCell, TableHead, TableFooter, TableBody } from "../../../../components/ui/table"
import TeamLogo from "../../../../components/ui/TeamLogo"

const TeamHistoryTableMobile = ({ team, history, className }: { team: Team, history: TeamHistoryState, className: string}) => (
    <Card className={className}>
        <CardHeader>
            <CardTitle>
                {team.full_name} History
            </CardTitle>
        </CardHeader>
        <CardContent className="max-h-[750px] overflow-y-scroll">
            <Table className="text-xs">
                <TableHeader className="">
                    <TableRow>
                        <TableHead className="pr-1">YEAR</TableHead>
                        <TableHead className="px-1">TEAM NAME</TableHead>
                        <TableHead className="px-1">W-L</TableHead>
                        {/* <TableHead className="w-1/12">PCT</TableHead> */}
                        <TableHead className="pl-1"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        history?.seasons.map((season) => {

                            let teamNameCell, outcomeCell

                            if (season.team_name === team.full_name) {
                                teamNameCell = (
                                    <div className="flex gap-x-1 items-center">
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

                            if (season.playoffs === 4) {
                                outcomeCell = (
                                    <img src={require("../../../../nba-trophies/larry-obrien-champion.png")} className="size-5 object-contain" alt="champ trophy" />
                                )
                            }

                            return (
                                <TableRow key={`${season.team_name}-${season.season}`}>
                                    <TableCell className="font-semibold">{season.season}</TableCell>
                                    <TableCell>{teamNameCell}</TableCell>
                                    <TableCell className="">{season.wins}-{season.losses}</TableCell>
                                    {/* <TableCell>{season.pct}</TableCell> */}
                                    <TableCell className="">{outcomeCell}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </CardContent>
    </Card>
)

export default TeamHistoryTableMobile