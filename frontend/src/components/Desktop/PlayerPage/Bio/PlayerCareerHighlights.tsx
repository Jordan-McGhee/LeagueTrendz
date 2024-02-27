// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card"

const PlayerCareerHighlights = () => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Career Highlights
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="flex flex-col gap-y-4">

                    <div className="flex gap-x-2 items-center">
                        <div className="size-8 bg-red-500 rounded-full" />
                        <div className="w-2/3">
                            <p>All-NBA 3rd Team</p>
                            <p className="font-light text-sm">2022</p>
                        </div>
                    </div>

                    <div className="flex gap-x-2 items-center">
                        <div className="size-8 bg-red-500 rounded-full" />
                        <div className="w-2/3">
                            <p>All-Rookie 1st Team</p>
                            <p className="font-light text-sm">2019</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default PlayerCareerHighlights