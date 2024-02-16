const TeamLeaders = () => {

    return (
        <div>
            <p className="text-lg font-semibold">Team Leaders</p>

            {/* team leaders div */}
            <div className="w-full flex grow justify-between my-2 text-sm">

                {/* points */}
                <div className="p-4 border">
                    <p className="mb-1 font-semibold">Points</p>

                    <div className="flex items-center gap-x-2">

                        <div className="">
                            <p className="text-xs font-regular">Trae Young <span className="font-light">PG #11</span></p>
                            <p className="text-3xl font-semibold">26.7</p>
                        </div>

                        <div className="bg-red-700 h-12 w-12 rounded-full" />
                    </div>
                </div>

                {/* rebounds */}
                <div className="p-4 border">
                    <p className="mb-1 font-semibold">Rebounds</p>

                    <div className="flex items-center gap-x-2">

                        <div className="">
                            <p className="text-xs font-regular">Clint Capela<span className="font-light">C #15</span></p>
                            <p className="text-3xl font-semibold">10.6</p>
                        </div>

                        <div className="bg-red-700 h-12 w-12 rounded-full" />
                    </div>
                </div>

                {/* points */}
                <div className="p-4 border">
                    <p className="mb-1 font-semibold">Assists</p>

                    <div className="flex items-center gap-x-2">

                        <div className="">
                            <p className="text-xs font-regular">Trae Young <span className="font-light">PG #11</span></p>
                            <p className="text-3xl font-semibold">10.9</p>
                        </div>

                        <div className="bg-red-700 h-12 w-12 rounded-full" />
                    </div>
                </div>

                {/* points */}
                <div className="p-4 border">
                    <p className="mb-1 font-semibold">Steals</p>

                    <div className="flex items-center gap-x-2">

                        <div className="">
                            <p className="text-xs font-regular">Trae Young <span className="font-light">PG #11</span></p>
                            <p className="text-3xl font-semibold">1.4</p>
                        </div>

                        <div className="bg-red-700 h-12 w-12 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamLeaders