import { useState, useEffect } from "react"

// hook import
import { useFetch } from "../../../../Hooks/useFetch"

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card"
import ErrorModal from "../../../ui/ErrorModal"
import { Skeleton } from "../../../ui/skeleton"

// type imports
import { PlayerPageProps, Player } from "../../../../types"

// component imports
import SwitchPlayerItem from "./SwichPlayerItem"

const SwitchPlayer: React.FC<PlayerPageProps> = ({ player, currentTeam }) => {

    type Roster = Player[]

    const [roster, setRoster] = useState<Roster>([])

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch roster
    // fetch roster from database
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/teams/${currentTeam.team_id}/roster`

        let responseData: any

        const fetchRoster = async () => {
            try {
                responseData = await sendRequest(url)
                setRoster(responseData.roster)
            } catch (error) {

            }
        }

        fetchRoster()
    }, [currentTeam, player, sendRequest])

    return (

        <div>
            {/* error */}
            < ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle>Switch Player</CardTitle>
                    <p className="font-bold" style={{ color: currentTeam.main_color }}>{currentTeam.abbreviation}</p>
                </CardHeader>

                {isLoading && <Skeleton />}

                {roster &&
                    <CardContent>
                        <div className="flex flex-col divide-y">
                            {roster.map((teammate: Player) => {
                                if (teammate.player_id !== player.player_id) {
                                    return (
                                        <SwitchPlayerItem
                                            player={teammate}
                                        />
                                    )
                                }
                            })}
                        </div>
                    </CardContent>
                }
            </Card>

        </div>

    )
}

export default SwitchPlayer