import React, { useState } from "react"

// type imports
import { GameSeriesProps } from "@/types"

// utils imports
import { shortenTeamName } from "../../../Utils/utils"

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../ui/card"
import { Separator } from "../../ui/separator"
import TeamLogo from "../../ui/TeamLogo"

const GameSeries: React.FC<GameSeriesProps> = ({ teamData, series }) => {

    const awayTeam: number = teamData.away_team_id
    const homeTeam: number = teamData.home_team_id

    let awayTeamWins: number = 0, homeTeamWins: number = 0

    // iterate over games in series and figure out series record between teams
    for (let game of series) {
        // case for away team winning and away team equals away team for current game
        if (game.away_team_score > game.home_team_score && game.away_team_id === awayTeam) {
            awayTeamWins++
        
            // case for away team winning and away team equals home team for current game
        } else if (game.away_team_score > game.home_team_score && game.away_team_id === homeTeam) {
            homeTeamWins++

        // case for home team winning and home team equals away team for current game
        } else if (game.home_team_score > game.away_team_score && game.home_team_id === awayTeam) {
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
                    <div className="flex flex-col gap-y-4">
                        <Separator />
                    </div>
                ))
            }
        </CardContent>
    </Card>
)
}

export default GameSeries