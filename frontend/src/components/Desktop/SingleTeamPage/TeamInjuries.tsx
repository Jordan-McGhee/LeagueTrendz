// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../ui/card"

type Player = {
    name: string,
    position: string,
    number: number,
    status: string
}

const InjuredPlayer = (props: Player) => {

    return (
        <div className="flex items-center gap-x-4 border-y py-2 text-sm">
            {/* image */}
            <div className="bg-red-600 h-14 w-14 rounded-full" />

            {/* player info */}
            <div>
                <div className="flex gap-x-1">
                    <p className="font-semibold">{props.name}</p>
                    <p>{props.position}</p>
                    <p>#{props.number}</p>
                </div>

                <p className="text-red-700 uppercase font-semibold">{props.status}</p>
            </div>
        </div>
    )
}

const TeamInjuries = () => {

    const playerArray: Player[] = [
        {name: "AJ Griffin", position: "F", number: 14, status:
        "out"},
        {name: "Seth Lundy", position: "G", number: 3, status: "day-to-day"},
        {name: "Wesley Matthews", position: "SG", number: 32, status: "out"}
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Injury Report
                </CardTitle>
            </CardHeader>

            <CardContent>
                { playerArray.map((player: Player, index: number) => (
                    <InjuredPlayer key={index} {...player} />
                ))}
            </CardContent>

            <CardFooter className="text-sm font-semibold">
                Team Injuries
            </CardFooter>
        </Card>
    )
}

export default TeamInjuries