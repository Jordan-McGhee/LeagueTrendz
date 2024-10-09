import React from "react";
import { Link } from "react-router-dom";

// type imports
import { HomePlayersProps } from "@/types";

// utils imports

// ui imports
import { Card, CardContent } from "../../ui/card"
import TeamLogo from "../../ui/TeamLogo"

const HomeHeaderMobile: React.FC<HomePlayersProps> = ({ players }) => {

    return (
        <Card>

            <CardContent className="flex items-center justify-between py-4">
                <div className="flex gap-x-4 items-center">
                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/bos?view=home`}>
                        <TeamLogo logoClass="size-20 object-contain" team_id={1} abbreviation="BOS" />
                    </Link>

                    <div>
                        <p className="font-semibold">2023-24 NBA Champions</p>
                        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/bos?view=home`}>
                            <p className="text-3xl font-bold text-[#007a33]">Boston Celtics</p>
                        </Link>
                        {/* <p className="mt-1 mb-2">Defeat Dallas Mavericks 4-1</p> */}

                        {/* link div */}
                        <div className="flex justify-between w-2/3 max-w-40 gap-x-1.5">
                            <Link
                                to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/bos?view=stats`}
                                className="hover:font-semibold hover:scale-110"
                            >
                                Stats
                            </Link>
                            ·
                            <Link
                                to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/bos?view=schedule`}
                                className="hover:font-semibold hover:scale-110"
                            >
                                Schedule
                            </Link>
                            ·
                            <Link
                                to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/bos?view=roster`}
                                className="hover:font-semibold hover:scale-110"
                            >
                                Roster
                            </Link>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card >
    )
}

export default HomeHeaderMobile