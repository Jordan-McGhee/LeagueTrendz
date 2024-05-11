import React from "react";
import { Link } from "react-router-dom";

// type imports
import { TeamStatsTableProps, PlayerStatsObject, TeamStatsObject } from "../../../../types"

// utils imports
import { convertPlayerPosition } from "../../../../Utils/utils";

// ui imports
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../../ui/DataTable";
import { Button } from "../../../ui/button"
import { CaretSortIcon } from "@radix-ui/react-icons";

const TeamAllStatsTable: React.FC<TeamStatsTableProps> = ({ playerStats, teamStats }) => {

    const columns: ColumnDef<PlayerStatsObject>[] = [
        {
            accessorKey: 'name',
            header: "name",
            cell: ({ row }) => {
                const player_id = row.original.player_id
                const name = row.original.name
                const position = row.original.player_position
                const urlName: string = name.toLowerCase().replace(" ", "-")

                return (
                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player_id}/${urlName}`} className="hover:underline" key={player_id}>
                        {name} {convertPlayerPosition(position)}
                    </Link>
                )
            }
        },
    ]

    return (
        <>
            
        </>
    )
}

export default TeamAllStatsTable