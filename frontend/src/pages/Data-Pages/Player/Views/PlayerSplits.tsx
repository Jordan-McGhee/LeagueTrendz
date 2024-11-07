import React, { useState, useEffect } from "react"

// hooks import
import { useFetch } from "../../../../Hooks/useFetch"

// type imports
import { PlayerPageProps, SplitsData } from "../../../../types"

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../../components/ui/card"
import ErrorModal from "../../../../components/ui/ErrorModal"
import LoadingPage from "../../../LoadingPage"

// component import
import PlayerSplitsTable from "../../../../components/Desktop/PlayerPage/Splits/PlayerSplitsTable"

const PlayerSplits: React.FC<PlayerPageProps> = ({ player, currentTeam }) => {

    const [data, setData] = useState<SplitsData | undefined>()

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch from database
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/players/${player.player_id}/splits`

        let responseData: any

        const fetchPlayer = async () => {
            try {
                responseData = await sendRequest(url)
                setData(responseData.splits)
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

            {!isLoading &&
                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>
                            <p className="text-2xl hidden md:block">2023-24 Splits</p>
                            <p className="md:hidden">'23-24 Splits</p>
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-y-2">

                        {
                            data ?
                                <>
                                    {/* mobile */}
                                    <PlayerSplitsTable data={data} className="md:hidden text-xs" />
                                    
                                    {/* desktop */}
                                    <PlayerSplitsTable data={data} className="hidden md:table text-xs mb-2" />
                                </>
                                :
                                "No splits from 2023-24 season"
                        }
                    </CardContent>

                    <CardFooter>
                        <div className="w-full pt-2">

                            <p className="text-xs font-semibold">GLOSSARY:</p>

                            {/* GLOSSARY */}
                            <div className="text-sm mt-4 md:flex md:justify-between">

                                <div>
                                    <p><span className="font-bold">3P%:</span> 3-Point Field Goal Percentage</p>
                                    <p><span className="font-bold">3PA:</span> 3-Point Field Goals Attempted</p>
                                    <p><span className="font-bold">3PM:</span> 3-Point Field Goals Made</p>
                                    <p><span className="font-bold">AST:</span> Assists Per Game</p>
                                    <p><span className="font-bold">BLK:</span> Blocks Per Game</p>
                                    <p><span className="font-bold">FGA:</span> Field Goals Attempted</p>
                                </div>

                                <div>
                                    <p><span className="font-bold">FGM:</span> Field Goals Made</p>
                                    <p><span className="font-bold">FG%:</span> Field Goal Percentage</p>
                                    <p><span className="font-bold">FTA:</span> Free Throws Attempted</p>
                                    <p><span className="font-bold">FTM:</span> Free Throws Made</p>
                                    <p><span className="font-bold">FT%:</span> Free Throw Percentage</p>
                                    <p><span className="font-bold">MIN:</span> Minutes Per Game</p>
                                </div>

                                <div>
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
            }
        </>
    )
}

export default PlayerSplits