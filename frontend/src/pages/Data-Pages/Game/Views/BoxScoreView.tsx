import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// hooks import
import { useFetch } from "../../../../Hooks/useFetch"

// type imports
import { BoxScoreViewProps, BoxScoreViewState } from "@/types";

// utils imports
import { convertPlayerPosition, shortenPlayerName } from "../../../../Utils/utils";

// ui imports
import { Card, CardContent } from "../../../../components/ui/card"
import { Table, TableHeader, TableHead, TableRow, TableCell, TableBody, TableFooter } from "../../../../components/ui/table"
import TeamLogo from "../../../../components/ui/TeamLogo"

// component imports
import ErrorModal from "../../../../components/ui/ErrorModal"
import LoadingPage from "../../../../pages/LoadingPage";
import BoxScoreTable from "../../../../components/Desktop/GamePage/BoxScore/BoxScoreTable"

// mobile component imports
import BoxScoreTableMobile from "../../../../components/Mobile/GamePage/BoxScoreTable-Mobile"


const BoxScoreView: React.FC<BoxScoreViewProps> = ({ teamData }) => {

    const [boxScore, setBoxScore] = useState<BoxScoreViewState[] | undefined>()

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch stats from database
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/games/game_id/${teamData.game_id}/box-score`

        let responseData: any

        const fetchBoxScore = async () => {
            try {
                responseData = await sendRequest(url)
                setBoxScore(responseData.players)
            } catch (error) {

            }
        }

        fetchBoxScore()

    }, [sendRequest, teamData.game_id])

    // console.log(boxScore)

    return (
        <>

            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {isLoading && <LoadingPage />}

            {boxScore &&
                <div className="">
                    {/* mobile */}
                    <BoxScoreTableMobile boxScore={boxScore} teamData={teamData} tableClass="flex flex-col gap-y-6 md:hidden" />

                    {/* desktop */}
                    <BoxScoreTable boxScore={boxScore} teamData={teamData} tableClass="hidden md:flex flex-col md:gap-y-4" />
                </div>
            }
        </>
    )
}

export default BoxScoreView