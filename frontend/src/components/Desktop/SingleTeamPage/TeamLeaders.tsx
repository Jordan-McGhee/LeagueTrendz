import { Link } from "react-router-dom"

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../ui/card"
import { Separator } from "../../ui/separator"

const TeamLeaders = () => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    2023-24 Team Leaders
                </CardTitle>
            </CardHeader>

            <CardContent>

                <div className="flex justify-between">
                    {/* offense */}
                    <div className="flex flex-col gap-y-4 w-1/2">

                        <p className="font-bold text-2xl">Offense</p>

                        {/* points */}
                        <div className="text-sm">
                            <p className="mb-2 font-bold ">Points Per Game</p>
                            <div className="flex items-center">
                                <div className="bg-red-500 h-12 w-12 rounded-full mr-2" />

                                {/* player info div */}
                                <div>
                                    <p>Trae Young <span className="font-light">PG #11</span></p>
                                    <p className="text-2xl font-bold">27.0</p>
                                </div>

                            </div>

                        </div>

                        <Separator className="w-4/5" />

                        {/* assists */}

                        <div className="text-sm">
                            <p className="mb-2 font-bold ">Assists Per Game</p>
                            <div className="flex items-center">
                                <div className="bg-red-500 h-12 w-12 rounded-full mr-2" />

                                {/* player info div */}
                                <div>
                                    <p>Trae Young <span className="font-light">PG #11</span></p>
                                    <p className="text-2xl font-bold">10.9</p>
                                </div>

                            </div>
                            
                        </div>

                        <Separator className="w-4/5" />

                        {/* fg% */}

                        <div className="text-sm">
                            <p className="mb-2 font-bold ">Field Goal Percentage</p>
                            <div className="flex items-center">
                                <div className="bg-red-500 h-12 w-12 rounded-full mr-2" />

                                {/* player info div */}
                                <div>
                                    <p>Onyeka Okongwu <span className="font-light">F #17</span></p>
                                    <p className="text-2xl font-bold">61.0</p>
                                </div>

                            </div>
                            
                        </div>

                    </div>


                    {/* defense */}

                    <div className="flex flex-col gap-y-4 w-1/2">

                        <p className="font-bold text-2xl">Defense</p>

                        {/* steals */}
                        <div className="text-sm">
                            <p className="mb-2 font-bold ">Steals Per Game</p>
                            <div className="flex items-center">
                                <div className="bg-red-500 h-12 w-12 rounded-full mr-2" />

                                {/* player info div */}
                                <div>
                                    <p>Trae Young <span className="font-light">PG #11</span></p>
                                    <p className="text-2xl font-bold">1.4</p>
                                </div>

                            </div>

                        </div>

                        <Separator className="w-4/5" />

                        {/* blocks */}

                        <div className="text-sm">
                            <p className="mb-2 font-bold ">Blocks Per Game</p>
                            <div className="flex items-center">
                                <div className="bg-red-500 h-12 w-12 rounded-full mr-2" />

                                {/* player info div */}
                                <div>
                                    <p>Clint Capela <span className="font-light">C #15</span></p>
                                    <p className="text-2xl font-bold">1.5</p>
                                </div>

                            </div>
                            
                        </div>

                        <Separator className="w-4/5" />

                        {/* rebounds */}

                        <div className="text-sm">
                            <p className="mb-2 font-bold ">Rebounds Per Game</p>
                            <div className="flex items-center">
                                <div className="bg-red-500 h-12 w-12 rounded-full mr-2" />

                                {/* player info div */}
                                <div>
                                    <p>Clint Capela <span className="font-light">C #15</span></p>
                                    <p className="text-2xl font-bold">10.6</p>
                                </div>

                            </div>
                            
                        </div>


                    </div>

                </div>

            </CardContent>

            <CardFooter className="text-sm font-semibold text-blue-700">
                <Link to="/standings">
                    See Full Team Stats
                </Link>
            </CardFooter>
        </Card>
    )
}

export default TeamLeaders