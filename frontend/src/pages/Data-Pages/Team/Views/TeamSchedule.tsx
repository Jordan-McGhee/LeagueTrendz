import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

// hooks import
import { useFetch } from "../../../../Hooks/useFetch"

// type imports
import { TeamPageProps, TeamScheduleObject } from "../../../../types"

// component imports
import LoadingPage from "../../../LoadingPage";
import ErrorModal from "../../../../components/ui/ErrorModal"
import TeamScheduleTable from "../../../../components/Desktop/TeamPage/Schedule/TeamScheduleTable"

// mobile component imports
import TeamScheduleTableMobile from "../../../../components/Mobile/TeamPage/Schedule/TeamScheduleTable-Mobile"

const TeamSchedule: React.FC<TeamPageProps> = ({ team }) => {

    const teamsMissedPlayoffs = [2, 3, 8, 10, 14, 24, 26, 27, 28, 29]

    const [schedule, setSchedule] = useState<TeamScheduleObject[] | undefined>()
    const [showPlayoffs, setShowPlayoffs] = useState<boolean>(false)

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch schedule from database
    useEffect(() => {

        let url: string

        // check if team missed playoffs and change url if there is no possible playoff data
        if (teamsMissedPlayoffs.includes(team.team_id)) {
            url = `${process.env.REACT_APP_BACKEND_URL}/nba/teams/${team.team_id}/schedule-regular`
        } else {
            url = `${process.env.REACT_APP_BACKEND_URL}/nba/teams/${team.team_id}/schedule-${showPlayoffs ? "playoffs" : "regular"}`
        }

        let responseData: any

        const fetchSchedule = async () => {
            try {
                responseData = await sendRequest(url)
                setSchedule(responseData.schedule)
            } catch (error) {

            }
        }

        fetchSchedule()
    }, [team, showPlayoffs, sendRequest])

    const selectHandler = (value: string) => {
        if (value === "playoffs") {
            setShowPlayoffs(true)
        } else {
            setShowPlayoffs(false)
        }
    }

    return (
        <>
            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {isLoading && <LoadingPage />}

            {schedule &&

                <>

                    {/* mobile */}
                    <TeamScheduleTableMobile team={team} showPlayoffs={showPlayoffs} schedule={schedule} selectHandler={selectHandler} tableClass="block md:hidden" />

                    {/* desktop */}
                    <TeamScheduleTable team={team} showPlayoffs={showPlayoffs} schedule={schedule} selectHandler={selectHandler} tableClass="hidden md:block" />
                </>
            }
        </>
    )
}

export default TeamSchedule