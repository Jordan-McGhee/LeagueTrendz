import React, { useState, useEffect } from "react";

// type imports
import { HomePlayer } from "@/types";

// utils imports

// ui imports

// hook imports
import { useFetch } from "../Hooks/useFetch";

// component imports
import HomeHeader from "../components/Desktop/HomePage/HomeHeader";
import HomeStandings from "../components/Desktop/HomePage/HomeStandings";
import HomePlayers from "../components/Desktop/HomePage/HomePlayers";
import HomeAwardWinners from "../components/Desktop/HomePage/HomeAwardWinners";
import LoadingPage from "./LoadingPage";

const HomePage = () => {

    const [popularPlayers, setPopularPlayers] = useState<HomePlayer[] | undefined>()
    const [awardWinners, setAwardWinners] = useState<HomePlayer[] | undefined>()

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch popular players from database
    useEffect(() => {

        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/players/home`

        let responseData: any

        const fetchPopularPlayers = async () => {
            try {
                responseData = await sendRequest(url)
                console.log(responseData)
                setPopularPlayers(responseData.popularPlayers)
                setAwardWinners(responseData.awardWinners)
            } catch (error) {

            }
        }

        fetchPopularPlayers()

    }, [sendRequest])

    return (
        <>
            {isLoading && <LoadingPage />}

            {!isLoading &&

                <div>


                    {/* desktop */}
                    <div className="hidden md:flex gap-x-4 h-full">

                        {/* left side */}
                        <div className="h-full w-[70%] flex flex-col gap-y-4">

                            {/* games/sched div */}
                            <HomeHeader players={awardWinners} />

                            {/* standings div */}
                            <HomeStandings />



                        </div>

                        {/* right side */}
                        <div className=" h-full w-[30%] flex flex-col gap-y-4">
                            <HomePlayers players={popularPlayers} />

                            <HomeAwardWinners players={awardWinners} />
                        </div>

                    </div>

                    {/* mobile */}
                    <div className="md:hidden flex flex-col gap-y-4 w-full">
                        <HomeHeader players={awardWinners} />
                    </div>
                </div>
            }
        </>
    )
}

export default HomePage