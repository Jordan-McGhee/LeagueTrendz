import React, { useState, useEffect } from "react";

// hooks import
import { useFetch } from "../../../../Hooks/useFetch";

// type imports
import { TeamPlayersProps, TeamPlayersState, PlayerStatsObject, TeamStatsObject } from "../../../../types";

// utils imports
import { convertPlayerPosition } from "../../../../Utils/utils";

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../../components/ui/card"
import ErrorModal from "../../../../components/ui/ErrorModal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"

// component imports
import StatsTeamLeaders from "../../../../components/Desktop/TeamPage/Stats/StatsTeamLeaders"
import LoadingPage from "../../../LoadingPage"
import TeamAllStatsTable from "../../../../components/Desktop/TeamPage/Stats/TeamAllStatsTable";
import TeamShootingStatsTable from "../../../../components/Desktop/TeamPage/Stats/TeamShootingStatsTable";

// mobile component imports
import StatsTeamLeadersMobile from "../../../../components/Mobile/TeamPage/Stats/StatsTeamLeaders-Mobile"
import TeamAllStatsTableMobile from "../../../../components/Mobile/TeamPage/Stats/TeamAllStatsTable-Mobile";
import TeamShootingStatsTableMobile from "../../../../components/Mobile/TeamPage/Stats/TeamShootingStatsTable-Mobile";

