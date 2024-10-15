import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// hooks import
import { useFetch } from "../../../../Hooks/useFetch"

// type imports
import { BoxScoreViewProps, GameSeriesState, GameLeadersState } from "@/types";

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card"
import { Table, TableHeader, TableHead, TableRow, TableCell, TableBody, TableFooter } from "../../../../components/ui/table"
import TeamLogo from "../../../../components/ui/TeamLogo"

// component imports
import ErrorModal from "../../../../components/ui/ErrorModal"
import LoadingPage from "../../../../pages/LoadingPage";
import GameStatsTable from "../../../../components/Desktop/GamePage/TeamStats/GameStatsTable"
import GameLeaders from "../../../../components/Desktop/GamePage/TeamStats/GameLeaders"
import GameSeries from "../../../../components/Desktop/GamePage/TeamStats/GameSeries";

const TeamStatsView: React.FC<BoxScoreViewProps> = ({ teamData }) => {

    const [gameSeries, setGameSeries] = useState<GameSeriesState[] | undefined>()
    const [gameLeaders, setGameLeaders] = useState<GameLeadersState[] | undefined>()

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch stats from database
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/games/game_id/${teamData.game_id}/home_team/${teamData.home_team_id}/away_team/${teamData.away_team_id}`

        let responseData: any

        const fetchTeamStats = async () => {
            try {
                responseData = await sendRequest(url)
                setGameSeries(responseData.gameSeries)
                setGameLeaders(responseData.gameLeaders)
            } catch (error) {

            }
        }

        fetchTeamStats()

    }, [sendRequest, teamData.game_id])

    // console.log(gameSeries, gameLeaders)

    return (
        <div className="pb-24 md:pb-8">
            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {isLoading && <LoadingPage />}

            {/* mobile */}
            <div className="flex flex-col md:hidden gap-y-6">

                {
                    gameLeaders &&
                    <GameLeaders teamData={teamData} players={gameLeaders} />
                }

                <Card className="w-full h-fit">
                    <CardContent>
                        <GameStatsTable teamData={teamData} />
                    </CardContent>
                </Card>

                {
                    gameSeries &&
                    <GameSeries teamData={teamData} series={gameSeries} />
                }
            </div>

            {/* desktop */}
            <div className="hidden md:flex gap-x-4 justify-between">
                {/* left side */}
                <Card className="w-[65%] h-fit">
                    <CardContent>
                        <GameStatsTable teamData={teamData} />
                    </CardContent>
                </Card>

                {/* right side */}
                <div className="md:w-[35%] flex flex-col gap-y-4">
                    {
                        gameLeaders &&
                        <GameLeaders teamData={teamData} players={gameLeaders} />
                    }

                    {
                        gameSeries &&
                        <GameSeries teamData={teamData} series={gameSeries} />
                    }
                </div>
            </div>
        </div>
    )
}

export default TeamStatsView