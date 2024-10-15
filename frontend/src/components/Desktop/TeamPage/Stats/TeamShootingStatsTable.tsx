import React from "react";
import { Link } from "react-router-dom";

// type imports
import { TeamStatsTableProps, PlayerStatsObject, TeamStatsObject } from "../../../../types"

// utils imports
import { convertPlayerPosition } from "../../../../Utils/utils";

// ui imports
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../../ui/DataTable";
import { Button } from "../../../ui/button"
import { CaretSortIcon } from "@radix-ui/react-icons";
import { TableFooter, TableRow, TableCell } from "../../../ui/table"

const TeamShootingStatsTable: React.FC<TeamStatsTableProps> = ({ playerStats, teamStats }) => {

    const columns: ColumnDef<PlayerStatsObject>[] = [
        // name/position
        {
            accessorKey: 'name',
            header: "NAME",
            cell: ({ row }) => {
                const player_id = row.original.player_id
                const name = row.original.name
                const position = row.original.player_position
                const urlName: string = name.toLowerCase().replace(" ", "-")

                return (
                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player_id}/${urlName}`} className="hover:underline text-xs" key={player_id}>
                        {name} <span className="font-thin">{convertPlayerPosition(position)}</span>
                    </Link>
                )
            }
        },

        // fgm
        {
            accessorKey: "avg_fgm",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        FGM
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_fgm}</p>
                )
            }
        },

        // fga
        {
            accessorKey: "avg_fga",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        FGA
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_fga}</p>
                )
            }
        },

        // fg%
        {
            accessorKey: "avg_fg_percentage",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        FG%
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_fg_percentage}%</p>
                )
            }
        },

        // 3pm
        {
            accessorKey: "avg_tpm",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        3PM
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_tpm}</p>
                )
            }
        },

        // 3pa
        {
            accessorKey: "avg_tpa",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        3PA
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_tpa}</p>
                )
            }
        },

        // 3p%
        {
            accessorKey: "avg_tp_percentage",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        3P%
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_tp_percentage}%</p>
                )
            }
        },

        // ftm
        {
            accessorKey: "avg_ftm",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        FTM
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_ftm}</p>
                )
            }
        },

        // fta
        {
            accessorKey: "avg_fta",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        FTA
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_fta}</p>
                )
            }
        },

        // ft%
        {
            accessorKey: "avg_ft_percentage",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        FT%
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_ft_percentage}%</p>
                )
            }
        },

        // 2pm
        {
            accessorKey: "player_avg_two_m",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        2PM
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.player_avg_two_m}</p>
                )
            }
        },

        // 2pa
        {
            accessorKey: "player_avg_two_a",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        2PA
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.player_avg_two_a}</p>
                )
            }
        },

        // 2p%
        {
            accessorKey: "avg_pf",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        2P%
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.player_avg_two_percentage}%</p>
                )
            }
        }
    ]

    const footer = (
        <TableRow>
            <TableCell>Total</TableCell>
            <TableCell className="text-center">{teamStats.avg_fgm}</TableCell>
            <TableCell className="text-center">{teamStats.avg_fga}</TableCell>
            <TableCell className="text-center">{teamStats.avg_fg_percentage}%</TableCell>
            <TableCell className="text-center">{teamStats.avg_tpm}</TableCell>
            <TableCell className="text-center">{teamStats.avg_tpa}</TableCell>
            <TableCell className="text-center">{teamStats.avg_tp_percentage}%</TableCell>
            <TableCell className="text-center">{teamStats.avg_ftm}</TableCell>
            <TableCell className="text-center">{teamStats.avg_fta}</TableCell>
            <TableCell className="text-center">{teamStats.avg_ft_percentage}</TableCell>
            <TableCell className="text-center">{(+teamStats.avg_fgm - +teamStats.avg_tpm).toFixed(1)}</TableCell>
            <TableCell className="text-center">{(+teamStats.avg_fga - +teamStats.avg_tpa).toFixed(1)}</TableCell>
            <TableCell className="text-center">{((+teamStats.avg_fgm - +teamStats.avg_tpm) / (+teamStats.avg_fga - +teamStats.avg_tpa) * 100).toFixed(1)}%</TableCell>
        </TableRow>
    )

    return (
        <>
            <DataTable columns={columns} data={playerStats || []} footer = {footer}/>
        </>
    )
}

export default TeamShootingStatsTable