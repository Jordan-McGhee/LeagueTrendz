import React from "react"
import { Link } from "react-router-dom"

// type imports
import { TeamExpanded, TeamScheduleObject } from "@/types"

// utils imports
import { convertDateGameLog, teamStatLeaderFormatter } from "../../../../Utils/utils"

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../../../../components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"

// component imports
import TeamScheduleTableRowMobile from "./TeamScheduleTableRow-Mobile"

const TeamScheduleTableMobile = ({ team, showPlayoffs, schedule, selectHandler, tableClass }: { team: TeamExpanded, showPlayoffs: boolean, schedule: TeamScheduleObject[], selectHandler: (newValue: string) => void, tableClass?: string }) => {

    const teamsMissedPlayoffs = [2, 3, 8, 10, 14, 24, 26, 27, 28, 29]

    return (
        <Card className={tableClass}>
            <CardHeader>
                <CardTitle className="">
                    2023-24 Schedule

                </CardTitle>
                {/* drop down for playoff/regular season — check if team made playoffs */}
                {
                    !teamsMissedPlayoffs.includes(team.team_id) &&
                    <Select value={showPlayoffs ? "playoffs" : "regular-season"} onValueChange={(newValue) => selectHandler(newValue)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose Season Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="regular-season">Regular Season</SelectItem>
                            <SelectItem value="playoffs">Playoffs</SelectItem>
                        </SelectContent>
                    </Select>
                }
            </CardHeader>
            <CardContent>
                <Table className="text-xs">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pr-1">DATE</TableHead>
                            <TableHead className="px-1">OPP</TableHead>
                            <TableHead className="px-1">RESULT</TableHead>
                            <TableHead className="pl-1">W-L</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {schedule.map((game) => {
                            return (
                                <TeamScheduleTableRowMobile game={game} />
                            )
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default TeamScheduleTableMobile