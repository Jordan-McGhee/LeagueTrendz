import React, { useState } from "react"
import { Link } from "react-router-dom"

// type imports
import { HomePlayersProps } from "@/types"

// utils imports
import { convertPlayerPosition, shortenPlayerName, shortenTeamName } from "../../../Utils/utils"

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card"
import { Separator } from "../../ui/separator"
import TeamLogo from "../../ui/TeamLogo"
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons"


const HomePlayersMobile: React.FC<HomePlayersProps> = ({ players }) => {

    const [showContent, setShowContent] = useState<Boolean>(true)

    const toggleShowContent = () => {
        setShowContent(!showContent)
    }

    return (
        <>

            <Card>
                <CardHeader>
                    <CardTitle>
                        <div className="flex justify-between items-center">
                            <p className="text-xl">Popular Players</p>

                            <div onClick={() => toggleShowContent()} className="flex gap-x-2 items-center">
                                <p className="text-sm">{showContent ? "Hide" : "Show"}</p>
                                {showContent ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>

                {
                    showContent &&

                    <CardContent>
                        {
                            players && players.map((player) => (
                                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player.player_id}/${player.name.toLowerCase().replace(" ", "-")}`}>
                                    <div className="grid grid-cols-8 gap-x-2 items-center w-full">
                                        <div className="col-span-6">
                                            <p className=" flex gap-x-1 items-center font-light">
                                                <p className="font-semibold text-xl">{player.name}</p>
                                                <p>#{player.jersey_number}</p>
                                            </p>
                                            <div className="flex gap-x-1 items-center text-sm">
                                                <p>{player.team_full_name}</p>
                                                <p>· {convertPlayerPosition(player.player_position)}</p>
                                            </div>
                                        </div>

                                        <div className="col-span-2 flex justify-end">
                                            <div className="flex -space-x-7 items-center">
                                                <img
                                                    src={player.photo_url}
                                                    alt={player.name}
                                                    className="size-14 object-contain z-10 relative"
                                                />
                                                <TeamLogo
                                                    logoClass="w-10 h-10 object-contain z-0"
                                                    team_id={player.team_id}
                                                    abbreviation={player.team_abbreviation}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {players.indexOf(player) !== 4 && <Separator className="w-full my-1.5" />}
                                </Link>
                            ))
                        }
                    </CardContent>
                }
            </Card>
        </>
    )
}

export default HomePlayersMobile