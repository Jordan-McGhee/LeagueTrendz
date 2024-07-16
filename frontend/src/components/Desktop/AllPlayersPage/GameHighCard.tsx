import React from "react"
import { Link } from "react-router-dom"

// type imports
import { GameHighCardProps } from "@/types"

// utils imports
import { convertPlayerPosition, shortenTeamName, shortenPlayerName } from "../../../Utils/utils"

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "../../ui/card"
import { Separator } from "../../ui/separator"
import TeamLogo from "../../ui/TeamLogo"

const GameHighCard: React.FC<GameHighCardProps> = ({ title, cardClass, gameLeaderPlayers }) => {

    console.log(gameLeaderPlayers[0].game_date)

    return (
        <>
            {
                gameLeaderPlayers &&
                <Card className={cardClass}>
                    <CardHeader>
                        <p className="uppercase font-bold text-2xl">{title}</p>
                        <div className="flex items-center justify-between">
                            {/* left side */}
                            <div className="flex flex-col gap-y-2">

                                {/* player */}
                                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${gameLeaderPlayers[0].player_id}/${gameLeaderPlayers[0].name.toLowerCase().replace(" ", "-")}`} className="font-light text-xl hover:underline"><span className="font-bold">{gameLeaderPlayers[0].name}</span> · #{gameLeaderPlayers[0].jersey_number} · {convertPlayerPosition(gameLeaderPlayers[0].player_position)}</Link>

                                {/* teams */}
                                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/games/game_id/${gameLeaderPlayers[0].game_id}?view=team-stats`} className="flex gap-x-2 items-center hover:underline">

                                    {/* player team */}
                                    <TeamLogo team_id={gameLeaderPlayers[0].player_team_id} abbreviation={gameLeaderPlayers[0].player_team_abbreviation} logoClass="size-7 object-contain" />
                                    <p className={gameLeaderPlayers[0].player_team_score > gameLeaderPlayers[0].opp_team_score ? "font-bold" : ""}>{shortenTeamName(gameLeaderPlayers[0].player_team_id)}</p>
                                    <p className={gameLeaderPlayers[0].player_team_score > gameLeaderPlayers[0].opp_team_score ? "font-bold" : ""}>{gameLeaderPlayers[0].player_team_score}</p>


                                    {/* home or away */}
                                    <p>{gameLeaderPlayers[0].game_location === "HOME" ? "VS." : "@"}</p>

                                    {/* opp team */}

                                    <TeamLogo team_id={gameLeaderPlayers[0].opp_team_id} abbreviation={gameLeaderPlayers[0].opp_team_abbreviation} logoClass="size-7 object-contain" />
                                    <p className={gameLeaderPlayers[0].player_team_score < gameLeaderPlayers[0].opp_team_score ? "font-bold" : ""}>{shortenTeamName(gameLeaderPlayers[0].opp_team_id)}</p>
                                    <p className={gameLeaderPlayers[0].player_team_score < gameLeaderPlayers[0].opp_team_score ? "font-bold" : ""}>{gameLeaderPlayers[0].opp_team_score}</p>

                                </Link>
                                <p className="font-extrabold text-4xl">{gameLeaderPlayers[0].value}</p>
                            </div>


                            {/* right side */}
                            <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${gameLeaderPlayers[0].player_id}/${gameLeaderPlayers[0].name.toLowerCase().replace(" ", "-")}`}>
                                <img src={gameLeaderPlayers[0].photo_url} alt={gameLeaderPlayers[0].name} className="size-32 object-contain" />
                            </Link>
                        </div>
                    </CardHeader>

                    <CardContent>

                        <div className="grid gap-y-4">
                            {gameLeaderPlayers.map((player) => {

                                if (gameLeaderPlayers.indexOf(player) === 0) {
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
                                                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player.player_id}/${player.name.toLowerCase().replace(" ", "-")}`} className="text-lg flex gap-x-1 hover:underline"><span className="font-semibold">{player.name}</span> · #{player.jersey_number} · {convertPlayerPosition(player.player_position)}</Link>

                                                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/games/game_id/${gameLeaderPlayers[0].game_id}?view=team-stats`} className="hover:underline flex items-start gap-x-2">

                                                    {/* player team */}
                                                    <p className={player.player_team_score > player.opp_team_score ? "font-bold" : ""}>{player.player_team_full_name}</p>

                                                    <p className={player.player_team_score > player.opp_team_score ? "font-bold" : ""}>{player.player_team_score}</p>

                                                    {/* location */}
                                                    <p>{player.game_location === "HOME" ? "VS" : "@"}</p>

                                                    {/* opposing team */}
                                                    <p className={player.player_team_score < player.opp_team_score ? "font-bold" : ""}>{player.opp_team_full_name}</p>

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
                        See All
                    </CardFooter>
                </Card>
            }
        </>
    )
}

export default GameHighCard