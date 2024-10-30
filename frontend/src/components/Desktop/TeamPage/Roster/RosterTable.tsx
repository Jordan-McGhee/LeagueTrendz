import React from "react";
import { Link } from "react-router-dom";

// type imports
import { Player, Team } from "@/types"

// utils imports
import { convertPlayerPosition } from "../../../../Utils/utils";

// ui imports
import { ColumnDef } from "@tanstack/react-table";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "../../../ui/button"
import { DataTable } from "../../../ui/DataTable"
import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card"

const RosterTable = ({ team, roster, className }: { team: Team, roster: Player[], className: string }) => {

    const columns: ColumnDef<Player>[] = [
        {
            accessorKey: 'photo_url',
            header: "",
            cell: ({ row }) => {
                const player_id = row.original.player_id
                const photo_url = row.original.photo_url
                const name = row.original.name
                const urlName: string = name.toLowerCase().replace(" ", "-")

                return (
                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player_id}/${urlName}`} className="hover:underline">
                        <img src={photo_url} alt="img" className="h-8 object-contain rounded-full" />
                    </Link>
                )
            }
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        NAME
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const player_id = row.original.player_id
                const name: string = row.getValue("name")
                const urlName: string = name.toLowerCase().replace(" ", "-")
                const jersey_number = row.original.jersey_number

                return (
                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player_id}/${urlName}`} className="hover:underline">
                        {name} <span className="text-gray-500 font-light ml-1">#{jersey_number}</span>
                    </Link>
                )
            }
        },
        {
            accessorKey: "player_position",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="px-4"
                    >
                        POS
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <div className="px-4">{convertPlayerPosition(row.original.player_position)}</div>
                )
            }
        },
        {
            accessorKey: "age",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="px-2"
                    >
                        AGE
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <div className="px-2">{row.original.age}</div>
                )
            }
        },
        {
            accessorKey: "height",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="px-2"
                    >
                        HT
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <div className="px-2">{row.original.height}</div>
                )
            }
        },
        {
            accessorKey: "weight",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="px-2"
                    >
                        WT
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <div className="px-2">{row.original.weight}</div>
                )
            }
        },
        {
            accessorKey: "college",
            header: "COLLEGE"
        },
        {
            accessorKey: "status",
            header: "STATUS",
            cell: ({ row }) => {

                let playerStatusSplit: string = row.original.status.type.split(" ")[0]

                let playerStatus

                if (playerStatusSplit === "Healthy") {
                    playerStatus = (
                        <p>Active</p>
                    )
                } else if (playerStatusSplit === "Suspended") {
                    playerStatus = (
                        <p>Suspended - {row.original.status.gamesRemaining} Games</p>
                    )
                } else {
                    playerStatus = (
                        <p>Out - {playerStatusSplit} ({row.original.status.gamesRemaining} Games)</p>
                    )
                }

                return (
                    <div>{playerStatus}</div>
                )
            }
        }
    ]

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>
                    2023-24 Roster
                </CardTitle>
            </CardHeader>

            <CardContent>
                <DataTable columns={columns} data={roster} />

                <p className="text-sm font-bold mt-4">Coach: <span className="font-light">{team.head_coach}</span></p>
            </CardContent>
        </Card>
    )
}

export default RosterTable