import { Link } from "react-router-dom"

// type imports
import { Player } from "../../../../types"

// utils import
import { convertPlayerPosition } from "../../../../Utils/utils"

const SwitchPlayerItem = (props: {player: Player}) => {

    return (
        <Link to={`/nba/players/id/${props.player.player_id}/${props.player.name.replace(" ", "-").toLowerCase()}?view=overview`} className="flex items-center gap-x-4 w-full py-1 hover:underline">
            <img src={props.player.photo_url} alt={`${props.player.name} photo`} className="size-11 object-contain" />
            <div className="">
                <p className="">{props.player.name}</p>
                <div className="flex gap-x-1 text-sm font-light">
                    <p>#{props.player.jersey_number}</p>
                    <p className="">{convertPlayerPosition(props.player.player_position)}</p>
                </div>
            </div>
        </Link>
    )
}

export default SwitchPlayerItem