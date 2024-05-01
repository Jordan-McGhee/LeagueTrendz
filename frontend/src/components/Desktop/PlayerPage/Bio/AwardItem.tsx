import React from "react";

// type imports
import { AwardItemProps } from "../../../../types"

const AwardItem: React.FC<AwardItemProps> = ({ award, years }) => {

    let awardName, imageSrc

    switch (award) {
        case 'rookieOTY':
            awardName = 'Rookie of the Year'
            imageSrc = require('../../../../nba-trophies/wilt-chamberlain-rookie.png')
            break;
        case 'mostImpoved':
            awardName = 'Most Improved Player'
            imageSrc = require('../../../../nba-trophies/george-mikan-most-improved.png')
            break;
        case 'defensivePOTY':
            awardName = 'Defensive Player of the Year'
            imageSrc = require('../../../../nba-trophies/hakeem-olajuwon-defensive.png')
            break;
        case 'clutchPOTY':
            awardName = 'Clutch Player of the Year'
            imageSrc = require('../../../../nba-trophies/jerry-west-clutch-player.png')
            break;
        case 'sixthMan':
            awardName = 'Sixth Man of the Year'
            imageSrc = require('../../../../nba-trophies/john-havlicek-sixth-man.png')
            break;
        case 'MVP':
            awardName = 'League MVP'
            imageSrc = require('../../../../nba-trophies/michael-jordan-mvp.png')
            break;
        case 'allStar':
            awardName = 'All Star'
            imageSrc = require('../../../../nba-trophies/nba-all-star.png')
            break;
        case 'allStarMVP':
            awardName = 'All Star MVP'
            imageSrc = require('../../../../nba-trophies/kobe-bryant-allstar-mvp.png')
            break;
        case 'threePointChamp':
            awardName = 'Three Point Contest Winner'
            imageSrc = require('../../../../nba-trophies/nba-logo.png')
            break;
        case 'slamDunkChamp':
            awardName = 'Slam Dunk Contenst Winner'
            imageSrc = require('../../../../nba-trophies/nba-logo.png')
            break;
        case 'firstTeam':
            awardName = 'All-NBA First Team'
            imageSrc = require('../../../../nba-trophies/nba-logo.png')
            break;
        case 'secondTeam':
            awardName = 'All-NBA Second Team'
            imageSrc = require('../../../../nba-trophies/nba-logo.png')
            break;
        case 'thirdTeam':
            awardName = 'All-NBA Third Team'
            imageSrc = require('../../../../nba-trophies/nba-logo.png')
            break;
        case 'firstTeamDefense':
            awardName = 'All-Defensive First Team'
            imageSrc = require('../../../../nba-trophies/nba-logo.png')
            break;
        case 'secondTeamDefense':
            awardName = 'All-Defensive Second Team'
            imageSrc = require('../../../../nba-trophies/nba-logo.png')
            break;
        case 'rookieTeam':
            awardName = 'All-Rookie Team'
            imageSrc = require('../../../../nba-trophies/nba-logo.png')
            break;
        case 'inSeasonTournamentTeam':
            awardName = 'In-Season Tournament Team'
            imageSrc = require('../../../../nba-trophies/in-season-tournament.png')
            break;
        case 'scoringLeader':
            awardName = 'League Scoring Leader'
            imageSrc = require('../../../../nba-trophies/nba-logo.png')
            break;
        case 'assistLeader':
            awardName = 'League Assist Leader'
            imageSrc = require('../../../../nba-trophies/nba-logo.png')
            break;
        case 'reboundLeader':
            awardName = 'League Rebound Leader'
            imageSrc = require('../../../../nba-trophies/nba-logo.png')
            break;
        case 'stealLeader':
            awardName = 'League Steal Leader'
            imageSrc = require('../../../../nba-trophies/nba-logo.png')
            break;
        case 'blockLeader':
            awardName = 'League Block Leader'
            imageSrc = require('../../../../nba-trophies/nba-logo.png')
            break;
        case 'champion':
            awardName = 'NBA Champion'
            imageSrc = require('../../../../nba-trophies/larry-obrien-champion.png')
            break;
        case 'finalsMVP':
            awardName = 'NBA Finals MVP'
            imageSrc = require('../../../../nba-trophies/bill-russel-finals-mvp.png')
            break;
        case 'semifinalsMVP':
            awardName = 'NBA Semifinals MVP'
            imageSrc = require('../../../../nba-trophies/magic-johnson-western-mvp.png')
            break;
        case 'inSeasonChamp':
            awardName = 'In-Season Tournament Champion'
            imageSrc = require('../../../../nba-trophies/in-season-tournament.png')
            break;
        case 'inSeasonMVP':
            awardName = 'In-Season Tournament MVP'
            imageSrc = require('../../../../nba-trophies/in-season-tournament-mvp.png')
            break;
    }

    return (
        <div className={ years.length > 6 ? "flex gap-x-2 items-start" : "flex gap-x-2 items-center"}>
            <img src={imageSrc} className="size-8 object-contain" alt={awardName} />
            <div className="w-3/4">
                <p className={awardName === "In-Season Tournament Champion" ? "text-sm font-semibold" : "font-bold"}><span className="font-bold">{years.length > 1 ? `${years.length}x` : ''}</span> {awardName}</p>
                <p className="font-light text-xs">{years.join(', ')}</p>
            </div>
        </div>
    )
}

export default AwardItem