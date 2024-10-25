import React, { useState } from "react";
import { Link } from "react-router-dom";

// type imports
import { TeamPlayersProps } from "@/types";

// utils imports
import { convertPlayerPosition, shortenPlayerName } from "../../../../Utils/utils";

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../ui/card"
import { Separator } from "../../../ui/separator"
import { Tabs, TabsContent, TabsTrigger, TabsList } from "../../../ui/tabs"
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons"

const TeamLeadersContentMobile: React.FC<TeamPlayersProps> = ({ team, players }) => {
    const [showContent, setShowContent] = useState<boolean>(true)

    const toggleShowContent = () => {
        setShowContent(!showContent)
    }

    return (
        <Card className="block md:hidden">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    23-24 Team Leaders

                    <div onClick={() => toggleShowContent()} className="flex gap-x-2 items-center md:hidden">
                        <p className="text-sm">{showContent ? "Hide" : "Show"}</p>
                        {showContent ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
                    </div>
                </CardTitle>
            </CardHeader>

            {
                showContent &&
                <>
                    <CardContent>

                        {/* tabs */}
                        <Tabs defaultValue="offense" className="">
                            <TabsList className="w-full mx-auto -mt-6 mb-2 text-white" style={{ backgroundColor: team.main_color }}>
                                <TabsTrigger value="offense" className="w-1/2">Offense</TabsTrigger>
                                <TabsTrigger value="defense" className="w-1/2">Defense</TabsTrigger>
                            </TabsList>

                            {/* offense */}

                            <TabsContent value="offense">
                                <div className="flex flex-col gap-y-4">

                                    {/* points */}
                                    <div className="">
                                        <p className="mb-2 font-bold text-center">Points Per Game</p>
                                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${players.pts_leader_id}/${players.pts_leader_name.toLowerCase().replace(" ", "-")}`} className="flex items-center">
                                            <img src={players.pts_leader_photo_url} alt={players.pts_leader_name} className="h-12 object-contain mr-2" />
                                            {/* player info div */}
                                            <div>
                                                <p className="font-bold">{players.pts_leader_name.length > 17 ? shortenPlayerName(players.pts_leader_name) : players.pts_leader_name}</p>
                                                <p className="text-2xl font-black" style={{ color: team.main_color }}>{players.pts_leader_stat}</p>
                                            </div>
                                        </Link>

                                    </div>

                                    <Separator className="w-4/5" />

                                    {/* assists */}

                                    <div className="">
                                        <p className="mb-2 font-bold text-center">Assists Per Game</p>
                                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${players.ast_leader_id}/${players.ast_leader_name.toLowerCase().replace(" ", "-")}`}>
                                            <div className="flex items-center">
                                                <img src={players.ast_leader_photo_url} alt={players.ast_leader_name} className="h-12 object-contain mr-2" />
                                                {/* player info div */}
                                                <div>
                                                    <p className="font-bold">{players.ast_leader_name.length > 17 ? shortenPlayerName(players.ast_leader_name) : players.ast_leader_name}</p>
                                                    <p className="text-2xl font-bold" style={{ color: team.main_color }}>{players.ast_leader_stat}</p>
                                                </div>

                                            </div>
                                        </Link>

                                    </div>

                                    <Separator className="w-4/5" />

                                    {/* fg% */}

                                    <div className="">
                                        <p className="mb-2 font-bold text-center">Field Goal Percentage</p>
                                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${players.fg_percentage_leader_id}/${players.fg_percentage_leader_name.toLowerCase().replace(" ", "-")}`}>
                                            <div className="flex items-center">
                                                <img src={players.fg_percentage_leader_photo_url} alt={players.fg_percentage_leader_name} className="h-12 object-contain mr-2" />
                                                {/* player info div */}
                                                <div>
                                                    <p className="font-bold">{players.fg_percentage_leader_name.length > 17 ? shortenPlayerName(players.fg_percentage_leader_name) : players.fg_percentage_leader_name}</p>
                                                    <p className="text-2xl font-bold" style={{ color: team.main_color }}>{players.fg_percentage_leader_stat}%</p>
                                                </div>

                                            </div>
                                        </Link>

                                    </div>

                                </div>

                            </TabsContent>

                            <TabsContent value="defense">
                                {/* defense */}

                                <div className="flex flex-col gap-y-4">

                                    {/* steals */}
                                    <div className="">
                                        <p className="mb-2 font-bold text-center">Steals Per Game</p>
                                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${players.stl_leader_id}/${players.stl_leader_name.toLowerCase().replace(" ", "-")}`}>
                                            <div className="flex items-center">
                                                <img src={players.stl_leader_photo_url} alt={players.stl_leader_name} className="h-12 object-contain mr-2" />
                                                {/* player info div */}
                                                <div>
                                                    <p className="font-bold">{players.stl_leader_name.length > 17 ? shortenPlayerName(players.stl_leader_name) : players.stl_leader_name}</p>
                                                    <p className="text-2xl font-bold" style={{ color: team.main_color }}>{players.stl_leader_stat}</p>
                                                </div>

                                            </div>
                                        </Link>

                                    </div>

                                    <Separator className="w-4/5" />

                                    {/* blocks */}

                                    <div className="">
                                        <p className="mb-2 font-bold text-center">Blocks Per Game</p>
                                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${players.blk_leader_id}/${players.blk_leader_name.toLowerCase().replace(" ", "-")}`}>
                                            <div className="flex items-center">
                                                <img src={players.blk_leader_photo_url} alt={players.blk_leader_name} className="h-12 object-contain mr-2" />
                                                {/* player info div */}
                                                <div>
                                                    <p className="font-bold">{players.blk_leader_name.length > 17 ? shortenPlayerName(players.blk_leader_name) : players.blk_leader_name}</p>
                                                    <p className="text-2xl font-bold" style={{ color: team.main_color }}>{players.blk_leader_stat}</p>
                                                </div>

                                            </div>
                                        </Link>

                                    </div>

                                    <Separator className="w-4/5" />

                                    {/* rebounds */}

                                    <div className="">
                                        <p className="mb-2 font-bold text-center">Rebounds Per Game</p>
                                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${players.reb_leader_id}/${players.reb_leader_name.toLowerCase().replace(" ", "-")}`}>
                                            <div className="flex items-center">
                                                <img src={players.reb_leader_photo_url} alt={players.reb_leader_name} className="h-12 object-contain mr-2" />
                                                {/* player info div */}
                                                <div>
                                                    <p className="font-bold">{players.reb_leader_name.length > 17 ? shortenPlayerName(players.reb_leader_name) : players.reb_leader_name}</p>
                                                    <p className="text-2xl font-bold" style={{ color: team.main_color }}>{players.reb_leader_stat}</p>
                                                </div>

                                            </div>
                                        </Link>

                                    </div>


                                </div>
                            </TabsContent>
                        </Tabs>

                    </CardContent>

                    <CardFooter className="justify-center">
                        <Link to={`/nba/teams/${team.abbreviation.toLowerCase()}?view=stats`} className="font-semibold text-blue-500">
                            See Full Team Stats
                        </Link>
                    </CardFooter>
                </>
            }

        </Card>
    )
}

export default TeamLeadersContentMobile