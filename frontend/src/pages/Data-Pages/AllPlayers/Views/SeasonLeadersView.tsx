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
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";


const SeasonLeadersView = () => {

    const [seasonAverageLeaders, setSeasonAverageLeaders] = useState<SeasonAverageLeadersState | undefined>()
    const [seasonTotalLeaders, setSeasonTotalLeaders] = useState<SeasonTotalLeadersState | undefined>()

    // drop down states
    const [showAverages, setShowAverages] = useState<boolean>(true)
    const [showTotals, setShowTotals] = useState<boolean>(true)

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
            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {isLoading && <LoadingPage />}

            {
                !isLoading && seasonAverageLeaders && seasonTotalLeaders &&
                <div>

                    {/* PER GAME AVERAGES */}
                    <div className="flex items-center w-fit hover:cursor-pointer" onClick={() => setShowAverages(!showAverages)}>
                        <p className="text-2xl font-bold my-4">PER GAME AVERAGES</p>
                        {showAverages ? <CaretUpIcon className="size-8 object-contain" /> : <CaretDownIcon className="size-8 object-contain" />}
                    </div>

                    {
                        showAverages &&
                        <div className="w-full flex flex-wrap gap-y-5 justify-between">
                            <LeaderCard title="Points" topStatPlayers={seasonAverageLeaders.top_avg_pts} cardClass="w-[32%]" />
                            <LeaderCard title="Assists" topStatPlayers={seasonAverageLeaders.top_avg_ast} cardClass="w-[32%]" />
                            <LeaderCard title="Rebounds" topStatPlayers={seasonAverageLeaders.top_avg_reb} cardClass="w-[32%]" />
                            <LeaderCard title="Steals" topStatPlayers={seasonAverageLeaders.top_avg_stl} cardClass="w-[32%]" />
                            <LeaderCard title="Blocks" topStatPlayers={seasonAverageLeaders.top_avg_blk} cardClass="w-[32%]" />
                            <LeaderCard title="Field Goals" topStatPlayers={seasonAverageLeaders.top_avg_fgm} cardClass="w-[32%]" />
                            <LeaderCard title="FG%" topStatPlayers={seasonAverageLeaders.top_avg_fg_percentage} cardClass="w-[32%]" />
                            <LeaderCard title="3 Pointers" topStatPlayers={seasonAverageLeaders.top_avg_tpm} cardClass="w-[32%]" />
                            <LeaderCard title="3P%" topStatPlayers={seasonAverageLeaders.top_avg_tp_percentage} cardClass="w-[32%]" />
                            <LeaderCard title="FT%" topStatPlayers={seasonAverageLeaders.top_avg_ft_percentage} cardClass="w-[32%]" />
                            <LeaderCard title="Personal Fouls" topStatPlayers={seasonAverageLeaders.top_avg_pf} cardClass="w-[32%]" />
                            <LeaderCard title="Turnovers" topStatPlayers={seasonAverageLeaders.top_avg_turnovers} cardClass="w-[32%]" />
                        </div>
                    }


                    {/* TOTALS */}
                    <div className="flex items-center w-fit hover:cursor-pointer" onClick={() => setShowTotals(!showTotals)}>
                        <p className="text-2xl font-bold my-4">TOTALS</p>
                        {showTotals ? <CaretUpIcon className="size-8 object-contain" /> : <CaretDownIcon className="size-8 object-contain" />}
                    </div>

                    {
                        showTotals &&
                        <div className="w-full flex flex-wrap gap-y-5 justify-between">
                            <LeaderCard title="Points" topStatPlayers={seasonTotalLeaders.top_total_pts} cardClass="w-[32%]" />
                            <LeaderCard title="Assists" topStatPlayers={seasonTotalLeaders.top_total_ast} cardClass="w-[32%]" />
                            <LeaderCard title="Rebounds" topStatPlayers={seasonTotalLeaders.top_total_reb} cardClass="w-[32%]" />
                            <LeaderCard title="Steals" topStatPlayers={seasonTotalLeaders.top_total_stl} cardClass="w-[32%]" />
                            <LeaderCard title="Blocks" topStatPlayers={seasonTotalLeaders.top_total_blk} cardClass="w-[32%]" />
                            <LeaderCard title="Field Goals" topStatPlayers={seasonTotalLeaders.top_total_fgm} cardClass="w-[32%]" />
                            <LeaderCard title="3PTs" topStatPlayers={seasonTotalLeaders.top_total_tpm} cardClass="w-[32%]" />
                            <LeaderCard title="Personal Fouls" topStatPlayers={seasonTotalLeaders.top_total_pf} cardClass="w-[32%]" />
                            <LeaderCard title="Turnovers" topStatPlayers={seasonTotalLeaders.top_total_turnovers} cardClass="w-[32%]" />
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default SeasonLeadersView