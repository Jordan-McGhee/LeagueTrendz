import React from "react"
import { Link } from "react-router-dom"

// type imports
import { LeaderCardProps } from "@/types"

// utils imports
import { convertPlayerPosition, shortenTeamName, shortenPlayerName } from "../../../Utils/utils"

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "../../ui/card"
import { Separator } from "../../ui/separator"
import TeamLogo from "../../ui/TeamLogo"

const LeaderCard: React.FC<LeaderCardProps> = ({ cardClass, title, topStatPlayers }) => {

    return (
        <>
            {
                topStatPlayers &&
                <Card className={cardClass}>
                    <CardHeader>
                        <p className="uppercase font-bold text-2xl">{title}</p>
                        <div className="flex items-center justify-between">
                            {/* left side */}
                            <div className="flex flex-col gap-y-2">

                                {/* player */}
                                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${topStatPlayers[0].player_id}/${topStatPlayers[0].name.toLowerCase().replace(" ", "-")}`}className="font-light text-xl hover:underline"><span className="font-bold text-ellipsis">{shortenPlayerName(topStatPlayers[0].name)}</span> #{topStatPlayers[0].jersey_number}</Link>

                                {/* team */}
                                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${topStatPlayers[0].abbreviation}?view=home`} className="flex gap-x-2 items-center hover:underline">
                                    <TeamLogo team_id={topStatPlayers[0].team_id} abbreviation={topStatPlayers[0].abbreviation} logoClass="size-7 object-contain" />
                                    <p>{shortenTeamName(topStatPlayers[0].team_id)}</p>
                                </Link>
                                <p className="font-extrabold text-4xl">{topStatPlayers[0].value}</p>
                            </div>


                            {/* right side */}
                            <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${topStatPlayers[0].player_id}/${topStatPlayers[0].name.toLowerCase().replace(" ", "-")}`}>
                                <img src={topStatPlayers[0].photo_url} alt={topStatPlayers[0].name} className="size-32 object-contain" />
                            </Link>
                        </div>
                    </CardHeader>

                    <CardContent>

                        <div className="grid gap-y-4">
                            {topStatPlayers.map((player) => {

                                if (topStatPlayers.indexOf(player) === 0) {
                                    return
                                }

                                return (

                                    <div>
                                        <Separator className="w-full mb-4" />
                                        <div className="grid grid-cols-12 items-center text-xs">

                                            {/* index */}
                                            {/* <p className="col-start-1 col-span-1 text-lg">{topStatPlayers.indexOf(player) + 1}.</p> */}

                                            {/* photo url */}
                                            {/* <img src={player.photo_url} alt={player.name} className="size-12 object-contain col-start-1 col-span-2" /> */}

                                            {/* name, position, number, team */}
                                            <div className="col-start-1 col-span-10">
                                                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player.player_id}/${player.name.toLowerCase().replace(" ", "-")}`} className="text-lg flex gap-x-1 hover:underline"><span className="font-semibold">{shortenPlayerName(player.name)}</span> #{player.jersey_number}</Link>
                                                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${player.abbreviation}?view=home`} className="hover:underline">{player.full_name}</Link>
                                            </div>

                                            {/* value */}
                                            <p className="col-start-11 col-span-2 font-bold text-2xl text-right">{player.value}</p>

                                        </div>
                                    </div>
                                )
                            })}

                        </div>


                    </CardContent>

                    <CardFooter className="text-blue-600 font-semibold">
                        See Top 50
                    </CardFooter>
                </Card>
            }
        </>
    )
}

export default LeaderCard