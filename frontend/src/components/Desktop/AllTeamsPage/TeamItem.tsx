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
            <Card className="flex items-center mb-4 p-4 min-h-18 min-w-48 hover:scale-105">

                <TeamLogo team_id={props.team.team_id} abbreviation={props.team.abbreviation} logoClass="size-9 md:w-12 md:h-12 object-contain mr-4" />

                <div className="w-full">
                    <Link
                        to={`${teamPageUrl}?view=home`}
                        className="text-lg md:text-xl font-semibold truncate"

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
                    <div className="flex items-center justify-between w-2/3 max-w-36 md:text-xs gap-x-2">
                        <Link
                            to={`${teamPageUrl}?view=stats`}
                            className="hover:font-semibold hover:scale-110"
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
                            Stats
                        </Link>
                        <Link
                            to={`${teamPageUrl}?view=schedule`}
                            className="hover:font-semibold hover:scale-110"
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
                            Schedule
                        </Link>
                        <Link
                            to={`${teamPageUrl}?view=roster`}
                            className="hover:font-semibold hover:scale-110"
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
                            Roster
                        </Link>
                    </div>
                </div>
            </Card>
        </Link>
    )
}

export default TeamItem