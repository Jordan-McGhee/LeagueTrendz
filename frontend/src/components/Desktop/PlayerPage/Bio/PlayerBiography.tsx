// type imports
import { PlayerPageProps } from "../../../../types"

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card"

// team dummy data
const teams = require("../../../../DUMMYDATA/NBA_Teams.json")

const PlayerBiography: React.FC<PlayerPageProps> = ({ player, currentTeam }) => {

    const draftTeam = teams.teams.filter((team: any) => team.team_id === player.draft.tid + 1)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Biography</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="flex gap-x-10">

                    {/* left side */}
                    <div className="flex text-sm">
                        <div className="flex flex-col gap-y-4 uppercase mr-4 font-semibold">
                            <p>Team</p>
                            <p>Born</p>
                            <p>Experience</p>
                            <p>Position</p>
                            <p>Draft Info</p>
                        </div>

                        <div className="flex flex-col gap-y-4">
                            <p>{currentTeam.full_name}</p>
                            <p>{player.born.year} ({2024 - player.born.year})</p>
                            <p>{2024 - player.draft.year} Seasons</p>
                            <p>{player.player_position}</p>
                            <p>{player.draft.year}: Rd {player.draft.round}, Pk {player.draft.pick} ({draftTeam[0].abbreviation})</p>
                        </div>
                    </div>

                    {/* right side */}
                    <div className="flex text-sm">
                        <div className="flex flex-col gap-y-4 uppercase mr-4 font-semibold">
                            <p>HT/WT</p>
                            <p>College</p>
                            <p>Birthplace</p>
                            <p>Status</p>
                        </div>

                        <div className="flex flex-col gap-y-4">
                            <p>{player.height}, {player.weight} lbs</p>
                            <p>{player.college}</p>
                            <p>{player.born.loc}</p>
                            <p className="flex gap-x-2 items-center capitalize">
                                <div className="size-4 rounded-full bg-green-500" />
                                {player.status}
                            </p>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}

export default PlayerBiography