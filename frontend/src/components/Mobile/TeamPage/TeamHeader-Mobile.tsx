import React from "react";
import { useNavigate } from "react-router-dom";

// type imports
import { TeamExpanded } from "@/types";

// utils imports

// ui imports
import { CardTitle } from "../../../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import TeamLogo from "../../../components/ui/TeamLogo"

// team dummy data imports
const teams = require("../../../DUMMYDATA/NBA_Teams.json")

const TeamHeaderMobile = ({ team, abbreviation, selectedMenuItem, className }: { team: TeamExpanded, abbreviation: string | undefined, selectedMenuItem: string, className: string }) => {

    const navigate = useNavigate()

    const teamSelectHandler = (value: string) => {
        navigate(`/nba/teams/${value.toLowerCase()}?view=${selectedMenuItem}`)
    }

    // team name consts
    let teamNameFirst: string | undefined, teamNameLast: string | undefined

    // assigning these variables for displying the team name up top
    // special cases for golden state, LAC, LAL, NYK, NOP, OKC, SAS and portland because their team names are 3 words long

    // golden state, NY, NOP, SAS, LAL, OKC cases
    if (team?.team_id === 9 || team?.team_id === 12 || team?.team_id === 13 || team?.team_id === 18 || team?.team_id === 19 || team?.team_id === 20 || team?.team_id === 26) {
        teamNameFirst = [team.full_name.split(' ')[0], team.full_name.split(' ')[1]].join(' ')
        teamNameLast = team.full_name.split(' ')[2]
    } else if (team?.team_id === 24) {
        // portland case
        teamNameFirst = team.full_name.split(' ')[0]
        teamNameLast = [team.full_name.split(' ')[1], team.full_name.split(' ')[2]].join(' ')
    } else {
        teamNameFirst = team?.full_name.split(' ')[0]
        teamNameLast = team?.full_name.split(' ')[1]
    }

    return (
        <div className={className}>
            <div className="flex items-center gap-x-2">

                {/* logo placeholder */}
                <TeamLogo team_id={team.team_id} abbreviation={team.abbreviation} logoClass="size-20 object-contain" />

                <CardTitle className="text-2xl font-light uppercase">{teamNameFirst} <p style={{ color: team.main_color }} className="font-bold">{teamNameLast}</p></CardTitle>

            </div>

            {/* team info div */}
            <div className="flex items-center justify-between uppercase text-sm">

                <div className="text-center">
                    <p className="font-light text-xs">Conference</p>
                    <p className="font-bold" style={{ color: team.main_color }}>{team.conference}</p>
                </div>

                <div className="text-center">
                    <p className="font-light text-xs">Division</p>
                    <p className="font-bold" style={{ color: team.main_color }}>{team.division}</p>
                </div>

                <div className="text-center">
                    <p className="font-light text-xs">RECORD</p>
                    <p className="font-bold" style={{ color: team.main_color }}>{team.wins}-{team.losses}</p>
                </div>
            </div>


            {/* SELECT A DIFFERENT TEAM */}
            <Select value={abbreviation} onValueChange={(newValue) => teamSelectHandler(newValue)}>
                <SelectTrigger className="w-full mb-2">
                    <SelectValue placeholder='Change NBA Teams' />
                </SelectTrigger>
                <SelectContent className="z-10">
                    {
                        teams.teams.map((team: any) => {

                            if (team.team_id >= 0) {

                                return (
                                    <SelectItem value={team.abbreviation.toLowerCase()}>{team.name}</SelectItem>
                                )
                            }

                            return null

                        })
                    }
                </SelectContent>
            </Select>
        </div>
    )
}

export default TeamHeaderMobile