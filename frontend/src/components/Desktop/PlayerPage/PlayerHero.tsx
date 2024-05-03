import react, { useState } from "react"
import { Link } from "react-router-dom";

// type imports
import { Player, PlayerPageProps } from "../../../types"

// ui imports
import { Button } from "../../ui/button";
import TeamLogo from "../../ui/TeamLogo"

// icon imports
import { PersonIcon } from "@radix-ui/react-icons";

// utils imports
import { convertPlayerPosition, determineSuffix } from "../../../Utils/utils"

// team data
const teams = require("../../../DUMMYDATA/NBA_Teams.json")

const PlayerHero: React.FC<PlayerPageProps> = ({ player, currentTeam, mainStats }) => {

    const draftTeam = teams.teams.filter((team: any) => team.team_id === player.draft.tid)

    let playerStatusSplit: string = player.status.type.split(" ")[0]

    let playerStatus

    if (playerStatusSplit === "Healthy") {
        playerStatus = (
            <p>Active</p>
        )
    } else if (playerStatusSplit === "Suspended") {
        playerStatus = (
            <p>Suspended - {player.status.gamesRemaining} Games</p>
        )
    } else {
        playerStatus = (
            <p>Out - {playerStatusSplit} ({player.status.gamesRemaining} Games)</p>
        )
    }

    return (
        <div>

            <div className="flex justify-between text-xs items-center">

                {/* player image and details div */}
                <div className="flex items-center gap-x-4">
                    {player.photo_url ? <img src={player.photo_url} alt="player img" className="h-24" /> : <PersonIcon className="h-24 w-24" />}

                    <div className="flex flex-col gap-y-1">
                        <p className="text-2xl uppercase">{player.name.split(' ')[0]}</p>
                        <p className="text-2xl uppercase font-bold">{player.name.split(' ').slice(1)}</p>
                        <p className="flex gap-x-1 items-center">
                            <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${currentTeam.abbreviation.toLowerCase()}`} className="flex items-center gap-x-1 hover:underline"><TeamLogo team_id={currentTeam.team_id} abbreviation={currentTeam.abbreviation} logoClass="h-6 object-contain" />{currentTeam.full_name}</Link>• #{player.jersey_number} • {convertPlayerPosition(player.player_position)}</p>
                        {/* <Button className="w-fit">Add to Favorites</Button> */}
                    </div>
                </div>

                {/* player info div */}
                <div className="flex text-sm gap-x-4">
                    <div className="flex flex-col uppercase">
                        <p>HT/WT</p>
                        <p>Born</p>
                        <p>College</p>
                        <p>Draft Info</p>
                        <p>Status</p>
                    </div>

                    <div className="flex flex-col font-semibold">
                        <p>{player.height}, {player.weight} lbs</p>
                        <p>{player.born.year} ({2024 - player.born.year}) | {player.born.loc}</p>
                        <p>{player.college}</p>
                        {
                            draftTeam[0].team_id === -1 ?
                                <p>UNDRAFTED</p>
                                :
                                <p>{player.draft.year}: Rd {player.draft.round}, Pk {player.draft.pick} ({draftTeam[0].abbreviation || 'UNDRAFTED'})</p>
                        }
                        <p className="capitalize">{playerStatus}</p>
                    </div>
                </div>


                {/* season stats & fav div */}
                <div className="flex flex-col justify-center border px-4 py-2 rounded-lg w-1/3 items-center">
                    <p className="text-xs mb-1">2023-24 SEASON STATS</p>

                    <div className="flex justify-around w-full text-sm font-light">

                        {/* points */}
                        <div className="flex flex-col items-center">
                            <p>PTS</p>
                            <p className="text-2xl font-bold"
                                style={{color: currentTeam.main_color}}
                            >{mainStats.avg_pts}</p>
                            <p>{`${mainStats.pts_rank}${determineSuffix(mainStats.pts_rank)}`}</p>
                        </div>

                        {/* rebounds */}
                        <div className="flex flex-col items-center">
                            <p>REB</p>
                            <p className="text-2xl font-bold"
                                style={{color: currentTeam.main_color}}
                            >{mainStats.avg_reb}</p>
                            <p>{`${mainStats.reb_rank}${determineSuffix(mainStats.reb_rank)}`}</p>
                        </div>

                        {/* assist */}
                        <div className="flex flex-col items-center">
                            <p>AST</p>
                            <p className="text-2xl font-bold"
                                style={{color: currentTeam.main_color}}
                            >{mainStats.avg_ast}</p>
                            <p>{`${mainStats.ast_rank}${determineSuffix(mainStats.ast_rank)}`}</p>
                        </div>

                        {/* fg% */}
                        <div className="flex flex-col items-center">
                            <p>FG%</p>
                            <p className="text-2xl font-bold"
                                style={{color: currentTeam.main_color}}
                            >{mainStats.avg_fg_percentage}</p>
                            <p>{`${mainStats.fg_rank}${determineSuffix(mainStats.fg_rank)}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerHero