import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

// hook imports
import { useFetch } from "../../../Hooks/useFetch";

// type imports
import { Player, Team } from "../../../types"

// ui imports
import { Card, CardContent } from "../../../components/ui/card"
import { Menubar, MenubarMenu, MenubarTrigger } from "../../../components/ui/menubar"

// component imports
import PlayerHero from "../../../components/Desktop/PlayerPage/PlayerHero";
import ErrorModal from "../../../components/ui/ErrorModal"
import LoadingPage from "../../LoadingPage"

// view imports
import Overview from "./Views/Overview";
import PlayerStatsView from "./Views/PlayerStatsView";
import PlayerBio from "./Views/PlayerBio";
import PlayerGameLog from "./Views/PlayerGameLog";
import PlayerSplits from "./Views/PlayerSplits";

const PlayerPage = () => {

    // pull player id from params
    const { player_id } = useParams()

    // grab query params from url if any
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const view = queryParams.get('view');
    const navigate = useNavigate()

    // data state
    const [player, setPlayer] = useState<Player | undefined>()
    const [currentTeam, setCurrentTeam] = useState<Team | undefined>()

    // name for url navigation for menubar
    const urlName: string | undefined = player?.name.toLowerCase().replace(" ", "-")

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
    }, [player_id, sendRequest])

    // MENU BAR
    const [selectedMenuItem, setSelectedMenuItem] = useState<string>('overview')

    // update menubar state based on query param
    useEffect(() => {
        if (view) {
            setSelectedMenuItem(view);
        }
    }, [view]);

    const handleMenuClick = (menuOption: string) => {
        setSelectedMenuItem(menuOption)
        navigate(`/nba/players/id/${player_id}/${urlName}?view=${menuOption}`)
    }


    return (
        <div className="h-fit min-h-screen">

            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {/* loading state */}
            {isLoading && <LoadingPage />}

            {
                player && currentTeam &&
                <Card className="p-4">
                    <PlayerHero player={player} currentTeam={currentTeam} />

                    <Menubar className="w-fit mt-4">
                        <MenubarMenu>
                            <MenubarTrigger
                            style={selectedMenuItem === "overview" ? {backgroundColor: currentTeam.main_color, color: "white"} : {}}
                            onClick={() => handleMenuClick('overview')} >Overview</MenubarTrigger>
                        </MenubarMenu>

                        <MenubarMenu>
                            <MenubarTrigger
                            style={selectedMenuItem === "stats" ? {backgroundColor: currentTeam.main_color, color: "white"} : {}}
                            onClick={() => handleMenuClick('stats')} >Stats</MenubarTrigger>
                        </MenubarMenu>

                        <MenubarMenu>
                            <MenubarTrigger
                            style={selectedMenuItem === "bio" ? {backgroundColor: currentTeam.main_color, color: "white"} : {}}
                            onClick={() => handleMenuClick('bio')} >Bio</MenubarTrigger>
                        </MenubarMenu>

                        <MenubarMenu>
                            <MenubarTrigger
                            style={selectedMenuItem === "splits" ? {backgroundColor: currentTeam.main_color, color: "white"} : {}}
                            onClick={() => handleMenuClick('splits')} >Splits</MenubarTrigger>
                        </MenubarMenu>

                        <MenubarMenu>
                            <MenubarTrigger
                            style={selectedMenuItem === "log" ? {backgroundColor: currentTeam.main_color, color: "white"} : {}}
                            onClick={() => handleMenuClick('log')} >Game Log</MenubarTrigger>
                        </MenubarMenu>
                    </Menubar>

                    <CardContent className="p-0">
                        {selectedMenuItem === "overview" && <Overview player={player} currentTeam={currentTeam} />}
                        {selectedMenuItem === "stats" && <PlayerStatsView player={player} currentTeam={currentTeam} />}
                        {selectedMenuItem === "bio" && <PlayerBio player={player} currentTeam={currentTeam} />}
                        {selectedMenuItem === "splits" && <PlayerSplits />}
                        {selectedMenuItem === "log" && <PlayerGameLog />}
                    </CardContent>
                </Card>
            }
        </div>
    )
}

export default PlayerPage