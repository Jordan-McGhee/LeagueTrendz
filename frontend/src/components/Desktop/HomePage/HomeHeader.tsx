import React from "react";
import { Link } from "react-router-dom";

// type imports
import { HomePlayersProps } from "@/types";

// utils imports

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card"
import TeamLogo from "../../ui/TeamLogo"

const HomeHeader: React.FC<HomePlayersProps> = ({ players }) => {

    return (
        <Card>

            <CardContent className="flex items-center justify-between py-2">
                <div className="flex gap-x-4 items-center">
                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/bos?view=home`}>
                        <TeamLogo logoClass="size-28 object-contain" team_id={1} abbreviation="BOS" />
                    </Link>

                    <div>
                        <p className="text-lg font-semibold">2023-24 NBA Champions</p>
                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/bos?view=home`}>
                            <p className="text-4xl font-bold text-[#007a33]">Boston Celtics</p>
                        </Link>
                        {/* <p className="mt-1 mb-2">Defeat Dallas Mavericks 4-1</p> */}

                        {/* link div */}
                        <div className="flex justify-between w-2/3 max-w-40  gap-x-2 mt-2">
                            <Link
                                to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/bos?view=stats`}
                                className="hover:font-semibold hover:scale-110"
                                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    if (e.target instanceof HTMLElement) {
                                        e.target.style.color = "#007a33"
                                    }
                                }}
                                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    if (e.target instanceof HTMLElement) {
                                        e.target.style.color = 'black';
                                    }
                                }}
                            >
                                Stats
                            </Link>
                            ·
                            <Link
                                to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/bos?view=schedule`}
                                className="hover:font-semibold hover:scale-110"
                                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    if (e.target instanceof HTMLElement) {
                                        e.target.style.color = "#007a33"
                                    }
                                }}
                                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    if (e.target instanceof HTMLElement) {
                                        e.target.style.color = 'black';
                                    }
                                }}
                            >
                                Schedule
                            </Link>
                            ·
                            <Link
                                to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/bos?view=roster`}
                                className="hover:font-semibold hover:scale-110"
                                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    if (e.target instanceof HTMLElement) {
                                        e.target.style.color = "#007a33"
                                    }
                                }}
                                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    if (e.target instanceof HTMLElement) {
                                        e.target.style.color = 'black';
                                    }
                                }}
                            >
                                Roster
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="w-1/5 text-center flex flex-col gap-y-1">
                    {/* game 1 */}
                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/games/game_id/1315?view=team-stats`} className="grid grid-cols-5 items-center gap-x-2 hover:scale-105">
                        <TeamLogo logoClass="size-5 object-contain col-span-1 justify-self-center" abbreviation="BOS" team_id={1} />
                        <p className="font-bold col-span-1 justify-self-center">107</p>
                        <p className="col-span-1 justify-self-center">-</p>
                        <p className="col-span-1 justify-self-center font-light">89</p>
                        <TeamLogo logoClass="size-5 object-contain col-span-1 justify-self-center" abbreviation="DAL" team_id={6} />
                    </Link>

                    {/* game 2 */}
                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/games/game_id/1316?view=team-stats`} className="grid grid-cols-5 items-center gap-x-2 hover:scale-105">
                        <TeamLogo logoClass="size-5 object-contain col-span-1 justify-self-center" abbreviation="BOS" team_id={1} />
                        <p className="font-bold col-span-1 justify-self-center">105</p>
                        <p className="col-span-1 justify-self-center">-</p>
                        <p className="col-span-1 justify-self-center font-light">98</p>
                        <TeamLogo logoClass="size-5 object-contain col-span-1 justify-self-center" abbreviation="DAL" team_id={6} />
                    </Link>

                    {/* game 3 */}
                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/games/game_id/1317?view=team-stats`} className="grid grid-cols-5 items-center gap-x-2 hover:scale-105">
                        <TeamLogo logoClass="size-5 object-contain col-span-1 justify-self-center" abbreviation="BOS" team_id={1} />
                        <p className="font-bold col-span-1 justify-self-center">106</p>
                        <p className="col-span-1 justify-self-center">-</p>
                        <p className="col-span-1 justify-self-center font-light">99</p>
                        <TeamLogo logoClass="size-5 object-contain col-span-1 justify-self-center" abbreviation="DAL" team_id={6} />
                    </Link>

                    {/* game 4 */}
                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/games/game_id/1318?view=team-stats`} className="grid grid-cols-5 items-center gap-x-2 hover:scale-105">
                        <TeamLogo logoClass="size-5 object-contain col-span-1 justify-self-center" abbreviation="BOS" team_id={1} />
                        <p className="col-span-1 justify-self-center font-light">84</p>
                        <p className="col-span-1 justify-self-center">-</p>
                        <p className="font-bold col-span-1 justify-self-center">122</p>
                        <TeamLogo logoClass="size-5 object-contain col-span-1 justify-self-center" abbreviation="DAL" team_id={6} />
                    </Link>

                    {/* game 5 */}
                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/games/game_id/1319?view=team-stats`} className="grid grid-cols-5 items-center gap-x-2 hover:scale-105">
                        <TeamLogo logoClass="size-5 object-contain col-span-1 justify-self-center" abbreviation="BOS" team_id={1} />
                        <p className="font-bold col-span-1 justify-self-center">106</p>
                        <p className="col-span-1 justify-self-center">-</p>
                        <p className="col-span-1 justify-self-center font-light">88</p>
                        <TeamLogo logoClass="size-5 object-contain col-span-1 justify-self-center" abbreviation="DAL" team_id={6} />
                    </Link>
                </div>

                {
                    players &&

                    <Link
                        to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${players[players.length - 1].player_id}/${players[players.length - 1].name.toLowerCase().replace(" ", "-")}`}
                        className="flex flex-col items-center my-2 hover:underline"
                    >
                        <img
                            className="h-24 object-contain"
                            src={players[players.length - 1].photo_url}
                            alt={players[players.length - 1].name}
                        />
                        {/* <img
                                    src={require("../../../nba-trophies/bill-russel-finals-mvp.png")}
                                    alt="Finals-MVP-trophy"
                                    className="w-24 h-24 object-contain"
                                /> */}
                        <p className="text-lg font-bold text-[#007a33] mt-2">{players[players.length - 1].name}</p>
                        <p className="text-xs font-semibold">Finals MVP</p>
                    </Link>
                }
            </CardContent>
        </Card >
    )
}

export default HomeHeader