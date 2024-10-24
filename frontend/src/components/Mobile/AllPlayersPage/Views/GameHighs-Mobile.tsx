import React, { useState } from "react";

// type imports
import { GameHighViewProps } from "@/types";

// utils imports

// ui imports

// component imports
import GameHighCardMobile from "../GameHighCard-Mobile";

const GameHighsMobile: React.FC<GameHighViewProps> = ({ gameLeaders, styleClass }) => {

    return (
        <div className={styleClass}>
            <GameHighCardMobile cardClass="" title="Points" gameLeaderPlayers={gameLeaders.top_scoring_games} />
            <GameHighCardMobile cardClass="" title="Assists" gameLeaderPlayers={gameLeaders.top_assist_games} />
            <GameHighCardMobile cardClass="" title="Rebounds" gameLeaderPlayers={gameLeaders.top_rebounding_games} />
            <GameHighCardMobile cardClass="" title="Steals" gameLeaderPlayers={gameLeaders.top_steal_games} />
            <GameHighCardMobile cardClass="" title="Blocks" gameLeaderPlayers={gameLeaders.top_block_games} />
            <GameHighCardMobile cardClass="" title="Three Pointers" gameLeaderPlayers={gameLeaders.top_tpm_games} />
        </div>
    )
}

export default GameHighsMobile