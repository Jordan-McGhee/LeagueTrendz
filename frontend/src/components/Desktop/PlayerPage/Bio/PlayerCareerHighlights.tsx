// type imports
import { PlayerPageProps, AwardsDict } from "../../../../types"

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card"

// component imports
import AwardItem from "./AwardItem"

const PlayerCareerHighlights: React.FC<PlayerPageProps> = ({ player, currentTeam }) => {

    let awards: AwardsDict = {

        // awards
        rookieOTY: [],
        mostImproved: [],
        defensivePOTY: [],
        clutchPOTY: [],
        sixthMan: [],
        MVP: [],

        // allstar
        allStar: [],
        allStarMVP: [],
        threePointChamp: [],
        slamDunkChamp: [],

        // all league
        firstTeam: [],
        secondTeam: [],
        thirdTeam: [],
        firstTeamDefense: [],
        secondTeamDefense: [],
        rookieTeam: [],
        inSeasonTournamentTeam: [],

        // league leaders
        scoringLeader: [],
        assistLeader: [],
        reboundLeader: [],
        stealLeader: [],
        blockLeader: [],


        // champion/finals mvp
        champion: [],
        finalsMVP: [],
        semifinalsMVP: [],

        // in season tournament
        inSeasonChamp: [],
        inSeasonMVP: []
    }

    if (player.awards) {

        for (let i = 0; i < player.awards.length; i++) {
            const award = player.awards[i];
            const { season, type } = award;

            switch (type) {
                // Awards
                case 'Rookie of the Year':
                    awards.rookieOTY.push(season);
                    break;
                case 'Most Improved Player':
                    awards.mostImproved.push(season);
                    break;
                case 'Defensive Player of the Year':
                    awards.defensivePOTY.push(season);
                    break;
                case 'Clutch Player of the Year':
                    awards.clutchPOTY.push(season);
                    break;
                case 'Sixth Man of the Year':
                    awards.sixthMan.push(season);
                    break;
                case 'Most Valuable Player':
                    awards.MVP.push(season);
                    break;

                // All-Star
                case 'All-Star':
                    awards.allStar.push(season);
                    break;
                case 'All-Star MVP':
                    awards.allStarMVP.push(season);
                    break;
                case 'Three-Point Contest Winner':
                    awards.threePointChamp.push(season);
                    break;
                case 'Slam Dunk Contest Winner':
                    awards.slamDunkChamp.push(season);
                    break;

                // All-League
                case 'First Team All-League':
                    awards.firstTeam.push(season);
                    break;
                case 'Second Team All-League':
                    awards.secondTeam.push(season);
                    break;
                case 'Third Team All-League':
                    awards.thirdTeam.push(season);
                    break;
                case 'First Team All-Defensive':
                    awards.firstTeamDefense.push(season);
                    break;
                case 'Second Team All-Defensive':
                    awards.secondTeamDefense.push(season);
                    break;
                case 'All-Rookie Team':
                    awards.rookieTeam.push(season);
                    break;
                case 'In-Season Tournament Team':
                    awards.inSeasonTournamentTeam.push(season);
                    break;

                // League Leaders
                case 'League Scoring Leader':
                    awards.scoringLeader.push(season);
                    break;
                case 'League Assist Leader':
                    awards.assistLeader.push(season);
                    break;
                case 'League Rebound Leader':
                    awards.reboundLeader.push(season);
                    break;
                case 'League Steal Leader':
                    awards.stealLeader.push(season);
                    break;
                case 'League Block Leader':
                    awards.blockLeader.push(season);
                    break;

                // Champion/Finals MVP
                case 'Won Championship':
                    awards.champion.push(season);
                    break;
                case 'Finals MVP':
                    awards.finalsMVP.push(season);
                    break;
                case 'Semifinals MVP':
                    awards.semifinalsMVP.push(season)
                    break;

                case 'In-Season Tournament Champ':
                    awards.inSeasonChamp.push(season)
                    break;

                case 'In-Season Tournament MVP':
                    awards.inSeasonMVP.push(season)
                    break;

                default:
                    break;
            }
        }
    }

    console.log(awards)

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Trophy Case
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="flex flex-col gap-y-4">
                    {player.awards ?

                        Object.entries(awards).map(([key, values]) => {
                            // Check if the values array has any elements
                            if (values.length > 0) {
                                return (
                                    <AwardItem award={key} years={values} />
                                );
                            } else {
                                // If values array is empty, return null
                                return null;
                            }
                        })

                        :
                        <p>No awards yet!</p>
                    }
                </div>
            </CardContent>
        </Card>
    )
}

export default PlayerCareerHighlights