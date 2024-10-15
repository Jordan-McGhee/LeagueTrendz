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

                <Link to={`/nba/teams/${game.away_team_abbreviation.toLowerCase()}?view=home`} className="flex justify-evenly items-center">
                    <div className="flex items-center">
                        <TeamLogo team_id={game.away_team_id} abbreviation={game.away_team_abbreviation} logoClass="size-12 object-contain" />
                    </div>

                    <div className="flex flex-col items-center">
                        <p className="text-xs font-thin -mb-0.5">AWAY</p>
                        <p className={+game.away_team_score > +game.home_team_score ? "text-2xl font-bold text-black" : "text-2xl font-bold text-gray-400"}>{game.away_team_score}</p>
                    </div>
                </Link>

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

                <Link to={`/nba/teams/${game.home_team_abbreviation.toLowerCase()}?view=home`} className="flex justify-evenly items-center gap-y-1">

                    <div className="flex flex-col items-center">
                        <p className="text-xs font-thin -mb-0.5">HOME</p>
                        <p className={+game.away_team_score < +game.home_team_score ? "text-2xl font-bold text-black" : "text-2xl font-bold text-gray-400"}>{game.home_team_score}</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <TeamLogo team_id={game.home_team_id} abbreviation={game.home_team_abbreviation} logoClass="size-12 object-contain" />
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default GameHeaderMobile