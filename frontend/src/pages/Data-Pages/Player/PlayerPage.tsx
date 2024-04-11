import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// hook imports
import { useFetch } from "../../../Hooks/useFetch";

// type imports
import { Player, Team } from "../../../types"

// ui imports
import { Card, CardContent } from "../../../components/ui/card"

// component imports
import PlayerHero from "../../../components/Desktop/PlayerPage/PlayerHero";
import PlayerMenuBar from "../../../components/Desktop/PlayerPage/PlayerMenubar";
import ErrorModal from "../../../components/ui/ErrorModal"
import LoadingPage from "../../LoadingPage"

// view imports
import Overview from "./Views/Overview";
import PlayerStatsView from "./Views/PlayerStatsView";
import PlayerBio from "./Views/PlayerBio";
import PlayerGameLog from "./Views/PlayerGameLog";
import PlayerSplits from "./Views/PlayerSplits";

const PlayerPage = () => {

    // menu bar
    type MenuItem = "overview" | "stats" | "bio" | "splits" | "log"

    const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem>('overview')

    const handleMenuClick = (menuOption: MenuItem) => {
        setSelectedMenuItem(menuOption)
    }

    // pull player id from params
    const { player_id } = useParams()

    // data state
    const [player, setPlayer] = useState<Player | undefined>()
    const [ currentTeam, setCurrentTeam ] = useState<Team | undefined>()

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch from database
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/players/${player_id}`

        let responseData: any

        const fetchPlayer = async () => {
            try {
                responseData = await sendRequest(url)
                setPlayer(responseData.player)
                setCurrentTeam(responseData.currentTeam)
            } catch (error) {
                
            }
        }

        fetchPlayer()
    }, [player_id])



    return (
        <div className="h-fit min-h-screen">

            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {/* loading state */}
            {isLoading && <LoadingPage />}

            {
                player && currentTeam &&
                <Card className="p-4">
                    <PlayerHero player={player} currentTeam={currentTeam}/>
                    <PlayerMenuBar onMenuChange={handleMenuClick} />

                    <CardContent className="p-0">
                        {selectedMenuItem === "overview" && <Overview />}
                        {selectedMenuItem === "stats" && <PlayerStatsView />}
                        {selectedMenuItem === "bio" && <PlayerBio player={player} currentTeam ={currentTeam} />}
                        {selectedMenuItem === "splits" && <PlayerSplits />}
                        {selectedMenuItem === "log" && <PlayerGameLog />}
                    </CardContent>
                </Card>
            }
        </div>
    )
}

export default PlayerPage