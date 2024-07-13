import React, { useState, useEffect } from "react";

// hook imports
import { useFetch } from "../../../../Hooks/useFetch";

// type imports
import { SeasonAverageLeadersState, SeasonTotalLeadersState } from "@/types";

// utils imports

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card"
import TeamLogo from "../../../../components/ui/TeamLogo"

// component imports
import ErrorModal from "../../../../components/ui/ErrorModal"
import LoadingPage from "../../../LoadingPage"

const SeasonLeadersView = () => {

    const [ seasonAverageLeaders, setSeasonAverageLeaders ] = useState<SeasonAverageLeadersState | undefined>()
    const [ seasonTotalLeaders, setSeasonTotalLeaders ] = useState<SeasonTotalLeadersState | undefined>()

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch leaders from database
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/players/leaders`

        let responseData: any

        const fetchLeaders = async () => {
            try {
                responseData = await sendRequest(url)
                setSeasonAverageLeaders(responseData.seasonAverageLeaders)
                setSeasonTotalLeaders(responseData.seasonTotalLeaders)
            } catch (error) {

            }
            console.log(responseData)
        }

        fetchLeaders()
    }, [sendRequest])


    return (
        <>
            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {isLoading && <LoadingPage />}

            {
                seasonAverageLeaders && seasonTotalLeaders &&
                <p>fetched data</p>
            }
        </>
    )
}

export default SeasonLeadersView