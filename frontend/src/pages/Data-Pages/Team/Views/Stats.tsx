import React from "react";

import { ColumnDef } from "@tanstack/react-table";

// ui imports
// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card"
import { Button } from "../../../../components/ui/button"
import { ArrowUpZAIcon, ArrowDownAZIcon, ArrowUp01Icon, ArrowDown10Icon } from "lucide-react"

import { DataTable } from "../../../../components/ui/DataTable";

// dummy data import
const data = require("../../../../DUMMYDATA/NBA_Roster.json")


// types
// types
type Player = {
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

type Team = Player[]
const roster: Team = data.lineup


const TeamLeaders = () => {

}

const Stats = () => {
    

}

export default Stats