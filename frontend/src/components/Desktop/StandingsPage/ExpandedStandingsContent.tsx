import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"

// hook imports
import { useFetch } from "../../../Hooks/useFetch";

// type imports
import { ExpandedTeamItem } from "@/types";

// ui imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../ui/DataTable"
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "../../ui/button"
import TeamLogo from "../../ui/TeamLogo"

// component imports
import ErrorModal from "../../ui/ErrorModal"
import LoadingPage from "../../../pages/LoadingPage"

const ExpandedStandingsContent = () => {

    // data
    const [data, setData] = useState<ExpandedTeamItem[] | undefined>()

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/teams/expanded`

        let responseData: any

        const fetchStandings = async () => {
            try {
                responseData = await sendRequest(url)
                setData(responseData.standings)
            } catch (error) {

            }
        }

        fetchStandings()
    }, [sendRequest])

    console.log(data)

    const expandedColumns: ColumnDef<ExpandedTeamItem>[] = [
        // team name
        {
            accessorKey: "full_name",
            header: "",
            cell: ({ row }) => {

                return (
                    <Link to={`/nba/teams/${row.original.abbreviation.toLowerCase()}?view=home`} className="flex gap-x-2 hover:underline hover:underline-offset-2">
                        <TeamLogo team_id={row.original.team_id} abbreviation={row.original.abbreviation} logoClass="size-5 object-contain" />
                        <p>{row.original.full_name}</p>
                    </Link>
                )
            }
        },

        // wins --

        {
            accessorKey: "wins",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ?
                            column.getIsSorted() === "asc" ? "px-2 underline underline-offset-4 bg-slate-400 text-white" : "px-2 overline overline-offset-4 bg-slate-400 text-white"

                            : "px-2 underline underline-offset-4 hover:bg-slate-200"
                        }
                    >
                        W
                        {/* <CaretSortIcon className="h-4" /> */}
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="px-2">{row.original.wins}</p>
                )
            }
        },

        // losses --

        {
            accessorKey: "losses",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ?
                            column.getIsSorted() === "asc" ? "px-2 overline overline-offset-4 bg-slate-400 text-white" : "px-2 underline underline-offset-4 bg-slate-400 text-white"

                            : "px-2 underline underline-offset-4 hover:bg-slate-200"
                        }
                    >
                        L
                        {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="px-2">{row.original.losses}</p>
                )
            }
        },

        // PCT --

        {
            accessorKey: "pct",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ?
                            column.getIsSorted() === "asc" ? "px-2 underline underline-offset-4 bg-slate-400 text-white" : "px-2 overline overline-offset-4 bg-slate-400 text-white"

                            : "px-2 underline underline-offset-4 hover:bg-slate-200"
                        }
                    >
                        PCT
                        {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="px-2">{row.original.pct}</p>
                )
            }
        },

        // gb --

        {
            accessorKey: "gb",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={column.getIsSorted() ?
                            column.getIsSorted() === "asc" ? "px-2 overline overline-offset-4 bg-slate-400 text-white" : "px-2 underline underline-offset-4 bg-slate-400 text-white"

                            : "px-2 underline underline-offset-4 hover:bg-slate-200"
                        }
                    >
                        GB
                        {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="px-2">{row.original.gb}</p>
                )
            }
        },

        // 3 pt games

        {
            accessorKey: "three_point_game_wins",
            header: () => {
                return (
                    <p className="px-2 text-center">3 PT GAMES</p>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="px-2 text-center">{row.original.three_point_game_wins}-{row.original.three_point_game_losses}</p>
                )
            }
        },

        // 10+ pt games

        {
            accessorKey: "ten_point_game_wins",
            header: () => {
                return (
                    <p className="px-2 text-center">10 PT GAMES</p>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="px-2 text-center">{row.original.ten_point_game_wins}-{row.original.ten_point_game_losses}</p>
                )
            }
        },

        // top half

        {
            accessorKey: "top_half_wins",
            header: () => {
                return (
                    <p className="px-2 text-center">VS. .500 & ABOVE </p>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="px-2 text-center">{row.original.top_half_wins}-{row.original.top_half_losses}</p>
                )
            }
        },

        // bottom half

        {
            accessorKey: "bottom_half_wins",
            header: () => {
                return (
                    <p className="px-2 text-center">VS. BELOW .500</p>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="text-center px-2">{row.original.bottom_half_wins}-{row.original.bottom_half_losses}</p>
                )
            }
        }
    ]

    return (
        <>
            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {/* loading state */}
            {isLoading && <LoadingPage />}

            {data &&
                <Tabs defaultValue="conference">
                    <TabsList>
                        <TabsTrigger value="league">League</TabsTrigger>
                        <TabsTrigger value="conference">Conference</TabsTrigger>
                        <TabsTrigger value="division">Division</TabsTrigger>
                    </TabsList>

                    {/* LEAGUE CONTENT */}
                    <TabsContent value="league">

                        <p className="text-xl font-bold mt-6">NATIONAL BASKETBALL ASSOCIATION</p>
                        <DataTable columns={expandedColumns} data={data} />

                    </TabsContent>

                    {/* CONFERENCE CONTENT */}
                    <TabsContent value="conference">


                        {/* EASTERN */}
                        <p className="text-xl font-bold mt-6">EASTERN CONFERENCE</p>
                        <DataTable columns={expandedColumns} data={data.filter((team: ExpandedTeamItem) => team.conference === "Eastern")} />

                        {/* WESTERN */}
                        <p className="text-xl font-bold mt-6">WESTERN CONFERENCE</p>
                        <DataTable columns={expandedColumns} data={data.filter((team: ExpandedTeamItem) => team.conference === "Western")} />

                    </TabsContent>

                    {/* DIVISIONS CONTENT */}
                    <TabsContent value="division">

                        <p className="text-xl font-bold mt-6">ATLANTIC DIVISION</p>
                        <DataTable columns={expandedColumns} data={data.filter((team: ExpandedTeamItem) => team.division === "Atlantic")} />

                        <p className="text-xl font-bold mt-4">CENTRAL DIVISION</p>
                        <DataTable columns={expandedColumns} data={data.filter((team: ExpandedTeamItem) => team.division === "Central")} />

                        <p className="text-xl font-bold mt-4">SOUTHEAST DIVISION</p>
                        <DataTable columns={expandedColumns} data={data.filter((team: ExpandedTeamItem) => team.division === "Southeast")} />

                        <p className="text-xl font-bold mt-4">NORTHWEST DIVISION</p>
                        <DataTable columns={expandedColumns} data={data.filter((team: ExpandedTeamItem) => team.division === "Northwest")} />

                        <p className="text-xl font-bold mt-4">PACIFIC DIVISION</p>
                        <DataTable columns={expandedColumns} data={data.filter((team: ExpandedTeamItem) => team.division === "Pacific")} />

                        <p className="text-xl font-bold mt-4">SOUTHWEST DIVISION</p>
                        <DataTable columns={expandedColumns} data={data.filter((team: ExpandedTeamItem) => team.division === "Southwest")} />

                    </TabsContent>
                </Tabs>
            }
        </>
    )
}

export default ExpandedStandingsContent