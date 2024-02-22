// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card"

// dummy data
const data = require("../../../../DUMMYDATA/NBA_Roster.json")

// type
type Player = {
    id: number,
    name: string,
    number: number,
    position: string
}

type Team = Player[]

const roster: Team = data.lineup

const PlayerSelect = (props: Player) => {

    return (
        <div className="flex items-center gap-x-4 w-full py-2" key={props.id}>
            <div className="size-12 rounded-full bg-red-500" />
            <div>
                <p>{props.name}</p>
                <div className="flex gap-x-1 text-sm font-light">
                    <p>{props.number}</p>
                    <p>{props.position}</p>
                </div>
            </div>
        </div>
    )
}

const SwitchPlayer = () => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Switch Player</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="flex flex-col divide-y">
                    { roster.map((player: Player) => (
                        <PlayerSelect
                            id={player.id}
                            name={player.name}
                            number={player.number}
                            position={player.position}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default SwitchPlayer