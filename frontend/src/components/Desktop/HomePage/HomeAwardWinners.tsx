import React from "react"
import { Link } from "react-router-dom"

// type imports
import { HomePlayersProps } from "@/types"

// utils imports
import { convertPlayerPosition, shortenPlayerName, shortenTeamName } from "../../../Utils/utils"

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card"
import { Separator } from "../../ui/separator"
import TeamLogo from "../../ui/TeamLogo"

// mobile import
import HomeAwardWinnersMobile from "../../Mobile/HomePage/HomeAwardWinners-Mobile"


const HomeAwardWinners: React.FC<HomePlayersProps> = ({ players }) => {

    // awards in order of players queried in database [ mvp, dpoy, clutch, roty, most improved, 6th man ]
    const awardList = ["League MVP", "Defensive POTY", "Clutch POTY", "Rookie of the Year", "Most Improved", "Sixth Man of the Year"]
    // img src of trophies
    const awardSrc = [require('../../../nba-trophies/michael-jordan-mvp.png'), require('../../../nba-trophies/hakeem-olajuwon-defensive.png'), require('../../../nba-trophies/jerry-west-clutch-player.png'), require('../../../nba-trophies/wilt-chamberlain-rookie.png'), require('../../../nba-trophies/george-mikan-most-improved.png'), require('../../../nba-trophies/john-havlicek-sixth-man.png')]

    return (
        <>
            <div className="md:hidden">
                {/* mobile */}
                <HomeAwardWinnersMobile players={players} />
            </div>

            <Card className="hidden md:block">
                <CardHeader>
                    <CardTitle>
                        2023-24 Award Winners
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {players && players.map((player, index) => {

                        // index 6 is finals mvp, used in home header
                        if (index === 6) {
                            return null
                        }

                        return (
                            <div key={`${player.name}-${awardList[index]}`}>

                                <div className="grid grid-cols-8 gap-x-3 items-center w-full">
                                    <img
                                        src={awardSrc[index]}
                                        alt={awardList[index]}
                                        className="col-span-1 w-full h-14 object-contain"
                                    />

                                    <div className="col-span-5">
                                        <p className="font-semibold">
                                            {awardList[index]}
                                        </p>
                                        <div className="flex gap-x-1 items-center text-xs">
                                            <Link
                                                to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player.player_id}/${player.name.toLowerCase().replace(" ", "-")}`}
                                                className="font-semibold hover:underline"
                                            >
                                                {shortenPlayerName(player.name)}
                                            </Link>
                                            <p>·</p>
                                            <Link
                                                to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${player.team_abbreviation}?view=home`}
                                                className="hover:underline"
                                            >
                                                {shortenTeamName(player.team_id)}
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="col-span-2 flex justify-end">
                                        <Link
                                            to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player.player_id}/${player.name.toLowerCase().replace(" ", "-")}`}
                                            className="flex -space-x-7 items-center"
                                        >
                                            <img
                                                src={player.photo_url}
                                                alt={player.name}
                                                className="size-14 object-contain z-10 relative"
                                            />
                                            <TeamLogo
                                                logoClass="w-10 h-10 object-contain z-0"
                                                team_id={player.team_id}
                                                abbreviation={player.team_abbreviation}
                                            />
                                        </Link>
                                    </div>
                                </div>

                                {index !== 5 && <Separator className="w-full my-1.5" />}
                            </div>
                        );
                    })}
                </CardContent>
            </Card>
        </>
    )
}

export default HomeAwardWinners