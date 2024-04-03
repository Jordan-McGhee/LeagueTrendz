const { Pool } = require('pg');
const teamsData = require("../../../data/teams.json")

const pool = new Pool({
    user: 'ctqmvlqf',
    host: 'ruby.db.elephantsql.com',
    database: 'ctqmvlqf',
    port: 5432,
    password: 'pdZjkxf-n-wtvBPlpCZR4B8DY79dH996',
    max: 150,
    min: 0
})

async function saveTeam(team) {
    const query = `INSERT INTO teams (full_name, abbreviation, league_id, description, wins, losses, conference, division, stadium, stadium_location)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;`

    const values = [
        team.name,
        team.abbreviation,
        team.league_id,
        team.description,
        team.wins,
        team.losses,
        team.conference,
        team.division,
        team.stadium,
        team.stadium_location
    ]

    try {
        const result = await pool.query(query, values);
        console.log('Inserted team:', result.rows[0]);
    } catch (error) {
        console.error('Error inserting team:', error.message);
    }
}

// Loop over each team and insert it into the database
async function saveTeams() {
    for (const team of teamsData.teams) {
        await saveTeam(team);
    }
}

// Call the function to insert teams
saveTeams()
    .then(() => {
        console.log('All teams inserted successfully!');
        pool.end(); // Close the database connection pool
    })
    .catch(error => console.error('Error inserting teams:', error.message));