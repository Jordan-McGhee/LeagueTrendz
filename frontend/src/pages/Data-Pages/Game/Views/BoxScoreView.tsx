import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// hooks import
import { useFetch } from "../../../../Hooks/useFetch"

// type imports
import { BoxScoreViewProps, BoxScoreViewState } from "@/types";

// utils imports
import { convertPlayerPosition } from "../../../../Utils/utils";

// ui imports
import { Card, CardContent } from "../../../../components/ui/card"
import { Table, TableHeader, TableHead, TableRow, TableCell, TableBody, TableFooter } from "../../../../components/ui/table"
import TeamLogo from "../../../../components/ui/TeamLogo"

// component imports
import ErrorModal from "../../../../components/ui/ErrorModal"
import LoadingPage from "../../../../pages/LoadingPage";


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

    console.log(boxScore)

    return (
        <>

            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {isLoading && <LoadingPage />}

            {boxScore &&
                <Card>
                    <CardContent>
                        {/* AWAY TEAM */}
                        <Link to={`/nba/teams/${teamData.away_team_abbreviation.toLowerCase()}?view=home`} className="hover:underline">
                            <div className="flex items-center gap-x-2 mt-4">
                                <TeamLogo team_id={teamData.away_team_id} abbreviation={teamData.away_team_abbreviation} logoClass="size-12 object-contain" />
                                <p className="text-lg font-semibold">{teamData.away_team_full_name}</p>
                            </div>
                        </Link>

                        <Table className="text-xs">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-left">Player</TableHead>
                                    <TableHead className="text-center">MIN</TableHead>
                                    <TableHead className="text-center">PTS</TableHead>
                                    <TableHead className="text-center">FG</TableHead>
                                    <TableHead className="text-center">3PT</TableHead>
                                    <TableHead className="text-center">FT</TableHead>
                                    <TableHead className="text-center">OREB</TableHead>
                                    <TableHead className="text-center">DREB</TableHead>
                                    <TableHead className="text-center">REB</TableHead>
                                    <TableHead className="text-center">AST</TableHead>
                                    <TableHead className="text-center">STL</TableHead>
                                    <TableHead className="text-center">BLK</TableHead>
                                    <TableHead className="text-center">TO</TableHead>
                                    <TableHead className="text-center">PF</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {boxScore.map((player) => {
                                    if (player.player_team_id === teamData.away_team_id) {
                                        return (
                                            <TableRow>
                                                <TableCell className="text-left flex items-center gap-x-2">
                                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player.player_id}/${player.player_name.toLowerCase().replace(" ", "-")}`} className="text-blue-700 hover:underline">
                                                        {player.player_name}
                                                    </Link>
                                                    <p className="text-gray-500">{convertPlayerPosition(player.player_position)}</p>
                                                </TableCell>
                                                <TableCell className="text-center">{player.minutes}</TableCell>
                                                <TableCell className="text-center">{player.pts}</TableCell>
                                                <TableCell className="text-center">{player.fgm}-{player.fga} ({player.fg_percentage}%)</TableCell>
                                                <TableCell className="text-center">{player.tpm}-{player.tpa} ({player.tp_percentage}%)</TableCell>
                                                <TableCell className="text-center">{player.ftm}-{player.fta} ({player.ft_percentage}%)</TableCell>
                                                <TableCell className="text-center">{player.orb}</TableCell>
                                                <TableCell className="text-center">{player.drb}</TableCell>
                                                <TableCell className="text-center">{player.reb}</TableCell>
                                                <TableCell className="text-center">{player.ast}</TableCell>
                                                <TableCell className="text-center">{player.stl}</TableCell>
                                                <TableCell className="text-center">{player.blk}</TableCell>
                                                <TableCell className="text-center">{player.turnovers}</TableCell>
                                                <TableCell className="text-center">{player.pf}</TableCell>
                                            </TableRow>
                                        )
                                    }

                                    return null
                                })}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell>TEAM</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell className="text-center">{teamData.away_team_score}</TableCell>
                                    <TableCell className="text-center">{teamData.away_fgm}-{teamData.away_fga} ({teamData.away_fg_percentage}%)</TableCell>
                                    <TableCell className="text-center">{teamData.away_tpm}-{teamData.away_tpa} ({teamData.away_tp_percentage}%)</TableCell>
                                    <TableCell className="text-center">{teamData.away_ftm}-{teamData.away_fta} ({teamData.away_ft_percentage}%)</TableCell>
                                    <TableCell className="text-center">{teamData.away_orb}</TableCell>
                                    <TableCell className="text-center">{teamData.away_drb}</TableCell>
                                    <TableCell className="text-center">{teamData.away_reb}</TableCell>
                                    <TableCell className="text-center">{teamData.away_ast}</TableCell>
                                    <TableCell className="text-center">{teamData.away_stl}</TableCell>
                                    <TableCell className="text-center">{teamData.away_blk}</TableCell>
                                    <TableCell className="text-center">{teamData.away_turnovers}</TableCell>
                                    <TableCell className="text-center">{teamData.away_pf}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>

                        {/* HOME TEAM */}
                        <Link to={`/nba/teams/${teamData.home_team_abbreviation.toLowerCase()}?view=home`} className="hover:underline">
                            <div className="flex items-center gap-x-2 mt-4">
                                <TeamLogo team_id={teamData.home_team_id} abbreviation={teamData.home_team_abbreviation} logoClass="size-12 object-contain" />
                                <p className="text-lg font-semibold">{teamData.home_team_full_name}</p>
                            </div>
                        </Link>

                        <Table className="text-xs">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-left">Player</TableHead>
                                    <TableHead className="text-center">MIN</TableHead>
                                    <TableHead className="text-center">PTS</TableHead>
                                    <TableHead className="text-center">FG</TableHead>
                                    <TableHead className="text-center">3PT</TableHead>
                                    <TableHead className="text-center">FT</TableHead>
                                    <TableHead className="text-center">OREB</TableHead>
                                    <TableHead className="text-center">DREB</TableHead>
                                    <TableHead className="text-center">REB</TableHead>
                                    <TableHead className="text-center">AST</TableHead>
                                    <TableHead className="text-center">STL</TableHead>
                                    <TableHead className="text-center">BLK</TableHead>
                                    <TableHead className="text-center">TO</TableHead>
                                    <TableHead className="text-center">PF</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {boxScore.map((player) => {
                                    if (player.player_team_id === teamData.home_team_id) {
                                        return (
                                            <TableRow>
                                                <TableCell className="text-left flex items-center gap-x-2">
                                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player.player_id}/${player.player_name.toLowerCase().replace(" ", "-")}`} className="text-blue-700 hover:underline">
                                                        {player.player_name}
                                                    </Link>
                                                    <p className="text-gray-500">{convertPlayerPosition(player.player_position)}</p>
                                                </TableCell>
                                                <TableCell className="text-center">{player.minutes}</TableCell>
                                                <TableCell className="text-center">{player.pts}</TableCell>
                                                <TableCell className="text-center">{player.fgm}-{player.fga} ({player.fg_percentage}%)</TableCell>
                                                <TableCell className="text-center">{player.tpm}-{player.tpa} ({player.tp_percentage}%)</TableCell>
                                                <TableCell className="text-center">{player.ftm}-{player.fta} ({player.ft_percentage}%)</TableCell>
                                                <TableCell className="text-center">{player.orb}</TableCell>
                                                <TableCell className="text-center">{player.drb}</TableCell>
                                                <TableCell className="text-center">{player.reb}</TableCell>
                                                <TableCell className="text-center">{player.ast}</TableCell>
                                                <TableCell className="text-center">{player.stl}</TableCell>
                                                <TableCell className="text-center">{player.blk}</TableCell>
                                                <TableCell className="text-center">{player.turnovers}</TableCell>
                                                <TableCell className="text-center">{player.pf}</TableCell>
                                            </TableRow>
                                        )
                                    }

                                    return null
                                })}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell>TEAM</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell className="text-center">{teamData.home_team_score}</TableCell>
                                    <TableCell className="text-center">{teamData.home_fgm}-{teamData.home_fga} ({teamData.home_fg_percentage}%)</TableCell>
                                    <TableCell className="text-center">{teamData.home_tpm}-{teamData.home_tpa} ({teamData.home_tp_percentage}%)</TableCell>
                                    <TableCell className="text-center">{teamData.away_ftm}-{teamData.away_fta} ({teamData.home_ft_percentage}%)</TableCell>
                                    <TableCell className="text-center">{teamData.home_orb}</TableCell>
                                    <TableCell className="text-center">{teamData.home_drb}</TableCell>
                                    <TableCell className="text-center">{teamData.home_reb}</TableCell>
                                    <TableCell className="text-center">{teamData.home_ast}</TableCell>
                                    <TableCell className="text-center">{teamData.home_stl}</TableCell>
                                    <TableCell className="text-center">{teamData.home_blk}</TableCell>
                                    <TableCell className="text-center">{teamData.home_turnovers}</TableCell>
                                    <TableCell className="text-center">{teamData.home_pf}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>

                    </CardContent>
                </Card>
            }
        </>
    )
}

export default BoxScoreView