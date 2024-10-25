import React from "react"
import { Link } from "react-router-dom"

// type imports
import { TeamPlayersProps } from "../../../../types"

// utils imports
import { convertPlayerPosition, shortenPlayerName } from "../../../../Utils/utils"

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card"
import { Separator } from "../../../ui/separator"

// component imports
import TeamLeadersContent from "./TeamLeadersContent"

// mobile component imports
import TeamLeadersContentMobile from "../../../Mobile/TeamPage/Home/TeamLeaders-Mobile"

const TeamLeaders: React.FC<TeamPlayersProps> = ({ team, players }) => {

    return (
        <>
            {/* mobile */}
            <TeamLeadersContentMobile team={team} players={players} />

            {/* desktop */}
            <TeamLeadersContent team={team} players={players} />
        </>
    )
}

export default TeamLeaders