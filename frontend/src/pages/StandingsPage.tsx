import React from "react";
// import { useState } from "react";

// component imports
import StandingsContent from "../components/Desktop/StandingsPage/StandingsContent";

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card"


// dummy imports
const teams = require("../DUMMYDATA/NBA_Teams.json")

const StandingsPage = () => {

    return (
        <div className="h-full min-h-lvh">
            <Card>
                <CardHeader className="">
                    <CardTitle className="text-3xl font-bold">
                        NBA Standings 2023-24
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <StandingsContent />
                </CardContent>

                <CardFooter>
                    <div className="w-full pt-2">
                        Standings are updated with the completion of each game.

                        {/* GLOSSARY */}
                        <div className="text-sm mt-4 flex justify-between">

                            <div>
                                <p><span className="font-bold">W:</span> Wins</p>
                                <p><span className="font-bold">L:</span> Losses</p>
                                <p><span className="font-bold">PCT:</span> Win Percentage</p>
                                <p><span className="font-bold">GB:</span> Games Back</p>
                                <p><span className="font-bold">HOME:</span> Home Record</p>
                            </div>

                            <div>
                                <p><span className="font-bold">AWAY:</span> Away Record</p>
                                <p><span className="font-bold">PPG:</span> Points Per Game</p>
                                <p><span className="font-bold">OPP PPG:</span> Opponent Points Per Game</p>
                                <p><span className="font-bold">DIFF:</span> Average Point Differential</p>
                                <p><span className="font-bold">STRK:</span> Current Streak</p>
                            </div>

                            <div>
                                <p><span className="font-bold">Y --:</span> Clinched Division</p>
                                <p><span className="font-bold">E --:</span> Eliminated From Playoffs</p>
                                <p><span className="font-bold">X --:</span> Clinched Playoff Berth</p>
                            </div>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default StandingsPage