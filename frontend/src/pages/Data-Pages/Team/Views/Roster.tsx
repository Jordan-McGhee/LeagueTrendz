import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// hook imports
import { useFetch } from "../../../../Hooks/useFetch";

// type imports
import { Player, RosterProps, Team } from "../../../../types"

// ui imports
import { ColumnDef } from "@tanstack/react-table";
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card"
import { Button } from "../../../../components/ui/button"
import { CaretSortIcon, CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";

import { DataTable } from "../../../../components/ui/DataTable";

// component imports
import LoadingPage from "../../../LoadingPage";
import ErrorModal from "../../../../components/ui/ErrorModal"

// utility function import
import { convertPlayerPosition } from "../../../../Utils/utils";

const Roster: React.FC<RosterProps> = ({ team }) => {

    type Roster = Player[]

    const [roster, setRoster] = useState<Roster>([])

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch roster from database
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/teams/${team.team_id}/roster`

        let responseData: any

        const fetchRoster = async () => {
            try {
                responseData = await sendRequest(url)
                setRoster(responseData.roster)
            } catch (error) {

            }
        }

        fetchRoster()
    }, [team, sendRequest])


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
        },
    ]

    return (
        <div>

            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {isLoading && <LoadingPage />}

            <Card>
                <CardHeader>
                    <CardTitle>
                        {team.full_name} Roster 2023-24
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <DataTable columns={columns} data={roster} />

                    <p className="text-sm font-bold mt-4">Coach: <span className="font-light">{team.head_coach}</span></p>
                </CardContent>
            </Card>
        </div>
    )
}

export default Roster