const { Pool } = require("pg")
const basicData = require("../../../data/2023-24_player_basic_season_totals.json")


// THINGS TO CONSIDER
// PLAYERS THAT WERE TRADED
// CHECK 2023-24 TABLE STATS TO SEE IF ROW EXISTS FOR THAT PLAYER, IF SO, UPDATE THE ROW INFO, IF NOT, SAVE A NEW ROW?

// const basicData = {
//     player_id,
//     team_id,
//     games_played,
//     games_started
//     minutes_played,
//     fgm: number,
//     fga: number,
//     fgPercentage: float,
//     tpm: number,
//     tpa: number,
//     tpPercentage: float,
//     ftm: number,
//     fta: number,
//     ftPercentage: number,
//     orb: number,
//     drb: number,
//     rbs: number,
//     ast: number,
//     stl: number,
//     blk: number,
//     to: number,
//     pf: number,
//     pts: number,
// }


async function savePlayerTotals(player) {

    // look up player
    const player_query = 'SELECT * FROM players WHERE slug = $1'
    let playerResponse

    try {
        playerResponse = await pool.query(player_query, [player.slug])
    } catch (error) {
        console.log(`Error finding player with slug ${boxScore.slug}`)
        throw error
    }

    // after finding player
    const player_id = playerResponse.rows[0].player_id
    const team_id = playerResponse.rows[0].team_id

    // console.log(`Player ID: ${player_id}, Team ID: ${team_id}`)

    // check for player row in 2023-24 player stats table
    const stats_query = "SELECT * FROM player_totals_2023_24 WHERE player_id = $1"
    let statsResponse

    try {
        statsResponse = await pool.query(stats_query, [player_id])
    } catch (error) {
        console.log(`No season stats yet for ${playerResponse.name}`)
    }

    // if we get a stats response, means player was traded and we need to update their total stats with totals from new team
    if (statsResponse.rows[0]) {
        console.log(`Updating stats for ${playerResponse.rows[0].name}`)


        const old_stats = statsResponse.rows[0]
        console.log(old_stats)

        // calculate new values for all stats

        // gp & gs
        const new_gp = old_stats.gp ? old_stats.gp + player.games_played : player.games_played 
        const new_gs = old_stats.gs ? old_stats.gs + player.games_started : player.games_started

        // minutes & points
        const new_min = old_stats.min + player.minutes_played
        const new_pts = old_stats.pts ? old_stats.pts + player.points : player.points

        // fg, tp, ft
        const new_fgm = old_stats.fgm ? old_stats.fgm + player.made_field_goals : player.made_field_goals
        const new_fga = old_stats.fga ? old_stats.fga + player.attempted_field_goals : player.attempted_field_goals
        const new_fg_percentage = new_fga > 0 ? parseFloat(((new_fgm / new_fga) * 100).toFixed(1)) : 0.0

        const new_tpm = old_stats.tpm ? old_stats.tpm + player.made_three_point_field_goals : player.made_three_point_field_goals
        const new_tpa = old_stats.tpa ? old_stats.tpa + player.attempted_three_point_field_goals : player.attempted_three_point_field_goals
        const new_tp_percentage = new_tpa > 0 ? parseFloat(((new_tpm / new_tpa) * 100).toFixed(1)) : 0.0

        const new_ftm = old_stats.ftm ? old_stats.ftm + player.made_free_throws : player.made_free_throws
        const new_fta = old_stats.fta ? old_stats.fta + player.attempted_free_throws : player.attempted_free_throws
        const new_ft_percentage = new_fta > 0 ? parseFloat(((new_ftm / new_fta) * 100).toFixed(1)) : 0.0

        // rebs
        const new_orb = old_stats.orb ? old_stats.orb + player.offensive_rebounds : player.offensive_rebounds
        const new_drb = old_stats.drb ? old_stats.drb + player.defensive_rebounds : player.defensive_rebounds
        const new_rbs = new_orb + new_drb

        // asts, stls, blks, turnovers, pfs
        const new_ast = old_stats.ast ? old_stats.ast + player.assists : player.assists
        const new_stl = old_stats.stl ? old_stats.stl + player.steals : player.steals
        const new_blk = old_stats.blk ? old_stats.blk + player.blocks : player.blocks
        const new_turnovers = old_stats.turnovers ? old_stats.turnovers + player.turnovers : player.turnovers
        const new_pf = old_stats.pf ? old_stats.pf + player.personal_fouls : player.personal_fouls

        // "UPDATE orders set tip_amount = $1, updated_at = NOW() WHERE order_id = $2 RETURNING *"
        const update_query = "UPDATE player_totals_2023_24 SET gp = $1, gs = $2, min = $3, pts = $4, fgm = $5, fga = $6, fg_percentage = $7, tpm = $8, tpa = $9, tp_percentage = $10, ftm = $11, fta = $12, ft_percentage = $13, orb = $14, drb = $15, reb = $16, ast = $17, stl = $18, blk = $19, turnovers = $20, pf = $21 WHERE player_id = $22"

        try {
            await pool.query(update_query, [new_gp, new_gs, new_min, new_pts, new_fgm, new_fga, new_fg_percentage, new_tpm, new_tpa, new_tp_percentage, new_ftm, new_fta, new_ft_percentage, new_orb, new_drb, new_rbs, new_ast, new_stl, new_blk, new_turnovers, new_pf, player_id])
        } catch (error) {
            console.log(`Error updating 2023-24 stats for ${playerResponse.rows[0].name}. ${error}`)
        }
        
    } else {
        // if no stats response, this is a new player that needs a row in our table

        const values = [
            player_id,
            team_id,
            player.games_played,
            player.games_started,
            player.minutes_played,
            player.points,

            // FGs
            player.made_field_goals,
            player.attempted_field_goals,
            // fg%
            player.attempted_field_goals > 0 ? parseFloat(((player.made_field_goals / player.attempted_field_goals) * 100).toFixed(1)) : 0.0,

            // TPFGs
            player.made_three_point_field_goals,
            player.attempted_three_point_field_goals,
            // tp%
            player.attempted_three_point_field_goals > 0 ? parseFloat(((player.made_three_point_field_goals / player.attempted_three_point_field_goals) * 100).toFixed(1)) : 0.0,

            // FTs
            player.made_free_throws,
            player.attempted_free_throws,
            // ft%
            player.attempted_free_throws > 0 ? parseFloat(((player.made_free_throws / player.attempted_free_throws) * 100).toFixed(1)) : 0.0,

            // REBs
            player.offensive_rebounds,
            player.defensive_rebounds,
            // total rebs
            player.offensive_rebounds + player.defensive_rebounds,

            player.assists,
            player.steals,
            player.blocks,
            player.turnovers,
            player.personal_fouls
        ]

        const query = "INSERT INTO player_totals_2023_24 (player_id, team_id, gp, gs, min, pts, fgm, fga, fg_percentage, tpm, tpa, tp_percentage, ftm, fta, ft_percentage, orb, drb, reb, ast, stl, blk, turnovers, pf) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)"

        try {
            await pool.query(query, values)
        } catch (error) {
            console.log(`Error adding 2023-24 stats for ${playerResponse.rows[0].name}. ${error}`)
        }
    }
}

async function saveAllTotals() {
    for (const total of basicData) {
        await savePlayerTotals(total)
    }
}

saveAllTotals()
    .then(() => {
        console.log(`All season totals saved!`)
        pool.end()
    })
    .catch(error => {
        console.error(`Error saving totals: ${error.message}`)
        throw error
    })