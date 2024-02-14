import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"

// ui imports
import { Table, TableBody, TableRow, TableCell, TableHead, TableHeader } from "../../ui/table"


// types
type Player = {
    id: number,
    first_name: string,
    last_name: string,
    number: number,
    height: string,
    weight: number,
    birthday: string,
    age: number,
    college: string | "--",
    status: "healthy" | "out" | "day-to-day"
}

type Team = Player[]

const columns: ColumnDef<Player>[] = [
    {
        accessorKey: "NAME",
        header: "NAME"
    },
    {
        accessorKey: "POS",
        header: "POS"
    },
    {
        accessorKey: "AGE",
        header: "AGE"
    },
    {
        accessorKey: "HT",
        header: "HT"
    },
    {
        accessorKey: "WT",
        header: "WT"
    },
    {
        accessorKey: "COLLEGE",
        header: "COLLEGE"
    },
    {
        accessorKey: "SALARY",
        header: "SALARY"
    },
]