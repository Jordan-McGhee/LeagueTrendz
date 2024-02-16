import React from "react";

import { ColumnDef } from "@tanstack/react-table";

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card"
import { Button } from "../../../../components/ui/button"
import { ArrowUpZAIcon, ArrowDownAZIcon, ArrowUp01Icon, ArrowDown10Icon } from "lucide-react"

// component imports
import { DataTable } from "../../../../components/ui/DataTable";
import TeamLeaders from "../../../../components/Desktop/SingleTeamPage/Stats/TeamLeaders"

// dummy data import
const data = require("../../../../DUMMYDATA/NBA_Roster.json")


// types
// types
type PlayerStats = {
    id: number,
    name: string,
    number: number,
    height: string,
    weight: number,
    birthday: string,
    age: number,
    college: string | "--",
    status: "healthy" | "out" | "day-to-day"
}

type TeamStats = PlayerStats[]

const Stats = () => {



    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Atlanta Hawks Stats 2023-24
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    {/* drop down placeholders */}
                    <div className="w-1/4 flex gap-x-4 mb-4">
                        <div className="h-10 w-36 bg-red-500" />
                        <div className="h-10 w-20 bg-blue-500" />
                    </div>

                    <TeamLeaders />

                    {/* all stats table placeholder */}
                    <p className="my-4 font-semibold text-lg">Player Stats - All Splits</p>
                    <div className="min-h-96 w-full bg-blue-200 rounded-sm p-4">
                        <p>All Stats Table Placeholder</p>
                    </div>

                    {/* shooting stats table placeholder */}
                    <p className="my-4 font-semibold text-lg">Shooting Stats - All Splits</p>
                    <div className="min-h-96 w-full bg-blue-200 mt-4 rounded-sm p-4">
                        <p>Shooting Stats Table Placeholder</p>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default Stats