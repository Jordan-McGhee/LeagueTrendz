import React from "react"
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

// hook imports
import { useFetch } from "../../../Hooks/useFetch"

// types
import { GameBoxScoreState } from "@/types";

// utils

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../components/ui/card"
import { Menubar, MenubarMenu, MenubarTrigger } from "../../../components/ui/menubar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"

// views imports

// component imports
import TeamLogo from "../../../components/ui/TeamLogo"
import ErrorModal from "../../../components/ui/ErrorModal"
import LoadingPage from "../../LoadingPage"

const GameBoxScorePage = () => {

    // pull abbreviation from params
    const { game_id } = useParams<{ game_id: string }>()

    // grab query params from url if any
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const view = queryParams.get('view');
    const navigate = useNavigate()


    // states
    const [game, setGame] = useState<GameBoxScoreState | undefined>()

    // fetch from database
    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    useEffect(() => {

        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/games/game_id/${game_id}`

        let responseData: any

        const fetchGame = async () => {
            try {
                responseData = await sendRequest(url)
                setGame(responseData.game)
            } catch (error) {
                
            }
        }

        fetchGame()

    }, [game_id, sendRequest])

    // console.log(game)

    // MENUBAR
    const [selectedMenuItem, setSelectedMenuItem] = useState<string>('home')

    // update menubar state based on query param
    useEffect(() => {
        if (view) {
            setSelectedMenuItem(view);
        }
    }, [view]);

    return (
        <div className="h-full min-h-svh">
            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {/* loading state */}
            {isLoading && <LoadingPage />}

            {
                game &&
                <Card>
                    <CardHeader>
                        
                    </CardHeader>
                </Card>
            }
        </div>
    )

}

export default GameBoxScorePage