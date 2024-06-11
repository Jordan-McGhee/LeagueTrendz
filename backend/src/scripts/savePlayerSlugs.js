const { Pool } = require("pg")
const players = require("../../../data/with_IDs/2024_nba_players_With_ids.json")

async function saveSlug(player) {
    const nameSplit = player.name.split(" ")
    const firstName = nameSplit[0]
    const lastName = nameSplit[1]

    let slug

    if (lastName.length >= 5) {
        slug = lastName.slice(0, 5) + firstName.slice(0, 2) + "01"
    } else {
        slug = lastName + firstName.slice(0, 2) + "01"
    }

    slug = slug.toLowerCase()

    const query = `UPDATE players set slug = $1 WHERE player_id = $2`

    try {
        await pool.query(query, [ slug, player.player_id])
        console.log(`Added slug: ${slug} for ${player.name}`)
    } catch (error) {
        console.log(`Error adding slug for ${player.name}. ${error}`)
    }
}

async function saveSlugs() {
    for (const player of players.players) {
        await saveSlug(player)
    }
}

saveSlugs()
    .then(() => {
        console.log(`All players updated successfully!`)
        pool.end()
    })
    .catch(error => {
        console.error(`Error updating player: ${error.message}`)
        throw error
    })