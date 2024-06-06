import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"

// hook imports
import { useFetch } from "../../../Hooks/useFetch";

// type imports
import { DivisionTeamItem } from "@/types";

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

const DivisionStandingsContent = () => {

    // data
    const [data, setData] = useState<DivisionTeamItem[] | undefined>()

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/teams/divisions`

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

    const divisionColumns: ColumnDef<DivisionTeamItem>[] = [
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

        // EAST

        {
            accessorKey: "east_wins",
            header: () => {
                return (
                    <p className="px-2 text-center">EAST</p>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="px-2 text-center">{row.original.east_wins}-{row.original.east_losses}</p>
                )
            }
        },

        // ATL

        {
            accessorKey: "atlantic_wins",
            header: () => {
                return (
                    <p className="px-2 text-center">ATL</p>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="px-2 text-center">{row.original.atlantic_wins}-{row.original.atlantic_losses}</p>
                )
            }
        },

        // CEN

        {
            accessorKey: "central_wins",
            header: () => {
                return (
                    <p className="px-2 text-center">CEN</p>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="px-2 text-center">{row.original.central_wins}-{row.original.central_losses}</p>
                )
            }
        },

        // SE

        {
            accessorKey: "southeast_wins",
            header: () => {
                return (
                    <p className="px-2 text-center">SE</p>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="px-2 text-center">{row.original.southeast_wins}-{row.original.southeast_losses}</p>
                )
            }
        },

        // WEST

        {
            accessorKey: "west_wins",
            header: () => {
                return (
                    <p className="px-2 text-center">WEST</p>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="px-2 text-center">{row.original.west_wins}-{row.original.west_losses}</p>
                )
            }
        },

        // NW

        {
            accessorKey: "northwest_wins",
            header: () => {
                return (
                    <p className="px-2 text-center">NW</p>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="px-2 text-center">{row.original.northwest_wins}-{row.original.northwest_losses}</p>
                )
            }
        },

        // PAC

        {
            accessorKey: "pacific_wins",
            header: () => {
                return (
                    <p className="px-2 text-center">PAC</p>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="px-2 text-center">{row.original.pacific_wins}-{row.original.pacific_losses}</p>
                )
            }
        },

        // SW

        {
            accessorKey: "southwest_wins",
            header: () => {
                return (
                    <p className="px-2 text-center">SW</p>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="px-2 text-center">{row.original.southwest_wins}-{row.original.southwest_losses}</p>
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
                        <DataTable columns={divisionColumns} data={data} />

                    </TabsContent>

                    {/* CONFERENCE CONTENT */}
                    <TabsContent value="conference">


                        {/* EASTERN */}
                        <p className="text-xl font-bold mt-6">EASTERN CONFERENCE</p>
                        <DataTable columns={divisionColumns} data={data.filter((team: DivisionTeamItem) => team.conference === "Eastern")} />

                        {/* WESTERN */}
                        <p className="text-xl font-bold mt-6">WESTERN CONFERENCE</p>
                        <DataTable columns={divisionColumns} data={data.filter((team: DivisionTeamItem) => team.conference === "Western")} />

                    </TabsContent>

                    {/* DIVISIONS CONTENT */}
                    <TabsContent value="division">

                        <p className="text-xl font-bold mt-6">ATLANTIC DIVISION</p>
                        <DataTable columns={divisionColumns} data={data.filter((team: DivisionTeamItem) => team.division === "Atlantic")} />

                        <p className="text-xl font-bold mt-4">CENTRAL DIVISION</p>
                        <DataTable columns={divisionColumns} data={data.filter((team: DivisionTeamItem) => team.division === "Central")} />

                        <p className="text-xl font-bold mt-4">SOUTHEAST DIVISION</p>
                        <DataTable columns={divisionColumns} data={data.filter((team: DivisionTeamItem) => team.division === "Southeast")} />

                        <p className="text-xl font-bold mt-4">NORTHWEST DIVISION</p>
                        <DataTable columns={divisionColumns} data={data.filter((team: DivisionTeamItem) => team.division === "Northwest")} />

                        <p className="text-xl font-bold mt-4">PACIFIC DIVISION</p>
                        <DataTable columns={divisionColumns} data={data.filter((team: DivisionTeamItem) => team.division === "Pacific")} />

                        <p className="text-xl font-bold mt-4">SOUTHWEST DIVISION</p>
                        <DataTable columns={divisionColumns} data={data.filter((team: DivisionTeamItem) => team.division === "Southwest")} />

                    </TabsContent>
                </Tabs>
            }
        </>
    )
}

export default DivisionStandingsContent