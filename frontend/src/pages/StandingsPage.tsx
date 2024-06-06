import React, { useState } from "react";

// component imports
import StandingsContent from "../components/Desktop/StandingsPage/StandingsContent";
import ExpandedStandingsContent from "../components/Desktop/StandingsPage/ExpandedStandingsContent"
import DivisionStandingsContent from "../components/Desktop/StandingsPage/DivisionStandingsContent";

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select"


// dummy imports
const teams = require("../DUMMYDATA/NBA_Teams.json")

const StandingsPage = () => {

    const [view, setView] = useState<string>("standings")

    const selectViewHandler = (value: string) => {
        setView(value)
    }

    return (
        <div className="h-full min-h-lvh">
            <Card>
                <CardHeader className="">
                    <CardTitle className="text-3xl font-bold flex justify-between">
                        NBA Standings 2023-24
                        
                        <Select value={view} onValueChange={(newValue) => selectViewHandler(newValue)}>
                            <SelectTrigger className="w-[300px]">
                                <SelectValue placeholder = "Change Standings View" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="standings">Standard View</SelectItem>
                                <SelectItem value="expanded">Expanded View</SelectItem>
                                <SelectItem value="division">Division View</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    { view === "standings" && <StandingsContent />}
                    { view === "expanded" && <ExpandedStandingsContent />}
                    { view === "division" && <DivisionStandingsContent />}
                </CardContent>

                <CardFooter>
                    <div className="w-full pt-2">
                        {/* Standings are updated with the completion of each game. */}

                        {/* GLOSSARY */}
                        <div className="text-sm mt-4 flex justify-between">

                            <div>
                                <p><span className="font-bold">W:</span> Wins</p>
                                <p><span className="font-bold">L:</span> Losses</p>
                                <p><span className="font-bold">PCT:</span> Win Percentage</p>
                                <p><span className="font-bold">GB:</span> Games Behind</p>
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