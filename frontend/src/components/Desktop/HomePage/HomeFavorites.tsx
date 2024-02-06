import React from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../../ui/card"

type StoryProps = {
    player_name: string,
    team: string,
    stats: string
}

const Favorite = (props: StoryProps) => {

    return (
        <div className="border-t-2 py-2 flex gap-x-2">

            {/* image placeholder */}
            <div className="bg-red-500 h-10 w-10"/>

            {/* content div */}
            <div>
                <p className="text-sm font-bold">{ props.player_name }</p>
                <p className="text-xs">{ props.team }</p>

                {/* time posted & author div */}
                <div className="">
                    <p>{ props.stats }</p>
                </div>
            </div>
        </div>
    )
}

const HomeFavorites = () => {
    const favorites = Array(2).fill({
        player_name: "MaKenzie Eason",
        team: "Atlanta Hawks",
        stats: "Bucket getter.",
    }, 0)

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>
                    Your Favorites
                </CardTitle>
            </CardHeader>

            <CardContent>
                { favorites.map((favorite) => (
                    <Favorite
                        player_name={ favorite.player_name }
                        team = { favorite.team }
                        stats= { favorite.stats }
                    />
                ))}
            </CardContent>

            <CardFooter>
                View All Favorites
            </CardFooter>
        </Card>
    )
}

export default HomeFavorites