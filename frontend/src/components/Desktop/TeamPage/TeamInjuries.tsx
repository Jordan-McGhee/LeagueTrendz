// ui imports
import { Separator } from "../../ui/separator"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../ui/card"

type Player = {
    name: string,
    position: string,
    number: number,
    status: string
}

const InjuredPlayer = (props: Player) => {

    return (
        <div className="flex items-center gap-x-4 py-4 text-sm">
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

                <InjuredPlayer key={1} {...playerArray[0]} />
                <Separator />

                <InjuredPlayer key={2} {...playerArray[1]} />
                <Separator />

                <InjuredPlayer key={3} {...playerArray[2]} />

            </CardContent>

            <CardFooter className="text-sm font-semibold text-blue-700">
                Team Injuries
            </CardFooter>
        </Card>
    )
}

export default TeamInjuries