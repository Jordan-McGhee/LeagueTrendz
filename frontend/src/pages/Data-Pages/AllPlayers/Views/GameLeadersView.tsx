import React, { useState, useEffect } from "react";

// hook imports
import { useFetch } from "../../../../Hooks/useFetch";

// type imports
import { GameLeadersState } from "@/types";

// utils imports

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card"
import TeamLogo from "../../../../components/ui/TeamLogo"

// component imports
import ErrorModal from "../../../../components/ui/ErrorModal"
import LoadingPage from "../../../LoadingPage"
import GameHighCard from "../../../../components/Desktop/AllPlayersPage/GameHighCard";

const GameLeadersView = () => {

    const [ gameLeaders, setGameLeaders ] = useState<GameLeadersState | undefined>()

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch game highs from database
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/players/game-highs`

        let responseData: any

        const fetchGameHighs = async () => {
            try {
                responseData = await sendRequest(url)
                setGameLeaders(responseData.gameLeaders)
            } catch (error) {

            }
            console.log(responseData)
        }

        fetchGameHighs()
    }, [sendRequest])


    return (
        <>
            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {isLoading && <LoadingPage />}

            {
                !isLoading && gameLeaders &&
                <div className="flex flex-wrap justify-between gap-y-6">
                    <GameHighCard cardClass="w-[49%]" title="Points" gameLeaderPlayers={gameLeaders.top_scoring_games} />
                    <GameHighCard cardClass="w-[49%]" title="Assists" gameLeaderPlayers={gameLeaders.top_assist_games} />
                    <GameHighCard cardClass="w-[49%]" title="Rebounds" gameLeaderPlayers={gameLeaders.top_rebounding_games} />
                    <GameHighCard cardClass="w-[49%]" title="Steals" gameLeaderPlayers={gameLeaders.top_steal_games} />
                    <GameHighCard cardClass="w-[49%]" title="Blocks" gameLeaderPlayers={gameLeaders.top_block_games} />
                    <GameHighCard cardClass="w-[49%]" title="Three Pointers" gameLeaderPlayers={gameLeaders.top_tpm_games} />
                </div>
            }
        </>
    )
}

export default GameLeadersView