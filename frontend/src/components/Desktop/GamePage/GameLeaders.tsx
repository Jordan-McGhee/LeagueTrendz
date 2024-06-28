import React, { useState } from "react"
import { Link } from "react-router-dom"

// type imports

// utils imports

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../ui/card"
import { Separator } from "../../ui/separator"
import { Menubar, MenubarMenu, MenubarTrigger } from "../../ui/menubar"

const GameLeaders = () => {

    const [statShown, setStatShown] = useState<'points' | 'rebounds' | 'assists'>("points")

    const handleMenuClick = (option: 'points' | 'rebounds' | 'assists') => {
        setStatShown(option)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Game Leaders</CardTitle>

                <Menubar className="w-full mx-auto">

                    <MenubarMenu>
                        <MenubarTrigger
                            style={statShown === "points" ? { backgroundColor: "black", color: "white" } : {}}
                            onClick={() => handleMenuClick('points')}
                            className="w-1/3"
                        >
                            Points
                        </MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger
                            style={statShown === "rebounds" ? { backgroundColor: "black", color: "white" } : {}}
                            onClick={() => handleMenuClick('rebounds')}
                            className="w-1/3"
                        >
                            Rebounds
                        </MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger
                            style={statShown === "assists" ? { backgroundColor: "black", color: "white" } : {}}
                            onClick={() => handleMenuClick('assists')}
                            className="w-1/3"
                        >
                            Assists
                        </MenubarTrigger>
                    </MenubarMenu>
                </Menubar>
                
            </CardHeader>
            <CardContent>

                {
                    statShown === "points" &&
                    <div className="flex flex-col gap-y-4">

                        <div className="flex gap-x-4 items-center">

                            {/*  home leader */}

                            {/* <img /> */}
                            <div className="size-10 rounded-full bg-red-600" />

                            <div>
                                <p>Name, Position - TEAM</p>
                                <div className="flex gap-x-4">
                                    {/* stat one */}
                                    <div className="flex gap-x-1">
                                        <p className="font-bold">21</p>
                                        <p>PTS</p>
                                    </div>

                                    {/* stat two */}
                                    <div className="flex gap-x-1">
                                        <p className="font-bold">10/16</p>
                                        <p>FG</p>
                                    </div>

                                    {/* stat three */}
                                    <div className="flex gap-x-1">
                                        <p className="font-bold">0/1</p>
                                        <p>FT</p>
                                    </div>

                                </div>
                            </div>

                        </div>
                            <Separator className="w-3/4" />

                            {/* away leader */}

                    </div>
                }

            </CardContent>
            <CardFooter className="font-bold text-blue-600">
                <Link to={``}>
                    Full Box Score
                </Link>
            </CardFooter>
        </Card>
    )
}

export default GameLeaders