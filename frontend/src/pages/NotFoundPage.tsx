import React from "react"
import { Link } from "react-router-dom"

// ui imports
import { Card, CardTitle, CardHeader, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"

const NotFoundPage = () => (
    <Card>
        <CardHeader>
            <CardTitle className="text-center text-3xl">
                Page Not Found
            </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-y-4">
            <iframe src="https://giphy.com/embed/EimNpKJpihLY4" width="800" height="400" className="giphy-embed m-auto" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/EimNpKJpihLY4"></a></p>

            <Link to={"/"} className="">
                <Button>
                    Go Home
                </Button>
            </Link>
        </CardContent>
    </Card>
)

export default NotFoundPage