import React from "react";
import { Link } from "react-router-dom";

// type imports
import { GameBoxScoreHeaderProps } from "@/types";

// utils imports
import { convertDateGameBoxScore } from "../../../Utils/utils";

// component imports
import TeamLogo from "../../ui/TeamLogo"

const GameHeader: React.FC<GameBoxScoreHeaderProps> = ({ game, standingsData, headerClass }) => {

    return (
        <div className={headerClass}>

            {/* AWAY */}
            <div className="col-start-1 col-span-3">
                <div className="flex justify-evenly items-center gap-x-6">
                    {/* AWAY TEAM */}

                    <Link to={`/nba/teams/${game.away_team_abbreviation.toLowerCase()}?view=home`} className="hover:underline">
                        {/* name/record */}
                        <div className="text-right">
                            <p className="text-2xl font-bold">{game.away_team_full_name}</p>
                            <p className="text-sm font-light">{`${standingsData.away_team_wins}-${standingsData.away_team_losses}, ${standingsData.away_team_away_wins}-${standingsData.away_team_away_losses} Away`}</p>
                        </div>
                    </Link>

                    <Link to={`/nba/teams/${game.away_team_abbreviation.toLowerCase()}?view=home`} className="hover:underline">

                        <TeamLogo team_id={game.away_team_id} abbreviation={game.away_team_abbreviation} logoClass="size-12 object-contain" />
                    </Link>

                    <p className={+game.away_team_score > +game.home_team_score ? "text-5xl font-bold text-black" : "text-5xl font-bold text-gray-600"}>{game.away_team_score}</p>
                </div>
            </div>

            {/* FINAL */}
            <div className="col-start-4 col-span-1">
                <div className="text-center">
                    <p className="text-2xl font-bold">FINAL</p>
                    <p className="text-sm font-light">{convertDateGameBoxScore(game.game_date)}</p>
                </div>
            </div>

            {/* HOME */}
            <div className="col-start-5 col-span-3">
                <div className="flex justify-evenly items-center">
                    {/* HOME TEAM */}


                    <p className={+game.home_team_score > +game.away_team_score ? "text-5xl font-bold text-black" : "text-5xl font-bold text-gray-600"}>{game.home_team_score}</p>


                    <Link to={`/nba/teams/${game.home_team_abbreviation.toLowerCase()}?view=home`} className="hover:underline">
                        <TeamLogo team_id={game.home_team_id} abbreviation={game.home_team_abbreviation} logoClass="size-12 object-contain" />
                    </Link>

                    <Link to={`/nba/teams/${game.home_team_abbreviation.toLowerCase()}?view=home`} className="hover:underline">
                        {/* name/record */}
                        <div className="text-left">
                            <p className="text-2xl font-bold">{game.home_team_full_name}</p>
                            <p className="text-sm font-light">{`${standingsData.home_team_wins}-${standingsData.home_team_losses}, ${standingsData.home_team_home_wins}-${standingsData.home_team_home_losses} Home`}</p>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default GameHeader