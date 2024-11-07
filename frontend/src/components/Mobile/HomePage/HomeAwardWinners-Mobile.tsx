import React, { useState } from "react"
import { Link } from "react-router-dom"

// type imports
import { HomePlayersProps } from "@/types"

// utils imports
import { shortenPlayerName, shortenTeamName } from "../../../Utils/utils"

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card"
import { Separator } from "../../ui/separator"
import TeamLogo from "../../ui/TeamLogo"
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons"


const HomeAwardWinnersMobile: React.FC<HomePlayersProps> = ({ players }) => {

    const [showContent, setShowContent] = useState<Boolean>(true)

    const toggleShowContent = () => {
        setShowContent(!showContent)
    }

    // awards in order of players queried in database [ mvp, dpoy, clutch, roty, most improved, 6th man ]
    const awardList = ["League MVP", "Defensive POTY", "Clutch POTY", "Rookie OTY", "Most Improved", "Sixth Man OTY"]
    // img src of trophies
    const awardSrc = [require('../../../nba-trophies/michael-jordan-mvp.png'), require('../../../nba-trophies/hakeem-olajuwon-defensive.png'), require('../../../nba-trophies/jerry-west-clutch-player.png'), require('../../../nba-trophies/wilt-chamberlain-rookie.png'), require('../../../nba-trophies/george-mikan-most-improved.png'), require('../../../nba-trophies/john-havlicek-sixth-man.png')]

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between items-center">
                        <p className="text-xl">'23-24 Award Winners</p>

                        <div onClick={() => toggleShowContent()} className="flex gap-x-2 items-center">
                            <p className="text-sm">{showContent ? "Hide" : "Show"}</p>
                            {showContent ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>

            {
                showContent &&
                <CardContent>
                    {players && players.map((player, index) => {

                        // index 6 is finals mvp, used in home header
                        if (index === 6) {
                            return null
                        }

                        return (
                            <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player.player_id}/${player.name.toLowerCase().replace(" ", "-")}`} key={player.name}>

                                <div className="grid grid-cols-8 gap-x-3 items-center w-full">
                                    <img
                                        src={awardSrc[index]}
                                        alt={awardList[index]}
                                        className="col-span-1 w-full h-14 object-contain"
                                    />

                                    <div className="col-span-5">
                                        <p className="font-semibold text-lg">
                                            {awardList[index]}
                                        </p>
                                        <div className="flex gap-x-1 items-center text-sm">
                                            <p className="font-semibold">{shortenPlayerName(player.name)}</p>
                                            <p>·</p>
                                            <p className="">{shortenTeamName(player.team_id)}</p>
                                        </div>
                                    </div>

                                    <div className="col-span-2 flex justify-end">
                                        <div className="flex -space-x-7 items-center">
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
                                        </div>
                                    </div>
                                </div>

                                {index !== 5 && <Separator className="w-full my-1.5" />}
                            </Link>
                        );
                    })}
                </CardContent>
            }
        </Card>
    )
}

export default HomeAwardWinnersMobile