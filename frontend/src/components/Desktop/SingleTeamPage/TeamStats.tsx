import { Link } from "react-router-dom"

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../ui/card"

const TeamStats = () => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    2023-24 Team Stats
                </CardTitle>
            </CardHeader>

            <CardContent>

            </CardContent>

            <CardFooter className="text-sm font-semibold text-blue-700">
                <Link to = "/standings">
                    See All Team Stats
                </Link>
            </CardFooter>
        </Card>
    )
}

export default TeamStats