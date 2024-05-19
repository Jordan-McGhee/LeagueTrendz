const { Pool } = require('pg');
const historyData = require("../../../data/team-history.json")

const pool = new Pool({
    user: 'ctqmvlqf',
    host: 'ruby.db.elephantsql.com',
    database: 'ctqmvlqf',
    port: 5432,
    password: 'pdZjkxf-n-wtvBPlpCZR4B8DY79dH996',
    max: 150,
    min: 0
})

// HISTORY
// retired numbers []
// seasons
// season
// won
// lost
// playoffRoundsWon (-1 missed playoffs, 0 lost in first round, 1 made it to conference semis, 2 made it to conference finals, 3 made it to finals, 4 won championship)
// team logo

async function saveHistory(team) {

    // look up team
    const team_query = "SELECT * FROM teams WHERE team_id = $1"
    let team_response

    try {
        team_response = await pool.query(team_query, [team.tid])
    } catch (error) {
        console.log(`Error getting team: ${team.tid}`)
        throw error
    }

    const queried_team = team_response.rows[0]

    // after finding team

    // iterate jersey numbers
    let jersey_numbers = []

    for (let i = 0; i < team.retiredJerseyNumbers.length; i++) {

        const jersey = team.retiredJerseyNumbers[i]

        jersey_numbers.push({
            "number": jersey.number,
            "season_retired": jersey.seasonRetired,
            "player_name": jersey.text
        })
    }

    // iterate seasons
    // check if region and name equal the team's current name
    // count conference/league championships

    let seasons = [], championships = [], conference_championships = []

    for (let i = 0; i < team.seasons.length; i++) {

        const season = team.seasons[i]

        let season_object = {
            "team_name": season.region ? [season.region, season.name].join(' ') : queried_team.full_name,
            "season": season.season,
            "wins": season.won,
            "losses": season.lost,
            "pct": (season.won / (season.won + season.lost)).toFixed(3),
            "playoffs": season.playoffRoundsWon,
            "champion": season.playoffRoundsWon === 4 ? true : false,
            "conference_champion": season.playoffRoundsWon >= 3 ? true : false,
            "img_url": season.imgURL || null,
            "img_url_small": season.imgURLSmall || null
        }

        seasons.push(season_object)

        if (season.playoffRoundsWon >= 3) {
            conference_championships.push(season.season)
        }

        if (season.playoffRoundsWon === 4) {
            championships.push(season.season)
        }
    }

    const json_jerseys = JSON.stringify(jersey_numbers)
    const json_seasons = JSON.stringify(seasons)
    // console.log(json_jerseys)

    const query = "INSERT INTO histories (team_id, abbreviation, jersey_numbers, seasons, championships, conference_championships) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *"

    try {
        await pool.query(query, [queried_team.team_id, queried_team.abbreviation, json_jerseys, json_seasons, championships, conference_championships])
        console.log(`Inserted history for: ${queried_team.full_name}`)
    } catch (error) {
        console.error(`Error inserting history for: ${queried_team.full_name}`, error.message)
    }
}

async function saveHistories() {
    for (const team of historyData.teams) {
        await saveHistory(team)
    }
}

saveHistories()
    .then(() => {
        console.log(`All team histories inserted successfully!`)
        pool.end()
    })
    .catch(error => console.error(`Error inserting team history: `, error.message))