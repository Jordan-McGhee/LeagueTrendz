import React, { useEffect, useState } from "react";

// hook imports
import { useFetch } from "../Hooks/useFetch";

// type imports
import { GamesDataState, GameData } from "@/types";

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { Separator } from "../components/ui/separator"

// component imports
import DatePagination from "../components/Desktop/SchedulePage/DatePagination";
import GameDayTable from "../components/Desktop/SchedulePage/GameDayTable";
import LoadingPage from "./LoadingPage"
import ErrorModal from "../components/ui/ErrorModal"


const SchedulePage = () => {

    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    console.log(selectedDate.toISOString().split('T')[0]) // yyyy-mm-dd

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
        console.log('Input dateString:', dateString);
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
        <div>

            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            <Card className="">
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
                                <p className="text-lg font-semibold my-2">{formatDate(date)}</p>
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
            </Card>
        </div>
    )
}

export default SchedulePage