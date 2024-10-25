import React, { useState } from "react";
import { Link } from "react-router-dom";

// type imports
import { TeamPageProps } from "@/types";

// utils imports
import { determineSuffix } from "../../../../Utils/utils";

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../ui/card"
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons"

const TeamStatsContentMobile: React.FC<TeamPageProps> = ({ team }) => {

    const [showContent, setShowContent] = useState<boolean>(true)

    const toggleShowContent = () => {
        setShowContent(!showContent)
    }

    return (
        <Card className="block md:hidden">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    '23-24 Team Stats
                    <div onClick={() => toggleShowContent()} className="flex gap-x-2 items-center md:hidden">
                        <p className="text-sm">{showContent ? "Hide" : "Show"}</p>
                        {showContent ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
                    </div>
                </CardTitle>
            </CardHeader>


            {
                showContent &&
                <div>
                    <CardContent className="-mt-2">
                        <div className="flex justify-between">

                            {/* points per game */}
                            <div className="text-center flex flex-col gap-y-0.5">
                                <p className="">PPG</p>
                                <p className="font-black text-3xl" style={{ color: team.main_color }}>{team.avg_pts}</p>
                                <p className="font-bold text-xs">{team.pts_rank}{determineSuffix(team.pts_rank)} in NBA</p>
                            </div>

                            {/* rebounds per game */}
                            <div className="text-center flex flex-col gap-y-0.5">
                                <p className="">RPG</p>
                                <p className="font-black text-3xl" style={{ color: team.main_color }}>{team.avg_reb}</p>
                                <p className="font-bold text-xs">{team.reb_rank}{determineSuffix(team.reb_rank)} in NBA</p>
                            </div>

                            {/* assists per game */}
                            <div className="text-center flex flex-col gap-y-0.5">
                                <p className="">APG</p>
                                <p className="font-black text-3xl" style={{ color: team.main_color }}>{team.avg_ast}</p>
                                <p className="font-bold text-xs">{team.ast_rank}{determineSuffix(team.ast_rank)} in NBA</p>
                            </div>

                        </div>
                    </CardContent>

                    <CardFooter className="justify-center -mb-1">
                        <Link to={`/nba/teams/${team.abbreviation.toLowerCase()}?view=stats`} className="font-semibold text-blue-500">
                            See All Team Stats
                        </Link>
                    </CardFooter>
                </div>

            }
        </Card>
    )
}

export default TeamStatsContentMobile