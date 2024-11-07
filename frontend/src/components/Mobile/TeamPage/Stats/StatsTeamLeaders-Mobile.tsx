import { Link } from "react-router-dom";

// types
import { TeamPlayersProps } from "@/types";

// utils imports
import { convertPlayerPosition, shortenPlayerName } from "../../../../Utils/utils"

// ui imports
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../../ui/carousel"

const StatsTeamLeadersMobile: React.FC<TeamPlayersProps> = ({ team, players, className }) => (

    <Carousel
        opts={{
            align: "center",
            loop: true
        }}
        className={className}
    >
        <CarouselContent className="mx-auto mb-4 w-full">

            {/* pts */}
            <CarouselItem className="" key={`${players.pts_leader_name}-pointsLeader`}>
                <p className="mb-1 font-black uppercase tracking-widest text-center" style={{color: team.main_color}}>Points per game</p>
                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${players.pts_leader_id}/${players.pts_leader_name.toLowerCase().replace(" ", "-")}`}>

                    <div className="flex items-center justify-between gap-x-2 border p-4 rounded-lg w-48 mx-auto">

                        <div className="">
                            <p className="text-xs font-bold max-w-24 truncate">{players.pts_leader_name.length > 18 ? shortenPlayerName(players.pts_leader_name) : players.pts_leader_name}</p>
                            {/* <p className="text-xs font-light">{convertPlayerPosition(players.pts_leader_position)} ⋅ #{players.pts_leader_number}</p> */}
                            <p className="text-2xl font-bold" style={{ color: team.main_color }}>{players.pts_leader_stat}</p>
                        </div>

                        <img src={players.pts_leader_photo_url} alt={players.pts_leader_name} className="h-12 object-contain" />
                    </div>
                </Link>
            </CarouselItem>

            {/* ast */}
            <CarouselItem className="" key={`${players.ast_leader_name}-assistsLeader`}>
                <p className="mb-1 font-black uppercase tracking-widest text-center" style={{color: team.main_color}}>Assists per game</p>
                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${players.ast_leader_id}/${players.ast_leader_name.toLowerCase().replace(" ", "-")}`}>

                    <div className="flex items-center justify-between gap-x-2 border p-4 rounded-lg w-48 mx-auto">

                        <div className="">
                            <p className="text-xs font-bold max-w-24 truncate">{players.ast_leader_name.length > 18 ? shortenPlayerName(players.ast_leader_name) : players.ast_leader_name}</p>
                            {/* <p className="text-xs font-light">{convertPlayerPosition(players.ast_leader_position)} ⋅ #{players.ast_leader_number}</p> */}
                            <p className="text-3xl font-bold" style={{ color: team.main_color }}>{players.ast_leader_stat}</p>
                        </div>

                        <img src={players.ast_leader_photo_url} alt={players.ast_leader_name} className="h-14 object-contain" />
                    </div>
                </Link>
            </CarouselItem>

            {/* reb */}
            <CarouselItem className="" key={`${players.reb_leader_name}-reboundsLeader`}>
                <p className="mb-1 font-black uppercase tracking-widest text-center" style={{color: team.main_color}}>Rebounds per game</p>
                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${players.reb_leader_id}/${players.reb_leader_name.toLowerCase().replace(" ", "-")}`}>

                    <div className="flex items-center justify-between gap-x-2 border p-4 rounded-lg w-48 mx-auto">

                        <div className="">
                            <p className="text-xs font-bold max-w-24 truncate">{players.reb_leader_name.length > 18 ? shortenPlayerName(players.reb_leader_name) : players.reb_leader_name}</p>
                            {/* <p className="text-xs font-light">{convertPlayerPosition(players.reb_leader_position)} ⋅ #{players.reb_leader_number}</p> */}
                            <p className="text-3xl font-bold" style={{ color: team.main_color }}>{players.reb_leader_stat}</p>
                        </div>

                        <img src={players.reb_leader_photo_url} alt={players.reb_leader_name} className="h-14 object-contain" />
                    </div>
                </Link>
            </CarouselItem>

            {/* stl */}
            <CarouselItem className="" key={`${players.stl_leader_name}-stealsLeader`}>
                <p className="mb-1 font-black uppercase tracking-widest text-center" style={{color: team.main_color}}>Steals per game</p>
                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${players.stl_leader_id}/${players.stl_leader_name.toLowerCase().replace(" ", "-")}`}>

                    <div className="flex items-center justify-between gap-x-2 border p-4 rounded-lg w-48 mx-auto">

                        <div className="">
                            <p className="text-xs font-bold max-w-24 truncate">{players.stl_leader_name.length > 18 ? shortenPlayerName(players.stl_leader_name) : players.stl_leader_name}</p>
                            {/* <p className="text-xs font-light">{convertPlayerPosition(players.stl_leader_position)} ⋅ #{players.stl_leader_number}</p> */}
                            <p className="text-3xl font-bold" style={{ color: team.main_color }}>{players.stl_leader_stat}</p>
                        </div>

                        <img src={players.stl_leader_photo_url} alt={players.stl_leader_name} className="h-14 object-contain" />
                    </div>
                </Link>
            </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
    </Carousel>
)

export default StatsTeamLeadersMobile