import React from "react"

// type imports
import { PlayerPageProps, PlayerCareerHistoryDict } from "../../../../types"

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card"

// component imports
import CareerHistoryItem from "./CareerHistoryItem"

const PlayerCareerHistory: React.FC<PlayerPageProps> = ({ player, currentTeam }) => {

    // iterate over regular season stats
    // check if team name in teams dictionary, if so, add year to array of years
    // if not, add team to dictionary and year

    let careerHistory: PlayerCareerHistoryDict = {
        teamOrder: []
    }

    if (player.regular_season_stats) {

        // iterate over remaining seasons
        for (let season of player.regular_season_stats) {

            // first possibility
            //  tid key exists in dictionary
            if (careerHistory[season.tid]) {

                // check if that team id doesn't equal the last team id in teamOrder (means they've played on this team before, just not lat year)
                if (season.tid !== careerHistory.teamOrder[0]) {
                    // if they don't match, appened the team_id to teamOrder array to update most recent team
                    careerHistory.teamOrder.unshift(season.tid)
                }

                // append the year to the seasons array for this team
                // -1 because 2024 means season started in 2023
                careerHistory[season.tid].push(season.season - 1)
            } else {

                // else, this is the player's first year with that team
                // create the key/value pair
                careerHistory[season.tid] = [season.season - 1]

                // update the teamOrder array
                careerHistory.teamOrder.unshift(season.tid)
            }

        }

        // current team

        // if this player's current team id doesn't equal the first team in team order array
        if (careerHistory.teamOrder[0] !== currentTeam.team_id) {
            // add the current team to beginning of teamOrder array
            careerHistory.teamOrder.unshift(currentTeam.team_id)

            // Ensure careerHistory[currentTeam.team_id] is initialized as an array
            if (!Array.isArray(careerHistory[currentTeam.team_id])) {
                careerHistory[currentTeam.team_id] = [];
            }

            // Check if the current season (2023) is not already in the array
            if (!careerHistory[currentTeam.team_id].includes(2023)) {
                // Add the current season to the array for the current team
                careerHistory[currentTeam.team_id].push(2023);
            }
        } else {
            careerHistory[currentTeam.team_id].push(2023);
        }
    }

    // create set of teams, this will give us most recent first and remove any duplicates
    let teamSet = new Set(careerHistory.teamOrder)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Career History</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-wrap gap-y-6">
                {
                    Array.from(teamSet).map((team_id) => {

                        if (team_id < 0) {
                            return null
                        }

                        return <CareerHistoryItem key={team_id} team_id={team_id} years={careerHistory[team_id]} />
                    })
                }
            </CardContent>
        </Card>
    )
}

export default PlayerCareerHistory