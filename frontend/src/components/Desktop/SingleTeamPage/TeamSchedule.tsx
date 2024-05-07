import React from "react";
import { Link } from "react-router-dom";

// type imports
import { TeamGames, TeamScheduleProps } from "../../../types"

// utils import
import { convertDateTeamSchedule } from "../../../Utils/utils";

// component imports
import TeamLogo from "../../ui/TeamLogo"


const SingleGame: React.FC<TeamGames> = ({ game_id, game_date, team_score, opp_team_id, opp_abbreviation, opp_full_name, opp_team_score, game_result, game_location }) => {

    const outcome = game_result === "W" ? (<p className="flex items-center gap-x-1 group-hover:underline group-hover:underline-offset-2"><span className="text-green-600">W</span>{team_score}-{opp_team_score}</p>) : (<p className="flex items-center gap-x-1 group-hover:underline group-hover:underline-offset-2"><span className="text-red-600">L</span>{opp_team_score}-{team_score}</p>)

    return (

        <Link to={'/'} className="hover:scale-105 group">
            {/* // content div */}
            <div className="flex flex-col items-center text-xs text-center border px-4 py-3 rounded-sm" key={game_id}>

                {/* date & logo */}
                <div className="flex gap-x-2 items-center">
                    <p>{convertDateTeamSchedule(game_date)}</p>
                    <TeamLogo team_id={opp_team_id} abbreviation={opp_abbreviation} logoClass="size-5 object-contain" />
                </div>

                {/* vs/@ and team abbreviation */}
                <p className="my-1 font-bold">{game_location === "HOME" ? "VS" : "@"} {opp_abbreviation}</p>

                {outcome}

            </div>
        </Link>
    )
}


const TeamSchedule: React.FC<TeamScheduleProps> = ({ team, games }) => {

    return (
        <div className="">
            <p className="font-bold mb-2 text-lg">Recent Games</p>

            <div className="flex">
                {games.map((game) => (
                    <SingleGame
                        key={game.game_id}
                        game_id={game.game_id}
                        game_date={game.game_date}
                        team_score={game.team_score}
                        opp_team_id={game.opp_team_id}
                        opp_abbreviation={game.opp_abbreviation}
                        opp_full_name={game.opp_full_name}
                        opp_team_score={game.opp_team_score}
                        game_result={game.game_result}
                        game_location={game.game_location} />
                ))}

                <Link to={`/nba/teams/${team.abbreviation}?view=schedule`}className="flex flex-col justify-center items-center px-6 py-3 border text-sm">
                    <p>See Full</p>
                    <p>Schedule</p>
                </Link>
            </div>

        </div>
    )
}

export default TeamSchedule