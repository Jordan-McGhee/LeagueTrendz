import React from "react";

import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
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

    const gamesBrokenOutByDate = schedule.games.forEach((dateObject) => {

    })

    let dateArray = Array(10).fill(" ")

    return (
        <div>
            <Card className="">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        NBA Schedule
                    </CardTitle>

                    {/* div for date change placeholder */}
                    <div className="flex gap-x-2">
                        {dateArray.map((date) => (
                            <div className="h-10 w-20 bg-red-900 mt-2" />
                        ))}
                    </div>
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