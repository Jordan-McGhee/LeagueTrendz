import React, { useState, useEffect } from "react";

// hook imports
import { useFetch } from "../../../../Hooks/useFetch"

// type imports
import { PlayerPageProps, OverviewData } from "../../../../types";

// component imports
import OverviewRecentGames from "../../../../components/Desktop/PlayerPage/Overview/OverviewRecentGames"
import TeamStandings from "../../../../components/Desktop/PlayerPage/Overview/OverviewTeamStandings";
import SwitchPlayer from "../../../../components/Desktop/PlayerPage/Overview/SwitchPlayer";
import OverviewSplits from "../../../../components/Desktop/PlayerPage/Overview/OverviewSplits";

// ui imports
import LoadingPage from "../../../LoadingPage"
import ErrorModal from "../../../../components/ui/ErrorModal"

const Overview: React.FC<PlayerPageProps> = ({ player, currentTeam }) => {

    const [data, setData] = useState<OverviewData | undefined>()

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch from database
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/players/${player.player_id}/overview/${currentTeam.team_id}`

        let responseData: any

        const fetchPlayer = async () => {
            try {
                responseData = await sendRequest(url)
                setData(responseData)
            } catch (error) {

            }
        }

        fetchPlayer()
    }, [player, sendRequest])

    return (
        <>
            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {/* loading state */}
            {isLoading && <LoadingPage />}


            {
                data &&

                // full content div
                <div className="flex justify-between gap-x-4 mt-4">
                    {/* left side */}
                    < div className="w-[65%] flex flex-col gap-y-4">
                        <OverviewSplits lastGame={data.lastFive[0]} splits={data.splits} currentTeam={currentTeam}/>

                        <OverviewRecentGames player={player} games={data.lastFive} />
                    </div>

                    {/* right side */}
                    <div className="w-[35%] flex flex-col gap-y-4">
                        <TeamStandings currentTeam={currentTeam} standings={data.teamStandings} />
                        <SwitchPlayer player={player} currentTeam={currentTeam} />

                    </div>
                </div >
            }

        </>
    )
}

export default Overview