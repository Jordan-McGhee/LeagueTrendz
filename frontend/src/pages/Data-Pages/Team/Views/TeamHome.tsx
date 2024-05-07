import React from "react";

// ui imports
import { Separator } from "../../../../components/ui/separator";

// component imports
import TeamSchedule from "../../../../components/Desktop/SingleTeamPage/TeamSchedule";
import TeamStandings from "../../../../components/Desktop/PlayerPage/Overview/OverviewTeamStandings";
import TeamStats from "../../../../components/Desktop/SingleTeamPage/TeamStats";
import TeamInjuries from "../../../../components/Desktop/SingleTeamPage/TeamInjuries";
import TeamLeaders from "../../../../components/Desktop/SingleTeamPage/TeamLeaders";

const TeamHome = () => {

    return (
        <div className="h-fit">
            <TeamSchedule />

            {/* content div */}
            <div className="flex gap-x-4 mt-4">

                {/* left side */}
                <div className="w-[60%] h-lvh flex flex-col gap-y-4">
                    <TeamStats />
                    <TeamLeaders />
                </div>

                {/* right side */}
                <div className="w-[35%] h-lvh flex flex-col gap-y-4">
                    {/* <TeamStandings /> */}

                    <TeamInjuries />
                </div>

            </div>
        </div>
    )
}

export default TeamHome