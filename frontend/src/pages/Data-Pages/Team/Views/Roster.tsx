import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// hook imports
import { useFetch } from "../../../../Hooks/useFetch";

// type imports
import { Player, TeamPageProps } from "../../../../types"

// utility function import
import { convertPlayerPosition } from "../../../../Utils/utils";

// ui imports
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../../components/ui/button"
import { CaretSortIcon } from "@radix-ui/react-icons";

// component imports
import LoadingPage from "../../../LoadingPage";
import ErrorModal from "../../../../components/ui/ErrorModal"
import RosterTable from "../../../../components/Desktop/TeamPage/Roster/RosterTable"

// mobile component imports
import RosterTableMobile from "../../../../components/Mobile/TeamPage/Roster/RosterTableMobile"


const Roster: React.FC<TeamPageProps> = ({ team }) => {

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

            {/* mobile */}
            <RosterTableMobile team={team} roster={roster} className="block md:hidden" />

            {/* desktop */}
            <RosterTable team={team} roster={roster} className="hidden md:block" />
            
        </div>
    )
}

export default Roster