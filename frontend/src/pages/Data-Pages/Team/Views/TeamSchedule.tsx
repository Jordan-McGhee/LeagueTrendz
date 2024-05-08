import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

// hooks import
import { useFetch } from "../../../../Hooks/useFetch"

// type imports
import { TeamPageProps, TeamScheduleObject } from "../../../../types"

// utils imports
import { convertDateGameLog, teamStatLeaderFormatter } from "../../../../Utils/utils"

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../../../../components/ui/table"
import TeamLogo from "../../../../components/ui/TeamLogo"

// component imports
import LoadingPage from "../../../LoadingPage";
import ErrorModal from "../../../../components/ui/ErrorModal"

const TeamSchedule: React.FC<TeamPageProps> = ({ team }) => {

    const [schedule, setSchedule] = useState<TeamScheduleObject[] | undefined>()

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch roster from database
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/teams/${team.team_id}/schedule-regular`

        let responseData: any

        const fetchSchedule = async () => {
            try {
                responseData = await sendRequest(url)
                setSchedule(responseData.schedule)
            } catch (error) {

            }
        }

        fetchSchedule()
    }, [team, sendRequest])

    return (
        <>
            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {isLoading && <LoadingPage />}

            {schedule &&
                <Card>
                    <CardHeader>
                        <CardTitle>
                            2023-24 Schedule
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table className="text-xs">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>DATE</TableHead>
                                    <TableHead>OPPONENT</TableHead>
                                    <TableHead>RESULT</TableHead>
                                    <TableHead>W-L</TableHead>
                                    <TableHead>POINT LEADER</TableHead>
                                    <TableHead>REBOUND LEADER</TableHead>
                                    <TableHead>ASSIST LEADER</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {schedule.map((game) => {

                                    const ptsLeader = teamStatLeaderFormatter(game.pts_leader)
                                    const rebLeader = teamStatLeaderFormatter(game.reb_leader)
                                    const astLeader = teamStatLeaderFormatter(game.ast_leader)

                                    return (
                                        <TableRow key={`${game.game_id}-${game.team_abbreviation}-${game.opponent_team_abbreviation}`}>
                                            <TableCell>{convertDateGameLog(game.day_of_week, game.game_date.split("T")[0])}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-x-1 items-center">
                                                    <p>{game.game_location === "HOME" ? 'VS' : '@'}</p>
                                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${game.opponent_team_abbreviation.toLowerCase()}?view=home`} className="flex items-center gap-x-1 hover:underline hover:font-semibold">
                                                        <TeamLogo abbreviation={game.opponent_team_abbreviation} team_id={game.opponent_team_id} logoClass="size-5 object-contain" />
                                                        <p>{game.opponent_team_abbreviation}</p>
                                                    </Link>
                                                </div>
                                            </TableCell>


                                            <TableCell>
                                                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${game.opponent_team_abbreviation.toLowerCase()}`} className="hover:underline">
                                                    <div className="flex items-center gap-x-1">
                                                        {game.result === "W" ? <span className="text-green-700">W</span> : <span className="text-red-700">L</span>}

                                                        {game.result === "W" ? <p>{game.team_score} - {game.opponent_score}</p> : <p>{game.opponent_score} - {game.team_score}</p>}
                                                    </div>
                                                </Link>
                                            </TableCell>

                                            <TableCell>
                                                {game.wins}-{game.losses}
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex items-center gap-x-1">
                                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${ptsLeader?.id}/${ptsLeader?.name.toLowerCase().replace(" ", "-")}`} className="hover:underline" style={{color: team.main_color}}>
                                                        {ptsLeader?.name}
                                                    </Link>
                                                    <p className="font-bold">{ptsLeader?.stat}</p>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex items-center gap-x-1">
                                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${rebLeader?.id}/${rebLeader?.name.toLowerCase().replace(" ", "-")}`} className="hover:underline" style={{color: team.main_color}}>
                                                        {rebLeader?.name}
                                                    </Link>
                                                    <p className="font-bold">{rebLeader?.stat}</p>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex items-center gap-x-1">
                                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${astLeader?.id}/${astLeader?.name.toLowerCase().replace(" ", "-")}`} className="hover:underline" style={{color: team.main_color}}>
                                                        {astLeader?.name}
                                                    </Link>
                                                    <p className="font-bold">{astLeader?.stat}</p>
                                                </div>
                                            </TableCell>

                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            }
        </>
    )
}

export default TeamSchedule