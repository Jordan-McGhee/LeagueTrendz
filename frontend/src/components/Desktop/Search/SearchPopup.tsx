import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";

// hook imports
import { useFetch } from "../../../Hooks/useFetch";

// type imports
import { PopupProps, TeamSearchResult, PlayerSearchResult, Team } from "@/types";

// utils imports
import { shortenTeamName, convertPlayerPosition } from "../../../Utils/utils";

// ui imports
import { DialogContent, DialogTitle, DialogHeader, DialogDescription, DialogFooter } from "../../ui/dialog"
import { Input } from "../../ui/input"
import { Skeleton } from "../../ui/skeleton";
import ErrorModal from "../../ui/ErrorModal";
import TeamLogo from "../../ui/TeamLogo";

const SearchPopup: React.FC<PopupProps> = ({ changeDialogSetting }) => {

    // states for search term and results
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [teamSearchResults, setTeamSearchResults] = useState<TeamSearchResult[]>([])
    const [playerSearchResults, setPlayerSearchResults] = useState<PlayerSearchResult[]>([])

    const closeDialogHandler = () => {
        changeDialogSetting()
        setSearchTerm("")
    }

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    useEffect(() => {
        if (searchTerm) {
            fetchSearchResults(searchTerm)
        } else {
            setTeamSearchResults([])
            setPlayerSearchResults([])
        }
    }, [searchTerm])

    const fetchSearchResults = async (term: string) => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/search/${term}`

        console.log(term)

        let responseData: any

        try {
            // query backend for search term
            responseData = await sendRequest(url)

            // format results into an array to display
            const formattedTeamResults: TeamSearchResult[] = [
                ...responseData.teamResults.map((team: Team) => ({
                    team_id: team.team_id,
                    full_name: team.full_name,
                    data: team,
                    abbreviation: team.abbreviation,
                    url: `${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${team.abbreviation.toLowerCase()}`
                }))
            ]

            const formattedPlayerResults: PlayerSearchResult[] = [
                ...responseData.playerResults.map((player: PlayerSearchResult) => ({
                    player_id: player.player_id,
                    team_id: player.team_id,
                    name: player.name,
                    photo_url: player.photo_url,
                    player_position: player.player_position,
                    jersey_number: player.jersey_number,
                    data: player,
                    url: `${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player.player_id}/${player.name.toLowerCase().replace(" ", "-")}`
                }))
            ]

            // update state
            setTeamSearchResults(formattedTeamResults)
            setPlayerSearchResults(formattedPlayerResults)
        } catch (error) {

        }
    }

    return (
        <DialogContent className="h-fit content-start transition-transform">

            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            <Input
                placeholder="Search for players or teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className=""
            />

            {/* loading state */}
            {isLoading &&
                <div className="flex flex-col gap-y-4">
                    <div className="flex items-center gap-x-2 w-full">
                        <Skeleton className="rounded-sm size-20" />

                        <div className="flex flex-col gap-y-2 w-full">
                            <Skeleton className="h-4 rounded-full" />
                            <Skeleton className="w-2/3 h-4" />
                            <Skeleton className="w-1/3 h-4" />
                        </div>

                    </div>
                    <div className="flex items-center gap-x-2 w-full">
                        <Skeleton className="rounded-sm size-20" />

                        <div className="flex flex-col gap-y-2 w-full">
                            <Skeleton className="h-4 rounded-full" />
                            <Skeleton className="w-2/3 h-4" />
                            <Skeleton className="w-1/3 h-4" />
                        </div>

                    </div>
                    <div className="flex items-center gap-x-2 w-full">
                        <Skeleton className="rounded-sm size-20" />

                        <div className="flex flex-col gap-y-2 w-full">
                            <Skeleton className="h-4 rounded-full" />
                            <Skeleton className="w-2/3 h-4" />
                            <Skeleton className="w-1/3 h-4" />
                        </div>
                    </div>

                </div>
            }

            {/* case for search term and no results */}
            {!isLoading && searchTerm && teamSearchResults.length === 0 && playerSearchResults.length === 0 &&

                <p className="italic font-semibold">No results</p>
            }

            {/* case for matches */}

            {
                !isLoading && teamSearchResults.length > 0 &&

                <div>
                    <p className="bg-slate-100 rounded-md p-2 font-semibold text-sm">TEAMS</p>

                    {/* teams div */}
                    <div className="flex w-fit justify-between gap-x-4 mt-2">
                        {teamSearchResults.map((team: TeamSearchResult) => (

                            // case for LA teams, and long named teams ?

                            <Link
                                to={team.url}
                                className="max-w-[80px] border border-slate-200 p-4 flex flex-col gap-y-2 items-center justify-center hover:cursor-pointer hover:scale-105 hover:border-[#ffa023]"
                                onClick={() => closeDialogHandler()}
                            >
                                <TeamLogo team_id={team.data.team_id} abbreviation={team.data.abbreviation} logoClass="size-12 object-contain" />
                                <p className="text-xs font-semi text-center">{team.full_name}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            }

            {
                !isLoading && playerSearchResults.length > 0 &&

                <div className="max-h-[400px]">
                    <p className="bg-slate-100 p-2 rounded-md font-semibold text-sm">PLAYERS</p>

                    {/* players div */}
                    <div className="flex justify-between gap-y-2 flex-wrap mt-2">
                        {playerSearchResults.map((player: PlayerSearchResult) => (
                            <Link
                                to={player.url}
                                className="flex p-2 gap-x-2 w-[48%] items-center border border-slate-200 rounded-md hover:cursor-pointer hover:scale-105 hover:border-[#ffa023]"
                                onClick={() => closeDialogHandler()}
                            >
                                <img src={player.photo_url} className="size-12 object-contain" alt={player.name} />

                                <div>
                                    <p className="font-semibold text-xs">{player.name}</p>
                                    <p className="text-xs">{player.team_id >= 0 ? shortenTeamName(player.team_id) : "Retired/Waived"} · #{player.jersey_number} · {convertPlayerPosition(player.player_position)}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            }


        </DialogContent >
    )
}

export default SearchPopup