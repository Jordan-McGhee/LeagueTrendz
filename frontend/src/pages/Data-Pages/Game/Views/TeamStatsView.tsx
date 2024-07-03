import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// hooks import
import { useFetch } from "../../../../Hooks/useFetch"

// type imports
import { BoxScoreViewProps, GameSeriesState, StandingsState, GameLeadersState } from "@/types";

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card"
import { Table, TableHeader, TableHead, TableRow, TableCell, TableBody, TableFooter } from "../../../../components/ui/table"
import TeamLogo from "../../../../components/ui/TeamLogo"

// component imports
import ErrorModal from "../../../../components/ui/ErrorModal"
import LoadingPage from "../../../../pages/LoadingPage";
import GameLeaders from "../../../../components/Desktop/GamePage/GameLeaders"
import GameSeries from "../../../../components/Desktop/GamePage/GameSeries";

const TeamStatsView: React.FC<BoxScoreViewProps> = ({ teamData }) => {

    const [gameSeries, setGameSeries] = useState<GameSeriesState[] | undefined>()
    const [gameLeaders, setGameLeaders] = useState<GameLeadersState[] | undefined>()
    const [firstTeamStandings, setFirstTeamStandings] = useState<StandingsState | undefined>()
    const [secondTeamStandings, setSecondTeamStandings] = useState<StandingsState | undefined>()

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch stats from database
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/games/game_id/${teamData.game_id}/home_team/${teamData.home_team_id}/away_team/${teamData.away_team_id}`

        let responseData: any

        const fetchTeamStats = async () => {
            try {
                responseData = await sendRequest(url)
                setGameSeries(responseData.gameSeries)
                setGameLeaders(responseData.gameLeaders)
                setFirstTeamStandings(responseData.firstTeamStandings)
                setSecondTeamStandings(responseData.secondTeamStandings)
            } catch (error) {

            }
        }

        fetchTeamStats()

    }, [sendRequest, teamData.game_id])

    // console.log(gameSeries, gameLeaders, firstTeamStandings, secondTeamStandings)

    return (
        <>

            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {isLoading && <LoadingPage />}

            <div className="flex gap-x-4 justify-between">
                {/* left side */}
                <Card className="w-[65%] h-fit">
                    {/* <CardHeader>
                        <CardTitle>Team Stats</CardTitle>
                    </CardHeader> */}
                    <CardContent>
                        <Table className="w-full mt-4">
                            <TableHeader>
                                <TableHead className="w-3/4 text-lg font-semibold">Team Stats</TableHead>
                                <TableHead>
                                    <TeamLogo team_id={teamData.away_team_id} abbreviation={teamData.away_team_abbreviation} logoClass="size-9 object-contain mx-auto" />
                                </TableHead>
                                <TableHead>
                                    <TeamLogo team_id={teamData.home_team_id} abbreviation={teamData.home_team_abbreviation} logoClass="size-9 object-contain mx-auto" />
                                </TableHead>
                            </TableHeader>
                            <TableBody>
                                {/* fg */}
                                <TableRow>
                                    <TableCell className="font-bold">FG</TableCell>
                                    <TableCell className="text-center font-bold">{teamData.away_fgm}-{teamData.away_fga}</TableCell>
                                    <TableCell className="text-center font-bold">{teamData.home_fgm}-{teamData.home_fga}</TableCell>
                                </TableRow>

                                {/* fg% */}

                                <TableRow>
                                    <TableCell className="font-bold">Field Goal %</TableCell>
                                    <TableCell className="text-center font-bold">{teamData.away_fg_percentage}%</TableCell>
                                    <TableCell className="text-center font-bold">{teamData.home_fg_percentage}%</TableCell>
                                </TableRow>

                                {/* tp */}

                                <TableRow>
                                    <TableCell className="font-bold">3PT</TableCell>
                                    <TableCell className="text-center font-bold">{teamData.away_tpm}-{teamData.away_tpa}</TableCell>
                                    <TableCell className="text-center font-bold">{teamData.home_tpm}-{teamData.home_tpa}</TableCell>
                                </TableRow>

                                {/* tp% */}

                                <TableRow>
                                    <TableCell className="font-bold">3PT %</TableCell>
                                    <TableCell className="text-center font-bold">{teamData.away_tp_percentage}%</TableCell>
                                    <TableCell className="text-center font-bold">{teamData.home_tp_percentage}%</TableCell>
                                </TableRow>

                                {/* ft */}

                                <TableRow>
                                    <TableCell className="font-bold">FT</TableCell>
                                    <TableCell className="text-center font-bold">{teamData.away_ftm}-{teamData.away_fta}</TableCell>
                                    <TableCell className="text-center font-bold">{teamData.home_ftm}-{teamData.home_fta}</TableCell>
                                </TableRow>

                                {/* ft% */}

                                <TableRow>
                                    <TableCell className="font-bold">Free Throw %</TableCell>
                                    <TableCell className="text-center font-bold">{teamData.away_ft_percentage}%</TableCell>
                                    <TableCell className="text-center font-bold">{teamData.home_ft_percentage}%</TableCell>
                                </TableRow>

                                {/* reb */}

                                <TableRow>
                                    <TableCell className="font-bold">Rebounds</TableCell>
                                    <TableCell className="text-center font-bold">{teamData.away_reb}</TableCell>
                                    <TableCell className="text-center font-bold">{teamData.home_reb}</TableCell>
                                </TableRow>

                                {/* orb */}

                                <TableRow>
                                    <TableCell className="pl-4">Offensive Rebounds</TableCell>
                                    <TableCell className="text-center">{teamData.away_orb}</TableCell>
                                    <TableCell className="text-center">{teamData.home_orb}</TableCell>
                                </TableRow>

                                {/* drb */}

                                <TableRow>
                                    <TableCell className="pl-4">Defensive Rebounds</TableCell>
                                    <TableCell className="text-center">{teamData.away_drb}</TableCell>
                                    <TableCell className="text-center">{teamData.home_drb}</TableCell>
                                </TableRow>

                                {/* ast */}

                                <TableRow>
                                    <TableCell className="font-bold">Assists</TableCell>
                                    <TableCell className="text-center font-bold">{teamData.away_ast}</TableCell>
                                    <TableCell className="text-center font-bold">{teamData.home_ast}</TableCell>
                                </TableRow>

                                {/* stl */}

                                <TableRow>
                                    <TableCell className="font-bold">Steals</TableCell>
                                    <TableCell className="text-center font-bold">{teamData.away_stl}</TableCell>
                                    <TableCell className="text-center font-bold">{teamData.home_stl}</TableCell>
                                </TableRow>

                                {/* blk */}

                                <TableRow>
                                    <TableCell className="font-bold">Blocks</TableCell>
                                    <TableCell className="text-center font-bold">{teamData.away_blk}</TableCell>
                                    <TableCell className="text-center font-bold">{teamData.home_blk}</TableCell>
                                </TableRow>

                                {/* turnovers */}

                                <TableRow>
                                    <TableCell className="font-bold">Turnovers</TableCell>
                                    <TableCell className="text-center font-bold">{teamData.away_turnovers}</TableCell>
                                    <TableCell className="text-center font-bold">{teamData.home_turnovers}</TableCell>
                                </TableRow>

                                {/* fouls */}

                                <TableRow>
                                    <TableCell className="font-bold">Fouls</TableCell>
                                    <TableCell className="text-center font-bold">{teamData.away_pf}</TableCell>
                                    <TableCell className="text-center font-bold">{teamData.home_pf}</TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* right side */}
                <div className="w-[35%] flex flex-col gap-y-4">
                    {
                        gameLeaders &&
                        <GameLeaders teamData={teamData} players={gameLeaders} />
                    }

                    {
                        gameSeries &&
                        <GameSeries teamData={teamData} series={gameSeries} />
                    }
                </div>
            </div>



        </>
    )
}

export default TeamStatsView