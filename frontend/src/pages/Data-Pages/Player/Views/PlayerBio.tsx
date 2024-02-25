// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../../components/ui/card"

// component imports

const PlayerBio = () => {

    return (
        <div className="flex justify-between gap-x-4 h-fit mt-4">
            
            {/* left side */}
            <div className="h-screen w-[65%] bg-red-200" />


            {/* right side */}
            <div className="h-screen w-[35%] bg-blue-200" />
        </div>
    )
}

export default PlayerBio