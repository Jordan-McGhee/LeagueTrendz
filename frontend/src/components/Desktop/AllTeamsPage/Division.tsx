import React from "react";

type Team = {
    team_id: number,
    name: string,
    abbreviation: string,
    league_id: number,
    description: string,
    record: string,
    conference: string,
    division: string
}

const Division = (props: { division: string, teams: Team[] }) => {

    return (
        <div className="border pr-12">
            <p className="mb-2 text-xl font-bold">{ props.division }</p>

            {/* teams div */}
            <div>

                { props.teams.map((team) => (
                    
                    <div className="flex items-center mb-4">
                        {/* icon placeholder */}
                        <div className="bg-red-500 h-16 w-16 mr-2"/>

                        <div>
                            <p>{team.name}</p>

                            {/* link div */}
                            <div className="flex text-xs gap-x-2">
                                <p>Stats</p>
                                <p>Schedule</p>
                                <p>Roster</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Division