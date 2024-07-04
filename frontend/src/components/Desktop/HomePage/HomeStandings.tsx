import React from "react";

// ui imports
import { Card, CardContent, CardHeader, CardTitle} from "../../ui/card"

// component imports
import StandingsContentHome from "./Home-Standings/StandingsContentHome";

// DUMMY DATA IMPORT
import teams from "../../../DUMMYDATA/NBA_Teams.json"

const HomeStandings = () => {

    return (
        <Card className="h-2/3">
            <CardHeader>
                <CardTitle>
                    NBA Standings 2023-24
                </CardTitle>

            </CardHeader>

            <CardContent>
                <StandingsContentHome />
            </CardContent>
        </Card>
    )
}

export default HomeStandings