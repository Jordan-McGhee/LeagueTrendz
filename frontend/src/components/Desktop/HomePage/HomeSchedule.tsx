import React from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../../ui/card"
import AllGames from "../../Schedule/AllGames";

// DUMMY DATA IMPORT
import games from "../../../DUMMYDATA/NBA_Scores.json"


const HomeSchedule = () => {

    return (
        <Card className="h-1/3">
            <CardHeader>
                <CardTitle>
                    NBA SCOREBOARD
                </CardTitle>

                <CardDescription>
                    TODAY'S GAMES
                </CardDescription>

            </CardHeader>

            <CardContent className="h-1/2">
                <AllGames />
            </CardContent>

            <CardFooter>
                See Full Schedule
            </CardFooter>
        </Card>
    )
}

export default HomeSchedule