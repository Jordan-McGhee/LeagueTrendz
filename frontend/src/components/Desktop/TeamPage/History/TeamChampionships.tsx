import React, { useState } from "react";

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card"
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";

const TeamChampionships = ({ teamColor, championCount }: { teamColor: string, championCount: number[] }) => {

    const [showContent, setShowContent] = useState<Boolean>(true)

    const toggleShowContent = () => {
        setShowContent(!showContent)
    }

    return (
        <Card className="h-fit">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    Championships

                    <div onClick={() => toggleShowContent()} className="md:hidden flex gap-x-2 items-center">
                        <p className="text-sm">{showContent ? "Hide" : "Show"}</p>
                        {showContent ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
                    </div>
                </CardTitle>

            </CardHeader>
            {
                showContent &&
                <CardContent>
                    <div className={championCount.length > 6 ? "flex items-start gap-x-4" : "flex items-center gap-x-4"}>
                        <img src={require("../../../../nba-trophies/larry-obrien-champion.png")} className={championCount.length > 6 ? "size-16 object-contain mt-2" : "size-16 object-contain"} alt="champ trophy" />
                        <div className="w-4/5">
                            <p className="text-lg font-bold" style={{ color: teamColor }}>{championCount.length}x NBA Champion</p>
                            <p className="text-sm font-light">{championCount.join(", ")}</p>
                        </div>
                    </div>
                </CardContent>
            }
        </Card>
    )
}

export default TeamChampionships