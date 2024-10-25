import React from "react";

// ui imports
import { Separator } from "../../../../components/ui/separator";

// type imports
import { TeamHomeProps } from "../../../../types"

// component imports
import TeamSchedule from "../../../../components/Desktop/TeamPage/Home/TeamSchedule";
import Standings from "../../../../components/Desktop/TeamPage/Home/Standings"
import TeamHistory from "../../../../components/Desktop/TeamPage/Home/TeamHistory"
import TeamStats from "../../../../components/Desktop/TeamPage/Home/TeamStats";
import TeamLeaders from "../../../../components/Desktop/TeamPage/Home/TeamLeaders";

const TeamHome: React.FC<TeamHomeProps> = ({ team, games, players, history }) => {

    return (
        <div className="h-fit w-full">
            <TeamSchedule team={team} games={games} />

            {/* mobile div */}
            <div className="flex flex-col gap-y-4 mt-2 md:hidden">
                <TeamStats team={team} />
                <Standings team={team} />
                <TeamLeaders team={team} players={players} />
                <TeamHistory team={team} history={history} />
            </div>

            {/* desktop div */}
            <div className="hidden md:flex gap-x-4 mt-4 w-full">

                {/* left side */}
                <div className="w-[65%] h-fit flex flex-col gap-y-4">
                    <TeamStats team={team} />
                    <TeamLeaders team={team} players={players} />
                </div>

                {/* right side */}
                <div className="w-[35%] h-fit flex flex-col gap-y-4">
                    <Standings team={team} />
                    <TeamHistory team={team} history={history} />
                </div>

            </div>
        </div>
    )
}

export default TeamHome