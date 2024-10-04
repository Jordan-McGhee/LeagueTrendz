import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

// type imports
import { PopularPlayer } from "@/types"

// utils imports
import { convertPlayerPosition, shortenPlayerName, shortenTeamName } from "../../../Utils/utils"

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card"
import { Separator } from "../../ui/separator"
import TeamLogo from "../../ui/TeamLogo"
import { Skeleton } from "../../ui/skeleton"

// hooks imports
import { useFetch } from "../../../Hooks/useFetch"

const HomePlayers = () => {

    const [players, setPlayers] = useState<PopularPlayer[] | undefined>()

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch popular players from database
    useEffect(() => {

        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/players/popular`

        let responseData: any

        const fetchPopularPlayers = async () => {
            try {
                responseData = await sendRequest(url)
                setPlayers(responseData.players)
            } catch (error) {

            }
        }

        fetchPopularPlayers()

    }, [sendRequest])

    console.log(players)

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Popular Players
                </CardTitle>
            </CardHeader>
            <CardContent>
                {
                    isLoading &&
                    <div>

                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-y-2">
                                <Skeleton className="h-3 w-36 rounded-full" />
                                <Skeleton className="h-2 w-32 rounded-full" />
                            </div>

                            <Skeleton className="size-14 rounded-full" />
                        </div>

                        <Separator className="w-full my-2" />

                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-y-2">
                                <Skeleton className="h-3 w-36 rounded-full" />
                                <Skeleton className="h-2 w-32 rounded-full" />
                            </div>

                            <Skeleton className="size-14 rounded-full" />
                        </div>

                        <Separator className="w-full my-2" />

                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-y-2">
                                <Skeleton className="h-3 w-36 rounded-full" />
                                <Skeleton className="h-2 w-32 rounded-full" />
                            </div>

                            <Skeleton className="size-14 rounded-full" />
                        </div>

                        <Separator className="w-full my-2" />

                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-y-2">
                                <Skeleton className="h-3 w-36 rounded-full" />
                                <Skeleton className="h-2 w-32 rounded-full" />
                            </div>

                            <Skeleton className="size-14 rounded-full" />
                        </div>

                        <Separator className="w-full my-2" />

                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-y-2">
                                <Skeleton className="h-3 w-36 rounded-full" />
                                <Skeleton className="h-2 w-32 rounded-full" />
                            </div>

                            <Skeleton className="size-14 rounded-full" />
                        </div>
                    </div>
                }
                {
                    players && players.map((player) => (
                        <div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="items-center font-light"><Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player.player_id}/${player.name.toLowerCase().replace(" ", "-")}`} className="font-semibold hover:underline">{player.name}</Link> #{player.jersey_number}</p>
                                    <div className="flex gap-x-1 items-center text-xs">
                                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${player.team_abbreviation}?view=home`} className="hover:underline">{player.team_full_name}</Link>
                                        <p>· {convertPlayerPosition(player.player_position)}</p>
                                    </div>
                                </div>
                                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player.player_id}/${player.name.toLowerCase().replace(" ", "-")}`} className="flex -space-x-7 items-center overflow-hidden">
                                    <img src={player.photo_url} alt={player.name} className="size-14 object-contain z-10 relative" />
                                    <TeamLogo logoClass="object-contain size-10 z-0 relative" team_id={player.team_id} abbreviation={player.team_abbreviation} />
                                </Link>
                            </div>
                            {players.indexOf(player) !== 4 && <Separator className="w-full my-1.5" />}
                        </div>
                    ))
                }
            </CardContent>
        </Card>
    )
}

export default HomePlayers