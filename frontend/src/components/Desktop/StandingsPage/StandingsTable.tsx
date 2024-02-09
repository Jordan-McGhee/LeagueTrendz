import React from "react";

// ui import

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"

type Team = {
    team_id: number,
    name: string,
    abbreviation: string,
    league_id: number,
    description: string,
    record: string,
    conference: string,
    division: string
}

const StandingsTable = (props: { teams: Team[], selection:string, conference?: string,  division?: string }) => {

    return (
        <div>
            <p className="font-bold mt-4 text-xl">{ props.conference }</p>
            <Table>
                <TableHeader>
                    <TableRow className="">

                        {/* division placeholder if necessary */}
                        <TableHead className="w-[25%]">
                            { props.selection === "division" && <p>{ props.division }</p>}
                        </TableHead>

                        <TableHead>W</TableHead>
                        <TableHead>L</TableHead>
                        <TableHead>PCT</TableHead>
                        <TableHead>GB</TableHead>
                        <TableHead>HOME</TableHead>
                        <TableHead>AWAY</TableHead>
                        <TableHead>DIV</TableHead>
                        <TableHead>CONF</TableHead>
                        <TableHead>PPG</TableHead>
                        <TableHead>OPP PPG</TableHead>
                        <TableHead>DIFF</TableHead>
                        <TableHead>STRK</TableHead>
                        <TableHead>L10</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.teams.map((team, index) => (
                        <TableRow key={ team.team_id }>
                            <TableCell>
                                <div className="flex gap-x-2">
                                    { props.selection === "conference" && index < 11 && <p>{index+1}</p>}
                                    <div className="w-5 h-5 bg-red-500" />
                                    { team.name}
                                </div>
                            </TableCell>
                            <TableCell>39</TableCell>
                            <TableCell>12</TableCell>
                            <TableCell>.765</TableCell>
                            <TableCell>--</TableCell>
                            <TableCell>24-3</TableCell>
                            <TableCell>15-9</TableCell>
                            <TableCell>11-1</TableCell>
                            <TableCell>26-6</TableCell>
                            <TableCell>120.4</TableCell>
                            <TableCell>110.8</TableCell>
                            <TableCell>+9.6</TableCell>
                            <TableCell>W2</TableCell>
                            <TableCell>7-3</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default StandingsTable