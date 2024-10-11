import React from "react";
import { Link } from "react-router-dom";

// type imports
import { GameDayTableProps } from "@/types";

// utils imports
import { shortenPlayerName, shortenTeamName } from "../../../Utils/utils";

// component imports

// ui imports
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"
import TeamLogo from "../../ui/TeamLogo"
import GameDayTableRowMobile from "./GameDayTableRow-Mobile"

const GameDayTableMobile: React.FC<GameDayTableProps> = ({ games }) => {

    return (
        <div className="mb-4">
            <Table className="text-xs">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-4/5">MATCHUP</TableHead>
                        <TableHead className="w-1/5">MVPs</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {games.map((game) => (
                        <GameDayTableRowMobile game={game} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};


export default GameDayTableMobile