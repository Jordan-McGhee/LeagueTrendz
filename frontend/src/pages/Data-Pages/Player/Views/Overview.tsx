import React from "react";

// type imports
import { PlayerPageProps } from "../../../../types";

// component imports
import NextGame from "../../../../components/Desktop/PlayerPage/Overview/NextGame";
import OverviewPlayerStats from "../../../../components/Desktop/PlayerPage/Overview/OverviewPlayerStats";
import OverviewRecentGames from "../../../../components/Desktop/PlayerPage/Overview/OverviewRecentGames"
import TeamStandings from "../../../../components/Desktop/SingleTeamPage/TeamStandings";
import SwitchPlayer from "../../../../components/Desktop/PlayerPage/Overview/SwitchPlayer";

const Overview: React.FC<PlayerPageProps> = ({ player, currentTeam}) => {

    return (
        // full content div
        <div className="flex justify-between gap-x-4 h-fit mt-4">

            {/* left side */}
            <div className="w-[65%] flex flex-col gap-y-4">
                <NextGame />

                <OverviewPlayerStats />

                <OverviewRecentGames />
            </div>

            {/* right side */}
            <div className="w-[35%] flex flex-col gap-y-4">
                <SwitchPlayer player = { player } currentTeam = {currentTeam} />

                {/* <TeamStandings /> */}
            </div>
        </div>
    )
}

export default Overview