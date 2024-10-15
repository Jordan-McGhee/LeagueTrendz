import React from "react";

import { Link } from "react-router-dom";

// type imports
import { GameBoxScoreHeaderProps } from "@/types";

// utils imports
import { convertDateTeamSchedule } from "../../../Utils/utils";

// component imports
import TeamLogo from "../../ui/TeamLogo"

const GameHeaderMobile: React.FC<GameBoxScoreHeaderProps> = ({ game, standingsData, headerClass }) => {

    return (
        <div className={headerClass}>

            {/* away */}
            <div className="col-span-3">

                <div className="flex justify-evenly items-center">
                    <div className="flex items-center">
                        {/* <p className="text-xs font-semibold">{game.away_team_abbreviation}</p> */}
                        <TeamLogo team_id={game.away_team_id} abbreviation={game.away_team_abbreviation} logoClass="size-12 object-contain" />
                        {/* <p className="text-xs">{standingsData.away_team_wins}-{standingsData.away_team_losses}</p> */}
                        {/* <p className="text-xs font-thin">AWAY</p> */}
                    </div>

                    <div className="flex flex-col items-center">
                        <p className="text-xs font-thin -mb-0.5">AWAY</p>
                        <p className={+game.away_team_score > +game.home_team_score ? "text-2xl font-bold text-black" : "text-2xl font-bold text-gray-400"}>{game.away_team_score}</p>
                    </div>
                </div>

            </div>

            {/* final */}
            <div className="col-start-4 col-span-1">
                <div className="text-center">
                    <p className="text-xs font-bold">FINAL</p>
                    <p className="text-xs font-light leading-tight">{convertDateTeamSchedule(game.game_date)}</p>
                </div>
            </div>

            {/* home */}
            <div className="col-span-3">

                <div className="flex justify-evenly items-center gap-y-1">

                    <div className="flex flex-col items-center">
                        <p className="text-xs font-thin -mb-0.5">HOME</p>
                        <p className={+game.away_team_score < +game.home_team_score ? "text-2xl font-bold text-black" : "text-2xl font-bold text-gray-400"}>{game.home_team_score}</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <TeamLogo team_id={game.home_team_id} abbreviation={game.home_team_abbreviation} logoClass="size-12 object-contain" />
                        {/* <p className="text-xs">{standingsData.home_team_wins}-{standingsData.home_team_losses}</p> */}
                        {/* <p className="text-sm font-semibold">{game.away_team_abbreviation}</p> */}
                        {/* <p className="text-xs font-thin">HOME</p> */}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default GameHeaderMobile