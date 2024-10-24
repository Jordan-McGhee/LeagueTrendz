import React, { useState } from "react";
import { Link } from "react-router-dom";

// type imports
import { GameHighCardProps } from "@/types";

// utils imports
import { convertPlayerPosition, shortenTeamName, shortenPlayerName } from "../../../Utils/utils";

// ui imports
import { Card, CardTitle, CardHeader, CardContent, CardFooter } from "../../ui/card"
import { Separator } from "../../ui/separator"
import TeamLogo from "../../ui/TeamLogo"
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons"

const GameHighCardMobile: React.FC<GameHighCardProps> = ({ title, cardClass, gameLeaderPlayers }) => {

    const [showContent, setShowContent] = useState<boolean>(true)

    const toggleShowContent = () => {
        setShowContent(!showContent)
    }

    return (
        <>
            {
                gameLeaderPlayers &&
                <Card className={cardClass}>
                    <CardHeader>

                        <CardTitle className="flex items-center justify-between">
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
                                <div className="flex flex-col gap-y-1">

                                    {/* player */}
                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${gameLeaderPlayers[0].player_id}/${gameLeaderPlayers[0].name.toLowerCase().replace(" ", "-")}`} className="text-xl max-w-32 truncate">{shortenPlayerName(gameLeaderPlayers[0].name)}</Link>

                                    {/* teams */}
                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/games/game_id/${gameLeaderPlayers[0].game_id}?view=team-stats`} className="flex gap-x-1 items-start text-xs text-blue-500">

                                        {/* player team */}
                                        <div className="flex items-center gap-x-1">
                                            <TeamLogo team_id={gameLeaderPlayers[0].player_team_id} abbreviation={gameLeaderPlayers[0].player_team_abbreviation} logoClass="size-5 object-contain" />
                                            <p className={gameLeaderPlayers[0].player_team_score > gameLeaderPlayers[0].opp_team_score ? "font-black" : "font-light"}>{gameLeaderPlayers[0].player_team_score}</p>
                                        </div>

                                        <div className="flex items-center gap-x-1">

                                            {/* home or away */}
                                            <p>{gameLeaderPlayers[0].game_location === "HOME" ? "VS." : "@"}</p>

                                            {/* opp team */}

                                            <TeamLogo team_id={gameLeaderPlayers[0].opp_team_id} abbreviation={gameLeaderPlayers[0].opp_team_abbreviation} logoClass="size-5 object-contain" />
                                            <p className={gameLeaderPlayers[0].player_team_score < gameLeaderPlayers[0].opp_team_score ? "font-black" : "font-light"}>{gameLeaderPlayers[0].opp_team_score}</p>
                                        </div>

                                    </Link>

                                    <p className="font-extrabold text-xl">{gameLeaderPlayers[0].value} {title === "Three Pointers" ? "Threes" : title}</p>

                                </div>


                                {/* right side */}
                                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${gameLeaderPlayers[0].player_id}/${gameLeaderPlayers[0].name.toLowerCase().replace(" ", "-")}`} className="flex -space-x-12 items-center">
                                    <img src={gameLeaderPlayers[0].photo_url} alt={gameLeaderPlayers[0].name} className="h-16 z-10 relative object-contain" />
                                    <TeamLogo logoClass="object-contain opacity-40 size-14 z-0 relative" team_id={gameLeaderPlayers[0].player_team_id} abbreviation={gameLeaderPlayers[0].player_team_abbreviation} />
                                </Link>
                            </div>
                        }
                    </CardHeader>


                    {
                        showContent &&

                        <div>

                            <CardContent>
                                <div className="grid gap-y-4">
                                    {gameLeaderPlayers.map((player, index) => {

                                        if (index === 0) {
                                            return
                                        }

                                        return (

                                            <div>
                                                <Separator className="w-full mb-4" />
                                                <div className="grid grid-cols-12 items-center text-xs">

                                                    {/* name, position, number, team */}
                                                    <div className="col-start-1 col-span-10">
                                                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player.player_id}/${player.name.toLowerCase().replace(" ", "-")}`} className="text-base flex gap-x-1 font-bold">{player.name.length > 18 ? shortenPlayerName(player.name) : player.name}</Link>

                                                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/games/game_id/${gameLeaderPlayers[index].game_id}?view=team-stats`} className="text-blue-500 flex items-start gap-x-1">

                                                            {/* player team */}
                                                            <p className={player.player_team_score > player.opp_team_score ? "font-bold" : ""}>{shortenTeamName(player.player_team_id)}</p>

                                                            <p className={player.player_team_score > player.opp_team_score ? "font-bold" : ""}>{player.player_team_score}</p>

                                                            {/* location */}
                                                            <p>{player.game_location === "HOME" ? "VS" : "@"}</p>

                                                            {/* opposing team */}
                                                            <p className={player.player_team_score < player.opp_team_score ? "font-bold" : ""}>{shortenTeamName(player.opp_team_id)}</p>

                                                            <p className={player.player_team_score < player.opp_team_score ? "font-bold" : ""}>{player.opp_team_score}</p>

                                                        </Link>



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
                                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players?view=box&statCategory=${gameLeaderPlayers[0].stat}`}>
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

export default GameHighCardMobile