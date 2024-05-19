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

    console.log(history)

    return (
        <>

            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {isLoading && <LoadingPage />}

            {
                history &&
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {team.full_name} History
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>TEAM NAME</TableHead>
                                    <TableHead className="text-center">SEASON</TableHead>
                                    <TableHead className="text-center">WINS</TableHead>
                                    <TableHead className="text-center">LOSSES</TableHead>
                                    <TableHead className="text-center">PCT</TableHead>
                                    <TableHead className="text-center">OUTCOME</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    history?.seasons.map((season) => {

                                        let teamNameCell, outcomeCell

                                        if (season.team_name === team.full_name) {
                                            teamNameCell = (
                                                <div className="flex gap-x-2 items-center">
                                                    <TeamLogo abbreviation={team.abbreviation} team_id={team.team_id} logoClass="size-5 object-contain" />
                                                    <p>{season.team_name}</p>
                                                </div>
                                            )
                                        } else {
                                            teamNameCell = (
                                                <div className="flex gap-x-2 items-center">
                                                    <img src={season.img_url_small || undefined} alt={`${season.team_name} logo`} className="size-5 object-contain" />
                                                    <p>{season.team_name}</p>
                                                </div>
                                            )
                                        }



                                        return (
                                            <TableRow key={`${season.team_name}-${season.season}`}>
                                                <TableCell>{teamNameCell}</TableCell>
                                                <TableCell className="text-center">{season.season}</TableCell>
                                                <TableCell className="text-center">{season.wins}</TableCell>
                                                <TableCell className="text-center">{season.losses}</TableCell>
                                                <TableCell className="text-center">{season.pct}</TableCell>
                                                <TableCell className="text-center">{season.season}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            }

        </>
    )
}

export default History