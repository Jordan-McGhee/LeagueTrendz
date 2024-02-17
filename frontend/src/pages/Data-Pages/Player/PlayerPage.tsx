import React from "react";
import { useState } from "react";

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button";
import { Menubar, MenubarMenu, MenubarTrigger } from "../../../components/ui/menubar"

// component imports
import PlayerHero from "../../../components/Desktop/PlayerPage/PlayerHero";

const PlayerPage = () => {

    return (
        <div className="h-fit min-h-screen">
            <PlayerHero />
        </div>
    )
}

export default PlayerPage