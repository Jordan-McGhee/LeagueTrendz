import React from "react";
import { Link } from "react-router-dom";

// type imports
import { OverviewSplitsProps } from "../../../../types"

// utils imports
import { convertDateGameLog, shortenTeamName } from "../../../../Utils/utils";

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card"
import TeamLogo from "../../../ui/TeamLogo"

// component imports
import OverviewSplitsTable from "./OverviewSplitsTable";

const OverviewSplits: React.FC<OverviewSplitsProps> = ({ currentTeam, lastGame, splits }) => {

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
                <CardTitle className="flex justify-between">
                    <p>Last Game</p>
                    <Link to={`/nba/players/id/${splits.player_id}/${splits.player_name.toLowerCase().replace(" ", "-")}?view=splits`} className="text-blue-500">
                        See Full Splits
                    </Link>
                </CardTitle>
            </CardHeader>

            <CardContent>

                <div>

                    <div className="grid grid-cols-11 items-center">
                        {/* away team */}
                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${awayTeamAbbreviation.toLowerCase()}`} className="col-start-1 col-span-3 justify-self-end flex items-center gap-x-4 hover:underline">
                            <div className="text-right">
                                <p className="text-lg font-semibold">{awayTeamName}</p>
                                <p className="text-xs">
                                    {awayTeamRecord}
                                </p>
                            </div>

                            <TeamLogo abbreviation={awayTeamAbbreviation} team_id={awayTeamId} logoClass="size-12 object-contain" />
                        </Link>

                        <div className="col-span-2 flex flex-col items-center">
                            <p className="font-thin -mb-1 text-sm tracking-widest">AWAY</p>
                            <p className={+homeTeamScore < +awayTeamScore ? "text-4xl font-bold text-center" : "text-4xl text-center"}>{awayTeamScore}</p>
                        </div>

                        {/* date/time */}
                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/games/game_id/${lastGame.game_id}`} className="text-center text-sm col-span-1 col-start-6 text-blue-500">
                            <p>{convertDateGameLog(lastGame.day_of_week, lastGame.game_date.split("T")[0])}</p>
                            <p className="font-bold">FINAL</p>
                        </Link>

                        {/* home team */}
                        
                        <div className="col-span-2 flex flex-col items-center">
                            <p className="font-thin -mb-1 text-sm tracking-widest">HOME</p>
                            <p className={+homeTeamScore > +awayTeamScore ? "text-4xl font-bold text-center" : "text-4xl text-center"}>{homeTeamScore}</p>
                        </div>

                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${homeTeamAbbreviation.toLowerCase()}`} className="col-start-9 col-span-3 justify-self-start flex items-center gap-x-4 hover:underline">
                            <TeamLogo abbreviation={homeTeamAbbreviation} team_id={homeTeamId} logoClass="size-12 object-contain" />
                            <div className="text-left">
                                <p className="text-lg font-semibold">{homeTeamName}</p>
                                <p className="text-xs">{homeTeamRecord}</p>
                            </div>
                        </Link>
                    </div>

                    {/* next team data/time div */}
                    {/* <div className="flex items-center justify-around mx-auto mb-2"> */}


                    {/* home team */}
                    {/* <div className="flex items-center gap-x-4">
                            <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${homeTeamAbbreviation.toLowerCase()}`} className="flex items-center gap-x-4 hover:underline">
                                <div className="text-right">
                                    <p className="text-lg font-semibold">{homeTeamName}</p>
                                    <p className="text-xs">
                                        {homeTeamRecord}
                                    </p>
                                </div>

                                <TeamLogo abbreviation={homeTeamAbbreviation} team_id={homeTeamId} logoClass="size-12 object-contain" />
                            </Link>
                            <p className={+homeTeamScore > +awayTeamScore ? "text-4xl font-bold" : "text-4xl"}>{homeTeamScore}</p>
                        </div> */}

                    {/* date/time */}
                    {/* <div className="text-center text-sm">
                            <p>{convertDateGameLog(lastGame.day_of_week, lastGame.game_date.split("T")[0])}</p>
                            <p className="font-bold">FINAL</p>
                        </div> */}

                    {/* away team */}
                    {/* <div className="flex items-center gap-x-4">
                            <p className={+awayTeamScore > +homeTeamScore ? "text-4xl font-bold" : "text-4xl"}>{awayTeamScore}</p>

                            <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${awayTeamAbbreviation.toLowerCase()}`} className="flex items-center gap-x-4 hover:underline">
                                <TeamLogo abbreviation={awayTeamAbbreviation} team_id={awayTeamId} logoClass="size-12 object-contain" />
                                <div className="text-left">
                                    <p className="text-lg font-semibold">{awayTeamName}</p>
                                    <p className="text-xs">{awayTeamRecord}</p>
                                </div>
                            </Link>
                        </div>

                    </div> */}

                    {/* stats vs that team div */}

                    <div className="flex justify-between my-4">

                        {/* points div */}
                        <div className="text-center border rounded-lg py-3 px-6 w-[23%] shadow-md">
                            <p className="text-xs">PTS {homeGame ? `VS ${lastGame.opp_team_abbreviation}` : `@ ${lastGame.opp_team_abbreviation}`}</p>
                            <p className="text-3xl font-bold" style={{ color: currentTeam.main_color }}>{lastGame.pts}</p>
                        </div>

                        {/* assists div */}
                        <div className="text-center border rounded-lg py-3 px-6 w-[23%] shadow-md">
                            <p className="text-xs">AST {homeGame ? `VS ${lastGame.opp_team_abbreviation}` : `@ ${lastGame.opp_team_abbreviation}`}</p>
                            <p className="text-3xl font-bold" style={{ color: currentTeam.main_color }}>{lastGame.ast}</p>
                        </div>

                        {/* 3P% or REB div */}
                        <div className="text-center border rounded-lg py-3 px-6 w-[23%] shadow-md">
                            {
                                lastGame.tp_percentage > 15 ?
                                    <div>
                                        <p className="text-xs">3P% {homeGame ? `VS ${lastGame.opp_team_abbreviation}` : `@ ${lastGame.opp_team_abbreviation}`}</p>
                                        <p className="text-3xl font-bold" style={{ color: currentTeam.main_color }}>{lastGame.tp_percentage}%</p>
                                    </div>
                                    :
                                    <div>
                                        <p className="text-xs">REB {homeGame ? `VS ${lastGame.opp_team_abbreviation}` : `@ ${lastGame.opp_team_abbreviation}`}</p>
                                        <p className="text-3xl font-bold" style={{ color: currentTeam.main_color }}>{lastGame.reb}</p>
                                    </div>
                            }
                        </div>

                        {/* FG% div */}
                        <div className="text-center border rounded-lg py-3 px-6 w-[23%] shadow-md">
                            <p className="text-xs">FG% {homeGame ? `VS ${lastGame.opp_team_abbreviation}` : `@ ${lastGame.opp_team_abbreviation}`}</p>
                            <p className="text-3xl font-bold" style={{ color: currentTeam.main_color }}>{lastGame.fg_percentage}%</p>
                        </div>

                    </div>

                    {/* table for splits */}
                    <OverviewSplitsTable showHome={showHome} showWins={showWins} splits={splits} showConference={showConference} showDivision={showDivision} />
                </div>

            </CardContent>
        </Card>
    )
}

export default OverviewSplits