const Stats: React.FC<TeamPlayersProps> = ({ team, players }) => {

    const teamsMissedPlayoffs = [2, 3, 8, 10, 14, 24, 26, 27, 28, 29]

    const [showPlayoffs, setShowPlayoffs] = useState<boolean>(false)
    const [playoffLeaders, setPlayoffLeaders] = useState<TeamPlayersState | undefined>()
    const [playerStats, setPlayerStats] = useState<PlayerStatsObject[] | undefined>()
    const [teamStats, setTeamStats] = useState<TeamStatsObject | undefined>()

    // state to track when select drop down is open
    const [isOpen, setIsOpen] = useState(false);

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch stats from database
    useEffect(() => {

        let url: string

        // check if team missed playoffs and change url if there is no possible playoff data
        if (teamsMissedPlayoffs.includes(team.team_id)) {
            url = `${process.env.REACT_APP_BACKEND_URL}/nba/teams/${team.team_id}/stats-regular`
        } else {
            url = `${process.env.REACT_APP_BACKEND_URL}/nba/teams/${team.team_id}/stats-${showPlayoffs ? "playoffs" : "regular"}`
        }

        let responseData: any

        const fetchStats = async () => {
            try {
                responseData = await sendRequest(url)
                setPlayerStats(responseData.player_stats)
                setTeamStats(responseData.team_stats)
                showPlayoffs && setPlayoffLeaders(responseData.team_leaders)
            } catch (error) {

            }
        }

        fetchStats()
    }, [team, showPlayoffs, sendRequest])

    const selectHandler = (value: string) => {
        if (value === "playoffs") {
            setShowPlayoffs(true)
        } else {
            setShowPlayoffs(false)
        }
    }

    return (
        <>

            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {isLoading && <LoadingPage />}

            {
                playerStats && teamStats &&
                <Card>
                    <CardHeader>

                        {/* Blocking overlay for when select is open — preventing user from clicking random links below*/}
                        {isOpen && (
                            <div
                                className="fixed inset-0 bg-transparent"
                                style={{ zIndex: 9 }}
                                onClick={(e) => e.preventDefault()}
                            />
                        )}

                        <CardTitle className="flex flex-col gap-y-2 md:flex-row md:items-center justify-between">
                            <p className="hidden md:block">2023-24 Stats and Leaders</p>
                            <p className="md:hidden">'23-24 Stats and Leaders</p>


                            {/* drop down for playoff/regular season — check if team made playoffs */}
                            {
                                !teamsMissedPlayoffs.includes(team.team_id) &&
                                <Select
                                    value={showPlayoffs ? "playoffs" : "regular-season"}
                                    onValueChange={(newValue) => selectHandler(newValue)}
                                    onOpenChange={(open) => setIsOpen(open)}
                                >
                                    <SelectTrigger className="w-fit md:w-[300px]">
                                        <SelectValue placeholder="Choose Season Type" />
                                    </SelectTrigger>
                                    <SelectContent className="z-10">
                                        <SelectItem value="regular-season">Regular Season</SelectItem>
                                        <SelectItem value="playoffs">Playoffs</SelectItem>
                                    </SelectContent>
                                </Select>
                            }
                        </CardTitle>
                    </CardHeader>

                    <CardContent>

                        {/* playoff or regular season leaders */}
                        {
                            showPlayoffs && playoffLeaders ?
                                (
                                    <>
                                        {/* mobile */}
                                        <StatsTeamLeadersMobile team={team} players={playoffLeaders} className="block md:hidden" />

                                        {/* desktop */}
                                        <StatsTeamLeaders team={team} players={playoffLeaders} className="hidden md:block" />
                                    </>

                                )
                                :
                                (
                                    <>
                                        {/* mobile */}
                                        <StatsTeamLeadersMobile team={team} players={players} className="block md:hidden" />

                                        {/* desktop */}
                                        <StatsTeamLeaders team={team} players={players} className="hidden md:block" />
                                    </>
                                )
                        }

                        {/* MOBILE */}

                        <div className="block md:hidden">
                            {/* all stats table */}
                            <TeamAllStatsTableMobile playerStats={playerStats} teamStats={teamStats} playoffs={showPlayoffs} />

                            {/* shooting stats table */}
                            <TeamShootingStatsTableMobile playerStats={playerStats} teamStats={teamStats} />
                        </div>

                        {/* DESKTOP */}
                        <div className="hidden md:block">
                            {/* all stats table */}
                            <p className="my-4 font-semibold text-lg">Player Stats</p>
                            <TeamAllStatsTable playerStats={playerStats} teamStats={teamStats} playoffs={showPlayoffs} />

                            {/* Shooting stats table */}
                            <p className="my-4 font-semibold text-lg">Shooting Stats</p>
                            <TeamShootingStatsTable playerStats={playerStats} teamStats={teamStats} />
                        </div>

                    </CardContent>

                    <CardFooter>
                        <div className="w-full pt-2">

                            <p className="text-xs font-semibold">GLOSSARY:</p>

                            {/* GLOSSARY */}
                            <div className="text-xs mt-4 md:flex justify-between">

                                <div className="flex flex-col gap-y-1">
                                    <p><span className="font-bold">2P%:</span> 2-Point Field Goal Percentage</p>
                                    <p><span className="font-bold">2PA:</span> 2-Point Field Goals Attempted Per Game</p>
                                    <p><span className="font-bold">2PM:</span> 2-Point Field Goals Made Per Game</p>
                                    <p><span className="font-bold">3P%:</span> 3-Point Field Goal Percentage</p>
                                    <p><span className="font-bold">3PA:</span> 3-Point Field Goals Attempted Per Game</p>
                                    <p><span className="font-bold">3PM:</span> 3-Point Field Goals Made Per Game</p>
                                    <p><span className="font-bold">AST:</span> Assists Per Game</p>
                                    <p><span className="font-bold">AST/TO:</span> Assist to Turnover Ratio</p>
                                    <p><span className="font-bold">BLK:</span> Blocks Per Game</p>
                                </div>

                                <div className="flex flex-col gap-y-1">
                                    <p><span className="font-bold">DR:</span> Defensive Rebounds Per Game</p>
                                    <p><span className="font-bold">FGA:</span> Field Goal Attempts Per Game</p>
                                    <p><span className="font-bold">FGM:</span> Field Goals Made Per Game</p>
                                    <p><span className="font-bold">FG%:</span> Field Goal Percentage</p>
                                    <p><span className="font-bold">FT%:</span> Free Throw Percentage</p>
                                    <p><span className="font-bold">FTA:</span> Free Throw Attempts Per Game</p>
                                    <p><span className="font-bold">FTM:</span> Free Throws Made Per Game</p>
                                    <p><span className="font-bold">GP:</span> Games Played</p>
                                </div>

                                <div className="flex flex-col gap-y-1">
                                    <p><span className="font-bold">GS:</span> Games Started</p>
                                    <p><span className="font-bold">MIN:</span> Minutes Per Game</p>
                                    <p><span className="font-bold">OR:</span> Offensive Rebounds Per Game</p>
                                    <p><span className="font-bold">PF:</span> Fouls Per Game</p>
                                    <p><span className="font-bold">PTS:</span> Points Per Game</p>
                                    <p><span className="font-bold">REB:</span> Rebounds Per Game</p>
                                    <p><span className="font-bold">STL:</span> Steals Per Game</p>
                                    <p><span className="font-bold">TO:</span> Turnovers Per Game</p>
                                </div>

                            </div>
                        </div>
                    </CardFooter>
                </Card>
            }
        </>
    )
}

export default Stats