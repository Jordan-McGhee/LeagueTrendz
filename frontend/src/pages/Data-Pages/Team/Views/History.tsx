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
                <div className="flex gap-x-4">
                    <Card className="w-[60%]">
                        <CardHeader>
                            <CardTitle>
                                {team.full_name} History
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="max-h-[750px] overflow-y-scroll">
                            <Table className="text-xs">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className=""></TableHead>
                                        <TableHead className="w-4/12">TEAM NAME</TableHead>
                                        <TableHead className="w-1/12">W</TableHead>
                                        <TableHead className="w-1/12">L</TableHead>
                                        <TableHead className="w-1/12">PCT</TableHead>
                                        <TableHead className="w-4/12">OUTCOME</TableHead>
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

                                            if (season.playoffs < 0) {
                                                outcomeCell = (
                                                    <p>Missed Playoffs</p>
                                                )
                                            } else if (season.playoffs === 0) {
                                                outcomeCell = (
                                                    <p>Eliminated First Round</p>
                                                )
                                            } else if (season.playoffs === 1) {
                                                outcomeCell = (
                                                    <p>Eliminated Second Round</p>
                                                )
                                            } else if (season.playoffs === 2) {
                                                outcomeCell = (
                                                    <p>Eliminated Conference Finals</p>
                                                )
                                            } else if (season.playoffs === 3) {
                                                outcomeCell = (
                                                    <p>{team.conference} Conference Champions</p>
                                                )
                                            } else {
                                                outcomeCell = (
                                                    <div className="flex items-center gap-x-1">
                                                        <p>Won Championship</p>
                                                        <img src={require("../../../../nba-trophies/larry-obrien-champion.png")} className="size-5 object-contain" alt="champ trophy" />
                                                    </div>
                                                )
                                            }

                                            return (
                                                <TableRow key={`${season.team_name}-${season.season}`}>
                                                    <TableCell className="font-semibold">{season.season}</TableCell>
                                                    <TableCell>{teamNameCell}</TableCell>
                                                    <TableCell>{season.wins}</TableCell>
                                                    <TableCell>{season.losses}</TableCell>
                                                    <TableCell>{season.pct}</TableCell>
                                                    <TableCell>{outcomeCell}</TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* right side */}
                    <div className="w-[35%] flex flex-col gap-y-4">
                        {
                            championCount.length > 0 &&
                            <Card className="h-fit">
                                <CardHeader>
                                    <CardTitle>Championships</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className={championCount.length > 6 ? "flex items-start gap-x-4" : "flex items-center gap-x-4"}>
                                        <img src={require("../../../../nba-trophies/larry-obrien-champion.png")} className={championCount.length > 6 ? "size-16 object-contain mt-2" : "size-16 object-contain"} alt="champ trophy" />
                                        <div className="w-4/5">
                                            <p className="text-lg font-bold">{championCount.length}x NBA Champion</p>
                                            <p className="text-sm font-light">{championCount.join(", ")}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        }

                        {/* Retired Numbers */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Retired Numbers</CardTitle>
                            </CardHeader>
                            <CardContent className="max-h-[575px] overflow-y-scroll">
                                <div className="flex flex-col gap-y-4">
                                    {
                                        history.jersey_numbers.map((jersey) =>
                                            <div className="grid grid-cols-8 gap-x-4">
                                                <p className="text-4xl font-bold col-span-2 place-self-center" style={{ color: team.main_color }}>{jersey.number}</p>

                                                <div className="col-span-6">
                                                    <p className="text-xl font-bold">{jersey.player_name}</p>
                                                    <p className="font-light">Retired in {jersey.season_retired}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </CardContent>
                        </Card>


                    </div>

                </div>
            }

        </>
    )
}

export default History