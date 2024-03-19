import React from "react";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"

type Game = {
    home_team: string;
    away_team: string;
    time: string;
};

type DateObject = {
    date: string;
    gamesOfDay: Game[];
};

interface GameDayTableProps {
    dateObject: DateObject;
}

const GameDayTable: React.FC<GameDayTableProps> = ({ dateObject }) => {

    return (
        <div className="mb-4">
            <p className="text-xl font-semibold">{dateObject.date}</p>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/2">MATCHUP</TableHead>
                        <TableHead className="w-1/4">TIME</TableHead>
                        <TableHead className="w-1/4">OUR PICK</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dateObject.gamesOfDay.map((game, index) => (
                        <TableRow key={index}>
                            {/* Render your game details here */}
                            <TableCell>{`LOGO ${game.away_team} @ LOGO ${game.home_team}`}</TableCell>
                            <TableCell>{game.time}</TableCell>
                            <TableCell>{Math.random() > .5 ? `${game.away_team}` : `${game.home_team}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};


export default GameDayTable