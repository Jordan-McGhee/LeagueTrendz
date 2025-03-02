import React, { useState, useEffect } from "react";

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"

// component imports
import DivisionList from "../components/Desktop/AllTeamsPage/DivisionList";
import LoadingPage from "./LoadingPage";
import ErrorModal from "../components/ui/ErrorModal";

// type imports
import { Team, AllTeamsState } from "../types"

// hook import
import { useFetch } from "../Hooks/useFetch";

// DUMMY IMPORT
const teams = require("../DUMMYDATA/NBA_Teams.json")

const AllTeamsPage = () => {

    // data state
    const [data, setData] = useState<AllTeamsState | undefined>()

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    useEffect(() => {

        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/teams/division`

        let responseData: any

        const fetchTeams = async () => {

            try {
                responseData = await sendRequest(url)

                setData(responseData)
                // console.log(responseData)
            } catch (error) {

            }
        }

        fetchTeams()
    }, [])

    return (
        <div className="pb-16 md:pb-8">

            {/* error modal */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {/* unable to query for teams for whatever reason */}
            {/* {!data && <ErrorModal error errorMessage="Couldn't get all the teams in the NBA. Please try again!" onClear={clearError} />} */}

            {/* loading state */}
            {isLoading && <LoadingPage />}

            {
                data &&
                <Card className="rounded-none md:rounded-xl">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            NBA Teams
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="">

                        {/* mobile */}
                        <div className="flex flex-col md:hidden gap-y-8 md:gap-y-2">

                            <p className="font-black">EASTERN CONFERENCE</p>

                            {/* EASTERN CONFERENCE */}
                            <DivisionList division="Atlantic" teams={data.atlantic} />

                            <DivisionList division="Central" teams={data.central} />

                            <DivisionList division="Southeast" teams={data.southeast} />

                            <p className="font-black">WESTERN CONFERENCE</p>

                            {/* WESTERN CONFERENCE */}
                            <DivisionList division="Northwest" teams={data.northwest} />

                            <DivisionList division="Pacific" teams={data.pacific} />

                            <DivisionList division="Southwest" teams={data.southwest} />
                        </div>

                        {/* desktop */}
                        <div className="hidden md:block">
                            {/* EASTERN CONFERENCE */}
                            <div className="w-full flex justify-between px-4 mb-4">
                                <DivisionList division="Atlantic" teams={data.atlantic} />

                                <DivisionList division="Central" teams={data.central} />

                                <DivisionList division="Southeast" teams={data.southeast} />
                            </div>


                            {/* WESTERN CONFERENCE */}

                            <div className="w-full flex justify-between px-4">
                                <DivisionList division="Northwest" teams={data.northwest} />

                                <DivisionList division="Pacific" teams={data.pacific} />

                                <DivisionList division="Southwest" teams={data.southwest} />
                            </div>
                        </div>


                    </CardContent>
                </Card>

            }

        </div>
    )
}

export default AllTeamsPage