import React, { useState } from "react";

// type imports
import { Player, TotalsAndAveragesObject } from "@/types";

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs"

// component imports
import PlayerStatsTableAveragesMobile from "./Tables/PlayerStatsTableAverages-Mobile";
import PlayerStatsTableTotalsMobile from "./Tables/PlayerStatsTableTotals-Mobile";

const PlayerStatsContentMobile = ({ player, currentSeasonData, currentSeasonPlayoffData, teamColor, className }: { player: Player, currentSeasonData: TotalsAndAveragesObject | undefined, currentSeasonPlayoffData: TotalsAndAveragesObject | undefined, teamColor?: string, className?: string }) => {

    // state to track when select drop down is open
    const [isOpen, setIsOpen] = useState(false);
    const [showPlayoffs, setShowPlayoffs] = useState<boolean>(false)
    const [showTotals, setShowTotals] = useState<boolean>(false)

    const changePlayoffViewHandler = () => {
        setShowPlayoffs(!showPlayoffs)
    }

    const toggleShowTotalsHandler = () => {
        setShowTotals(!showTotals)
    }


    const regularSeasonTables = (
        <CardContent className="flex flex-col gap-y-4">

            {
                showTotals ?
                    // {/* reg season totals */}
                    <PlayerStatsTableTotalsMobile data={player.regular_season_stats} currentData={currentSeasonData} />
                    :
                    // {/* reg season avg */}
                    <PlayerStatsTableAveragesMobile data={player.regular_season_stats} currentData={currentSeasonData} />
            }
        </CardContent>
    )

    const playoffTables = (
        <CardContent className="flex flex-col gap-y-4">

            {
                showTotals ?
                    // {/* playoff season totals */ }
                    < PlayerStatsTableTotalsMobile data={player.playoff_stats} currentData={currentSeasonPlayoffData || undefined} />

                    :
                    // {/* playoff season avg */}
                    < PlayerStatsTableAveragesMobile data={player.playoff_stats} currentData={currentSeasonPlayoffData || undefined} />

            }
        </CardContent>
    )

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle><div className="flex justify-between items-center">
                    <p>STATS</p>

                    {/* REGULAR SEASON/PLAYOFFS SELECT */}
                    <Select
                        onValueChange={changePlayoffViewHandler}
                        onOpenChange={(open) => setIsOpen(open)}
                    >
                        <SelectTrigger className="w-[150px]" >
                            <SelectValue placeholder="Regular Season" />
                        </SelectTrigger>
                        <SelectContent className="z-10">
                            <SelectItem value="regular-season">Regular Season</SelectItem>
                            <SelectItem value="playoffs">Playoffs</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Blocking overlay for when select is open — preventing user from clicking random links below*/}
                    {isOpen && (
                        <div
                            className="fixed inset-0 bg-transparent"
                            style={{ zIndex: 9 }}
                            onClick={(e) => e.preventDefault()}
                        />
                    )}

                </div></CardTitle>
            </CardHeader>

            <CardContent>
                <Tabs onValueChange={toggleShowTotalsHandler} defaultValue="average">
                    <TabsList className="w-full mx-auto text-white -mt-2" style={{ backgroundColor: teamColor }}>
                        <TabsTrigger className="w-1/2" style={!showTotals ? { color: teamColor } : {}} value="average">Averages</TabsTrigger>
                        <TabsTrigger className="w-1/2" style={showTotals ? { color: teamColor } : {}} value="totals">Totals</TabsTrigger>
                    </TabsList>

                    {/* regular season */}
                    <TabsContent value="regular">

                    </TabsContent>

                    {/* playoffs */}
                    <TabsContent value="playoffs">

                    </TabsContent>
                </Tabs>


            </CardContent>

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
                            <p><span className="font-bold">FGM:</span> Field Goals Made Per Game</p>
                            <p><span className="font-bold">FG%:</span> Field Goal Percentage</p>
                            <p><span className="font-bold">FT%:</span> Free Throw Percentage</p>
                            <p><span className="font-bold">FTA:</span> Free Throw Attempts Per Game</p>
                            <p><span className="font-bold">FTM:</span> Free Throws Made Per Game</p>
                            <p><span className="font-bold">GP:</span> Games Played</p>
                            <p><span className="font-bold">GS:</span> Games Started</p>
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

export default PlayerStatsContentMobile