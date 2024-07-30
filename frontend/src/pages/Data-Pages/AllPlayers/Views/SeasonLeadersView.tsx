import React, { useState, useEffect } from "react";

// hook imports
import { useFetch } from "../../../../Hooks/useFetch";

// type imports
import { AverageLeadersState, TotalLeadersState } from "@/types";

// utils imports

// ui imports

// component imports
import ErrorModal from "../../../../components/ui/ErrorModal"
import LoadingPage from "../../../LoadingPage"
import LeaderCard from "../../../../components/Desktop/AllPlayersPage/LeaderCard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"


const SeasonLeadersView = () => {

    const [averageLeaders, setAverageLeaders] = useState<AverageLeadersState | undefined>()
    const [totalLeaders, setTotalLeaders] = useState<TotalLeadersState | undefined>()

    const [seasonType, setSeasonType] = useState<string>('regular-season');
    const [perMode, setPerMode] = useState<string>('average');

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch leaders from database
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/players/leaders/${seasonType === 'playoffs' ? 'playoffs' : 'regular-season'}`

        let responseData: any

        const fetchLeaders = async () => {
            try {
                responseData = await sendRequest(url)
                setAverageLeaders(responseData.averageLeaders)
                setTotalLeaders(responseData.totalLeaders)
            } catch (error) {

            }
            console.log(responseData)
        }

        fetchLeaders()
    }, [sendRequest, seasonType])


    return (
        <>

            {/* top section */}

            <div className="flex gap-x-2 mb-4">

                {/* season type */}
                <div>
                    <p className="text-xs font-semibold mb-1">SEASON TYPE</p>
                    <Select value={seasonType} onValueChange={(newValue) => setSeasonType(newValue)}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Regular Season" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="regular-season">Regular Season</SelectItem>
                            <SelectItem value="playoffs">Playoffs</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* per mode */}
                <div>
                    <p className="text-xs font-semibold mb-1">PER MODE</p>
                    <Select value={perMode} onValueChange={(newValue) => setPerMode(newValue)}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Per Game" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="average">Per Game</SelectItem>
                            <SelectItem value="total">Total</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {isLoading && <LoadingPage />}

            {
                !isLoading && averageLeaders && totalLeaders &&
                <div>

                    {
                        perMode === "average" &&
                        <div className="w-full flex flex-wrap gap-y-5 justify-between">
                            <LeaderCard averages={true} title="Points" topStatPlayers={averageLeaders.top_avg_pts} cardClass="w-[32%]" />
                            <LeaderCard averages={true} title="Assists" topStatPlayers={averageLeaders.top_avg_ast} cardClass="w-[32%]" />
                            <LeaderCard averages={true} title="Rebounds" topStatPlayers={averageLeaders.top_avg_reb} cardClass="w-[32%]" />
                            <LeaderCard averages={true} title="Steals" topStatPlayers={averageLeaders.top_avg_stl} cardClass="w-[32%]" />
                            <LeaderCard averages={true} title="Blocks" topStatPlayers={averageLeaders.top_avg_blk} cardClass="w-[32%]" />
                            <LeaderCard averages={true} title="Field Goals" topStatPlayers={averageLeaders.top_avg_fgm} cardClass="w-[32%]" />
                            <LeaderCard averages={true} title="FG%" topStatPlayers={averageLeaders.top_avg_fg_percentage} cardClass="w-[32%]" />
                            <LeaderCard averages={true} title="3 Pointers" topStatPlayers={averageLeaders.top_avg_tpm} cardClass="w-[32%]" />
                            <LeaderCard averages={true} title="3P%" topStatPlayers={averageLeaders.top_avg_tp_percentage} cardClass="w-[32%]" />
                            <LeaderCard averages={true} title="FT%" topStatPlayers={averageLeaders.top_avg_ft_percentage} cardClass="w-[32%]" />
                            <LeaderCard averages={true} title="Personal Fouls" topStatPlayers={averageLeaders.top_avg_pf} cardClass="w-[32%]" />
                            <LeaderCard averages={true} title="Turnovers" topStatPlayers={averageLeaders.top_avg_turnovers} cardClass="w-[32%]" />
                        </div>
                    }

                    {
                        perMode !== 'average' &&
                        <div className="w-full flex flex-wrap gap-y-5 justify-between">
                            <LeaderCard averages={false} title="Points" topStatPlayers={totalLeaders.top_total_pts} cardClass="w-[32%]" />
                            <LeaderCard averages={false} title="Assists" topStatPlayers={totalLeaders.top_total_ast} cardClass="w-[32%]" />
                            <LeaderCard averages={false} title="Rebounds" topStatPlayers={totalLeaders.top_total_reb} cardClass="w-[32%]" />
                            <LeaderCard averages={false} title="Steals" topStatPlayers={totalLeaders.top_total_stl} cardClass="w-[32%]" />
                            <LeaderCard averages={false} title="Blocks" topStatPlayers={totalLeaders.top_total_blk} cardClass="w-[32%]" />
                            <LeaderCard averages={false} title="Field Goals" topStatPlayers={totalLeaders.top_total_fgm} cardClass="w-[32%]" />
                            <LeaderCard averages={false} title="3PTs" topStatPlayers={totalLeaders.top_total_tpm} cardClass="w-[32%]" />
                            <LeaderCard averages={false} title="Personal Fouls" topStatPlayers={totalLeaders.top_total_pf} cardClass="w-[32%]" />
                            <LeaderCard averages={false} title="Turnovers" topStatPlayers={totalLeaders.top_total_turnovers} cardClass="w-[32%]" />
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default SeasonLeadersView