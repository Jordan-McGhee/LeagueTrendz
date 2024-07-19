import React, { useState, useEffect } from "react";

// hook imports
import { useFetch } from "../../../../Hooks/useFetch";

// type imports
import { SeasonAverageLeadersState, SeasonTotalLeadersState } from "@/types";

// utils imports

// ui imports

// component imports
import ErrorModal from "../../../../components/ui/ErrorModal"
import LoadingPage from "../../../LoadingPage"
import LeaderCard from "../../../../components/Desktop/AllPlayersPage/LeaderCard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";


const SeasonLeadersView = () => {

    const [seasonAverageLeaders, setSeasonAverageLeaders] = useState<SeasonAverageLeadersState | undefined>()
    const [seasonTotalLeaders, setSeasonTotalLeaders] = useState<SeasonTotalLeadersState | undefined>()

    const [seasonType, setSeasonType] = useState<string>('regular-season');
    const [perMode, setPerMode] = useState<string>('average');

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
                !isLoading && seasonAverageLeaders && seasonTotalLeaders &&
                <div>

                    {
                        perMode === "average" &&
                        <div className="w-full flex flex-wrap gap-y-5 justify-between">
                            <LeaderCard averages={true} title="Points" topStatPlayers={seasonAverageLeaders.top_avg_pts} cardClass="w-[32%]" />
                            <LeaderCard averages={true} title="Assists" topStatPlayers={seasonAverageLeaders.top_avg_ast} cardClass="w-[32%]" />
                            <LeaderCard averages={true} title="Rebounds" topStatPlayers={seasonAverageLeaders.top_avg_reb} cardClass="w-[32%]" />
                            <LeaderCard averages={true} title="Steals" topStatPlayers={seasonAverageLeaders.top_avg_stl} cardClass="w-[32%]" />
                            <LeaderCard averages={true} title="Blocks" topStatPlayers={seasonAverageLeaders.top_avg_blk} cardClass="w-[32%]" />
                            <LeaderCard averages={true} title="Field Goals" topStatPlayers={seasonAverageLeaders.top_avg_fgm} cardClass="w-[32%]" />
                            <LeaderCard averages={true} title="FG%" topStatPlayers={seasonAverageLeaders.top_avg_fg_percentage} cardClass="w-[32%]" />
                            <LeaderCard averages={true} title="3 Pointers" topStatPlayers={seasonAverageLeaders.top_avg_tpm} cardClass="w-[32%]" />
                            <LeaderCard averages={true} title="3P%" topStatPlayers={seasonAverageLeaders.top_avg_tp_percentage} cardClass="w-[32%]" />
                            <LeaderCard averages={true} title="FT%" topStatPlayers={seasonAverageLeaders.top_avg_ft_percentage} cardClass="w-[32%]" />
                            <LeaderCard averages={true} title="Personal Fouls" topStatPlayers={seasonAverageLeaders.top_avg_pf} cardClass="w-[32%]" />
                            <LeaderCard averages={true} title="Turnovers" topStatPlayers={seasonAverageLeaders.top_avg_turnovers} cardClass="w-[32%]" />
                        </div>
                    }

                    {
                        perMode !== 'average' &&
                        <div className="w-full flex flex-wrap gap-y-5 justify-between">
                            <LeaderCard averages={false} title="Points" topStatPlayers={seasonTotalLeaders.top_total_pts} cardClass="w-[32%]" />
                            <LeaderCard averages={false} title="Assists" topStatPlayers={seasonTotalLeaders.top_total_ast} cardClass="w-[32%]" />
                            <LeaderCard averages={false} title="Rebounds" topStatPlayers={seasonTotalLeaders.top_total_reb} cardClass="w-[32%]" />
                            <LeaderCard averages={false} title="Steals" topStatPlayers={seasonTotalLeaders.top_total_stl} cardClass="w-[32%]" />
                            <LeaderCard averages={false} title="Blocks" topStatPlayers={seasonTotalLeaders.top_total_blk} cardClass="w-[32%]" />
                            <LeaderCard averages={false} title="Field Goals" topStatPlayers={seasonTotalLeaders.top_total_fgm} cardClass="w-[32%]" />
                            <LeaderCard averages={false} title="3PTs" topStatPlayers={seasonTotalLeaders.top_total_tpm} cardClass="w-[32%]" />
                            <LeaderCard averages={false} title="Personal Fouls" topStatPlayers={seasonTotalLeaders.top_total_pf} cardClass="w-[32%]" />
                            <LeaderCard averages={false} title="Turnovers" topStatPlayers={seasonTotalLeaders.top_total_turnovers} cardClass="w-[32%]" />
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default SeasonLeadersView