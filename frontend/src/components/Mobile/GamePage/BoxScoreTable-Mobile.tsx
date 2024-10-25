import React, { useState } from "react";
import { Link } from "react-router-dom";

// type imports
import { BoxScoreTableProps } from "@/types";

// utils imports
import { convertPlayerPosition, shortenTeamName, shortenPlayerName } from "../../../Utils/utils"

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card"
import { Table, TableHeader, TableHead, TableRow, TableCell, TableBody, TableFooter } from "../../ui/table"
import TeamLogo from "../../ui/TeamLogo"
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons"

const BoxScoreTableMobile: React.FC<BoxScoreTableProps> = ({ boxScore, teamData, tableClass }) => {

    const [showAwayContent, setShowAwayContent] = useState<boolean>(true)
    const [showHomeContent, setShowHomeContent] = useState<boolean>(true)

    const toggleShowAwayContent = () => {
        setShowAwayContent(!showAwayContent)
    }

    const toggleShowHomeContent = () => {
        setShowHomeContent(!showHomeContent)
    }

    return (
        <div className={tableClass}>

            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        {/* AWAY TEAM */}
                        <Link to={`/nba/teams/${teamData.away_team_abbreviation.toLowerCase()}?view=home`}>
                            <div className="flex items-center gap-x-2">
                                <TeamLogo team_id={teamData.away_team_id} abbreviation={teamData.away_team_abbreviation} logoClass="size-10 object-contain" />
                                <p className="text-lg font-semibold">{shortenTeamName(teamData.away_team_id)}</p>
                            </div>

                        </Link>

                        <div onClick={() => toggleShowAwayContent()} className="flex gap-x-2 items-center md:hidden">
                            <p className="text-sm">{showAwayContent ? "Hide" : "Show"}</p>
                            {showAwayContent ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
                        </div>
                    </CardTitle>
                </CardHeader>

                {
                    showAwayContent &&

                    <CardContent className="-mt-4">
                        <div className="overflow-x-auto">

                            <Table className="text-xs relative">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-left sticky left-0 z-10 bg-white">Player</TableHead>
                                        <TableHead className="text-center px-2">MIN</TableHead>
                                        <TableHead className="text-center px-2">PTS</TableHead>
                                        <TableHead className="text-center px-2">FG</TableHead>
                                        <TableHead className="text-center px-2">3PT</TableHead>
                                        <TableHead className="text-center px-2">FT</TableHead>
                                        <TableHead className="text-center px-2">OREB</TableHead>
                                        <TableHead className="text-center px-2">DREB</TableHead>
                                        <TableHead className="text-center px-2">REB</TableHead>
                                        <TableHead className="text-center px-2">AST</TableHead>
                                        <TableHead className="text-center px-2">STL</TableHead>
                                        <TableHead className="text-center px-2">BLK</TableHead>
                                        <TableHead className="text-center px-2">TO</TableHead>
                                        <TableHead className="text-center px-2">PF</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {boxScore.map((player) => {
                                        if (player.player_team_id === teamData.away_team_id) {
                                            return (
                                                <TableRow key={player.player_id}>
                                                    <TableCell className="text-left flex items-center gap-x-2 w-28 pr-2 border-r-2 sticky left-0 z-10 bg-white">
                                                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player.player_id}/${player.player_name.toLowerCase().replace(" ", "-")}`} className="text-blue-500 w-3/4 truncate hover:underline">
                                                            {shortenPlayerName(player.player_name)}
                                                        </Link>
                                                        <p className="text-gray-500">{convertPlayerPosition(player.player_position)}</p>
                                                    </TableCell>
                                                    <TableCell className="text-center">{player.minutes}</TableCell>
                                                    <TableCell className="text-center">{player.pts}</TableCell>
                                                    <TableCell className="text-center">{player.fgm}-{player.fga}</TableCell>
                                                    <TableCell className="text-center">{player.tpm}-{player.tpa}</TableCell>
                                                    <TableCell className="text-center">{player.ftm}-{player.fta}</TableCell>
                                                    <TableCell className="text-center">{player.orb}</TableCell>
                                                    <TableCell className="text-center">{player.drb}</TableCell>
                                                    <TableCell className="text-center">{player.reb}</TableCell>
                                                    <TableCell className="text-center">{player.ast}</TableCell>
                                                    <TableCell className="text-center">{player.stl}</TableCell>
                                                    <TableCell className="text-center">{player.blk}</TableCell>
                                                    <TableCell className="text-center">{player.turnovers}</TableCell>
                                                    <TableCell className="text-center">{player.pf}</TableCell>
                                                </TableRow>
                                            )
                                        }

                                        return null
                                    })}
                                </TableBody>
                                <TableFooter className="bg-white">
                                    <TableRow>
                                        <TableCell className="sticky left-0 z-10 bg-white">TEAM</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell className="text-center">{teamData.away_team_score}</TableCell>
                                        <TableCell className="text-center">{teamData.away_fgm}-{teamData.away_fga} </TableCell>
                                        <TableCell className="text-center">{teamData.away_tpm}-{teamData.away_tpa} </TableCell>
                                        <TableCell className="text-center">{teamData.away_ftm}-{teamData.away_fta} </TableCell>
                                        <TableCell className="text-center">{teamData.away_orb}</TableCell>
                                        <TableCell className="text-center">{teamData.away_drb}</TableCell>
                                        <TableCell className="text-center">{teamData.away_reb}</TableCell>
                                        <TableCell className="text-center">{teamData.away_ast}</TableCell>
                                        <TableCell className="text-center">{teamData.away_stl}</TableCell>
                                        <TableCell className="text-center">{teamData.away_blk}</TableCell>
                                        <TableCell className="text-center">{teamData.away_turnovers}</TableCell>
                                        <TableCell className="text-center">{teamData.away_pf}</TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </div>
                    </CardContent>
                }

            </Card>



            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        {/* HOME TEAM */}
                        <Link to={`/nba/teams/${teamData.home_team_abbreviation.toLowerCase()}?view=home`}>
                            <div className="flex items-center gap-x-2">
                                <TeamLogo team_id={teamData.home_team_id} abbreviation={teamData.home_team_abbreviation} logoClass="size-10 object-contain" />
                                <p className="text-lg font-semibold">{shortenTeamName(teamData.home_team_id)}</p>
                            </div>

                        </Link>

                        <div onClick={() => toggleShowHomeContent()} className="flex gap-x-2 items-center md:hidden">
                            <p className="text-sm">{showHomeContent ? "Hide" : "Show"}</p>
                            {showHomeContent ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
                        </div>
                    </CardTitle>
                </CardHeader>


                {
                    showHomeContent &&

                    <CardContent>

                        {/* HOME TEAM */}
                        <Table className="text-xs">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-left sticky left-0 z-10 bg-white">Player</TableHead>
                                    <TableHead className="text-center px-2">MIN</TableHead>
                                    <TableHead className="text-center px-2">PTS</TableHead>
                                    <TableHead className="text-center px-2">FG</TableHead>
                                    <TableHead className="text-center px-2">3PT</TableHead>
                                    <TableHead className="text-center px-2">FT</TableHead>
                                    <TableHead className="text-center px-2">OREB</TableHead>
                                    <TableHead className="text-center px-2">DREB</TableHead>
                                    <TableHead className="text-center px-2">REB</TableHead>
                                    <TableHead className="text-center px-2">AST</TableHead>
                                    <TableHead className="text-center px-2">STL</TableHead>
                                    <TableHead className="text-center px-2">BLK</TableHead>
                                    <TableHead className="text-center px-2">TO</TableHead>
                                    <TableHead className="text-center px-2">PF</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {boxScore.map((player) => {
                                    if (player.player_team_id === teamData.home_team_id) {
                                        return (
                                            <TableRow key={player.player_id}>
                                                <TableCell className="text-left flex items-center gap-x-2 w-28 pr-2 border-r-2 sticky left-0 z-10 bg-white">
                                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player.player_id}/${player.player_name.toLowerCase().replace(" ", "-")}`} className="text-blue-500 w-3/4 truncate hover:underline">
                                                        {shortenPlayerName(player.player_name)}
                                                    </Link>
                                                    <p className="text-gray-500">{convertPlayerPosition(player.player_position)}</p>
                                                </TableCell>
                                                <TableCell className="text-center">{player.minutes}</TableCell>
                                                <TableCell className="text-center">{player.pts}</TableCell>
                                                <TableCell className="text-center">{player.fgm}-{player.fga}</TableCell>
                                                <TableCell className="text-center">{player.tpm}-{player.tpa}</TableCell>
                                                <TableCell className="text-center">{player.ftm}-{player.fta}</TableCell>
                                                <TableCell className="text-center">{player.orb}</TableCell>
                                                <TableCell className="text-center">{player.drb}</TableCell>
                                                <TableCell className="text-center">{player.reb}</TableCell>
                                                <TableCell className="text-center">{player.ast}</TableCell>
                                                <TableCell className="text-center">{player.stl}</TableCell>
                                                <TableCell className="text-center">{player.blk}</TableCell>
                                                <TableCell className="text-center">{player.turnovers}</TableCell>
                                                <TableCell className="text-center">{player.pf}</TableCell>
                                            </TableRow>
                                        )
                                    }

                                    return null
                                })}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell className="sticky left-0 z-10 bg-white">TEAM</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell className="text-center">{teamData.home_team_score}</TableCell>
                                    <TableCell className="text-center">{teamData.home_fgm}-{teamData.home_fga}</TableCell>
                                    <TableCell className="text-center">{teamData.home_tpm}-{teamData.home_tpa}</TableCell>
                                    <TableCell className="text-center">{teamData.away_ftm}-{teamData.away_fta}</TableCell>
                                    <TableCell className="text-center">{teamData.home_orb}</TableCell>
                                    <TableCell className="text-center">{teamData.home_drb}</TableCell>
                                    <TableCell className="text-center">{teamData.home_reb}</TableCell>
                                    <TableCell className="text-center">{teamData.home_ast}</TableCell>
                                    <TableCell className="text-center">{teamData.home_stl}</TableCell>
                                    <TableCell className="text-center">{teamData.home_blk}</TableCell>
                                    <TableCell className="text-center">{teamData.home_turnovers}</TableCell>
                                    <TableCell className="text-center">{teamData.home_pf}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>

                    </CardContent>
                }

            </Card>
        </div>
    )
}

export default BoxScoreTableMobile