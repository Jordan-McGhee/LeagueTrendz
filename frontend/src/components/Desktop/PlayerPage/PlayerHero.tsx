// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../ui/card"
import { Button } from "../..//ui/button";

// icon imports
import { PersonIcon } from "@radix-ui/react-icons";

const PlayerHero = () => {

    return (
        <div>
            <Card className="p-4">
                <div className="flex">

                    {/* player image and details div */}
                    <div className="flex items-center gap-x-4">
                        <PersonIcon className="h-24 w-24" />

                        <div className="flex flex-col gap-y-2">
                            <p className="text-2xl font-light flex flex-col">TRAE <span className="font-bold">YOUNG</span></p>
                            <p className="flex gap-x-1 items-center text-sm"><div className="bg-red-500 h-6 w-6 rounded-full" /> Atlanta Hawks • #11 • PG</p>
                            <Button>Add to Favorites</Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default PlayerHero