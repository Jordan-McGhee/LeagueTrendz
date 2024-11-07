import React, { useState, useEffect } from "react"

// hooks import
import { useFetch } from "../../../../Hooks/useFetch"

// type imports
import { PlayerPageProps, GameLogData } from "../../../../types"

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card"
import ErrorModal from "../../../../components/ui/ErrorModal"
import LoadingPage from "../../../LoadingPage"


// component import
import PlayerGameLogTable from "../../../../components/Desktop/PlayerPage/GameLog/PlayerGameLogTable"

const PlayerGameLog: React.FC<PlayerPageProps> = ({ player, currentTeam }) => {

    const [regularSeasonData, setRegularSeasonData] = useState<GameLogData[] | undefined>()
    const [playoffData, setPlayoffData] = useState<GameLogData[] | undefined>()

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch from database
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/players/${player.player_id}/gamelog`

        let responseData: any

        const fetchPlayer = async () => {
            try {
                responseData = await sendRequest(url)
                setRegularSeasonData(responseData.regular_season_log)
                responseData.playoff_log !== undefined && setPlayoffData(responseData.playoff_log)
            } catch (error) {

            }
        }

        fetchPlayer()
    }, [sendRequest, player.player_id])

    return (
        <>

            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {/* loading state */}
            {isLoading && <LoadingPage />}

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>
                        <p className="text-2xl">Game Log</p>
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-y-2">

                    {/* no data case */}
                    {
                        !playoffData && regularSeasonData?.length === 0 &&
                        <p>No game log data for 2023-24 season.</p>
                    }

                    {/* playoff data */}
                    {
                        playoffData &&
                        <div>
                            <p className="text-2xl hidden md:block">2023-24 Playoffs</p>
                            <p className="md:hidden font-semibold">'23-24 Playoffs</p>
                            {
                                playoffData.map((gameSet) => (
                                    <PlayerGameLogTable month={gameSet.month} games={gameSet.games} avg_stats={gameSet.avg_stats} key={`Playoffs-${gameSet.month}`} />
                                ))
                            }
                        </div>
                    }

                    {/* regular season data */}
                    {
                        regularSeasonData && regularSeasonData.length > 0 &&
                        <div>
                            <p className="text-2xl hidden md:block">2023-24 Regular Season</p>
                            <p className="md:hidden font-semibold">'23-24 Regular Season</p>
                            {regularSeasonData?.map((gameSet) => (
                                <PlayerGameLogTable month={gameSet.month} games={gameSet.games} avg_stats={gameSet.avg_stats}  key={`RegularSeason-${gameSet.month}`} />
                            ))}
                        </div>
                    }

                </CardContent>
            </Card>
        </>
    )
}

export default PlayerGameLog