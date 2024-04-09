import React, { useState, useEffect } from "react";

// hook imports
import { useFetch } from "../../../../Hooks/useFetch";

// type imports
import { Player, Team } from "../../../../types"

// ui imports
import { ColumnDef } from "@tanstack/react-table";
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card"
import { Button } from "../../../../components/ui/button"
import { ArrowUpZAIcon, ArrowDownAZIcon, ArrowUp01Icon, ArrowDown10Icon } from "lucide-react"

import { DataTable } from "../../../../components/ui/DataTable";

// component imports
import LoadingPage from "../../../LoadingPage";
import ErrorModal from "../../../../components/ui/ErrorModal"

const Roster = (props: { team: Team }) => {

    type Roster = Player[]

    const [roster, setRoster] = useState<Roster>([])

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch roster from database
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/teams/${props.team.team_id}/roster`

        let responseData: any

        const fetchRoster = async () => {
            try {
                responseData = await sendRequest(url)
                setRoster(responseData.roster)
                console.log(responseData.roster)
            } catch (error) {

            }
        }

        fetchRoster()
    }, [])


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
            accessorKey: "player_position",
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
            accessorKey: "status",
            header: "STATUS"
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
                        {props.team.full_name} Roster 2023-24
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <DataTable columns={columns} data={roster} />

                    <p className="text-sm font-bold mt-4">Coach: <span className="font-light">{props.team.head_coach}</span></p>
                </CardContent>
            </Card>
        </div>
    )
}

export default Roster