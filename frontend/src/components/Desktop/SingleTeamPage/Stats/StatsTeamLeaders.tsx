import { Link } from "react-router-dom"

// types
import { TeamPlayersProps } from "../../../../types"

// utils imports
import { convertPlayerPosition, shortenPlayerName } from "../../../../Utils/utils"


// component imports

const StatsTeamLeaders: React.FC<TeamPlayersProps> = ({ team, players }) => {

    return (
        <div>

            {/* team leaders div */}
            <div className="w-full flex grow justify-between text-sm">

                {/* POINTS */}
                <div className="w-[24%]">

                    <p className="mb-1 font-semibold">Points</p>
                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${players.pts_leader_id}/${players.pts_leader_name.toLowerCase().replace(" ", "-")}`}>

                        <div className="flex items-center justify-between gap-x-2 border p-4 rounded-md hover:scale-105">

                            <div className="">
                                <p className="text-sm font-bold max-w-28 truncate">{shortenPlayerName(players.pts_leader_name)}</p>
                                <p className="text-xs font-light">{convertPlayerPosition(players.pts_leader_position)} ⋅ #{players.pts_leader_number}</p>
                                <p className="text-3xl font-bold" style={{ color: team.main_color }}>{players.pts_leader_stat}</p>
                            </div>

                            <img src={players.pts_leader_photo_url} alt={players.pts_leader_name} className="h-16 object-contain" />
                        </div>
                    </Link>
                </div>

                {/* ASSISTS */}
                <div className="w-[24%]">

                    <p className="mb-1 font-semibold">Assists</p>
                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${players.ast_leader_id}/${players.ast_leader_name.toLowerCase().replace(" ", "-")}`}>

                        <div className="flex items-center justify-between gap-x-2 border p-4 rounded-md hover:scale-105">

                            <div className="">
                                <p className="text-sm font-bold max-w-28 truncate">{shortenPlayerName(players.ast_leader_name)}</p>
                                <p className="text-xs font-light">{convertPlayerPosition(players.ast_leader_position)} ⋅ #{players.ast_leader_number}</p>
                                <p className="text-3xl font-bold" style={{ color: team.main_color }}>{players.ast_leader_stat}</p>
                            </div>

                            <img src={players.ast_leader_photo_url} alt={players.ast_leader_name} className="h-16 object-contain" />
                        </div>
                    </Link>
                </div>

                {/* REBOUNDS */}
                <div className="w-[24%]">

                    <p className="mb-1 font-semibold">Rebounds</p>
                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${players.reb_leader_id}/${players.reb_leader_name.toLowerCase().replace(" ", "-")}`} className="hover:scale-105">

                        <div className="flex items-center justify-between gap-x-2 border p-4 rounded-md hover:scale-105">

                            <div className="">
                                <p className="text-sm font-bold max-w-28 truncate">{shortenPlayerName(players.reb_leader_name)}</p>
                                <p className="text-xs font-light">{convertPlayerPosition(players.reb_leader_position)} ⋅ #{players.reb_leader_number}</p>
                                <p className="text-3xl font-bold" style={{ color: team.main_color }}>{players.reb_leader_stat}</p>
                            </div>

                            <img src={players.reb_leader_photo_url} alt={players.reb_leader_name} className="h-16 object-contain" />
                        </div>
                    </Link>
                </div>

                {/* STEALS */}
                <div className="w-[24%]">

                    <p className="mb-1 font-semibold">Steals</p>
                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${players.stl_leader_id}/${players.stl_leader_name.toLowerCase().replace(" ", "-")}`}>

                        <div className="flex items-center justify-between gap-x-2 border p-4 rounded-md hover:scale-105">

                            <div className="">
                                <p className="text-sm font-bold max-w-28 truncate">{shortenPlayerName(players.stl_leader_name)}</p>
                                <p className="text-xs font-light">{convertPlayerPosition(players.stl_leader_position)} ⋅ #{players.stl_leader_number}</p>
                                <p className="text-3xl font-bold" style={{ color: team.main_color }}>{players.stl_leader_stat}</p>
                            </div>

                            <img src={players.stl_leader_photo_url} alt={players.stl_leader_name} className="h-16 object-contain" />
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default StatsTeamLeaders