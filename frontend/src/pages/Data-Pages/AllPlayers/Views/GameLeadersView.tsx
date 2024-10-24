import React, { useState, useEffect } from "react";

// hook imports
import { useFetch } from "../../../../Hooks/useFetch";

// type imports
import { GameLeadersState } from "@/types";

// utils imports

// ui imports
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"

// component imports
import ErrorModal from "../../../../components/ui/ErrorModal"
import LoadingPage from "../../../LoadingPage"
import GameHighs from "../../../../components/Desktop/AllPlayersPage/Views/GameHighs"

// mobile component
import GameHighsMobile from "../../../../components/Mobile/AllPlayersPage/Views/GameHighs-Mobile"

const GameLeadersView = () => {

    const [gameLeaders, setGameLeaders] = useState<GameLeadersState | undefined>()

    const [seasonType, setSeasonType] = useState<string>('regular-season');

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch game highs from database
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/players/game-highs/${seasonType === 'playoffs' ? 'playoffs' : 'regular-season'}`

        let responseData: any

        const fetchGameHighs = async () => {
            try {
                responseData = await sendRequest(url)
                setGameLeaders(responseData.gameLeaders)
            } catch (error) {

            }
        }

        fetchGameHighs()
    }, [sendRequest, seasonType])


    return (
        <>

            {/* top section */}

            <div className="flex gap-x-2 mb-4">

                {/* season type */}
                <div>
                    <p className="text-xs font-semibold mb-1">SEASON TYPE</p>
                    <Select value={seasonType} onValueChange={(newValue) => setSeasonType(newValue)}>
                        <SelectTrigger className="w-[150px] md:w-[200px]">
                            <SelectValue placeholder="Regular Season" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="regular-season">Regular Season</SelectItem>
                            <SelectItem value="playoffs">Playoffs</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

            </div>

            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {isLoading && <LoadingPage />}

            {
                !isLoading && gameLeaders &&

                <>
                    {/* MOBILE */}
                    <GameHighsMobile gameLeaders={gameLeaders} styleClass="flex flex-col gap-y-4 md:hidden" />

                    {/* DESKTOP */}
                    <GameHighs gameLeaders={gameLeaders} styleClass="hidden md:flex md:flex-wrap justify-between gap-y-6" />
                </>
            }
        </>
    )
}

export default GameLeadersView