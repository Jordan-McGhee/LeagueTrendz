import { Link } from "react-router-dom"

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../ui/card"
import { Separator } from "../../ui/separator"

const TeamStats = () => {

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
                    <div className="text-center">
                        <p className="font-black text-3xl">121.7</p>
                        <p className="font-light text-sm">Points Per Game</p>
                        <p className="text-red-700 font-bold">#2 in the NBA</p>
                    </div>

                    {/* rebounds per game */}
                    <div className="text-center">
                        <p className="font-black text-3xl">44.9</p>
                        <p className="font-light text-sm">Rebounds Per Game</p>
                        <p className="text-red-700 font-bold">#17 in the NBA</p>
                    </div>

                    {/* assists per game */}
                    <div className="text-center">
                        <p className="font-black text-3xl">26.3</p>
                        <p className="font-light text-sm">Assists Per Game</p>
                        <p className="text-red-700 font-bold">#12 in the NBA</p>
                    </div>

                </div>

            </CardContent>

            <CardFooter className="text-sm font-semibold text-blue-700">
                <Link to = "/standings">
                    See All Team Stats
                </Link>
            </CardFooter>
        </Card>
    )
}

export default TeamStats