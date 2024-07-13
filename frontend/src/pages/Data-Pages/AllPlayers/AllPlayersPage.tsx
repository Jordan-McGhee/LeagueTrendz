import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"

// hook imports
import { useFetch } from "../../../Hooks/useFetch";

// type imports

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card"
import { Menubar, MenubarMenu, MenubarTrigger } from "../../../components/ui/menubar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"

// component imports
import TeamLogo from "../../../components/ui/TeamLogo"
import ErrorModal from "../../../components/ui/ErrorModal"
import LoadingPage from "../../LoadingPage"

// views imports
import SeasonLeadersView from "./Views/SeasonLeadersView";
import GameLeadersView from "./Views/GameLeadersView";

// season leaders (avg & total)
// table

const AllPlayersPage = () => {

    // menubar item 
    const [isRegularSeason, setIsRegularSeason] = useState<boolean>(true)
    const [selectedMenuItem, setSelectedMenuItem] = useState<'leaders' | 'highs' | 'tables'>('leaders')

    const handleMenuClick = (option: 'leaders' | 'highs' | 'tables') => {
        setSelectedMenuItem(option)
    }

    let cardTitle: string

    if (selectedMenuItem === 'leaders') {
        cardTitle = `${isRegularSeason ? "Regular Season" : "Playoffs"} Leaders`
    } else if (selectedMenuItem === 'highs') {
        cardTitle = `${isRegularSeason ? "Regular Season" : "Playoffs"} Highs`
    } else {
        cardTitle = `${isRegularSeason ? "Regular Season" : "Playoffs"} Stats`
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="mb-4">
                    <p className="text-2xl">{cardTitle}</p>

                    {/* select for regular season */}
                </CardTitle>

                <Menubar>

                    <MenubarMenu>
                        <MenubarTrigger
                            style={selectedMenuItem === "leaders" ? { backgroundColor: "black", color: "white" } : {}}
                            onClick={() => handleMenuClick('leaders')}
                            className="w-1/3">
                            Leaders
                        </MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger
                            style={selectedMenuItem === "highs" ? { backgroundColor: "black", color: "white" } : {}}
                            onClick={() => handleMenuClick('highs')}
                            className="w-1/3">
                            Game Highs
                        </MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger
                            style={selectedMenuItem === "tables" ? { backgroundColor: "black", color: "white" } : {}}
                            onClick={() => handleMenuClick('tables')}
                            className="w-1/3">
                            All Stats
                        </MenubarTrigger>
                    </MenubarMenu>

                </Menubar>

            </CardHeader>
            <CardContent>
                { selectedMenuItem === "leaders" && <SeasonLeadersView />}
                { selectedMenuItem === "highs" && <GameLeadersView />}
                { selectedMenuItem === "tables" && <SeasonLeadersView />}
            </CardContent>
        </Card>
    )
}

export default AllPlayersPage