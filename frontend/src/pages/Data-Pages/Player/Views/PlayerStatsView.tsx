import react, { useState, useEffect } from "react"

// hooks import
import { useFetch } from "../../../../Hooks/useFetch"

// type imports
import { PlayerStatsProps, TotalsAndAveragesObject } from "../../../../types"

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../../components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../../../components/ui/select"

// component imports
import ErrorModal from "../../../../components/ui/ErrorModal"
import LoadingPage from "../../../LoadingPage"
import { PlayerStatsTableAverages } from "../../../../components/Desktop/PlayerPage/Stats/PlayerStatsTable-Averages"
import PlayerStatsTableTotals from "../../../../components/Desktop/PlayerPage/Stats/PlayerStatsTable-Totals"



const PlayerStatsView: React.FC<PlayerStatsProps> = ({ player, currentTeam }) => {

    // data state
    const [currentSeasonData, setCurrentSeasonData] = useState<TotalsAndAveragesObject | undefined>()

    // fetch hook
    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch from database
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/players/${player.player_id}/stats`

        let responseData: any

        const fetchPlayer = async () => {
            try {
                responseData = await sendRequest(url)
                setCurrentSeasonData(responseData.stats)
            } catch (error) {

            }
        }

        fetchPlayer()
    }, [sendRequest])

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
            <PlayerStatsTableAverages title={"Playoff Averages"} data={player.playoff_stats} />
            {/* playoff season totals */}
            <PlayerStatsTableTotals title={"Playoff Totals"} data={player.playoff_stats} />
        </CardContent>
    )

    return (
        <>

            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {/* loading state */}
            {isLoading && <LoadingPage />}

            <Card className="mt-4">
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

                            <div>
                                <p><span className="font-bold">3P%:</span> 3-Point Field Goal Percentage</p>
                                <p><span className="font-bold">3PA:</span> 3-Point Field Goals Attempted Per Game</p>
                                <p><span className="font-bold">3PM:</span> 3-Point Field Goals Made Per Game</p>
                                <p><span className="font-bold">AST:</span> Assists Per Game</p>
                                {/* <p><span className="font-bold">AST/TO:</span> Assist to Turnover Ratio</p> */}
                                <p><span className="font-bold">BLK:</span> Blocks Per Game</p>
                                {/* <p><span className="font-bold">DD2:</span> Double Double</p> */}
                                {/* <p><span className="font-bold">DQ</span> Disqualifications</p> */}
                                <p><span className="font-bold">DR:</span> Defensive Rebounds Per Game</p>
                                {/* <p><span className="font-bold">EJECT:</span> Ejections</p> */}
                                <p><span className="font-bold">FGA:</span> Field Goal Attempts Per Game</p>
                            </div>

                            <div>
                                <p><span className="font-bold">FGM:</span> Field Goals Made Per Game</p>
                                <p><span className="font-bold">FG%:</span> Field Goal Percentage</p>
                                {/* <p><span className="font-bold">FLAG:</span> Flagrant Fouls</p> */}
                                <p><span className="font-bold">FT%:</span> Free Throw Percentage</p>
                                <p><span className="font-bold">FTA:</span> Free Throw Attempts Per Game</p>
                                <p><span className="font-bold">FTM:</span> Free Throws Made Per Game</p>
                                <p><span className="font-bold">GP:</span> Games Played</p>
                                <p><span className="font-bold">GS:</span> Games Started</p>
                            </div>

                            <div>
                                <p><span className="font-bold">MIN:</span> Minutes Per Game</p>
                                <p><span className="font-bold">OR:</span> Offensive Rebounds Per Game</p>
                                <p><span className="font-bold">PF:</span> Fouls Per Game</p>
                                <p><span className="font-bold">PTS:</span> Points Per Game</p>
                                {/* <p><span className="font-bold">RAT:</span> Rating</p> */}
                                <p><span className="font-bold">REB:</span> Rebounds Per Game</p>
                                {/* <p><span className="font-bold">SC-EFF:</span> Scoring Efficiency</p> */}
                                {/* <p><span className="font-bold">SH-EFF:</span> Shooting Efficiency</p> */}
                                <p><span className="font-bold">STL:</span> Steals Per Game</p>
                                {/* <p><span className="font-bold">STL/TO:</span> Steal to Turnover Ratio</p> */}
                                {/* <p><span className="font-bold">TD3:</span> Triple Double</p> */}
                                {/* <p><span className="font-bold">TECH:</span> Technical Fouls</p> */}
                                <p><span className="font-bold">TO:</span> Turnovers Per Game</p>
                            </div>

                        </div>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}

export default PlayerStatsView