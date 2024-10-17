import React, { useState } from "react";

// type imports
import { GameHighViewProps } from "@/types";

// utils imports

// ui imports

// component imports
import GameHighCard from "../GameHighCard";

const GameHighs: React.FC<GameHighViewProps> = ({ gameLeaders, styleClass }) => {

    return (
        <div className={styleClass}>
            <GameHighCard cardClass="w-[49%]" title="Points" gameLeaderPlayers={gameLeaders.top_scoring_games} />
            <GameHighCard cardClass="w-[49%]" title="Assists" gameLeaderPlayers={gameLeaders.top_assist_games} />
            <GameHighCard cardClass="w-[49%]" title="Rebounds" gameLeaderPlayers={gameLeaders.top_rebounding_games} />
            <GameHighCard cardClass="w-[49%]" title="Steals" gameLeaderPlayers={gameLeaders.top_steal_games} />
            <GameHighCard cardClass="w-[49%]" title="Blocks" gameLeaderPlayers={gameLeaders.top_block_games} />
            <GameHighCard cardClass="w-[49%]" title="Three Pointers" gameLeaderPlayers={gameLeaders.top_tpm_games} />
        </div>
    )
}

export default GameHighs