import React from "react";
import { Link } from "react-router-dom";

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"

const TeamStandings = () => {

    const placeholderArray = Array(5).fill(" ")

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-bold">
                    2023-24 Southeast Standings
                </CardTitle>
            </CardHeader>

            <CardContent>
                <Table className="text-xs">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-left w-1/3">Team</TableHead>
                            <TableHead className="text-center">W</TableHead>
                            <TableHead className="text-center">L</TableHead>
                            <TableHead className="text-center">PCT</TableHead>
                            <TableHead className="text-center">GB</TableHead>
                            <TableHead className="text-center">STRK</TableHead>
                        </TableRow>
                    </TableHeader>
                    
                    <TableBody>
                        { placeholderArray.map((index) => 
                            <TableRow key={index}>
                                <TableCell className="text-left">Team Name</TableCell>
                                <TableCell className="text-center">29</TableCell>
                                <TableCell className="text-center">24</TableCell>
                                <TableCell className="text-center">.547</TableCell>
                                <TableCell className="text-center">-</TableCell>
                                <TableCell className="text-center">W2</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>

            <CardFooter className="text-sm font-semibold text-blue-700">
                <Link to="/standings">
                    See Full Standings
                </Link>
            </CardFooter>

        </Card>
    )
}

export default TeamStandings