import React from "react";
import { Link } from "react-router-dom";

// type import
import { Team } from "../../../types"

// ui import
import TeamLogo from "../../ui/TeamLogo"
import { Card } from "../../ui/card"

const TeamItem = (props: { team: Team }) => {

    const teamPageUrl = `${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${props.team.abbreviation.toLowerCase()}`

    return (
        <Link to={teamPageUrl}>
            <Card className="flex items-center mb-4 p-4 min-h-18 min-w-48 hover:scale-105" key={props.team.team_id}>

                <TeamLogo team_id={props.team.team_id} abbreviation={props.team.abbreviation} logoClass="w-12 h-12 object-contain mr-4" />

                <div className="w-full">
                    <Link
                        to={teamPageUrl}
                        className="text-xl font-semibold"
                        
                        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            if (e.target instanceof HTMLElement) {
                                e.target.style.color = props.team.main_color;
                            }
                        }}
                        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            if (e.target instanceof HTMLElement) {
                                e.target.style.color = 'black';
                            }
                        }}
                    >
                        {props.team.full_name}
                    </Link>

                    {/* link div */}
                    <div className="flex justify-between w-2/3 max-w-36 text-xs gap-x-2">
                        <Link
                            to={teamPageUrl + '/stats'}
                            className="hover:font-semibold hover:scale-110"
                        >
                            Stats
                        </Link>
                        <Link
                            to={teamPageUrl + '/schedule'}
                            className="hover:font-semibold hover:scale-110"
                        >
                            Schedule
                        </Link>
                        <Link
                            to={teamPageUrl + '/roster'}
                            className="hover:font-semibold hover:scale-110"
                        >
                            Roster
                        </Link>
                    </div>
                </div>
            </Card>
        </Link>
    )
}

export default TeamItem