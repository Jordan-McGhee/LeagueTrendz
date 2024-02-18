import React from "react";
import { useState } from "react";

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button";
import { Menubar, MenubarMenu, MenubarTrigger } from "../../../components/ui/menubar"

// views imports
import TeamHome from "./Views/TeamHome";
import Roster from "./Views/Roster";
import Stats from "./Views/Stats"


const SingleTeamPage = () => {

    // menu item type
    type MenuItem = "home" | "stats" | "schedule" | "roster" | "injuries"

    const [ selectedMenuItem, setSelectedMenuItem ] = useState<MenuItem>('home')

    const handleMenuClick = (option: MenuItem) => {
        setSelectedMenuItem(option)
    }

    return (
        <div className="h-fit min-h-svh">
            <Card>
                <CardHeader>

                    <div className="flex items-center gap-x-4 mb-4">

                        {/* logo placeholder */}
                        <div className="bg-red-700 h-24 w-24 rounded-full" />

                        <div className="flex flex-col gap-y-2">
                            <div>
                                <CardTitle className="text-2xl font-light">ATLANTA <span className="font-bold">HAWKS</span></CardTitle>
                            </div>

                            {/* team info div */}
                            <div className="flex items-center gap-x-2 text-sm">
                                <Button>Add to Favorites</Button>
                                <p>24-29</p>
                                <p>|</p>
                                <p>3rd in Southeast Division</p>
                            </div>
                        </div>

                    </div>

                    {/* menubar */}
                    <Menubar className="w-fit">
                        <MenubarMenu>
                            <MenubarTrigger onClick = {() => handleMenuClick('home')}>Home</MenubarTrigger>
                        </MenubarMenu>

                        <MenubarMenu>
                            <MenubarTrigger onClick = {() => handleMenuClick('stats')}>Stats</MenubarTrigger>
                        </MenubarMenu>

                        <MenubarMenu>
                            <MenubarTrigger onClick = {() => handleMenuClick('schedule')}>Schedule</MenubarTrigger>
                        </MenubarMenu>

                        <MenubarMenu>
                            <MenubarTrigger onClick = {() => handleMenuClick('roster')}>Roster</MenubarTrigger>
                        </MenubarMenu>

                        <MenubarMenu>
                            <MenubarTrigger onClick = {() => handleMenuClick('injuries')}>Injuries</MenubarTrigger>
                        </MenubarMenu>

                    </Menubar>


                </CardHeader>

                <CardContent>
                    { selectedMenuItem === "home" && <TeamHome />}
                    { selectedMenuItem === "stats" && <Stats />}
                    {/* { selectedMenuItem === "schedule" && <TeamHome />} */}
                    { selectedMenuItem === "roster" &&<Roster />}
                    {/* { selectedMenuItem === "injuries" && <TeamHome />} */}
                    
                </CardContent>
            </Card>
        </div>
    )
}

export default SingleTeamPage