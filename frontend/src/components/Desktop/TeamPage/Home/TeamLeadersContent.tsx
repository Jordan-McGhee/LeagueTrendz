import React from "react";
import { Link } from "react-router-dom";

// type imports
import { TeamPlayersProps } from "@/types";

// utils imports
import { convertPlayerPosition, shortenPlayerName } from "../../../../Utils/utils";

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card"
import { Separator } from "../../../ui/separator"

const TeamLeadersContent: React.FC<TeamPlayersProps> = ({ team, players }) => (
    <Card className="hidden md:block">
        <CardHeader>
            <CardTitle className="flex justify-between">
                2023-24 Team Leaders

                <Link to={`/nba/teams/${team.abbreviation.toLowerCase()}?view=stats`} className="font-semibold text-blue-500">
                    See Full Team Stats
                </Link>
            </CardTitle>
        </CardHeader>

        <CardContent>

            <div className="flex justify-between">
                {/* offense */}
                <div className="flex flex-col gap-y-4 w-1/2">

                    <p className="font-bold text-2xl">Offense</p>

                    {/* points */}
                    <div className="text-sm">
                        <p className="mb-2 font-bold uppercase tracking-widest" style={{ color: team.main_color }}>Points Per Game</p>
                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${players.pts_leader_id}/${players.pts_leader_name.toLowerCase().replace(" ", "-")}`}>
                            <div className="flex items-center">
                                <img src={players.pts_leader_photo_url} alt={players.pts_leader_name} className="h-12 object-contain mr-2" />
                                {/* player info div */}
                                <div>
                                    <p className="font-bold">{shortenPlayerName(players.pts_leader_name)} <span className="font-light">{convertPlayerPosition(players.pts_leader_position)} #{players.pts_leader_number}</span></p>
                                    <p className="text-2xl font-bold" style={{ color: team.main_color }}>{players.pts_leader_stat}</p>
                                </div>

                            </div>
                        </Link>

                    </div>

                    <Separator className="w-4/5" />

                    {/* assists */}

                    <div className="text-sm">
                        <p className="mb-2 font-bold uppercase tracking-widest" style={{ color: team.main_color }}>Assists Per Game</p>
                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${players.ast_leader_id}/${players.ast_leader_name.toLowerCase().replace(" ", "-")}`}>
                            <div className="flex items-center">
                                <img src={players.ast_leader_photo_url} alt={players.ast_leader_name} className="h-12 object-contain mr-2" />
                                {/* player info div */}
                                <div>
                                    <p className="font-bold">{shortenPlayerName(players.ast_leader_name)} <span className="font-light">{convertPlayerPosition(players.ast_leader_position)} #{players.ast_leader_number}</span></p>
                                    <p className="text-2xl font-bold" style={{ color: team.main_color }}>{players.ast_leader_stat}</p>
                                </div>

                            </div>
                        </Link>

                    </div>

                    <Separator className="w-4/5" />

                    {/* fg% */}

                    <div className="text-sm">
                        <p className="mb-2 font-bold uppercase tracking-widest" style={{ color: team.main_color }}>Field Goal Percentage</p>
                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${players.fg_percentage_leader_id}/${players.fg_percentage_leader_name.toLowerCase().replace(" ", "-")}`}>
                            <div className="flex items-center">
                                <img src={players.fg_percentage_leader_photo_url} alt={players.fg_percentage_leader_name} className="h-12 object-contain mr-2" />
                                {/* player info div */}
                                <div>
                                    <p className="font-bold">{shortenPlayerName(players.fg_percentage_leader_name)} <span className="font-light">{convertPlayerPosition(players.fg_percentage_leader_position)} #{players.fg_percentage_leader_number}</span></p>
                                    <p className="text-2xl font-bold" style={{ color: team.main_color }}>{players.fg_percentage_leader_stat}%</p>
                                </div>

                            </div>
                        </Link>

                    </div>

                </div>


                {/* defense */}

                <div className="flex flex-col gap-y-4 w-1/2">

                    <p className="font-bold text-2xl">Defense</p>

                    {/* steals */}
                    <div className="text-sm">
                        <p className="mb-2 font-bold uppercase tracking-widest" style={{ color: team.main_color }}>Steals Per Game</p>
                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${players.stl_leader_id}/${players.stl_leader_name.toLowerCase().replace(" ", "-")}`}>
                            <div className="flex items-center">
                                <img src={players.stl_leader_photo_url} alt={players.stl_leader_name} className="h-12 object-contain mr-2" />
                                {/* player info div */}
                                <div>
                                    <p className="font-bold">{shortenPlayerName(players.stl_leader_name)} <span className="font-light">{convertPlayerPosition(players.stl_leader_position)} #{players.stl_leader_number}</span></p>
                                    <p className="text-2xl font-bold" style={{ color: team.main_color }}>{players.stl_leader_stat}</p>
                                </div>

                            </div>
                        </Link>

                    </div>

                    <Separator className="w-4/5" />

                    {/* blocks */}

                    <div className="text-sm">
                        <p className="mb-2 font-bold uppercase tracking-widest" style={{ color: team.main_color }}>Blocks Per Game</p>
                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${players.blk_leader_id}/${players.blk_leader_name.toLowerCase().replace(" ", "-")}`}>
                            <div className="flex items-center">
                                <img src={players.blk_leader_photo_url} alt={players.blk_leader_name} className="h-12 object-contain mr-2" />
                                {/* player info div */}
                                <div>
                                    <p className="font-bold">{shortenPlayerName(players.blk_leader_name)} <span className="font-light">{convertPlayerPosition(players.blk_leader_position)} #{players.blk_leader_number}</span></p>
                                    <p className="text-2xl font-bold" style={{ color: team.main_color }}>{players.blk_leader_stat}</p>
                                </div>

                            </div>
                        </Link>

                    </div>

                    <Separator className="w-4/5" />

                    {/* rebounds */}

                    <div className="text-sm">
                        <p className="mb-2 font-bold uppercase tracking-widest" style={{ color: team.main_color }}>Rebounds Per Game</p>
                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${players.reb_leader_id}/${players.reb_leader_name.toLowerCase().replace(" ", "-")}`}>
                            <div className="flex items-center">
                                <img src={players.reb_leader_photo_url} alt={players.reb_leader_name} className="h-12 object-contain mr-2" />
                                {/* player info div */}
                                <div>
                                    <p className="font-bold">{shortenPlayerName(players.reb_leader_name)} <span className="font-light">{convertPlayerPosition(players.reb_leader_position)} #{players.reb_leader_number}</span></p>
                                    <p className="text-2xl font-bold" style={{ color: team.main_color }}>{players.reb_leader_stat}</p>
                                </div>

                            </div>
                        </Link>

                    </div>


                </div>

            </div>

        </CardContent>
    </Card>
)

export default TeamLeadersContent