import React from "react";

// type imports
import { SeasonLeadersViewProps } from "@/types";

// utils imports

// ui imports

// component imports
import LeaderCardMobile from "../../../Mobile/AllPlayersPage/LeaderCard-Mobile"

const SeasonLeadersMobile: React.FC<SeasonLeadersViewProps> = ({ averageLeaders, totalLeaders, perMode, styleClass }) => {

    return (
        <div className={styleClass}>

            {
                perMode === "average" &&
                <div className="w-full flex flex-wrap gap-y-4">
                    <LeaderCardMobile averages={true} title="Points" topStatPlayers={averageLeaders.top_avg_pts} cardClass="w-full" />
                    <LeaderCardMobile averages={true} title="Assists" topStatPlayers={averageLeaders.top_avg_ast} cardClass="w-full" />
                    <LeaderCardMobile averages={true} title="Rebounds" topStatPlayers={averageLeaders.top_avg_reb} cardClass="w-full" />
                    <LeaderCardMobile averages={true} title="Steals" topStatPlayers={averageLeaders.top_avg_stl} cardClass="w-full" />
                    <LeaderCardMobile averages={true} title="Blocks" topStatPlayers={averageLeaders.top_avg_blk} cardClass="w-full" />
                    <LeaderCardMobile averages={true} title="Field Goals" topStatPlayers={averageLeaders.top_avg_fgm} cardClass="w-full" />
                    <LeaderCardMobile averages={true} title="FG%" topStatPlayers={averageLeaders.top_avg_fg_percentage} cardClass="w-full" />
                    <LeaderCardMobile averages={true} title="3 Pointers" topStatPlayers={averageLeaders.top_avg_tpm} cardClass="w-full" />
                    <LeaderCardMobile averages={true} title="3P%" topStatPlayers={averageLeaders.top_avg_tp_percentage} cardClass="w-full" />
                    <LeaderCardMobile averages={true} title="FT%" topStatPlayers={averageLeaders.top_avg_ft_percentage} cardClass="w-full" />
                    <LeaderCardMobile averages={true} title="Personal Fouls" topStatPlayers={averageLeaders.top_avg_pf} cardClass="w-full" />
                    <LeaderCardMobile averages={true} title="Turnovers" topStatPlayers={averageLeaders.top_avg_turnovers} cardClass="w-full" />
                </div>
            }

            {
                perMode !== 'average' &&
                <div className="w-full flex flex-wrap gap-y-4">
                    <LeaderCardMobile averages={false} title="Points" topStatPlayers={totalLeaders.top_total_pts} cardClass="w-full" />
                    <LeaderCardMobile averages={false} title="Assists" topStatPlayers={totalLeaders.top_total_ast} cardClass="w-full" />
                    <LeaderCardMobile averages={false} title="Rebounds" topStatPlayers={totalLeaders.top_total_reb} cardClass="w-full" />
                    <LeaderCardMobile averages={false} title="Steals" topStatPlayers={totalLeaders.top_total_stl} cardClass="w-full" />
                    <LeaderCardMobile averages={false} title="Blocks" topStatPlayers={totalLeaders.top_total_blk} cardClass="w-full" />
                    <LeaderCardMobile averages={false} title="Field Goals" topStatPlayers={totalLeaders.top_total_fgm} cardClass="w-full" />
                    <LeaderCardMobile averages={false} title="3PTs" topStatPlayers={totalLeaders.top_total_tpm} cardClass="w-full" />
                    <LeaderCardMobile averages={false} title="Personal Fouls" topStatPlayers={totalLeaders.top_total_pf} cardClass="w-full" />
                    <LeaderCardMobile averages={false} title="Turnovers" topStatPlayers={totalLeaders.top_total_turnovers} cardClass="w-full" />
                </div>
            }
        </div>
    )
}

export default SeasonLeadersMobile