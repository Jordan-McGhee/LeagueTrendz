const { Pool } = require('pg')
const playersData = require("../../../data/player-test.json")

const pool = new Pool({
    user: 'ctqmvlqf',
    host: 'ruby.db.elephantsql.com',
    database: 'ctqmvlqf',
    port: 5432,
    password: 'pdZjkxf-n-wtvBPlpCZR4B8DY79dH996',
    max: 150,
    min: 0
})

async function savePlayer (player) {

        // things to do
        // strip player name into first and last
        // convert height to feet-inches (6'2")
        // add 1 to team id
            // check if id is below 0 first
    
    
    // change fields in player table to include
        // transactions - json array
        // img url
        // draft - change to json format
        // awards - array of json format
        // contract
        // born: year and location - json format

    // convert jersey number to int from string
    const jerseyNumber = parseInt(player.stats[player.stats.length - 1].jerseyNumber)

    // add 1 to tid to align with team_ids in db
    const team_id = player.tid >= 0 ? player.tid + 1 : undefined

    // convert height from inches into (ft' inches")
    const playerHeight = `${Math.floor(player.hgt/12)}'${player.hgt % 12}"`

    const values = [
        player.name,
        team_id,
        playerHeight,
        player.weight,
        'healthy',
        player.pos,
        jerseyNumber,
        player.imgURL,
        player.transactions,
        player.draft,
        player.awards,
        player.born,
        player.college
    ]

    const query = 'INSERT INTO players (name, team_id, height, weight, status, player_position, jersey_number, photo_url, transactions, draft, awards, born, college) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;'

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