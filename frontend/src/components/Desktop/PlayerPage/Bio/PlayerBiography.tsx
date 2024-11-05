import React, { useState } from "react"

// type imports
import { PlayerPageProps } from "../../../../types"

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card"
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";

// utils imports
import { convertPlayerPosition } from "../../../../Utils/utils"

// team dummy data
const teams = require("../../../../DUMMYDATA/NBA_Teams.json")

const PlayerBiography: React.FC<PlayerPageProps> = ({ player, currentTeam }) => {

    const draftTeam = teams.teams.filter((team: any) => team.team_id === player.draft.tid)

    let playerStatusSplit: string = player.status.type.split(" ")[0]

    let playerStatus

    if (playerStatusSplit === "Healthy") {
        playerStatus = (
            <div className="flex gap-x-2 items-center capitalize">
                <div className="size-4 rounded-full bg-green-500" />
                <p>Active</p>
            </div>
        )
    } else if (playerStatusSplit === "Suspended") {
        playerStatus = (
            <div className="flex gap-x-2 items-center capitalize">
                <div className="size-4 rounded-full bg-red-500" />
                <p>Suspended - {player.status.gamesRemaining} Games</p>
            </div>
        )
    } else {
        playerStatus = (
            <div className="flex gap-x-2 items-center capitalize">
                <div className="size-4 rounded-full bg-red-500" />
                <p>Out - {playerStatusSplit} ({player.status.gamesRemaining} Games)</p>
            </div>
        )
    }

    const [showContent, setShowContent] = useState<Boolean>(true)

    const toggleShowContent = () => {
        setShowContent(!showContent)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between">
                    Biography

                    <div onClick={() => toggleShowContent()} className="md:hidden flex gap-x-2 items-center">
                        <p className="text-sm">{showContent ? "Hide" : "Show"}</p>
                        {showContent ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
                    </div>
                </CardTitle>
            </CardHeader>


            {
                showContent &&

                <CardContent>

                    {/* mobile */}
                    <div className="flex flex-col gap-y-4 md:hidden text-sm">
                        {/* Team Row */}
                        <div className="grid grid-cols-3">
                            <div className="col-span-1">Team</div>
                            <div className="col-span-2 font-semibold" style={{ color: currentTeam.main_color }}>
                                {currentTeam.full_name}
                            </div>
                        </div>

                        {/* Born Row */}
                        <div className="grid grid-cols-3">
                            <div className="col-span-1">Born</div>
                            <div className="col-span-2 font-semibold" style={{ color: currentTeam.main_color }}>
                                {player.born.year} ({2024 - player.born.year})
                            </div>
                        </div>

                        {/* Experience Row */}
                        <div className="grid grid-cols-3">
                            <div className="col-span-1">Experience</div>
                            <div className="col-span-2 font-semibold" style={{ color: currentTeam.main_color }}>
                                {2024 - player.draft.year} Seasons
                            </div>
                        </div>

                        {/* Position Row */}
                        <div className="grid grid-cols-3">
                            <div className="col-span-1">Position</div>
                            <div className="col-span-2 font-semibold" style={{ color: currentTeam.main_color }}>
                                {convertPlayerPosition(player.player_position)}
                            </div>
                        </div>

                        {/* Draft Info Row */}
                        <div className="grid grid-cols-3">
                            <div className="col-span-1">Draft Info</div>
                            <div className="col-span-2 font-semibold" style={{ color: currentTeam.main_color }}>
                                {draftTeam[0].team_id === -1 ?
                                    "UNDRAFTED" :
                                    `${player.draft.year}: Rd ${player.draft.round}, Pk ${player.draft.pick} (${draftTeam[0].abbreviation || 'UNDRAFTED'})`
                                }
                            </div>
                        </div>

                        {/* HT/WT Row */}
                        <div className="grid grid-cols-3">
                            <div className="col-span-1">HT/WT</div>
                            <div className="col-span-2 font-semibold" style={{ color: currentTeam.main_color }}>
                                {player.height}, {player.weight} lbs
                            </div>
                        </div>

                        {/* College Row */}
                        <div className="grid grid-cols-3">
                            <div className="col-span-1">College</div>
                            <div className="col-span-2 font-semibold" style={{ color: currentTeam.main_color }}>
                                {player.college}
                            </div>
                        </div>

                        {/* Birthplace Row */}
                        <div className="grid grid-cols-3">
                            <div className="col-span-1">Birthplace</div>
                            <div className="col-span-2 font-semibold" style={{ color: currentTeam.main_color }}>
                                {player.born.loc}
                            </div>
                        </div>

                        {/* Status Row */}
                        <div className="grid grid-cols-3">
                            <div className="col-span-1">Status</div>
                            <div className="col-span-2 font-semibold" style={{ color: currentTeam.main_color }}>
                                {playerStatus}
                            </div>
                        </div>
                    </div>

                    {/* desktop */}
                    <div className="hidden md:flex gap-x-10">

                        {/* left side */}
                        <div className="flex text-sm">
                            <div className="flex flex-col gap-y-4 uppercase mr-4 font-semibold">
                                <p>Born</p>
                                <p>Team</p>
                                <p>Experience</p>
                                <p>Position</p>
                                <p>Status</p>
                            </div>

                            <div className="flex flex-col gap-y-4">
                                <p>{player.born.year} ({2024 - player.born.year})</p>
                                <p>{currentTeam.full_name}</p>
                                <p>{2024 - player.draft.year} Seasons</p>
                                <p>{convertPlayerPosition(player.player_position)}</p>
                                {playerStatus}
                            </div>
                        </div>

                        {/* right side */}
                        <div className="flex text-sm">
                            <div className="flex flex-col gap-y-4 uppercase mr-4 font-semibold">
                                <p>Birthplace</p>
                                <p>HT/WT</p>
                                <p>Draft Info</p>
                                <p>College</p>

                            </div>

                            <div className="flex flex-col gap-y-4">
                                <p>{player.born.loc}</p>
                                <p>{player.height}, {player.weight} lbs</p>
                                {
                                    draftTeam[0].team_id === -1 ?
                                        <p>UNDRAFTED</p>
                                        :
                                        <p>{player.draft.year}: Rd {player.draft.round}, Pk {player.draft.pick} ({draftTeam[0].abbreviation || 'UNDRAFTED'})</p>
                                }
                                <p>{player.college}</p>
                            </div>
                        </div>

                    </div>
                </CardContent>
            }
        </Card>
    )
}

export default PlayerBiography