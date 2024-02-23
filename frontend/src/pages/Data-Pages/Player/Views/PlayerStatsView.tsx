// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../../components/ui/card"

// component imports
import PlayerStatsTable from "../../../../components/Desktop/PlayerPage/Stats/PlayerStatsTable"

const PlayerStatsView = () => {

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between items-center">
                        <p>STATS</p>

                        {/* dropdown placeholders */}
                        <div className="flex gap-x-4">
                            <div className="w-24 h-8 bg-red-500 rounded-full" />

                            <div className="w-24 h-8 bg-red-500 rounded-full" />
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-y-4">
                {/* reg season avg */}
                <PlayerStatsTable />
                {/* reg season totals */}
                <PlayerStatsTable />
                {/* misc totals */}
                <PlayerStatsTable />
            </CardContent>

            <CardFooter>
                <div className="w-full pt-2">

                    <p className="text-xs font-semibold">GLOSSARY:</p>

                    {/* GLOSSARY */}
                    <div className="text-xs mt-4 flex justify-between">

                        <div>
                            <p><span className="font-bold">3P%:</span> 3-Point Field Goal Percentage</p>
                            <p><span className="font-bold">3PA:</span> 3-Point Field Goals Attempted Per Game</p>
                            <p><span className="font-bold">3PM:</span> 3-Point Field Goals Made Per Game</p>
                            <p><span className="font-bold">AST:</span> Assists Per Game</p>
                            <p><span className="font-bold">AST/TO:</span> Assist to Turnover Ratio</p>
                            <p><span className="font-bold">BLK:</span> Blocks Per Game</p>
                            <p><span className="font-bold">DD2:</span> Double Double</p>
                            <p><span className="font-bold">DQ</span> Disqualifications</p>
                            <p><span className="font-bold">DR:</span> Defensive Rebounds Per Game</p>
                            <p><span className="font-bold">EJECT:</span> Ejections</p>
                            <p><span className="font-bold">FGA:</span> Field Goal Attempts Per Game</p>
                        </div>

                        <div>
                            <p><span className="font-bold">FGM:</span> Field Goals Made Per Game</p>
                            <p><span className="font-bold">FG%:</span> Field Goal Percentage</p>
                            <p><span className="font-bold">FLAG:</span> Flagrant Fouls</p>
                            <p><span className="font-bold">FT%:</span> Free Throw Percentage</p>
                            <p><span className="font-bold">FTA:</span> Free Throw Attempts Per Game</p>
                            <p><span className="font-bold">FTM:</span> Free Throws Made Per Game</p>
                            <p><span className="font-bold">GP:</span> Games Played</p>
                            <p><span className="font-bold">GS:</span> Games Started</p>
                            <p><span className="font-bold">MIN:</span> Minutes Per Game</p>
                            <p><span className="font-bold">OR:</span> Offensive Rebounds Per Game</p>
                            <p><span className="font-bold">PF:</span> Fouls Per Game</p>
                        </div>

                        <div>
                            <p><span className="font-bold">PTS:</span> Points Per Game</p>
                            <p><span className="font-bold">RAT:</span> Rating</p>
                            <p><span className="font-bold">REB:</span> Rebounds Per Game</p>
                            <p><span className="font-bold">SC-EFF:</span> Scoring Efficiency</p>
                            <p><span className="font-bold">SH-EFF:</span> Shooting Efficiency</p>
                            <p><span className="font-bold">STL:</span> Steals Per Game</p>
                            <p><span className="font-bold">STL/TO:</span> Steal to Turnover Ratio</p>
                            <p><span className="font-bold">TD3:</span> Triple Double</p>
                            <p><span className="font-bold">TECH:</span> Technical Fouls</p>
                            <p><span className="font-bold">TO:</span> Turnovers Per Game</p>
                        </div>

                        {/* RAT:Rating
                        REB:Rebounds Per Game
                        SC-EFF:Scoring Efficiency
                        SH-EFF:Shooting Efficiency
                        STL:Steals Per Game
                        STL/TO:Steal To Turnover Ratio
                        TD3:Triple Double
                        TECH:Technical Fouls
                        TO:Turnovers Per Game */}
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}

export default PlayerStatsView