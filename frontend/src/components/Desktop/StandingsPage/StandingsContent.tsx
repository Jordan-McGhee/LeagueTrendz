import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"

// hook imports
import { useFetch } from "../../../Hooks/useFetch";

// type imports
import { StandingsTeamItem } from "@/types";

// utils imports
import { countStreak, lastTenConverter } from "../../../Utils/utils";

// ui imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../ui/DataTable"
import { Button } from "../../ui/button"
import TeamLogo from "../../ui/TeamLogo"

// component imports
import ErrorModal from "../../ui/ErrorModal"
import LoadingPage from "../../../pages/LoadingPage"

const StandingsContent = () => {

    // data
    const [data, setData] = useState<StandingsTeamItem[] | undefined>()

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/teams/standings`

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


    // define columns for data table
    const standardColumns: ColumnDef<StandingsTeamItem>[] = [

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

        // home

        {
            accessorKey: "home_wins",
            header: () => {
                return (
                    <p className="px-2">HOME</p>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="px-2">{row.original.home_wins}-{row.original.home_losses}</p>
                )
            }
        },

        // away

        {
            accessorKey: "away_wins",
            header: () => {
                return (
                    <p className="px-2">AWAY</p>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="px-2">{row.original.away_wins}-{row.original.away_losses}</p>
                )
            }
        },

        // conference

        {
            accessorKey: "conf_wins",
            header: () => {
                return (
                    <p className="px-2">CONF</p>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="px-2">{row.original.conf_wins}-{row.original.conf_losses}</p>
                )
            }
        },

        // division

        {
            accessorKey: "div_wins",
            header: () => {
                return (
                    <p className="px-2">DIV</p>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="px-2">{row.original.div_wins}-{row.original.div_losses}</p>
                )
            }
        },

        // ppg --

        {
            accessorKey: "ppg",
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
                        PPG
                        {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="px-2">{row.original.ppg}</p>
                )
            }
        },

        // opp ppg --

        {
            accessorKey: "opp_ppg",
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
                        OPP PPG
                        {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="px-2">{row.original.opp_ppg}</p>
                )
            }
        },

        // diff --

        {
            accessorKey: "diff",
            header: () => {
                return (
                    <p className="px-2">DIFF</p>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className={+row.original.diff > 0 ? "px-2 text-green-600" : "px-2 text-red-600"}>{+row.original.diff > 0 ? "+" : ""}{+row.original.diff}</p>
                )
            }
        },

        // streak 

        {
            accessorKey: "last_10",
            header: () => {
                return (
                    <p className="px-2">STRK</p>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="px-2">{countStreak(row.original.last_10)}</p>
                )
            }
        },

        // l10
        {
            accessorKey: "last_10",
            header: () => {
                return (
                    <p className="px-2">L10</p>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="px-2">{lastTenConverter(row.original.last_10)}</p>
                )
            }
        }
    ]

    const mobileColumns: ColumnDef<StandingsTeamItem>[] = [

        // team name
        {
            accessorKey: "full_name",
            header: "",
            cell: ({ row }) => {

                return (
                    <Link to={`/nba/teams/${row.original.abbreviation.toLowerCase()}?view=home`} className="flex gap-x-2 hover:underline hover:underline-offset-2">
                        <TeamLogo team_id={row.original.team_id} abbreviation={row.original.abbreviation} logoClass="size-5 object-contain" />
                        <p>{row.original.abbreviation}</p>
                    </Link>
                )
            }
        },

        // wins --

        {
            accessorKey: "wins",
            header: ({ column }) => {
                return (
                    <p className="px-2">W</p>
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
                    <p className="px-2">L</p>
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
                    <p className="px-2">PCT</p>
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
                    <p className="px-2">GB</p>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="px-2">{row.original.gb}</p>
                )
            }
        },

        // l10
        {
            accessorKey: "last_10",
            header: () => {
                return (
                    <p className="px-2">L10</p>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className="px-2">{lastTenConverter(row.original.last_10)}</p>
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

                <div>

                    {/* DESKTOP */}
                    <Tabs defaultValue="conference" className="hidden md:block">
                        <TabsList>
                            <TabsTrigger value="league">League</TabsTrigger>
                            <TabsTrigger value="conference">Conference</TabsTrigger>
                            <TabsTrigger value="division">Division</TabsTrigger>
                        </TabsList>

                        {/* LEAGUE CONTENT */}
                        <TabsContent value="league">

                            <p className="text-xl font-bold mt-6">NBA</p>
                            <DataTable columns={standardColumns} data={data} />

                        </TabsContent>

                        {/* CONFERENCE CONTENT */}
                        <TabsContent value="conference">


                            {/* EASTERN */}
                            <p className="text-xl font-bold mt-6">EASTERN CONFERENCE</p>
                            <DataTable columns={standardColumns} data={data.filter((team: StandingsTeamItem) => team.conference === "Eastern")} />

                            {/* WESTERN */}
                            <p className="text-xl font-bold mt-6">WESTERN CONFERENCE</p>
                            <DataTable columns={standardColumns} data={data.filter((team: StandingsTeamItem) => team.conference === "Western")} />

                        </TabsContent>

                        {/* DIVISIONS CONTENT */}
                        <TabsContent value="division">

                            <p className="text-xl font-bold mt-6">ATLANTIC DIVISION</p>
                            <DataTable columns={standardColumns} data={data.filter((team: StandingsTeamItem) => team.division === "Atlantic")} />

                            <p className="text-xl font-bold mt-4">CENTRAL DIVISION</p>
                            <DataTable columns={standardColumns} data={data.filter((team: StandingsTeamItem) => team.division === "Central")} />

                            <p className="text-xl font-bold mt-4">SOUTHEAST DIVISION</p>
                            <DataTable columns={standardColumns} data={data.filter((team: StandingsTeamItem) => team.division === "Southeast")} />

                            <p className="text-xl font-bold mt-4">NORTHWEST DIVISION</p>
                            <DataTable columns={standardColumns} data={data.filter((team: StandingsTeamItem) => team.division === "Northwest")} />

                            <p className="text-xl font-bold mt-4">PACIFIC DIVISION</p>
                            <DataTable columns={standardColumns} data={data.filter((team: StandingsTeamItem) => team.division === "Pacific")} />

                            <p className="text-xl font-bold mt-4">SOUTHWEST DIVISION</p>
                            <DataTable columns={standardColumns} data={data.filter((team: StandingsTeamItem) => team.division === "Southwest")} />

                        </TabsContent>
                    </Tabs>

                    {/* DESKTOP */}
                    <Tabs defaultValue="conference" className="md:hidden">
                        <TabsList>
                            <TabsTrigger value="league">League</TabsTrigger>
                            <TabsTrigger value="conference">Conference</TabsTrigger>
                            <TabsTrigger value="division">Division</TabsTrigger>
                        </TabsList>

                        {/* LEAGUE CONTENT */}
                        <TabsContent value="league">

                            <p className="text-xl font-bold mt-6">NBA</p>
                            <DataTable columns={mobileColumns} data={data} />

                        </TabsContent>

                        {/* CONFERENCE CONTENT */} 
                        <TabsContent value="conference">


                            {/* EASTERN */}
                            <p className="text-xl font-bold mt-6">EASTERN CONFERENCE</p>
                            <DataTable columns={mobileColumns} data={data.filter((team: StandingsTeamItem) => team.conference === "Eastern")} />

                            {/* WESTERN */}
                            <p className="text-xl font-bold mt-6">WESTERN CONFERENCE</p>
                            <DataTable columns={mobileColumns} data={data.filter((team: StandingsTeamItem) => team.conference === "Western")} />

                        </TabsContent>

                        {/* DIVISIONS CONTENT */}
                        <TabsContent value="division">

                            <p className="text-xl font-bold mt-6">ATLANTIC DIVISION</p>
                            <DataTable columns={mobileColumns} data={data.filter((team: StandingsTeamItem) => team.division === "Atlantic")} />

                            <p className="text-xl font-bold mt-4">CENTRAL DIVISION</p>
                            <DataTable columns={mobileColumns} data={data.filter((team: StandingsTeamItem) => team.division === "Central")} />

                            <p className="text-xl font-bold mt-4">SOUTHEAST DIVISION</p>
                            <DataTable columns={mobileColumns} data={data.filter((team: StandingsTeamItem) => team.division === "Southeast")} />

                            <p className="text-xl font-bold mt-4">NORTHWEST DIVISION</p>
                            <DataTable columns={mobileColumns} data={data.filter((team: StandingsTeamItem) => team.division === "Northwest")} />

                            <p className="text-xl font-bold mt-4">PACIFIC DIVISION</p>
                            <DataTable columns={mobileColumns} data={data.filter((team: StandingsTeamItem) => team.division === "Pacific")} />

                            <p className="text-xl font-bold mt-4">SOUTHWEST DIVISION</p>
                            <DataTable columns={mobileColumns} data={data.filter((team: StandingsTeamItem) => team.division === "Southwest")} />

                        </TabsContent>
                    </Tabs>
                </div>
            }
        </>
    )
}

export default StandingsContent