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

const PlayerHeroMobile: React.FC<PlayerPageProps> = ({ player, currentTeam, mainStats }) => {

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
        <div className="flex flex-col gap-y-4 md:hidden">

            {/* player image and details div */}
            <div className="grid grid-cols-5 gap-x-2 items-center">
                <div className="col-span-2">
                    {player.photo_url ?
                        <div className="flex -space-x-24 items-center overflow-hidden">
                            {player.team_id !== -1 && <TeamLogo team_id={currentTeam.team_id} abbreviation={currentTeam.abbreviation} logoClass="size-24 object-contain opacity-40 z-0 relative" />}
                            <img src={player.photo_url} alt={player.name} className="h-24 z-0 relative" />
                        </div>
                        :
                        <PersonIcon className="size-24 object-contain" />
                    }
                </div>

                <div className="col-span-3 flex flex-col gap-y-0.5">
                    <p className="text-xl uppercase">{player.name.split(' ')[0]}</p>
                    <p className={player.name.split(' ').slice(1).join(" ").length > 10 ? "text-lg font-bold uppercase" : "text-2xl uppercase font-bold"}>{player.name.split(' ').slice(1).join(" ")}</p>
                    <p className="flex gap-x-1 items-center">
                        {
                            currentTeam.team_id >= 0 ?
                                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${currentTeam.abbreviation.toLowerCase()}`} className="flex items-center gap-x-1 font-bold" style={{ color: currentTeam.main_color }}>
                                    <TeamLogo team_id={currentTeam.team_id} abbreviation={currentTeam.abbreviation} logoClass="h-6 object-contain" />{currentTeam.abbreviation}
                                </Link>
                                :
                                'Retired/Waived'
                        }
                        • #{player.jersey_number} • {convertPlayerPosition(player.player_position)}</p>
                    {/* <Button className="w-fit">Add to Favorites</Button> */}
                </div>
            </div>

            {/* bio div */}
            <div className="flex justify-between gap-x-1.5 uppercase text-xs">
                <div className="flex flex-col gap-y-1">
                    <p className="flex gap-x-1 font-thin">HT/WT<span className="font-bold" style={{ color: currentTeam.main_color }}>{player.height}, {player.weight}</span></p>
                    <p className="flex gap-x-1 font-thin">COLLEGE<span className="font-bold" style={{ color: currentTeam.main_color }}>{player.college}</span></p>
                </div>
                <div className="flex flex-col gap-y-1">
                    <p className="flex gap-x-1 font-thin">DRAFT<span className="font-bold" style={{ color: currentTeam.main_color }}>{
                        draftTeam[0].team_id === -1 ?
                            <p>UNDRAFTED</p>
                            :
                            <p>{player.draft.year}: Rd {player.draft.round}, Pk {player.draft.pick} ({draftTeam[0].abbreviation || 'UNDRAFTED'})</p>
                    }</span></p>

                    <p className="flex gap-x-1 font-thin">BORN<span className="font-bold" style={{ color: currentTeam.main_color }}>{player.born.year} ({new Date().getFullYear() - player.born.year}) | {player.born.loc}</span></p>
                </div>
                {/* <p className="flex gap-x-1 font-thin">STATUS<span className="font-bold" style={{ color: currentTeam.main_color }}>{playerStatus}</span></p> */}
            </div>



            {/* season stats */}

            {
                mainStats ?
                    <div className="flex flex-col justify-center border px-4 py-2 rounded-lg w-full items-center">
                        <p className="text-xs mb-2 tracking-widest font-black" style={{ color: currentTeam.main_color }}>2023-24 REGULAR SEASON STATS</p>

                        <div className="flex justify-around w-full text-sm font-light">

                            {/* points */}
                            <div className="flex flex-col items-center">
                                <p>PTS</p>
                                <p className="text-2xl font-bold"
                                    style={{ color: currentTeam.main_color }}
                                >{mainStats.avg_pts}</p>
                                <p>{`${mainStats.pts_rank}${determineSuffix(mainStats.pts_rank)}`}</p>
                            </div>

                            {/* rebounds */}
                            <div className="flex flex-col items-center">
                                <p>REB</p>
                                <p className="text-2xl font-bold"
                                    style={{ color: currentTeam.main_color }}
                                >{mainStats.avg_reb}</p>
                                <p>{`${mainStats.reb_rank}${determineSuffix(mainStats.reb_rank)}`}</p>
                            </div>

                            {/* assist */}
                            <div className="flex flex-col items-center">
                                <p>AST</p>
                                <p className="text-2xl font-bold"
                                    style={{ color: currentTeam.main_color }}
                                >{mainStats.avg_ast}</p>
                                <p>{`${mainStats.ast_rank}${determineSuffix(mainStats.ast_rank)}`}</p>
                            </div>

                            {/* fg% */}
                            <div className="flex flex-col items-center">
                                <p>FG%</p>
                                <p className="text-2xl font-bold"
                                    style={{ color: currentTeam.main_color }}
                                >{mainStats.avg_fg_percentage}</p>
                                <p>{`${mainStats.fg_rank}${determineSuffix(mainStats.fg_rank)}`}</p>
                            </div>
                        </div>
                    </div>


                    :

                    <div className="border px-4 py-2 rounded-lg w-full h-24 flex font-semibold">
                        <p className="mx-auto self-center text-lg">No 2023-24 stats to display</p>
                    </div>

            }
        </div>
    )
}

export default PlayerHeroMobile