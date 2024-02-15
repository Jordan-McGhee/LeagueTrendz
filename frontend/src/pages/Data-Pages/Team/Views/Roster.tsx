import React from "react";


import { ColumnDef } from "@tanstack/react-table";

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../../components/ui/card"
import { Button } from "../../../../components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { RosterTable } from "../../../../components/Desktop/Roster/RosterTable";

// dummy data import
const data = require("../../../../DUMMYDATA/NBA_Roster.json")

const Roster = () => {

    // types
    type Player = {
        id: number,
        name: string,
        number: number,
        height: string,
        weight: number,
        birthday: string,
        age: number,
        college: string | "--",
        status: "healthy" | "out" | "day-to-day"
    }

    type Team = Player[]
    const roster: Team = data.lineup

    const columns: ColumnDef<Player>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="px-0"
                    >
                        NAME
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "position",
            header: "POS"
        },
        {
            accessorKey: "age",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="px-0"
                    >
                        AGE
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "height",
            header: "HT"
        },
        {
            accessorKey: "weight",
            header: "WT"
        },
        {
            accessorKey: "college",
            header: "COLLEGE"
        },
        {
            accessorKey: "salary",
            header: "SALARY"
        },
    ]

    return (
        <div>
            <RosterTable columns={columns} data={roster} />
        </div>
    )
}

export default Roster