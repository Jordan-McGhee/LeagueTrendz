import React from "react";

// component imports
import TeamSchedule from "../../../../components/Desktop/SingleTeamPage/TeamSchedule";

const TeamHome = () => {

    return (
        <div className="h-fit">
            <TeamSchedule />

            {/* content div */}
            <div className="flex gap-x-4 mt-4">

                {/* left side */}
                <div className="w-[60%] h-lvh bg-red-300">
                    
                </div>

                {/* right side */}
                <div className="w-[35%] h-lvh bg-blue-300">

                </div>

            </div>
        </div>
    )
}

export default TeamHome