import React from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../../ui/card"

type StoryProps = {
    headline: string,
    author?: string,
    description: string,
    time_posted: string
}

const Story = (props: StoryProps) => {

    return (
        <div className="border-t-2 py-2 flex gap-x-2">

            {/* image placeholder */}
            <div className="bg-red-500 h-10 w-10"/>

            {/* content div */}
            <div>
                <p className="text-sm font-bold">{ props.headline }</p>
                <p className="text-xs">{ props.description }</p>

                {/* time posted & author div */}
                <div className="flex w-3/5 text-xs my-1 gap-x-2">
                    <p>{ props.time_posted }</p>
                    <p>{ props.author } </p>
                </div>
            </div>
        </div>
    )
}

const HomeHeadlines = () => {
    const stories = Array(2).fill({
        headline: "News Story",
        author: "Jordan McGhee",
        description: "This is a new story about a sports ball team. It will fill up the description section.",
        time_posted: "1hr"
    }, 0)

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>
                    Today's Headlines
                </CardTitle>
            </CardHeader>

            <CardContent>
                { stories.map((story) => (
                    <Story
                        headline={ story.headline }
                        author = { story.author }
                        description= { story.description }
                        time_posted= { story.time_posted }
                    />
                ))}
            </CardContent>

            <CardFooter>
                All NBA News
            </CardFooter>
        </Card>
    )
}

export default HomeHeadlines