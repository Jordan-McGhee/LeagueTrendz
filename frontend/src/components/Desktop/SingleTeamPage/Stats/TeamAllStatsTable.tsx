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

const TeamAllStatsTable: React.FC<TeamStatsTableProps> = ({ playerStats, teamStats, playoffs }) => {

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

        // gp
        {
            accessorKey: "gp",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        GP
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.gp}</p>
                )
            }
        },

        // gs
        {
            accessorKey: "gs",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        GS
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.gs}</p>
                )
            }
        },

        // min
        {
            accessorKey: "avg_min",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        MIN
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_min}</p>
                )
            }
        },

        // pts
        {
            accessorKey: "avg_pts",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        PTS
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_pts}</p>
                )
            }
        },

        // OR
        {
            accessorKey: "avg_orb",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        OR
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_orb}</p>
                )
            }
        },

        // DR
        {
            accessorKey: "avg_drb",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        DR
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_drb}</p>
                )
            }
        },

        // reb
        {
            accessorKey: "avg_reb",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        REB
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_reb}</p>
                )
            }
        },

        // ast
        {
            accessorKey: "avg_ast",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        AST
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_ast}</p>
                )
            }
        },

        // stl
        {
            accessorKey: "avg_stl",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        STL
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_stl}</p>
                )
            }
        },

        // blk
        {
            accessorKey: "avg_blk",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        BLK
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_blk}</p>
                )
            }
        },

        // to
        {
            accessorKey: "avg_turnovers",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        TO
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_turnovers}</p>
                )
            }
        },

        // pf
        {
            accessorKey: "avg_pf",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        PF
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_pf}</p>
                )
            }
        },

        // ast/to
        {
            accessorKey: "ast_to_ratio",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        AST/TO
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.ast_to_ratio}</p>
                )
            }
        }
    ]

    const playoffColumns: ColumnDef<PlayerStatsObject>[] = [
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

        // gp
        {
            accessorKey: "gp",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        GP
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.gp}</p>
                )
            }
        },

        // // gs
        // {
        //     accessorKey: "gs",
        //     header: ({ column }) => {
        //         return (
        //             <Button
        //                 variant="ghost"
        //                 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        //                 className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
        //             >
        //                 GS
        //                 <CaretSortIcon className="ml-2 h-4 w-4" />
        //             </Button>
        //         )
        //     },
        //     cell: ({ row }) => {
        //         return (
        //             <p className="text-center">{row.original.gs}</p>
        //         )
        //     }
        // },

        // min
        {
            accessorKey: "avg_min",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        MIN
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_min}</p>
                )
            }
        },

        // pts
        {
            accessorKey: "avg_pts",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        PTS
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_pts}</p>
                )
            }
        },

        // OR
        {
            accessorKey: "avg_orb",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        OR
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_orb}</p>
                )
            }
        },

        // DR
        {
            accessorKey: "avg_drb",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        DR
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_drb}</p>
                )
            }
        },

        // reb
        {
            accessorKey: "avg_reb",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        REB
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_reb}</p>
                )
            }
        },

        // ast
        {
            accessorKey: "avg_ast",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        AST
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_ast}</p>
                )
            }
        },

        // stl
        {
            accessorKey: "avg_stl",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        STL
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_stl}</p>
                )
            }
        },

        // blk
        {
            accessorKey: "avg_blk",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        BLK
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_blk}</p>
                )
            }
        },

        // to
        {
            accessorKey: "avg_turnovers",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        TO
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_turnovers}</p>
                )
            }
        },

        // pf
        {
            accessorKey: "avg_pf",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        PF
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.avg_pf}</p>
                )
            }
        },

        // ast/to
        {
            accessorKey: "ast_to_ratio",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ? "px-2 bg-gray-100" : "px-2"}
                    >
                        AST/TO
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center">{row.original.ast_to_ratio}</p>
                )
            }
        }
    ]

    const footer = (
        <TableRow>
            <TableCell>Total</TableCell>
            <TableCell className="text-center">{teamStats.gp}</TableCell>
            { !playoffs && <TableCell></TableCell>}
            <TableCell></TableCell>
            <TableCell className="text-center">{teamStats.avg_pts}</TableCell>
            <TableCell className="text-center">{teamStats.avg_orb}</TableCell>
            <TableCell className="text-center">{teamStats.avg_drb}</TableCell>
            <TableCell className="text-center">{teamStats.avg_reb}</TableCell>
            <TableCell className="text-center">{teamStats.avg_ast}</TableCell>
            <TableCell className="text-center">{teamStats.avg_stl}</TableCell>
            <TableCell className="text-center">{teamStats.avg_blk}</TableCell>
            <TableCell className="text-center">{teamStats.avg_turnovers}</TableCell>
            <TableCell className="text-center">{teamStats.avg_pf}</TableCell>
            <TableCell className="text-center">{(+teamStats.avg_ast / +teamStats.avg_turnovers).toFixed(1)}</TableCell>
        </TableRow>
    )

    return (
        <>
            <DataTable columns={playoffs ? playoffColumns : columns} data={playerStats || []} footer = {footer}/>
        </>
    )
}

export default TeamAllStatsTable