import React from "react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/card";

const HomePage = () => {

    return (

        // full content div
        <div className="flex h-full bg-blue-500 py-4 px-4">
            
            {/* left side */}
            <div className="bg-gray-500 h-full w-3/4 flex flex-col">

                {/* games/sched div */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Today's Games
                        </CardTitle>

                        <CardDescription>
                            Feb. 5, 2024
                        </CardDescription>

                    </CardHeader>

                    <CardContent>

                    </CardContent>

                    <CardFooter>
                        See Full Schedule
                    </CardFooter>
                </Card>

                {/* standings div */}
                <div>

                </div>

            </div>

            {/* right side */}
            <div className="bg-red-500 h-full w-1/4">
                
            </div>

        </div>
    )
}

export default HomePage