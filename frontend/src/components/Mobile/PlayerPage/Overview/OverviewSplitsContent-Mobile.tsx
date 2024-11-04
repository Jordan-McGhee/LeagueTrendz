import React, { useState } from "react";
import { Link } from "react-router-dom";

// type imports
import { OverviewSplitsProps } from "../../../../types"

// utils imports
import { shortenTeamName, convertDateTeamSchedule } from "../../../../Utils/utils";

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../ui/card"
import TeamLogo from "../../../ui/TeamLogo"
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";

// component imports
import OverviewSplitsTableMobile from "./OverviewSplitsTable-Mobile"

const OverviewSplitsMobile: React.FC<OverviewSplitsProps> = ({ currentTeam, lastGame, splits }) => {

    const [showContent, setShowContent] = useState<Boolean>(true)

    const toggleShowContent = () => {
        setShowContent(!showContent)
    }

    // checks if last game was a home game
    let homeGame = lastGame.game_location === 'HOME'

    // home and away team variables based on game location
    let homeTeamName = homeGame ? shortenTeamName(lastGame.player_team_id) : shortenTeamName(lastGame.opp_team_id)
    let homeTeamAbbreviation = homeGame ? lastGame.player_team_abbreviation : lastGame.opp_team_abbreviation
    let homeTeamId = homeGame ? lastGame.player_team_id : lastGame.opp_team_id
    let homeTeamRecord = homeGame ? `${lastGame.player_team_wins} - ${lastGame.player_team_losses}` : `${lastGame.opp_team_wins} - ${lastGame.opp_team_losses}`
    let homeTeamScore = homeGame ? lastGame.player_team_score : lastGame.opp_team_score

    let awayTeamName = !homeGame ? shortenTeamName(lastGame.player_team_id) : shortenTeamName(lastGame.opp_team_id)
    let awayTeamAbbreviation = !homeGame ? lastGame.player_team_abbreviation : lastGame.opp_team_abbreviation
    let awayTeamId = !homeGame ? lastGame.player_team_id : lastGame.opp_team_id
    let awayTeamRecord = !homeGame ? `${lastGame.player_team_wins} - ${lastGame.player_team_losses}` : `${lastGame.opp_team_wins} - ${lastGame.opp_team_losses}`
    let awayTeamScore = !homeGame ? lastGame.player_team_score : lastGame.opp_team_score

    // splits to pass through to splits table

    let showHome = homeGame
    // won or lost
    let showWins = lastGame.game_result === "W"

    // was it a division and/or conference game
    let showConference = lastGame.conference_game
    let showDivision = lastGame.division_game

    // playoff game
    let playoffGame

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    Last Game

                    <div onClick={() => toggleShowContent()} className="md:hidden flex gap-x-2 items-center">
                        <p className="text-sm">{showContent ? "Hide" : "Show"}</p>
                        {showContent ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
                    </div>
                </CardTitle>
            </CardHeader>

            {
                showContent &&

                <>
                    <CardContent>
                        <div className="grid grid-cols-5 items-center">
                            {/* home team */}
                            <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${awayTeamAbbreviation.toLowerCase()}`} className="col-span-1 flex items-center">
                                {/* <div className="text-right">
                                <p className="font-semibold">{homeTeamAbbreviation}</p>
                                <p className="text-xs">
                                    {homeTeamRecord}
                                </p>
                            </div> */}

                                <TeamLogo abbreviation={awayTeamAbbreviation} team_id={awayTeamId} logoClass="size-12 object-contain" />
                            </Link>

                            {/* date/time */}
                            <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/games/game_id/${lastGame.game_id}`} className="text-center text-xs col-span-3 flex items-center justify-evenly">
                                <div>
                                    <p className="text-xs font-thin -mb-1">AWAY</p>
                                    <p className={+homeTeamScore < +awayTeamScore ? "text-2xl font-bold text-center" : "text-2xl text-center"}>{awayTeamScore}</p>
                                </div>

                                <div className="text-blue-500">
                                    <p>{convertDateTeamSchedule(lastGame.game_date.split("T")[0])}</p>
                                    <p className="font-bold">FINAL</p>
                                </div>

                                <div>
                                    <p className="text-xs font-thin -mb-1">HOME</p>
                                    <p className={+awayTeamScore < +homeTeamScore ? "text-2xl font-bold text-center" : "text-2xl text-center"}>{homeTeamScore}</p>
                                </div>
                            </Link>

                            {/* away team */}

                            <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${homeTeamAbbreviation.toLowerCase()}`} className="col-span-1 justify-self-end flex items-center">
                                <TeamLogo abbreviation={homeTeamAbbreviation} team_id={homeTeamId} logoClass="size-12 object-contain" />
                                {/* <div className="text-left">
                                <p className="font-semibold">{awayTeamAbbreviation}</p>
                                <p className="text-xs">{awayTeamRecord}</p>
                            </div> */}
                            </Link>
                        </div>

                        {/* main stats div */}
                        <div className="flex justify-between gap-x-2 my-4">

                            {/* points div */}
                            <div className="text-center border rounded-lg py-3 w-1/3 shadow-md">
                                <p className="text-xs">PTS</p>
                                <p className="text-xl font-bold" style={{ color: currentTeam.main_color }}>{lastGame.pts}</p>
                            </div>

                            {/* assists div */}
                            <div className="text-center border rounded-lg py-3 w-1/3 shadow-md">
                                <p className="text-xs">AST</p>
                                <p className="text-xl font-bold" style={{ color: currentTeam.main_color }}>{lastGame.ast}</p>
                            </div>

                            {/* 3P% or REB div */}
                            <div className="text-center border rounded-lg py-3 w-1/3 shadow-md">
                                {
                                    lastGame.tp_percentage > 15 ?
                                        <div>
                                            <p className="text-xs">3P%</p>
                                            <p className="text-xl font-bold" style={{ color: currentTeam.main_color }}>{lastGame.tp_percentage}%</p>
                                        </div>
                                        :
                                        <div>
                                            <p className="text-xs">REB</p>
                                            <p className="text-xl font-bold" style={{ color: currentTeam.main_color }}>{lastGame.reb}</p>
                                        </div>
                                }
                            </div>

                        </div>

                        {/* table for splits */}
                        <OverviewSplitsTableMobile showHome={showHome} showWins={showWins} splits={splits} showConference={showConference} showDivision={showDivision} />

                    </CardContent>

                    <CardFooter className="justify-center -mb-1">
                        <Link to={`/nba/players/id/${splits.player_id}/${splits.player_name.toLowerCase().replace(" ", "-")}?view=splits`} className="text-blue-500 font-semibold">
                            See Full Splits
                        </Link>
                    </CardFooter>
                </>
            }
        </Card>
    )
}

export default OverviewSplitsMobile