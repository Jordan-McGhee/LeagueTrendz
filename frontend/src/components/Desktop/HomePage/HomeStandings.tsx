import React from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../../ui/card"

// DUMMY DATA IMPORT
import teams from "../../../DUMMYDATA/NBA_Teams.json"

const HomeStandings = () => {

    return (
        <Card className="h-2/3">
            <CardHeader>
                <CardTitle>
                    NBA Standings 2023-24
                </CardTitle>

                <CardDescription>
                    League | Conference | Division
                </CardDescription>

            </CardHeader>

            <CardContent className="h-3/4 bg-black">

            </CardContent>

            <CardFooter>
                
            </CardFooter>
        </Card>
    )
}

export default HomeStandings