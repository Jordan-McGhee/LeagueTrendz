import { useState, useEffect } from "react"

// hooks import
import { useFetch } from "../../../../Hooks/useFetch"

// type imports
import { PlayerStatsProps, TotalsAndAveragesObject } from "../../../../types"

// component imports
import ErrorModal from "../../../../components/ui/ErrorModal"
import LoadingPage from "../../../LoadingPage"
import PlayerStatsContent from "../../../../components/Desktop/PlayerPage/Stats/PlayerStatsContent"

// mobile component imports
import PlayerStatsContentMobile from "../../../../components/Mobile/PlayerPage/Stats/PlayerStatsContent-Mobile"



const PlayerStatsView: React.FC<PlayerStatsProps> = ({ player, currentTeam }) => {

    // data state
    const [currentSeasonData, setCurrentSeasonData] = useState<TotalsAndAveragesObject | undefined>()
    const [ currentSeasonPlayoffData, setCurrentSeasonPlayoffData ] = useState<TotalsAndAveragesObject | undefined> ()

    // fetch hook
    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch from database
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/players/${player.player_id}/stats`

        let responseData: any

        const fetchPlayer = async () => {
            try {
                responseData = await sendRequest(url)
                setCurrentSeasonData(responseData.regular_season_stats)
                responseData.playoff_stats !== undefined && setCurrentSeasonPlayoffData(responseData.playoff_stats)
            } catch (error) {

            }
        }

        fetchPlayer()
    }, [sendRequest, player])


    return (
        <>
            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {/* loading state */}
            {isLoading && <LoadingPage />}

            {/* mobile */}
            <PlayerStatsContentMobile player={player} currentSeasonData={currentSeasonData} currentSeasonPlayoffData={currentSeasonPlayoffData} teamColor={currentTeam.main_color} className="mt-4 md:hidden" />

            {/* desktop */}
            <PlayerStatsContent player={player} currentSeasonData={currentSeasonData} currentSeasonPlayoffData={currentSeasonPlayoffData} className="mt-4 hidden md:block" />
        </>
    )
}

export default PlayerStatsView