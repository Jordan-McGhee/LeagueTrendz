import React from "react";
import { useState } from "react";

// ui imports
import { Card, CardContent} from "../../../components/ui/card"

// component imports
import PlayerHero from "../../../components/Desktop/PlayerPage/PlayerHero";
import PlayerMenuBar from "../../../components/Desktop/PlayerPage/PlayerMenubar";

// view imports
import Overview from "./Views/Overview";
import PlayerStatsView from "./Views/PlayerStatsView";
import PlayerBio from "./Views/PlayerBio";

const PlayerPage = () => {

    type MenuItem = "overview" | "stats" | "bio" | "splits" | "log"

    const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem>('overview')

    const handleMenuClick = (menuOption: MenuItem) => {
        setSelectedMenuItem(menuOption)
    }



    return (
        <div className="h-fit min-h-screen">
            <Card className="p-4">
                <PlayerHero />
                <PlayerMenuBar onMenuChange={handleMenuClick} />

                <CardContent className="p-0">
                    { selectedMenuItem === "overview" && <Overview />}
                    { selectedMenuItem === "stats" && <PlayerStatsView />}
                    { selectedMenuItem === "bio" && <PlayerBio />}
                    { selectedMenuItem === "splits" && <p>splits</p>}
                    { selectedMenuItem === "log" && <p>log</p>}
                </CardContent>
            </Card>
        </div>
    )
}

export default PlayerPage