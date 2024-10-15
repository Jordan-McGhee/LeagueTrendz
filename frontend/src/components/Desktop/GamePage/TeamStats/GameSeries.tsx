import React, { useState } from "react"
import { Link } from "react-router-dom"

// type imports
import { GameSeriesProps } from "@/types"

// utils imports
import { shortenTeamName, convertDateTeamSchedule } from "../../../../Utils/utils"

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../ui/card"
import { Menubar, MenubarMenu, MenubarTrigger } from "../../../ui/menubar"
import { Separator } from "../../../ui/separator"
import TeamLogo from "../../../ui/TeamLogo"

const GameSeries: React.FC<GameSeriesProps> = ({ teamData, series }) => {

    // showing regular season or playoffs data
    const [showPlayoffs, setShowPlayoffs] = useState(teamData.postseason)

    const lastGame = series[series.length - 1]

    let regularSeasonGames: any = [], playoffGames: any = []


    // divide games up by regular or postseason
    series.forEach((game) => {
        if (game.postseason) {
            playoffGames.push(game)
        } else {
            regularSeasonGames.push(game)
        }
    })

    // determine home and away team
    const awayTeam: number = teamData.away_team_id
    const homeTeam: number = teamData.home_team_id

    // track their wins
    let awayTeamWins: number = 0, homeTeamWins: number = 0, seriesResult: string

    // if we're viewing playoff games, determine playoff series outcome
    if (showPlayoffs) {

        // iterate over games in series and figure out series record between teams
        for (let game of playoffGames) {
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
    
        if (awayTeamWins > homeTeamWins) {
            seriesResult = `${teamData.away_team_abbreviation} won series ${awayTeamWins} - ${homeTeamWins}`
        } else {
            seriesResult = `${teamData.home_team_abbreviation} won series ${homeTeamWins} - ${awayTeamWins}`
        }

    } else {
    // else show regular season series

        // iterate over games in series and figure out series record between teams
        for (let game of regularSeasonGames) {
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
    
        if (awayTeamWins === homeTeamWins) {
            seriesResult = `Series tied ${awayTeamWins} - ${homeTeamWins}`
        } else if (awayTeamWins > homeTeamWins) {
            seriesResult = `${teamData.away_team_abbreviation} leads ${awayTeamWins} - ${homeTeamWins}`
        } else {
            seriesResult = `${teamData.home_team_abbreviation} leads ${homeTeamWins} - ${awayTeamWins}`
        }
    }



    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {
                        lastGame.postseason ?
                            (
                                <Menubar className="w-full">
                                    <MenubarMenu>
                                        <MenubarTrigger style={!showPlayoffs ? { backgroundColor: "black", color: "white" } : {}}
                                            onClick={() => setShowPlayoffs(false)}
                                            className="w-1/2"
                                        >Season</MenubarTrigger> 
                                    </MenubarMenu>

                                    <MenubarMenu>
                                        <MenubarTrigger style={showPlayoffs ? { backgroundColor: "black", color: "white" } : {}}
                                            onClick={() => setShowPlayoffs(true)}
                                            className="w-1/2"
                                        >Playoffs</MenubarTrigger> 
                                    </MenubarMenu>
                                </Menubar>
                            )
                            :
                            'Regular Season Series'
                    }
                    <p className="text-sm font-semibold mt-4 -mb-3">{seriesResult}</p>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {
                    showPlayoffs ?
                    playoffGames.map((game: any) => (
                        <div className="flex flex-col w-full first:my-0 my-2 last:my-0">
                            <Separator />

                            <Link to={`/nba/games/game_id/${game.game_id}?view=team-stats`} className="w-full gap-x-4 flex justify-between items-center p-2 rounded-lg hover:bg-slate-50 hover:cursor-pointer">

                                {/* left side */}
                                <div className="w-3/4 md:w-4/5 flex flex-col gap-2 mr-2">

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
                                <div className="w-1/4 md:w-1/5 flex flex-col gap-y-1 text-xs  font-bold">
                                    <p className="text-gray-500">Game {playoffGames.indexOf(game) + 1}</p>
                                    <p>{convertDateTeamSchedule(game.game_date)}</p>
                                    <p>FINAL</p>
                                </div>
                            </Link>
                        </div>
                    ))
                    :
                    regularSeasonGames.map((game: any) => (
                        <div className="flex flex-col w-full">
                            <Separator className="my-2" />

                            <Link to={`/nba/games/game_id/${game.game_id}?view=team-stats`} className="w-full gap-x-4 flex justify-between items-center p-2 rounded-lg hover:bg-slate-50 hover:cursor-pointer">

                                {/* left side */}
                                <div className="w-3/4 md:w-4/5 flex flex-col gap-2 mr-2">

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
                                <div className="w-1/4 md:w-1/5 flex flex-col gap-y-1 text-xs  font-bold">
                                    <p className="text-gray-500">Game {regularSeasonGames.indexOf(game) + 1}</p>
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