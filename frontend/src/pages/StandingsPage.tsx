import React, { useState } from "react";

// component imports
import StandingsContent from "../components/Desktop/StandingsPage/StandingsContent";
import ExpandedStandingsContent from "../components/Desktop/StandingsPage/ExpandedStandingsContent"
import DivisionStandingsContent from "../components/Desktop/StandingsPage/DivisionStandingsContent";

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select"

const StandingsPage = () => {

    const [view, setView] = useState<string>("standings")

    const selectViewHandler = (value: string) => {
        setView(value)
    }

    return (
        <div className="h-fit min-h-lvh pb-24 md:pb-8">
            <Card>
                <CardHeader className="">
                    <CardTitle className="text-3xl font-bold flex justify-between">
                        NBA '23-24 Standings

                        <div className="hidden md:block">
                            <Select value={view} onValueChange={(newValue) => selectViewHandler(newValue)}>
                                <SelectTrigger className="w-[300px]">
                                    <SelectValue placeholder="Change Standings View" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="standings">Standard View</SelectItem>
                                    <SelectItem value="expanded">Expanded View</SelectItem>
                                    <SelectItem value="division">Division View</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    {view === "standings" && <StandingsContent />}
                    {view === "expanded" && <ExpandedStandingsContent />}
                    {view === "division" && <DivisionStandingsContent />}
                </CardContent>

                <CardFooter>
                    <div className="w-full pt-2">
                        {/* Standings are updated with the completion of each game. */}

                        {/* DESKTOP GLOSSARY */}
                        <div className="hidden text-sm mt-4 md:flex justify-between">

                            <div>
                                <p><span className="font-bold">W:</span> Wins</p>
                                <p><span className="font-bold">L:</span> Losses</p>
                                <p><span className="font-bold">PCT:</span> Win Percentage</p>
                                <p><span className="font-bold">GB:</span> Games Behind League Leader</p>
                            </div>

                            <div>
                                <p><span className="font-bold">HOME:</span> Home Record</p>
                                <p><span className="font-bold">AWAY:</span> Away Record</p>
                                <p><span className="font-bold">PPG:</span> Points Per Game</p>
                                <p><span className="font-bold">OPP PPG:</span> Opponent Points Per Game</p>
                            </div>

                            <div>
                                <p><span className="font-bold">DIFF:</span> Average Point Differential</p>
                                <p><span className="font-bold">STRK:</span> Current Streak</p>
                                <p><span className="font-bold">L10:</span> Record in Last 10 Games</p>
                            </div>
                        </div>

                        {/* mobile glossary */}

                        <div className="md:hidden">

                            <div>
                                <p><span className="font-bold">W:</span> Wins</p>
                                <p><span className="font-bold">L:</span> Losses</p>
                                <p><span className="font-bold">PCT:</span> Win Percentage</p>
                                <p><span className="font-bold">GB:</span> Games Behind League Leader</p>
                                <p><span className="font-bold">L10:</span> Record in Last 10 Games</p>
                            </div>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default StandingsPage