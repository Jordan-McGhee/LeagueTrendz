// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card"

const PlayerBiography = () => {

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
                            <p>Birthdate</p>
                            <p>Experience</p>
                            <p>Position</p>
                            <p>Draft Info</p>
                        </div>

                        <div className="flex flex-col gap-y-4">
                            <p>Atlanta Hawks</p>
                            <p>9/19/1998 (25)</p>
                            <p>5th Season</p>
                            <p>Point Guard</p>
                            <p>2018: Rd 1, Pk 5 (DAL)</p>
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
                            <p>6'1", 164 lbs</p>
                            <p>Oklahoma</p>
                            <p>Lubbock, TX</p>
                            <p className="flex gap-x-2 items-center">
                                <div className="size-4 rounded-full bg-red-500" />
                                OUT
                            </p>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}

export default PlayerBiography