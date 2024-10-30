import React, { useState, useEffect } from "react"

// hooks import
import { useFetch } from "../../../../Hooks/useFetch"

// type imports
import { TeamPageProps, TeamHistoryState } from "../../../../types"

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card"
import { Table, TableHeader, TableRow, TableCell, TableHead, TableFooter, TableBody } from "../../../../components/ui/table"
import TeamLogo from "../../../../components/ui/TeamLogo"
import ErrorModal from "../../../../components/ui/ErrorModal"
import LoadingPage from "../../../LoadingPage"

// component imports
import TeamHistoryTable from "../../../../components/Desktop/TeamPage/History/TeamHistoryTable"
import TeamChampionships from "../../../../components/Desktop/TeamPage/History/TeamChampionships"
import TeamRetiredNumbers from "../../../../components/Desktop/TeamPage/History/TeamRetiredNumbers"

// mobile component imports
import TeamHistoryTableMobile from "../../../../components/Mobile/TeamPage/History/TeamHistoryTable-Mobile"

const History: React.FC<TeamPageProps> = ({ team }) => {

    const [history, setHistory] = useState<TeamHistoryState | undefined>()

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch history from database
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/teams/${team.team_id}/history`

        let responseData: any

        const fetchHistory = async () => {
            try {
                responseData = await sendRequest(url)
                setHistory(responseData.history)
            } catch (error) {

            }
        }

        fetchHistory()
    }, [team, sendRequest])

    let championCount: number[] = []

    if (history) {
        for (let i = 0; i < history.seasons.length; i++) {
            if (history.seasons[i].champion) {
                championCount.push(history.seasons[i].season)
            }
        }
    }

    return (
        <>

            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {isLoading && <LoadingPage />}

            {
                history &&
                <>
                    {/* mobile */}
                    <div className="flex flex-col gap-y-4 md:hidden">
                        {
                            championCount.length > 0 &&
                            <TeamChampionships teamColor={team.main_color} championCount={championCount} />
                        }
                        <TeamRetiredNumbers teamColor={team.main_color} history={history} />
                        <TeamHistoryTableMobile team={team} history={history} className="" />
                    </div>

                    {/* desktop */}
                    <div className="hidden md:flex gap-x-4">

                        {/* left side */}
                        <TeamHistoryTable team={team} history={history} className="w-[60%]" />

                        {/* right side */}
                        <div className="w-[35%] flex flex-col gap-y-4">
                            {
                                championCount.length > 0 &&
                                <TeamChampionships teamColor={team.main_color} championCount={championCount} />
                            }

                            {/* Retired Numbers */}
                            <TeamRetiredNumbers teamColor={team.main_color} history={history} />
                        </div>

                    </div>
                </>
            }

        </>
    )
}

export default History