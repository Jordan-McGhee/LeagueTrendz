import React from "react";


import { ColumnDef } from "@tanstack/react-table";

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card"
import { Button } from "../../../../components/ui/button"
import { ArrowUpZAIcon, ArrowDownAZIcon, ArrowUp01Icon, ArrowDown10Icon } from "lucide-react"

import { DataTable } from "../../../../components/ui/DataTable";

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
                        {
                            column.getIsSorted() === "asc"
                                ?
                                <ArrowDownAZIcon className="ml-2 h-4 w-4" />
                                :
                                <ArrowUpZAIcon className="ml-2 h-4 w-4" />

                        }
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
                        {
                            column.getIsSorted() === "asc"
                                ?
                                <ArrowUp01Icon className="ml-2 h-4 w-4" />
                                :
                                <ArrowDown10Icon className="ml-2 h-4 w-4" />

                        }
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
            <Card>
                <CardHeader>
                    <CardTitle>
                        Atlanta Hawks Roster 2023-24
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <DataTable columns={columns} data={roster} />

                    <p className="text-sm font-bold mt-4">Coach <span className="font-light">Quin Snyder</span></p>
                </CardContent>
            </Card>
        </div>
    )
}

export default Roster