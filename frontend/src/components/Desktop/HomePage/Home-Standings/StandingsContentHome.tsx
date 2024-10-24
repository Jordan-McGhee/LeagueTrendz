import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// hook imports
import { useFetch } from "../../../../Hooks/useFetch"

// type imports
import { StandingsTeamItem } from "@/types"

// utils imports
import { countStreak, lastTenConverter } from "../../../../Utils/utils"

// ui imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "../../../ui/DataTable"
import TeamLogo from "../../../ui/TeamLogo"

// component imports
import ErrorModal from "../../../ui/ErrorModal"
import LoadingPage from "../../../../pages/LoadingPage"

const StandingsContentHome = () => {

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


    // define columns for data table - DESKTOP
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

    // define columns for data table - MOBILE
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
                    <Tabs defaultValue="eastern" className="hidden md:block">
                        <TabsList>
                            <TabsTrigger value="eastern">Eastern Conference</TabsTrigger>
                            <TabsTrigger value="western">Western Conference</TabsTrigger>
                        </TabsList>

                        {/* LEAGUE CONTENT */}
                        <TabsContent value="eastern">

                            {/* EASTERN */}
                            {/* <p className="text-xl font-bold mt-6">EASTERN CONFERENCE</p> */}
                            <DataTable columns={standardColumns} data={data.filter((team: StandingsTeamItem) => team.conference === "Eastern")} />

                        </TabsContent>

                        {/* CONFERENCE CONTENT */}
                        <TabsContent value="western">

                            {/* WESTERN */}
                            {/* <p className="text-xl font-bold mt-6">WESTERN CONFERENCE</p> */}
                            <DataTable columns={standardColumns} data={data.filter((team: StandingsTeamItem) => team.conference === "Western")} />

                        </TabsContent>
                    </Tabs>

                    {/* MOBILE */}
                    <Tabs defaultValue="eastern" className="md:hidden">
                        <TabsList className="flex items-center w-full mx-auto -mt-2">
                            <TabsTrigger className="w-1/2" value="eastern">Eastern</TabsTrigger>
                            <TabsTrigger className="w-1/2" value="western">Western</TabsTrigger>
                        </TabsList>

                        {/* LEAGUE CONTENT */}
                        <TabsContent value="eastern">

                            {/* EASTERN */}
                            <DataTable columns={mobileColumns} data={data.filter((team: StandingsTeamItem) => team.conference === "Eastern")} />

                        </TabsContent>

                        {/* CONFERENCE CONTENT */}
                        <TabsContent value="western">

                            {/* WESTERN */}
                            <DataTable columns={mobileColumns} data={data.filter((team: StandingsTeamItem) => team.conference === "Western")} />

                        </TabsContent>
                    </Tabs>
                </div>
            }
        </>
    )
}

export default StandingsContentHome