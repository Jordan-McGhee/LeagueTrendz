import react, { useState } from "react"

// ui imports

import { Button } from "../..//ui/button";

// icon imports
import { PersonIcon } from "@radix-ui/react-icons";

const PlayerHero = () => {



    return (
        <div>

            <div className="flex justify-between text-xs items-center">

                {/* player image and details div */}
                <div className="flex items-center gap-x-4">
                    <PersonIcon className="h-24 w-24" />

                    <div className="flex flex-col gap-y-2">
                        <p className="text-2xl font-light">TRAE <span className="font-bold">YOUNG</span></p>
                        <p className="flex gap-x-1 items-center"><div className="bg-red-500 h-6 w-6 rounded-full" /> Atlanta Hawks • #11 • PG</p>
                        <Button>Add to Favorites</Button>
                    </div>
                </div>

                {/* player info div */}
                <div className="flex text-sm gap-x-4">
                    <div className="flex flex-col uppercase">
                        <p>HT/WT</p>
                        <p>Birthdate</p>
                        <p>College</p>
                        <p>Draft Info</p>
                        <p>Status</p>
                    </div>

                    <div className="flex flex-col font-semibold">
                        <p>6'1", 164 lbs</p>
                        <p>9/19/1998 (25)</p>
                        <p>Oklahoma</p>
                        <p>2018: Rd 1, Pk 5 (DAL)</p>
                        <p>Active</p>
                    </div>
                </div>


                {/* season stats & fav div */}
                <div className="flex flex-col justify-center border px-4 py-2 rounded-lg w-1/3 items-center">
                    <p className="text-xs mb-1">2023-24 SEASON STATS</p>

                    <div className="flex justify-around w-full text-sm font-light">

                        {/* points */}
                        <div className="flex flex-col items-center">
                            <p>PTS</p>
                            <p className="text-2xl font-bold text-red-700">26.7</p>
                            <p>11th</p>
                        </div>

                        {/* rebounds */}
                        <div className="flex flex-col items-center">
                            <p>RED</p>
                            <p className="text-2xl font-bold text-red-700">2.7</p>
                            <p>150+</p>
                        </div>

                        {/* assist */}
                        <div className="flex flex-col items-center">
                            <p>AST</p>
                            <p className="text-2xl font-bold text-red-700">10.9</p>
                            <p>2nd</p>
                        </div>

                        {/* fg% */}
                        <div className="flex flex-col items-center">
                            <p>FG%</p>
                            <p className="text-2xl font-bold text-red-700">42.7</p>
                            <p>131st</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerHero