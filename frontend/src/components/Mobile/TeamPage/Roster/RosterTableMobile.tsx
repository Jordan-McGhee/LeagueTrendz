import React from "react";
import { Link } from "react-router-dom";

// type imports
import { Player, Team } from "@/types"

// utils imports
import { convertPlayerPosition, shortenPlayerName } from "../../../../Utils/utils";

// ui imports
import { Card } from "../../../ui/card"

const RosterTableItem = ({ player, teamColor }: { player: Player, teamColor: string }) => {

    return (
        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player.player_id}/${player.name.toLowerCase().replace(" ", "-")}`}>
            <Card className="flex items-center gap-x-4 p-2">

                {/* left side image */}
                <img src={player.photo_url} alt={player.name} className="size-20 object-contain" />

                {/* right side */}
                <div style={{ color: teamColor }}>
                    <p className="font-bold">{player.name.length > 20 ? shortenPlayerName(player.name) : player.name}</p>
                    <p className="text-sm flex font-semibold"><span className="font-thin mr-1 text-black">AGE</span>{player.age}<span className="font-thin ml-1 text-black">#</span>{player.jersey_number}<span className="font-thin mx-1 text-black">POS</span>{convertPlayerPosition(player.player_position)}</p>
                    <p className="uppercase text-sm flex gap-x-1 w-full"><span className="font-thin text-black">COLLEGE</span>{player.college}</p>
                    {/* <p className="uppercase text-xs flex gap-x-1"><span className="font-thin">HT</span>{player.height} <span className="font-thin">WT</span>{player.weight}</p> */}
                </div>

            </Card>
        </Link>
    )
}

const RosterTableMobile = ({ team, roster, className }: { team: Team, roster: Player[], className: string }) => {

    return (
        <div className={className}>
            <p className="font-bold text-lg mb-2">'23-24 Roster</p>

            <div className="flex flex-col gap-y-2">

                {
                    roster.map((player) => (
                        <RosterTableItem player={player} teamColor={team.main_color} key={`${player.player_id} - ${player.name}`} />
                    ))
                }

                <p className="text-sm font-bold mt-4">Coach: <span className="font-light">{team.head_coach}</span></p>
            </div>
        </div>
    )
}

export default RosterTableMobile