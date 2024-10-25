import { Link } from "react-router-dom"

// type imports
import { TeamPageProps } from "@/types"

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../ui/card"

// component imports
import TeamStatsContent from "./TeamStatsContent"

// mobile component imports
import TeamStatsContentMobile from "../../../Mobile/TeamPage/Home/TeamStats-Mobile"

const TeamStats: React.FC<TeamPageProps> = ({ team }) => {

    return (
        <>
            {/* mobile */}
            <TeamStatsContentMobile team={team} />

            {/* desktop */}
            <TeamStatsContent team={team} />
        </>
    )
}

export default TeamStats