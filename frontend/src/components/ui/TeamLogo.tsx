import React from "react";

import { TeamLogoProps } from "../../types";

const TeamLogo = (props:TeamLogoProps) => {
    return (
        <img src={require(`../../nba-logos/${props.team_id}-${props.abbreviation.toLowerCase()}.png`)} alt={`${props.abbreviation} logo`} className={`${props.logoClass}` || 'size-16 mr-2'}/>
    )
}

export default TeamLogo