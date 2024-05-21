import React from "react";
import { Link } from "react-router-dom";

// type imports
import { TeamHistoryProps } from "@/types";

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../ui/card";


const TeamHistory: React.FC<TeamHistoryProps> = ({ team, history }) => {

    let championCount: number[] = []
    let jerseyCount: string[] = []

    for (let i = 0; i < history.seasons.length; i++) {
        if (history.seasons[i].champion) {
            championCount.push(history.seasons[i].season)
        }
    }

    for (let i = 0; i < history.jersey_numbers.length; i++) {
        if (history.jersey_numbers[i].number) {
            jerseyCount.push(history.jersey_numbers[i].number)
        }
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle>{team.full_name} History</CardTitle>
            </CardHeader>
            <CardContent>

                <div className="flex flex-col gap-y-4">
                    {/* championships */}
                    {championCount.length > 0 &&
                        <div className="grid grid-cols-8 gap-x-4">
                            <img src={require("../../../nba-trophies/larry-obrien-champion.png")} className="size-16 object-contain col-span-2 place-self-center" alt="champ trophy" />
                            <div className="col-span-6">
                                <p className="text-lg font-bold">{championCount.length}x NBA Champion</p>
                                <p className="text-sm font-light">{championCount.join(", ")}</p>
                            </div>
                        </div>
                    }

                    {/* jerseys */}
                    <div className="grid grid-cols-8 gap-x-4">
                        <p className="text-5xl col-span-2 place-self-center font-bold" style={{ color: team.main_color }}>{jerseyCount.length}</p>
                        <div className="col-span-6">
                            <p className="text-lg font-bold">Retired Numbers</p>
                            <p className="text-sm font-light">{jerseyCount.join(", ")}</p>
                        </div>
                    </div>
                </div>

            </CardContent>

            <CardFooter className="text-sm font-semibold text-blue-700 pb-4">
                <Link to={`/nba/teams/${team.abbreviation.toLowerCase()}?view=history`}>
                    See Full History
                </Link>
            </CardFooter>
        </Card>
    )
}

export default TeamHistory