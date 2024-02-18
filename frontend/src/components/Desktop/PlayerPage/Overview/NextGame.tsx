import React from "react";

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card"

import NextGameTable from "./NextGameTable";

const NextGame = () => {

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between">
                        <p>Next Game</p>
                        <p>See Full Splits</p>
                    </div>
                </CardTitle>
            </CardHeader>

            <CardContent>

                <div>
                    {/* next team data/time div */}

                    {/* stats vs that team div */}

                    {/* table for splits */}
                    <NextGameTable />
                </div>

            </CardContent>
        </Card>
    )
}

export default NextGame