import React from "react";

const SingleGame = () => {

    return (

        // content div
        <div className="flex flex-col items-center text-xs text-center border px-4 p-2">

            {/* date & logo */}
            <div className="flex gap-x-2">
                <p>2/9</p>
                <div className="bg-red-500 w-4 h-4" />
            </div>

            {/* vs/@ and team abbreviation */}
            <p className="my-1">@ PHI</p>

            <p><span className="text-green-600">W</span> 127-121</p>

        </div>
    )
}


const TeamSchedule = () => {

    let scheduleArray = Array(8).fill(" ")


    return (
        <div>
            <p className="font-bold mb-2">2023-24 Schedule</p>
            <div className="flex">
                { scheduleArray.map((index: number) =>
                    <SingleGame />
                )}

                <div className="flex flex-col justify-center items-center px-7 py-2 border">
                    <p>See</p>
                    <p>More</p>
                </div>
            </div>
        </div>
    )
}

export default TeamSchedule