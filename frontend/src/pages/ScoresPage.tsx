import React from "react";

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"

// component imports
import DatePagination from "../components/Desktop/SchedulePage/DatePagination";

// DUMMY IMPORT
const games = require("../DUMMYDATA/NBA_Games.json")

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

const schedule: Schedule = games

// filter schedule object and grab first/only index to save for data
const today_games = schedule.games.filter((date) => (
    date.date === "Wednesday, February 7, 2024"
))[0]

const IndividualGame = (props: { key: number, game: Game }) => {

    return (
        <div className="w-full flex justify-between min-h-40">

            {/* LEFT SIDE */}
            <div className="flex flex-col gap-y-4">
                <p className="text-sm font-semibold">{props.game.time}</p>

                {/* team one */}
                <div className="flex gap-x-2 items-center">
                    <div className="bg-red-500 h-10 w-10" />
                    <div className="flex flex-col">
                        <p className="font-bold">{props.game.away_team}</p>
                        <p className="text-xs font-light">(23-25, 10-12 Away)</p>
                    </div>
                </div>

                {/* team two */}
                <div className="flex gap-x-2 items-center">
                    <div className="bg-red-500 h-10 w-10" />
                    <div className="flex flex-col">
                        <p className="font-bold">{props.game.home_team}</p>
                        <p className="text-xs font-light">(29-23, 17-10 Home)</p>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div>

            </div>
        </div>
    )
}

const ScoresPage = () => {

    return (
        <div className="flex justify-between">

            {/* left side div */}
            <div className="w-[65%] flex flex-col gap-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="mb-4 text-xl font-bold">
                            NBA SCOREBOARD
                        </CardTitle>

                        <DatePagination />
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            {today_games.date}
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        { today_games.gamesOfDay.map((game, index) => (
                            <IndividualGame
                                key = { index }
                                game = { game}
                            />
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* right side div */}

            <div className="w-[33%] h-lvh bg-blue-200">
                <p>placeholder</p>
            </div>
        </div>
    )
}

export default ScoresPage