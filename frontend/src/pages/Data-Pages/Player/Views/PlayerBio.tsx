// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../../components/ui/card"

// type imports
import { PlayerPageProps } from "../../../../types"

// component imports
import PlayerBiography from "../../../../components/Desktop/PlayerPage/Bio/PlayerBiography"
import PlayerCareerHistory from "../../../../components/Desktop/PlayerPage/Bio/PlayerCareerHistory"
import PlayerCareerHighlights from "../../../../components/Desktop/PlayerPage/Bio/PlayerCareerHighlights"

const PlayerBio: React.FC<PlayerPageProps> = ({ player, currentTeam }) => {

    return (

        <>

            {/* mobile */}
            <div className="md:hidden flex flex-col gap-y-4 mt-4">
                <PlayerBiography player={player} currentTeam={currentTeam} />
                <PlayerCareerHistory player={player} currentTeam={currentTeam} />
                <PlayerCareerHighlights player={player} currentTeam={currentTeam} />
            </div>

            {/* desktop */}
            <div className="hidden md:flex justify-between gap-x-4 h-fit mt-4">

                {/* left side */}
                <div className="h-screen w-[65%] flex flex-col gap-y-4">
                    <PlayerBiography player={player} currentTeam={currentTeam} />
                    <PlayerCareerHistory player={player} currentTeam={currentTeam} />
                </div>


                {/* right side */}
                <div className="h-fit w-[35%] flex flex-col gap-y-4">
                    <PlayerCareerHighlights player={player} currentTeam={currentTeam} />
                </div>
            </div>
        </>
    )
}

export default PlayerBio