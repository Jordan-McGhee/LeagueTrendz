import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

// type imports
import { GameLeadersProps } from "@/types"

// utils imports
import { shortenTeamName, convertPlayerPosition, shortenPlayerName } from "../../../../Utils/utils"

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../ui/card"
import { Separator } from "../../../ui/separator"
import { Menubar, MenubarMenu, MenubarTrigger } from "../../../ui/menubar"
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons"

const GameLeaders: React.FC<GameLeadersProps> = ({ teamData, players }) => {
    const navigate = useNavigate()

    const [statShown, setStatShown] = useState<'points' | 'rebounds' | 'assists'>("points")
    const [showContent, setShowContent] = useState<boolean>(true)

    const handleMenuClick = (option: 'points' | 'rebounds' | 'assists') => {
        setStatShown(option)
    }

    const toggleShowContent = () => {
        setShowContent(!showContent)
    }

    // determine which player is on home team and which is on away team
    const awayPlayers = players.filter((player) => player.player_team_id === teamData.away_team_id)[0]
    const homePlayers = players.filter((player) => player.player_team_id === teamData.home_team_id)[0]

    return (
        <Card>
            <CardHeader className="-mb-3">
                <div className="flex justify-between items-center">
                    <CardTitle>Game Leaders</CardTitle>
                    <div onClick={() => toggleShowContent()} className="flex gap-x-2 items-center md:hidden">
                        <p className="text-sm">{showContent ? "Hide" : "Show"}</p>
                        {showContent ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
                    </div>
                </div>


                {
                    showContent &&

                    <div className="">
                        {/* MOBILE */}
                        <Menubar className="w-full mx-auto md:hidden">

                            <MenubarMenu>
                                <MenubarTrigger
                                    style={statShown === "points" ? { backgroundColor: "black", color: "white" } : {}}
                                    onClick={() => handleMenuClick('points')}
                                    className="w-1/3"
                                >
                                    PTS
                                </MenubarTrigger>
                            </MenubarMenu>

                            <MenubarMenu>
                                <MenubarTrigger
                                    style={statShown === "rebounds" ? { backgroundColor: "black", color: "white" } : {}}
                                    onClick={() => handleMenuClick('rebounds')}
                                    className="w-1/3"
                                >
                                    REB
                                </MenubarTrigger>
                            </MenubarMenu>

                            <MenubarMenu>
                                <MenubarTrigger
                                    style={statShown === "assists" ? { backgroundColor: "black", color: "white" } : {}}
                                    onClick={() => handleMenuClick('assists')}
                                    className="w-1/3"
                                >
                                    AST
                                </MenubarTrigger>
                            </MenubarMenu>
                        </Menubar>

                        {/* DESKTOP */}
                        <Menubar className="hidden md:flex w-full mx-auto">

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

                    </div>
                }

            </CardHeader>
            {
                showContent &&
                <div>

                    <CardContent>

                        {
                            statShown === "points" &&
                            <div className="w-full flex flex-col gap-y-2 md:gap-y-4">

                                {/*  away leader */}
                                <div className="flex gap-x-4 items-center">

                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${awayPlayers.pts_leader_id}/${awayPlayers.pts_leader_name.toLowerCase().replace(" ", "-")}`}>
                                        <img src={awayPlayers.pts_leader_photo} alt={awayPlayers.pts_leader_name} className="size-12 object-contain" />
                                    </Link>

                                    <div className="text-xs md:text-sm">
                                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${awayPlayers.pts_leader_id}/${awayPlayers.pts_leader_name.toLowerCase().replace(" ", "-")}`} className="hover:underline">
                                            <p className="">{shortenPlayerName(awayPlayers.pts_leader_name)}, {convertPlayerPosition(awayPlayers.pts_leader_position)} - {teamData.away_team_abbreviation}</p>
                                        </Link>
                                        <div className="flex gap-x-2 md:gap-x-4">
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

                                <Separator className="" />

                                {/* home leader */}
                                <div className="flex gap-x-4 items-center">

                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${homePlayers.pts_leader_id}/${homePlayers.pts_leader_name.toLowerCase().replace(" ", "-")}`}>
                                        <img src={homePlayers.pts_leader_photo} alt={homePlayers.pts_leader_name} className="size-12 object-contain" />
                                    </Link>

                                    <div className="text-xs md:text-sm">
                                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${homePlayers.pts_leader_id}/${homePlayers.pts_leader_name.toLowerCase().replace(" ", "-")}`} className="hover:underline">
                                            <p className="">{shortenPlayerName(homePlayers.pts_leader_name)}, {convertPlayerPosition(homePlayers.pts_leader_position)} - {teamData.home_team_abbreviation}</p>
                                        </Link>
                                        <div className="flex gap-x-2 md:gap-x-4">
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
                            <div className="flex flex-col gap-y-2 md:gap-y-4">

                                {/*  away leader */}
                                <div className="flex gap-x-4 items-center">

                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${awayPlayers.reb_leader_id}/${awayPlayers.reb_leader_name.toLowerCase().replace(" ", "-")}`}>
                                        <img src={awayPlayers.reb_leader_photo} alt={awayPlayers.reb_leader_name} className="size-12 object-contain" />
                                    </Link>

                                    <div className="text-xs md:text-sm">
                                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${awayPlayers.reb_leader_id}/${awayPlayers.reb_leader_name.toLowerCase().replace(" ", "-")}`} className="hover:underline">
                                            <p className="">{shortenPlayerName(awayPlayers.reb_leader_name)}, {convertPlayerPosition(awayPlayers.reb_leader_position)} - {teamData.away_team_abbreviation}</p>
                                        </Link>
                                        <div className="flex gap-x-2 md:gap-x-4">
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

                                <Separator className="" />

                                {/* home leader */}
                                <div className="flex gap-x-4 items-center">

                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${homePlayers.reb_leader_id}/${homePlayers.reb_leader_name.toLowerCase().replace(" ", "-")}`}>
                                        <img src={homePlayers.reb_leader_photo} alt={homePlayers.reb_leader_name} className="size-12 object-contain" />
                                    </Link>

                                    <div className="text-xs md:text-sm">
                                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${homePlayers.reb_leader_id}/${homePlayers.reb_leader_name.toLowerCase().replace(" ", "-")}`} className="hover:underline">
                                            <p className="">{shortenPlayerName(homePlayers.reb_leader_name)}, {convertPlayerPosition(homePlayers.reb_leader_position)} - {teamData.home_team_abbreviation}</p>
                                        </Link>

                                        <div className="flex gap-x-2 md:gap-x-4">
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
                            <div className="flex flex-col gap-y-2 md:gap-y-4">

                                {/*  away leader */}
                                <div className="flex gap-x-4 items-center">

                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${awayPlayers.ast_leader_id}/${awayPlayers.ast_leader_name.toLowerCase().replace(" ", "-")}`}>
                                        <img src={awayPlayers.ast_leader_photo} alt={awayPlayers.ast_leader_name} className="size-12 object-contain" />
                                    </Link>

                                    <div className="text-xs md:text-sm">
                                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${awayPlayers.ast_leader_id}/${awayPlayers.ast_leader_name.toLowerCase().replace(" ", "-")}`} className="hover:underline">
                                            <p className="">{shortenPlayerName(awayPlayers.ast_leader_name)}, {convertPlayerPosition(awayPlayers.ast_leader_position)} - {teamData.away_team_abbreviation}</p>
                                        </Link>
                                        <div className="flex gap-x-2 md:gap-x-4">
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

                                <Separator className="" />

                                {/* home leader */}
                                <div className="flex gap-x-4 items-center">

                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${homePlayers.ast_leader_id}/${homePlayers.ast_leader_name.toLowerCase().replace(" ", "-")}`}>
                                        <img src={homePlayers.ast_leader_photo} alt={homePlayers.ast_leader_name} className="size-12 object-contain" />
                                    </Link>

                                    <div className="text-xs md:text-sm">
                                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${homePlayers.ast_leader_id}/${homePlayers.ast_leader_name.toLowerCase().replace(" ", "-")}`} className="hover:underline">
                                            <p className="">{shortenPlayerName(homePlayers.ast_leader_name)}, {convertPlayerPosition(homePlayers.ast_leader_position)} - {teamData.home_team_abbreviation}</p>
                                        </Link>
                                        <div className="flex gap-x-2 md:gap-x-4">
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
                    <CardFooter className="font-bold text-blue-600 justify-center md:justify-start">
                        <p onClick={() => navigate(`/nba/games/game_id/${teamData.game_id}?view=box-score`)} className="hover:cursor-pointer">
                            Full Box Score
                        </p>
                    </CardFooter>
                </div>
            }
        </Card>
    )
}

export default GameLeaders