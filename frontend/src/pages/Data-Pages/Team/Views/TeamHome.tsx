import React from "react";

// ui imports
import { Separator } from "../../../../components/ui/separator";

// type imports
import { TeamHomeProps } from "../../../../types"

// component imports
import TeamSchedule from "../../../../components/Desktop/TeamPage/TeamSchedule";
import Standings from "../../../../components/Desktop/TeamPage/Standings"
import TeamHistory from "../../../../components/Desktop/TeamPage/TeamHistory"
import TeamStats from "../../../../components/Desktop/TeamPage/TeamStats";
import TeamLeaders from "../../../../components/Desktop/TeamPage/TeamLeaders";

const TeamHome: React.FC<TeamHomeProps> = ({ team, games, players, history }) => {

    return (
        <div className="h-fit w-full">
            <TeamSchedule team={team} games={games} />

            {/* content div */}
            <div className="flex gap-x-4 mt-4 w-full">

                {/* left side */}
                <div className="w-[60%] h-fit flex flex-col gap-y-4">
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