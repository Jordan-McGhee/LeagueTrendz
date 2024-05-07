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
                <CardTitle>
                    2023-24 Team Stats
                </CardTitle>
            </CardHeader>

            <CardContent>

                <div className="flex justify-between">

                    {/* points per game */}
                    <div className="text-center flex flex-col gap-y-2">
                        <p className="text-sm">Points Per Game</p>
                        <p className="font-black text-5xl" style={{color: team.main_color}}>{team.avg_pts}</p>
                        <p className="font-bold">#{team.pts_rank} in the NBA</p>
                    </div>

                    {/* rebounds per game */}
                    <div className="text-center flex flex-col gap-y-2">
                        <p className="text-sm">Rebounds Per Game</p>
                        <p className="font-black text-5xl" style={{color: team.main_color}}>{team.avg_reb}</p>
                        <p className="font-bold">#{team.reb_rank} in the NBA</p>
                    </div>

                    {/* assists per game */}
                    <div className="text-center flex flex-col gap-y-2">
                        <p className="text-sm">Assists Per Game</p>
                        <p className="font-black text-5xl" style={{color: team.main_color}}>{team.avg_ast}</p>
                        <p className="font-bold">#{team.ast_rank} in the NBA</p>
                    </div>

                </div>

            </CardContent>

            <CardFooter className="text-sm font-semibold text-blue-700">
                <Link to={"/standings"}>
                    See All Team Stats
                </Link>
            </CardFooter>
        </Card>
    )
}

export default TeamStats