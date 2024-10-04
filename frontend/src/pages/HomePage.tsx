import React from "react";

// component imports
import HomeSchedule from "../components/Desktop/HomePage/HomeSchedule";
import HomeStandings from "../components/Desktop/HomePage/HomeStandings";
import HomePlayers from "../components/Desktop/HomePage/HomePlayers";

const HomePage = () => {

    return (

        // full content div
        <div className="flex p-4 gap-x-4 h-full">

            {/* left side */}
            <div className="h-full w-[70%] flex flex-col justify-between gap-y-4">

                {/* games/sched div */}
                <HomeSchedule />

                {/* standings div */}
                <HomeStandings />



            </div>

            {/* right side */}
            <div className=" h-full w-[30%] flex flex-col justify-between gap-y-4">
                <HomePlayers />
            </div>

        </div>
    )
}

export default HomePage