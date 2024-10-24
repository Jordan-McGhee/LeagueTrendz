import React, { useState } from "react";
import { Link } from "react-router-dom";

// type imports
import { LeaderCardProps } from "@/types";

// utils imports
import { shortenTeamName, shortenPlayerName } from "../../../Utils/utils";

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../ui/card"
import { Separator } from "../../ui/separator"
import TeamLogo from "../../ui/TeamLogo"
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons"

const LeaderCardMobile: React.FC<LeaderCardProps> = ({ cardClass, title, averages, topStatPlayers }) => {

    const [showContent, setShowContent] = useState<boolean>(true)

    const toggleShowContent = () => {
        setShowContent(!showContent)
    }


    return (
        <>
            {topStatPlayers &&

                <Card className={cardClass}>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <p className="uppercase font-bold">{title}</p>

                            <div onClick={() => toggleShowContent()} className="flex gap-x-2 items-center md:hidden">
                                <p className="text-sm">{showContent ? "Hide" : "Show"}</p>
                                {showContent ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
                            </div>
                        </CardTitle>

                        {
                            showContent &&
                            <div className="flex items-center justify-between">
                                {/* left side */}
                                <div className="flex flex-col gap-y-0.5">

                                    {/* player */}
                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${topStatPlayers[0].player_id}/${topStatPlayers[0].name.toLowerCase().replace(" ", "-")}`} className="max-w-32 truncate font-light text-lg hover:underline"><span className="font-bold text-ellipsis">{shortenPlayerName(topStatPlayers[0].name)}</span></Link>

                                    {/* team */}
                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${topStatPlayers[0].abbreviation}?view=home`} className="flex gap-x-2 items-center text-sm">
                                        <TeamLogo team_id={topStatPlayers[0].team_id} abbreviation={topStatPlayers[0].abbreviation} logoClass="size-6 object-contain" />
                                        <p>{shortenTeamName(topStatPlayers[0].team_id)}</p>
                                        {/* <p>#{topStatPlayers[0].jersey_number}</p> */}
                                    </Link>
                                    <p className="font-extrabold text-2xl">{topStatPlayers[0].value}</p>
                                </div>


                                {/* right side */}
                                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${topStatPlayers[0].player_id}/${topStatPlayers[0].name.toLowerCase().replace(" ", "-")}`} className="flex -space-x-12  items-center">
                                    <img src={topStatPlayers[0].photo_url} alt={topStatPlayers[0].name} className="h-16 object-contain z-10 relative" />
                                    <TeamLogo logoClass="object-contain opacity-40 size-16 z-0 relative" team_id={topStatPlayers[0].team_id} abbreviation={topStatPlayers[0].abbreviation} />
                                </Link>
                            </div>
                        }
                    </CardHeader>

                    {
                        showContent &&
                        <div>
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
                                                    <div className="col-start-1 col-span-9">
                                                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player.player_id}/${player.name.toLowerCase().replace(" ", "-")}`} className="text-base w-full flex gap-x-1 hover:underline"><span className="font-semibold">{player.name.length > 18 ? shortenPlayerName(player.name) : player.name}</span></Link>
                                                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${player.abbreviation}?view=home`} className="hover:underline">{player.full_name}</Link>
                                                    </div>

                                                    {/* value */}
                                                    <p className="col-start-10 col-span-3 font-bold text-2xl text-right">{player.value}</p>

                                                </div>
                                            </div>
                                        )
                                    })}

                                </div>
                            </CardContent>

                            <CardFooter className="text-blue-600 font-semibold">
                                <Link to={averages ? `${process.env.REACT_APP_FRONTEND_URL}/nba/players?view=tables&perMode=average&statCategory=${topStatPlayers[0].stat.split('_').slice(1).join('_')}` : `${process.env.REACT_APP_FRONTEND_URL}/nba/players?view=tables&perMode=total&statCategory=${topStatPlayers[0].stat.split('_').slice(1).join('_')}`}>
                                    See Top 50
                                </Link>
                            </CardFooter>
                        </div>
                    }


                </Card>
            }
        </>
    )
}

export default LeaderCardMobile