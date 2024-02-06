import React from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../../ui/card"

// DUMMY DATA IMPORT
import games from "../../../DUMMYDATA/NBA_Scores.json"


const HomeSchedule = () => {

    return (
        <Card className="h-1/3">
            <CardHeader>
                <CardTitle>
                    Today's Games
                </CardTitle>

                <CardDescription>
                    Feb. 5, 2024
                </CardDescription>

            </CardHeader>

            <CardContent className="h-1/2 bg-black">

            </CardContent>

            <CardFooter>
                See Full Schedule
            </CardFooter>
        </Card>
    )
}

export default HomeSchedule