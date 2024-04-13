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
                    <div className="flex items-center justify-around w-4/5 mx-auto mb-2">

                        {/* team 1 */}
                        <div className="flex items-center gap-x-4">
                            <div className="text-right">
                                <p>Raptors</p>
                                <p className="text-xs">19-36</p>
                            </div>

                            <div className="size-12 rounded-full bg-red-500" />
                        </div>

                        {/* date time */}
                        <div className="text-center text-sm font-bold">
                            <p>2/23</p>
                            <p>7:30 PM EST</p>
                        </div>

                        {/* team 2 */}
                        <div className="flex items-center gap-x-4">

                            <div className="size-12 rounded-full bg-red-500" />
                            <div className="text-left">
                                <p>Hawks</p>
                                <p className="text-xs">24-31</p>
                            </div>
                        </div>

                    </div>

                    {/* stats vs that team div */}

                    <div className="flex justify-between my-4">

                        {/* points div */}
                        <div className="text-center border rounded-lg py-3 px-6 w-[23%]">
                            <p className="text-xs">PPG VS TOR</p>
                            <p className="text-3xl font-bold text-red-700">34.3</p>
                        </div>

                        {/* assists div */}
                        <div className="text-center border rounded-lg py-3 px-6 w-[23%]">
                            <p className="text-xs">APG VS TOR</p>
                            <p className="text-3xl font-bold text-red-700">13.3</p>
                        </div>

                        {/* 3P% div */}
                        <div className="text-center border rounded-lg py-3 px-6 w-[23%]">
                            <p className="text-xs">3P% VS TOR</p>
                            <p className="text-3xl font-bold text-red-700">42.9</p>
                        </div>

                        {/* FG% div */}
                        <div className="text-center border rounded-lg py-3 px-6 w-[23%]">
                            <p className="text-xs">FG% VS TOR</p>
                            <p className="text-3xl font-bold text-red-700">46.3</p>
                        </div>

                    </div>

                    {/* table for splits */}
                    <NextGameTable />
                </div>

            </CardContent>
        </Card>
    )
}

export default NextGame