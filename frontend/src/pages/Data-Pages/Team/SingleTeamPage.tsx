import React from "react";
// import { useState } from "react";

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "../../../components/ui/menubar"

// component imports
import TeamHome from "./Views/TeamHome";


// menu item type
// type MenuItem = "home" | "stats" | "schedule" | "roster" | "injuries"

const SingleTeamPage = () => {

    // const [ selectedMenuItem, setSelectedMenuItem ] = useState('home')

    return (
        <div className="h-fit">
            <Card>
                <CardHeader>

                    <div className="flex items-center gap-x-4 mb-4">

                        {/* logo placeholder */}
                        <div className="bg-red-700 h-24 w-24 rounded-full" />

                        <div className="flex flex-col gap-y-2">
                            <CardTitle className="text-2xl font-light">ATLANTA <span className="font-bold">HAWKS</  span></CardTitle>

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
                            <MenubarTrigger>Home</MenubarTrigger>
                        </MenubarMenu>

                        <MenubarMenu>
                            <MenubarTrigger>Stats</MenubarTrigger>
                        </MenubarMenu>

                        <MenubarMenu>
                            <MenubarTrigger>Schedule</MenubarTrigger>
                        </MenubarMenu>

                        <MenubarMenu>
                            <MenubarTrigger>Roster</MenubarTrigger>
                        </MenubarMenu>

                        <MenubarMenu>
                            <MenubarTrigger>Injuries</MenubarTrigger>
                        </MenubarMenu>

                    </Menubar>


                </CardHeader>

                <CardContent>
                    <TeamHome />
                </CardContent>
            </Card>
        </div>
    )
}

export default SingleTeamPage