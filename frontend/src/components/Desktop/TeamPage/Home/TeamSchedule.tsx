import React from "react";
import { Link } from "react-router-dom";

// type imports
import { TeamGames, TeamScheduleProps } from "../../../../types"

// utils import
import { convertDateTeamSchedule } from "../../../../Utils/utils";

// component imports
import TeamLogo from "../../../ui/TeamLogo"

const SingleGame: React.FC<TeamGames> = ({ game_id, game_date, team_score, opp_team_id, opp_abbreviation, opp_full_name, opp_team_score, game_result, game_location }) => {
    const outcome = game_result === "W" ? (
        <p className="flex items-center gap-x-1">
            <span className="text-green-600">W</span>{team_score}-{opp_team_score}
        </p>
    ) : (
        <p className="flex items-center gap-x-1">
            <span className="text-red-600">L</span>{opp_team_score}-{team_score}
        </p>
    )

    return (
        // Fixed height for content div
        <div className="flex flex-col items-center text-xs text-center border px-4 py-3 rounded-lg flex-1 min-w-[100px] h-24" key={game_id}>
            {/* date & logo */}
            <div className="flex gap-x-2 items-center">
                <p>{convertDateTeamSchedule(game_date)}</p>
                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${opp_abbreviation.toLowerCase()}`}>
                    <TeamLogo team_id={opp_team_id} abbreviation={opp_abbreviation} logoClass="size-5 object-contain" />
                </Link>
            </div>

            {/* vs/@ and team abbreviation */}
            <p className="my-1 font-bold">{game_location === "HOME" ? "VS" : "@"} {opp_abbreviation}</p>

            <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/games/game_id/${game_id}?view=team-stats`} className="text-blue-500 hover:underline">
                {outcome}
            </Link>
        </div>
    )
}

const TeamSchedule: React.FC<TeamScheduleProps> = ({ team, games }) => {
    return (
        <div className="w-full">
            <p className="font-bold mb-2 text-lg">Recent Games</p>

            {/* Added padding around scrollbar and fixed height */}
            <div className="w-full overflow-x-auto pb-3 md:pb-2">
                <div className="flex gap-x-2 min-w-full">
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
                            game_location={game.game_location}
                        />
                    ))}

                    <Link 
                        to={`/nba/teams/${team.abbreviation.toLowerCase()}?view=schedule`} 
                        className="flex flex-col justify-center items-center px-4 py-3 border flex-1 min-w-[100px] h-24 rounded-lg text-blue-500"
                    >
                        <p>See Full</p>
                        <p>Schedule</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TeamSchedule