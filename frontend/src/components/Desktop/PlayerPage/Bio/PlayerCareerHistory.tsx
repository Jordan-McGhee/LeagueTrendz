// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card"

const PlayerCareerHistory = () => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Career History</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="flex items-center gap-x-2">
                    <div className="bg-red-500 size-8 rounded-full" />
                    <div className="">
                        <p>Atlanta Hawks</p>
                        <p className="text-xs font-light uppercase">2018-CURRENT (6 seasons)</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default PlayerCareerHistory