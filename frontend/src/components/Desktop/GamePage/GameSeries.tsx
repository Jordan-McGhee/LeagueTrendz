import React, { useState } from "react"
import { Link } from "react-router-dom"

// type imports
import { GameSeriesProps } from "@/types"

// utils imports
import { shortenTeamName, convertDateTeamSchedule } from "../../../Utils/utils"

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../ui/card"
import { Separator } from "../../ui/separator"
import TeamLogo from "../../ui/TeamLogo"

const GameSeries: React.FC<GameSeriesProps> = ({ teamData, series }) => {

    console.log(series)

    const awayTeam: number = teamData.away_team_id
    const homeTeam: number = teamData.home_team_id

    let awayTeamWins: number = 0, homeTeamWins: number = 0

    // iterate over games in series and figure out series record between teams
    for (let game of series) {
        // case for away team winning and away team equals away team for current game
        if (+game.away_team_score > +game.home_team_score && game.away_team_id === awayTeam) {
            awayTeamWins++

            // case for away team winning and away team equals home team for current game
        } else if (+game.away_team_score > +game.home_team_score && game.away_team_id === homeTeam) {
            homeTeamWins++

            // case for home team winning and home team equals away team for current game
        } else if (+game.home_team_score > +game.away_team_score && game.home_team_id === awayTeam) {
            awayTeamWins++

            // case for home team winning and away team equals home team for current game
        } else {
            homeTeamWins++
        }
    }

    let seriesResult: string
    if (awayTeamWins === homeTeamWins) {
        seriesResult = `Series tied ${awayTeamWins} - ${homeTeamWins}`
    } else if (awayTeamWins > homeTeamWins) {
        seriesResult = `${teamData.away_team_abbreviation} leads ${awayTeamWins} - ${homeTeamWins}`
    } else {
        seriesResult = `${teamData.home_team_abbreviation} leads ${homeTeamWins} - ${awayTeamWins}`
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Regular Season Series
                    <p className="text-sm font-normal">{seriesResult}</p>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {
                    series.map((game) => (
                        <div className="flex flex-col w-full">
                            <Separator className="my-2" />

                            <Link to={`/nba/games/game_id/${game.game_id}?view=team-stats`} className="w-full gap-x-4 flex justify-between items-center p-2 rounded-lg hover:bg-slate-50 hover:cursor-pointer">

                                {/* left side */}
                                <div className="w-4/5 flex flex-col gap-2 mr-2">

                                    {/* away team */}
                                    <div className={+game.away_team_score > +game.home_team_score ? "grid grid-cols-4 gap-2 items-center font-bold text-lg" : "grid grid-cols-4 gap-2 items-center font-bold text-gray-500 text-lg"}>
                                        <TeamLogo team_id={game.away_team_id} abbreviation={game.away_team_abbreviation} logoClass="col-span-1 size-8 object-contain" />
                                        <p className="col-span-2">{shortenTeamName(game.away_team_id)}</p>
                                        <p className="col-span-1 justify-self-end">{game.away_team_score}</p>
                                    </div>

                                    {/* home team */}
                                    <div className={+game.home_team_score > +game.away_team_score ? "grid grid-cols-4 gap-2 items-center font-bold text-lg" : "grid grid-cols-4 gap-2 items-center font-bold text-gray-500 text-lg"}>
                                        <TeamLogo team_id={game.home_team_id} abbreviation={game.home_team_abbreviation} logoClass="size-8 object-contain col-span-1" />
                                        <p className="col-span-2">{shortenTeamName(game.home_team_id)}</p>
                                        <p className="col-span-1 justify-self-end">{game.home_team_score}</p>
                                    </div>

                                </div>

                                {/* right side */}
                                <div className="w-1/5 flex flex-col gap-y-1 text-xs  font-bold">
                                    <p className="text-gray-500">Game {series.indexOf(game) + 1}</p>
                                    <p>{convertDateTeamSchedule(game.game_date)}</p>
                                    <p>FINAL</p>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </CardContent>
        </Card>
    )
}

export default GameSeries