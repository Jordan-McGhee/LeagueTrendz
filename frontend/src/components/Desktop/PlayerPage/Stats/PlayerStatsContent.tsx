import React, { useState } from "react";

// type imports
import { Player, TotalsAndAveragesObject } from "@/types";

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select"

// component imports
import PlayerStatsTableAverages from "./PlayerStatsTable-Averages";
import PlayerStatsTableTotals from "./PlayerStatsTable-Totals";

const PlayerStatsContent = ({ player, currentSeasonData, currentSeasonPlayoffData, className }: { player: Player, currentSeasonData: TotalsAndAveragesObject | undefined, currentSeasonPlayoffData: TotalsAndAveragesObject | undefined, className: string }) => {

    const [showPlayoffs, setShowPlayoffs] = useState<boolean>(false)

    const changePlayoffViewHandler = () => {
        setShowPlayoffs(!showPlayoffs)
    }

    const regularSeasonTables = (
        <CardContent className="flex flex-col gap-y-4">
            {/* reg season avg */}
            <PlayerStatsTableAverages title={"Regular Season Averages"} data={player.regular_season_stats} currentData={currentSeasonData} />
            {/* reg season totals */}
            <PlayerStatsTableTotals title={"Regular Season Totals"} data={player.regular_season_stats} currentData={currentSeasonData} />
        </CardContent>
    )

    const playoffTables = (
        <CardContent className="flex flex-col gap-y-4">
            {/* playoff season avg */}
            <PlayerStatsTableAverages title={"Playoff Averages"} data={player.playoff_stats} currentData={currentSeasonPlayoffData || undefined} />
            {/* playoff season totals */}
            <PlayerStatsTableTotals title={"Playoff Totals"} data={player.playoff_stats} currentData={currentSeasonPlayoffData || undefined} />
        </CardContent>
    )

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between items-center">
                        <p>STATS</p>

                        {/* REGULAR SEASON/PLAYOFFS SELECT */}
                        <Select onValueChange={changePlayoffViewHandler}>
                            <SelectTrigger className="w-[200px]" >
                                <SelectValue placeholder="Regular Season" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="regular-season">Regular Season</SelectItem>
                                <SelectItem value="playoffs">Playoffs</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
                </CardTitle>
            </CardHeader>

            {
                player &&
                    showPlayoffs ? playoffTables : regularSeasonTables
            }

            <CardFooter>
                <div className="w-full pt-2">

                    <p className="text-xs font-semibold">GLOSSARY:</p>

                    {/* GLOSSARY */}
                    <div className="text-xs mt-4 flex justify-between">

                        <div className="flex flex-col gap-y-1">
                            <p><span className="font-bold">3P%:</span> 3-Point Field Goal Percentage</p>
                            <p><span className="font-bold">3PA:</span> 3-Point Field Goals Attempted Per Game</p>
                            <p><span className="font-bold">3PM:</span> 3-Point Field Goals Made Per Game</p>
                            <p><span className="font-bold">AST:</span> Assists Per Game</p>
                            <p><span className="font-bold">BLK:</span> Blocks Per Game</p>
                            <p><span className="font-bold">DR:</span> Defensive Rebounds Per Game</p>
                            <p><span className="font-bold">FGA:</span> Field Goal Attempts Per Game</p>
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <p><span className="font-bold">FGM:</span> Field Goals Made Per Game</p>
                            <p><span className="font-bold">FG%:</span> Field Goal Percentage</p>
                            <p><span className="font-bold">FT%:</span> Free Throw Percentage</p>
                            <p><span className="font-bold">FTA:</span> Free Throw Attempts Per Game</p>
                            <p><span className="font-bold">FTM:</span> Free Throws Made Per Game</p>
                            <p><span className="font-bold">GP:</span> Games Played</p>
                            <p><span className="font-bold">GS:</span> Games Started</p>
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <p><span className="font-bold">MIN:</span> Minutes Per Game</p>
                            <p><span className="font-bold">OR:</span> Offensive Rebounds Per Game</p>
                            <p><span className="font-bold">PF:</span> Fouls Per Game</p>
                            <p><span className="font-bold">PTS:</span> Points Per Game</p>
                            <p><span className="font-bold">REB:</span> Rebounds Per Game</p>
                            <p><span className="font-bold">STL:</span> Steals Per Game</p>
                            <p><span className="font-bold">TO:</span> Turnovers Per Game</p>
                        </div>

                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}

export default PlayerStatsContent