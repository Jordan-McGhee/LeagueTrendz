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
import SeasonLeaders from "../../../../components/Desktop/AllPlayersPage/Views/SeasonLeaders"

// mobile component
import SeasonLeadersMobile from "../../../../components/Mobile/AllPlayersPage/Views/SeasonLeaders-Mobile"

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
            // console.log(responseData)
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
                        <SelectTrigger className="w-[125px] md:w-[200px]">
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
                        <SelectTrigger className="w-[125px] md:w-[200px]">
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

                <>
                    <SeasonLeaders averageLeaders={averageLeaders} totalLeaders={totalLeaders} perMode={perMode} styleClass="hidden md:block" />
                    <SeasonLeadersMobile averageLeaders={averageLeaders} totalLeaders={totalLeaders} perMode={perMode} styleClass="md:hidden" />
                </>
            }
        </>
    )
}

export default SeasonLeadersView