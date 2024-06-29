import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

// type imports
import { GameLeadersProps } from "@/types"

// utils imports
import { shortenTeamName, convertPlayerPosition } from "../../../Utils/utils"

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../ui/card"
import { Separator } from "../../ui/separator"
import { Menubar, MenubarMenu, MenubarTrigger } from "../../ui/menubar"

const GameLeaders: React.FC<GameLeadersProps> = ({ teamData, players }) => {
    const navigate = useNavigate()

    const [statShown, setStatShown] = useState<'points' | 'rebounds' | 'assists'>("points")

    const handleMenuClick = (option: 'points' | 'rebounds' | 'assists') => {
        setStatShown(option)
    }

    // determine which player is on home team and which is on away team
    const awayPlayers = players.filter((player) => player.player_team_id === teamData.away_team_id)[0]
    const homePlayers = players.filter((player) => player.player_team_id === teamData.home_team_id)[0]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Game Leaders</CardTitle>

                <Menubar className="w-full mx-auto">

                    <MenubarMenu>
                        <MenubarTrigger
                            style={statShown === "points" ? { backgroundColor: "black", color: "white" } : {}}
                            onClick={() => handleMenuClick('points')}
                            className="w-1/3"
                        >
                            Points
                        </MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger
                            style={statShown === "rebounds" ? { backgroundColor: "black", color: "white" } : {}}
                            onClick={() => handleMenuClick('rebounds')}
                            className="w-1/3"
                        >
                            Rebounds
                        </MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger
                            style={statShown === "assists" ? { backgroundColor: "black", color: "white" } : {}}
                            onClick={() => handleMenuClick('assists')}
                            className="w-1/3"
                        >
                            Assists
                        </MenubarTrigger>
                    </MenubarMenu>
                </Menubar>

            </CardHeader>
            <CardContent>

                {
                    statShown === "points" &&
                    <div className="flex flex-col gap-y-4">

                        {/*  away leader */}
                        <div className="flex gap-x-4 items-center">

                            <img src={awayPlayers.pts_leader_photo} alt={awayPlayers.pts_leader_name} className="size-12 object-contain" />

                            <div className="text-sm">
                                <p>{awayPlayers.pts_leader_name}, {convertPlayerPosition(awayPlayers.pts_leader_position)} - {teamData.away_team_abbreviation}</p>
                                <div className="flex gap-x-4">
                                    {/* stat one */}
                                    <div className="flex gap-x-1">
                                        <p className="font-bold">{awayPlayers.pts_leader_pts}</p>
                                        <p>PTS</p>
                                    </div>

                                    {/* stat two */}
                                    <div className="flex gap-x-1">
                                        <p className="font-bold">{awayPlayers.pts_leader_fgm}/{awayPlayers.pts_leader_fga}</p>
                                        <p>FG</p>
                                    </div>

                                    {/* stat three */}
                                    <div className="flex gap-x-1">
                                        <p className="font-bold">{awayPlayers.pts_leader_ftm}/{awayPlayers.pts_leader_fta}</p>
                                        <p>FT</p>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <Separator className="w-3/4" />

                        {/* home leader */}
                        <div className="flex gap-x-4 items-center">

                            <img src={homePlayers.pts_leader_photo} alt={homePlayers.pts_leader_name} className="size-12 object-contain" />

                            <div className="text-sm">
                                <p>{homePlayers.pts_leader_name}, {convertPlayerPosition(homePlayers.pts_leader_position)} - {teamData.home_team_abbreviation}</p>
                                <div className="flex gap-x-4">
                                    {/* stat one */}
                                    <div className="flex gap-x-1">
                                        <p className="font-bold">{homePlayers.pts_leader_pts}</p>
                                        <p>PTS</p>
                                    </div>

                                    {/* stat two */}
                                    <div className="flex gap-x-1">
                                        <p className="font-bold">{homePlayers.pts_leader_fgm}/{homePlayers.pts_leader_fga}</p>
                                        <p>FG</p>
                                    </div>

                                    {/* stat three */}
                                    <div className="flex gap-x-1">
                                        <p className="font-bold">{homePlayers.pts_leader_ftm}/{homePlayers.pts_leader_fta}</p>
                                        <p>FT</p>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                }


                {/* REBOUNDS */}
                {
                    statShown === "rebounds" &&
                    <div className="flex flex-col gap-y-4">

                        {/*  away leader */}
                        <div className="flex gap-x-4 items-center">

                            <img src={awayPlayers.reb_leader_photo} alt={awayPlayers.reb_leader_name} className="size-12 object-contain" />

                            <div className="text-sm">
                                <p>{awayPlayers.reb_leader_name}, {convertPlayerPosition(awayPlayers.reb_leader_position)} - {teamData.away_team_abbreviation}</p>
                                <div className="flex gap-x-4">
                                    {/* stat one */}
                                    <div className="flex gap-x-1">
                                        <p className="font-bold">{awayPlayers.reb_leader_reb}</p>
                                        <p>REB</p>
                                    </div>

                                    {/* stat two */}
                                    <div className="flex gap-x-1">
                                        <p className="font-bold">{awayPlayers.reb_leader_drb}</p>
                                        <p>DREB</p>
                                    </div>

                                    {/* stat three */}
                                    <div className="flex gap-x-1">
                                        <p className="font-bold">{awayPlayers.reb_leader_orb}</p>
                                        <p>OREB</p>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <Separator className="w-3/4" />

                        {/* home leader */}
                        <div className="flex gap-x-4 items-center">

                            <img src={homePlayers.reb_leader_photo} alt={homePlayers.reb_leader_name} className="size-12 object-contain" />

                            <div className="text-sm">
                                <p>{homePlayers.reb_leader_name}, {convertPlayerPosition(homePlayers.reb_leader_position)} - {teamData.home_team_abbreviation}</p>
                                <div className="flex gap-x-4">
                                    {/* stat one */}
                                    <div className="flex gap-x-1">
                                        <p className="font-bold">{homePlayers.reb_leader_reb}</p>
                                        <p>REB</p>
                                    </div>

                                    {/* stat two */}
                                    <div className="flex gap-x-1">
                                        <p className="font-bold">{homePlayers.reb_leader_drb}</p>
                                        <p>DREB</p>
                                    </div>

                                    {/* stat three */}
                                    <div className="flex gap-x-1">
                                        <p className="font-bold">{homePlayers.reb_leader_orb}</p>
                                        <p>OREB</p>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                }


                {/* ASSISTS */}
                {
                    statShown === "assists" &&
                    <div className="flex flex-col gap-y-4">

                        {/*  away leader */}
                        <div className="flex gap-x-4 items-center">

                            <img src={awayPlayers.ast_leader_photo} alt={awayPlayers.ast_leader_name} className="size-12 object-contain" />

                            <div className="text-sm">
                                <p>{awayPlayers.ast_leader_name}, {convertPlayerPosition(awayPlayers.ast_leader_position)} - {teamData.away_team_abbreviation}</p>
                                <div className="flex gap-x-4">
                                    {/* stat one */}
                                    <div className="flex gap-x-1">
                                        <p className="font-bold">{awayPlayers.ast_leader_ast}</p>
                                        <p>AST</p>
                                    </div>

                                    {/* stat two */}
                                    <div className="flex gap-x-1">
                                        <p className="font-bold">{awayPlayers.ast_leader_stl}</p>
                                        <p>STL</p>
                                    </div>

                                    {/* stat three */}
                                    <div className="flex gap-x-1">
                                        <p className="font-bold">{awayPlayers.ast_leader_turnovers}</p>
                                        <p>TO</p>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <Separator className="w-3/4" />

                        {/* home leader */}
                        <div className="flex gap-x-4 items-center">

                            <img src={homePlayers.ast_leader_photo} alt={homePlayers.ast_leader_name} className="size-12 object-contain" />

                            <div className="text-sm">
                                <p>{homePlayers.ast_leader_name}, {convertPlayerPosition(homePlayers.ast_leader_position)} - {teamData.home_team_abbreviation}</p>
                                <div className="flex gap-x-4">
                                    {/* stat one */}
                                    <div className="flex gap-x-1">
                                        <p className="font-bold">{homePlayers.ast_leader_ast}</p>
                                        <p>AST</p>
                                    </div>

                                    {/* stat two */}
                                    <div className="flex gap-x-1">
                                        <p className="font-bold">{homePlayers.ast_leader_stl}</p>
                                        <p>STL</p>
                                    </div>

                                    {/* stat three */}
                                    <div className="flex gap-x-1">
                                        <p className="font-bold">{homePlayers.ast_leader_turnovers}</p>
                                        <p>TO</p>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                }

            </CardContent>
            <CardFooter className="font-bold text-blue-600">
                <p onClick={() => navigate(`/nba/games/game_id/${teamData.game_id}?view=box-score`)} className="hover:cursor-pointer">
                    Full Box Score
                </p>
            </CardFooter>
        </Card>
    )
}

export default GameLeaders