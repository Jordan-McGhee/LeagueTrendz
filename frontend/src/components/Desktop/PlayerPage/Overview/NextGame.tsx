import React from "react";

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card"

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
        </Card>
    )
}

export default NextGame