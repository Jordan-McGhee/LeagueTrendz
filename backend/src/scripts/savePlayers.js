const { Pool } = require('pg')
const playersData = require("../../../data/2023-24.NBA.Roster.json")

const pool = new Pool({
    user: 'ctqmvlqf',
    host: 'ruby.db.elephantsql.com',
    database: 'ctqmvlqf',
    port: 5432,
    password: 'pdZjkxf-n-wtvBPlpCZR4B8DY79dH996',
    max: 150,
    min: 0
})

async function savePlayer(player) {

    // things to do
    // convert height to feet-inches (6'2")

    // change fields in player table to include
    // transactions - json array
    // img url
    // draft - change to json format
    // awards - array of json format
    // contract?
    // born: year and location - json format
    // year_averages - json
    // play_off_year_averages - json
    // injury status

    // convert jersey number to int from string
    const jerseyNumber = !player.stats ? parseInt(player.jerseyNumber) : parseInt(player.stats[player.stats.length - 1].jerseyNumber)

    // add 1 to tid to align with team_ids in db
    const team_id = player.tid >= 0 ? player.tid : undefined

    // convert height from inches into (ft' inches")
    const playerHeight = `${Math.floor(player.hgt / 12)}'${player.hgt % 12}"`

    const age = 2024 - player.born.year

    // iterate over stats
    let regular_season_stats = [], playoff_stats = []

    if (player.stats) {
        // iterate over each object in stats array
        for (i = 0; i < player.stats.length; i++) {
            // if playoffs is true, push to playoff array
            if (player.stats[i].playoffs === true) {
                playoff_stats.push(player.stats[i])
    
            // else push to regular season array
            } else {
                regular_season_stats.push(player.stats[i])
            }
        }
    }


    const values = [
        player.name,
        team_id,
        playerHeight,
        player.weight,
        player.injury,
        player.pos,
        jerseyNumber,
        player.imgURL,
        player.transactions,
        player.draft,
        player.awards,
        player.born,
        age,
        player.college,
        regular_season_stats,
        playoff_stats
    ]

    const query = 'INSERT INTO players (name, team_id, height, weight, status, player_position, jersey_number, photo_url, transactions, draft, awards, born, age, college, regular_season_stats, playoff_stats) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *;'

    try {
        await pool.query(query, values)
        console.log(`Added player: ${player.name}`)
    } catch (error) {
        console.log(`Error adding player:`, error.message)
    }
}

async function savePlayers() {
    for (const player of playersData.players) {
        if (player.tid >= 0) {
            await savePlayer(player)
        }
    }
}

savePlayers()
    .then(() => {
        console.log(`All players inserted successfully!`)
        pool.end()
    })
    .catch(error => {
        console.error(`Error inserting player: ${error.message}`)
        throw error
    })