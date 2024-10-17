import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom"

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
import LeadersTableView from "./Views/LeadersTableView";
import BoxScoresTableView from "./Views/BoxScoresTableView";

// season leaders (avg & total)
// table

const AllPlayersPage = () => {

    // grab query params from url if any
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const view = queryParams.get('view');
    const navigate = useNavigate()

    // menubar item 
    const [isRegularSeason, setIsRegularSeason] = useState<boolean>(true)
    const [selectedMenuItem, setSelectedMenuItem] = useState<string>('leaders')

    // update menubar state based on query param
    useEffect(() => {
        if (view) {
            setSelectedMenuItem(view);
        }
    }, [view]);

    const handleMenuClick = (option: string) => {
        setSelectedMenuItem(option)
        navigate(`/nba/players?view=${option}`)
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
                
                <Menubar className="">

                    <MenubarMenu>
                        <MenubarTrigger
                            style={selectedMenuItem === "leaders" ? { backgroundColor: "black", color: "white" } : {}}
                            onClick={() => handleMenuClick('leaders')}
                            className="w-1/4">
                            Leaders
                        </MenubarTrigger>
                    </MenubarMenu>


                    <MenubarMenu>
                        <MenubarTrigger
                            style={selectedMenuItem === "tables" ? { backgroundColor: "black", color: "white" } : {}}
                            onClick={() => handleMenuClick('tables')}
                            className="w-1/4">
                            Stats Table
                        </MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger
                            style={selectedMenuItem === "highs" ? { backgroundColor: "black", color: "white" } : {}}
                            onClick={() => handleMenuClick('highs')}
                            className="w-1/4">
                            Game Highs
                        </MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger
                            style={selectedMenuItem === "box" ? { backgroundColor: "black", color: "white" } : {}}
                            onClick={() => handleMenuClick('box')}
                            className="w-1/4">
                            Box Scores Table
                        </MenubarTrigger>
                    </MenubarMenu>

                </Menubar>

            </CardHeader>
            <CardContent>
                {selectedMenuItem === "leaders" && <SeasonLeadersView />}
                {selectedMenuItem === "tables" && <LeadersTableView />}
                {selectedMenuItem === "highs" && <GameLeadersView />}
                {selectedMenuItem === "box" && <BoxScoresTableView />}
            </CardContent>
        </Card>
    )
}

export default AllPlayersPage