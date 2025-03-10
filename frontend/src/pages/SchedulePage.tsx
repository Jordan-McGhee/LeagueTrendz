import React, { useEffect, useState } from "react";

// hook imports
import { useFetch } from "../Hooks/useFetch";

// type imports
import { GamesDataState, GameData } from "@/types";

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card"
import { Separator } from "../components/ui/separator"

// component imports
import DatePagination from "../components/Desktop/SchedulePage/DatePagination";
import GameDayTable from "../components/Desktop/SchedulePage/GameDayTable";
import LoadingPage from "./LoadingPage"
import ErrorModal from "../components/ui/ErrorModal"


const SchedulePage = () => {

    const [selectedDate, setSelectedDate] = useState<Date>(new Date("2024-06-12T00:00:00"))
    // console.log(selectedDate.toISOString().split('T')[0]) // yyyy-mm-dd
    // console.log(selectedDate)

    const [gamesData, setGamesData] = useState<GamesDataState | undefined>()


    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/games/date/${selectedDate.toISOString().split('T')[0]}`

        let responseData: any

        const fetchGames = async () => {
            try {
                responseData = await sendRequest(url)
                setGamesData(responseData.gamesByDate)
            } catch (error) {

            }
        }

        fetchGames()

    }, [sendRequest, selectedDate])

    function formatDate(dateString: string): string {
        // console.log('Input dateString:', dateString);
        const [year, month, day] = dateString.split('-').map(Number);
        const date = new Date(year, month - 1, day);

        return new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    }

    return (
        <div className="pb-16 md:pb-8">

            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            <Card className="rounded-none md:rounded-xl">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        NBA Schedule
                    </CardTitle>

                    {/* div for date change placeholder */}
                    <DatePagination selectedDate={selectedDate} onDateChange={(newDate) => setSelectedDate(newDate)} />
                </CardHeader>

                <CardContent>

                    {/* <p>Selected Date: {selectedDate.toDateString()}</p> */}

                    {/* loading state */}
                    {isLoading && <LoadingPage />}

                    {
                        gamesData && Object.entries(gamesData).map(([date, games]) => (
                            <div key={date}>
                                <p className="md:text-lg font-semibold my-2">{formatDate(date)}</p>
                                <Separator />


                                {typeof games === 'string' ? (
                                    <p className="font-light text-sm my-2">No games scheduled.</p>
                                ) : (
                                    <GameDayTable games={games} />
                                )}
                            </div>
                        ))
                    }
                </CardContent>
                <CardFooter className="italic md:text-sm flex flex-col gap-y-2 text-left">
                    <p>This app only has game data for the <span className="font-bold">2023-24 NBA season.</span> Please use the links below to navigate to key dates.</p>
                    <p>The 2023 NBA regular season started on
                    <span className="mx-1 underline hover:cursor-pointer" onClick={() => setSelectedDate(new Date("2023-10-24T00:00:00"))}>October 24th, 2023.</span>
                    The playoffs started
                    <span className="mx-1 underline hover:cursor-pointer" onClick={() => setSelectedDate(new Date("2024-04-16T00:00:00"))}>April 16th, 2024</span>
                    and ended
                    <span className="mx-1 underline hover:cursor-pointer" onClick={() => setSelectedDate(new Date("2024-06-17T00:00:00"))}>June 17th, 2024.</span></p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default SchedulePage