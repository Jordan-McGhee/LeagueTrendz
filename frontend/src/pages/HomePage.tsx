import React from "react";

import HomeSchedule from "../components/Desktop/HomePage/HomeSchedule";
import HomeStandings from "../components/Desktop/HomePage/HomeStandings";
import HomeHeadlines from "../components/Desktop/HomePage/HomeHeadlines";
import HomeFavorites from "../components/Desktop/HomePage/HomeFavorites";

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
                <HomeHeadlines />

                <HomeFavorites />
            </div>

        </div>
    )
}

export default HomePage