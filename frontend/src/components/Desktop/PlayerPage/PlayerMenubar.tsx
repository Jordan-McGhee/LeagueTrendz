import React from "react";

// ui imports
import { Menubar, MenubarMenu, MenubarTrigger } from "../../ui/menubar"

type MenuItem = "overview" | "stats" | "bio" | "splits" | "log"

type PlayerMenuProps = {
    onMenuChange: (menuOption: MenuItem) => void
}

const PlayerMenuBar:React.FC<PlayerMenuProps> = ( { onMenuChange }) => {

    const handleMenuClick = (menuOption: MenuItem) => {
        onMenuChange(menuOption)
    }

    return (
        <Menubar className="w-fit mt-4">
            <MenubarMenu>
                <MenubarTrigger onClick={() => handleMenuClick('overview')} >Overview</MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger onClick={() => handleMenuClick('stats')} >Stats</MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger onClick={() => handleMenuClick('bio')} >Bio</MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger onClick={() => handleMenuClick('splits')} >Splits</MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger onClick={() => handleMenuClick('log')} >Game Log</MenubarTrigger>
            </MenubarMenu>
        </Menubar>
    )
}

export default PlayerMenuBar