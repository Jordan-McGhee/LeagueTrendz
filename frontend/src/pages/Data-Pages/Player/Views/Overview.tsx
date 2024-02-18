import React from "react";

import NextGame from "../../../../components/Desktop/PlayerPage/Overview/NextGame";

const Overview = () => {

    return (
        // full content div
        <div className="flex justify-between gap-x-4 h-fit mt-4">

            {/* left side */}
            <div className="w-[65%] flex flex-col gap-y-4">
                <NextGame />
            </div>

            {/* right side */}
            <div className="w-[35%]">
                <div className="h-screen bg-blue-200" />
            </div>
        </div>
    )
}

export default Overview