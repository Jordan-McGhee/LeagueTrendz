import React from "react"
import { Link } from "react-router-dom"

// type imports
import { HomePlayersProps } from "@/types"

// utils imports
import { convertPlayerPosition, shortenPlayerName, shortenTeamName } from "../../../Utils/utils"

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card"
import { Separator } from "../../ui/separator"
import TeamLogo from "../../ui/TeamLogo"

// mobile import
import HomePlayersMobile from "../../Mobile/HomePage/HomePlayers-Mobile"


const HomePlayers: React.FC<HomePlayersProps> = ({ players }) => {

    return (
        <>
            {/* mobile */}
            <div className="md:hidden">
                <HomePlayersMobile players={players} />
            </div>

            {/* desktop */}
            <Card className="hidden md:block">
                <CardHeader>
                    <CardTitle>
                        Popular Players
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {
                        players && players.map((player) => (
                            <div>
                                <div className="grid grid-cols-8 gap-x-2 items-center w-full">
                                    <div className="col-span-6">
                                        <p className=" flex gap-x-1 items-center font-light">
                                            <Link
                                                to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player.player_id}/${player.name.toLowerCase().replace(" ", "-")}`}
                                                className="font-semibold hover:underline"
                                            >
                                                {player.name}
                                            </Link>
                                            <p>#{player.jersey_number}</p>
                                        </p>
                                        <div className="flex gap-x-1 items-center text-xs">
                                            <Link
                                                to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${player.team_abbreviation}?view=home`}
                                                className="hover:underline"
                                            >
                                                {player.team_full_name}
                                            </Link>
                                            <p>· {convertPlayerPosition(player.player_position)}</p>
                                        </div>
                                    </div>

                                    <div className="col-span-2 flex justify-end">
                                        <Link
                                            to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player.player_id}/${player.name.toLowerCase().replace(" ", "-")}`}
                                            className="flex -space-x-7 items-center"
                                        >
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
                                        </Link>
                                    </div>
                                </div>
                                {players.indexOf(player) !== 4 && <Separator className="w-full my-1.5" />}
                            </div>
                        ))
                    }
                </CardContent>
            </Card>
        </>
    )
}

export default HomePlayers