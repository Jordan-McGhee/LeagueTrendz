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
                gameLeaders &&
                <p>fetched data</p>
            }
        </>
    )
}

export default GameLeadersView