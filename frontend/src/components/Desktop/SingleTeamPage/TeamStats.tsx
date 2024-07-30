import { Link } from "react-router-dom"

// type imports
import { TeamPageProps } from "@/types"

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../ui/card"
import { Separator } from "../../ui/separator"

const TeamStats: React.FC<TeamPageProps> = ({ team }) => {

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between">
                    2023-24 Team Stats

                    <Link to={`/nba/teams/${team.abbreviation.toLowerCase()}?view=stats`} className="font-semibold text-blue-700">
                        See All Team Stats
                    </Link>
                </CardTitle>
            </CardHeader>

            <CardContent>

                <div className="flex justify-between">

                    {/* points per game */}
                    <div className="text-center flex flex-col gap-y-2">
                        <p className="">Points Per Game</p>
                        <p className="font-black text-6xl" style={{ color: team.main_color }}>{team.avg_pts}</p>
                        <p className="font-bold text-lg">#{team.pts_rank} in the NBA</p>
                    </div>

                    {/* rebounds per game */}
                    <div className="text-center flex flex-col gap-y-2">
                        <p className="">Rebounds Per Game</p>
                        <p className="font-black text-6xl" style={{ color: team.main_color }}>{team.avg_reb}</p>
                        <p className="font-bold text-lg">#{team.reb_rank} in the NBA</p>
                    </div>

                    {/* assists per game */}
                    <div className="text-center flex flex-col gap-y-2">
                        <p className="">Assists Per Game</p>
                        <p className="font-black text-6xl" style={{ color: team.main_color }}>{team.avg_ast}</p>
                        <p className="font-bold text-lg">#{team.ast_rank} in the NBA</p>
                    </div>

                </div>

            </CardContent>

        </Card>
    )
}

export default TeamStats