// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../../components/ui/card"

// component import
import PlayerGameLogTable from "../../../../components/Desktop/PlayerPage/GameLog/PlayerGameLogTable"

const PlayerGameLog = () => {

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between items-center">
                        <p className="text-2xl">Game Log</p>
                        <div className="h-8 w-24 rounded-full bg-red-200" />
                    </div>
                </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-y-2">
                <p>2023-24 Regular Season</p>
                <PlayerGameLogTable />
                <PlayerGameLogTable />
                <PlayerGameLogTable />
                <PlayerGameLogTable />
                <PlayerGameLogTable />
            </CardContent>

            <CardFooter>
                <div className="w-full pt-2">

                    <p className="text-xs font-semibold">GLOSSARY:</p>

                    {/* GLOSSARY */}
                    <div className="text-xs mt-4 flex justify-between">

                        <div>
                            <p><span className="font-bold">3P%:</span> 3-Point Field Goal Percentage</p>
                            <p><span className="font-bold">3PA:</span> 3-Point Field Goals Made-Attempted</p>
                            <p><span className="font-bold">AST:</span> Assists Per Game</p>
                            <p><span className="font-bold">BLK:</span> Blocks Per Game</p>
                            <p><span className="font-bold">FGA:</span> Field Goals Made-Attempted</p>
                        </div>

                        <div>
                            <p><span className="font-bold">FG%:</span> Field Goal Percentage</p>
                            <p><span className="font-bold">FT:</span> Free Throws Made-Attempted</p>
                            <p><span className="font-bold">FT%:</span> Free Throw Percentage</p>
                            <p><span className="font-bold">MIN:</span> Minutes Per Game</p>
                            <p><span className="font-bold">PF:</span> Fouls Per Game</p>
                        </div>

                        <div>
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

export default PlayerGameLog