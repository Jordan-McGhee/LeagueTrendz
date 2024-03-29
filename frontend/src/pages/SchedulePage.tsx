import React from "react";

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"

// component imports
import DatePagination from "../components/Desktop/SchedulePage/DatePagination";
import GameDayTable from "../components/Desktop/SchedulePage/GameDayTable";

// DUMMY IMPORT
const games = require("../DUMMYDATA/NBA_Games.json")

const SchedulePage = () => {

    // typing JSON DATA
    type Game = {
        home_team: string,
        away_team: string,
        time: string
    }

    type DateObject = {
        date: string,
        gamesOfDay: Game[]
    }

    type Schedule = {
        games: DateObject[]
    }

    // getting overall object of schedule from json
    const schedule: Schedule = games

    return (
        <div>
            <Card className="">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        NBA Schedule
                    </CardTitle>

                    {/* div for date change placeholder */}
                    <DatePagination />
                </CardHeader>

                <CardContent>
                    {schedule.games.map((dateObject, index) => (
                        <GameDayTable key={index} dateObject={dateObject} />
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}

export default SchedulePage