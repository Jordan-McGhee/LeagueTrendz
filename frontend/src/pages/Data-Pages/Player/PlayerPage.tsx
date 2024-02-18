import React from "react";
import { useState } from "react";

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button";
import { Menubar, MenubarMenu, MenubarTrigger } from "../../../components/ui/menubar"

// component imports
import PlayerHero from "../../../components/Desktop/PlayerPage/PlayerHero";
import PlayerMenuBar from "../../../components/Desktop/PlayerPage/PlayerMenubar";
import Overview from "./Views/Overview";

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
                    { selectedMenuItem === "stats" && <p>stats</p>}
                    { selectedMenuItem === "bio" && <p>bio</p>}
                    { selectedMenuItem === "splits" && <p>splits</p>}
                    { selectedMenuItem === "log" && <p>log</p>}
                </CardContent>
            </Card>
        </div>
    )
}

export default PlayerPage