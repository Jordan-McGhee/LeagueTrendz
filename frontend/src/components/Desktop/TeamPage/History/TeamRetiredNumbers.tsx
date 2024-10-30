import React, { useState } from "react";

// types imports
import { TeamHistoryState } from "@/types";

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card"
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";

const TeamRetiredNumbers = ({ history, teamColor }: { history: TeamHistoryState, teamColor: string }) => {
    const [showContent, setShowContent] = useState<Boolean>(true)

    const toggleShowContent = () => {
        setShowContent(!showContent)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    Retired Numbers

                    <div onClick={() => toggleShowContent()} className="md:hidden flex gap-x-2 items-center">
                        <p className="text-sm">{showContent ? "Hide" : "Show"}</p>
                        {showContent ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
                    </div>
                </CardTitle>
            </CardHeader>

            {
                showContent &&
                <CardContent className="max-h-[575px] overflow-y-scroll">
                    <div className="flex flex-col gap-y-4">
                        {
                            history.jersey_numbers.map((jersey) =>
                                <div className="grid grid-cols-8 gap-x-4">
                                    <p className="text-4xl font-bold col-span-2 place-self-center" style={{ color: teamColor }}>{jersey.number}</p>

                                    <div className="col-span-6">
                                        <p className="text-xl font-bold">{jersey.player_name}</p>
                                        <p className="font-light">Retired in {jersey.season_retired}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </CardContent>
            }
        </Card>
    )
}

export default TeamRetiredNumbers