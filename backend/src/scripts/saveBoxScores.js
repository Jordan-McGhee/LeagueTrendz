const { Pool } = require("pg")
const gamesData = require("../../../data/with_IDs/2024_nba_games_with_ids.json")
const teams = require("../../../data/teams.json")

const firstJson = require("../../../data/player-box-scores-by-date/2023-10-24-player_box_scores.json")

// const gameDates = ["2023-11-01", "2023-11-02", "2023-11-03", "2023-11-04", "2023-11-05", "2023-11-06", "2023-11-08", "2023-11-09", "2023-11-10", "2023-11-11", "2023-11-12", "2023-11-13", "2023-11-14", "2023-11-15", "2023-11-16", "2023-11-17", "2023-11-18", "2023-11-19", "2023-11-20", "2023-11-21", "2023-11-22", "2023-11-24", "2023-11-25", "2023-11-26", "2023-11-27", "2023-11-28", "2023-11-29", "2023-11-30", "2023-12-01", "2023-12-02", "2023-12-04", "2023-12-05", "2023-12-06", "2023-12-07", "2023-12-08", "2023-12-09", "2023-12-11", "2023-12-12", "2023-12-13", "2023-12-14", "2023-12-15", "2023-12-16", "2023-12-17", "2023-12-18", "2023-12-19", "2023-12-20", "2023-12-21", "2023-12-22", "2023-12-23", "2023-12-25", "2023-12-26", "2023-12-27", "2023-12-28", "2023-12-29", "2023-12-30", "2023-12-31", "2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04", "2024-01-05", "2024-01-06", "2024-01-07", "2024-01-08", "2024-01-09", "2024-01-10", "2024-01-11", "2024-01-12", "2024-01-13", "2024-01-14", "2024-01-15", "2024-01-16", "2024-01-17", "2024-01-18", "2024-01-19", "2024-01-20", "2024-01-21", "2024-01-22", "2024-01-23", "2024-01-24", "2024-01-25", "2024-01-26", "2024-01-27", "2024-01-28", "2024-01-29", "2024-01-30", "2024-01-31", "2024-02-01", "2024-02-02", "2024-02-03", "2024-02-04", "2024-02-05", "2024-02-06", "2024-02-07", "2024-02-08", "2024-02-09", "2024-02-10", "2024-02-11", "2024-02-12", "2024-02-13", "2024-02-14", "2024-02-15", "2024-02-22", "2024-02-23", "2024-02-24", "2024-02-25", "2024-02-26", "2024-02-27", "2024-02-28", "2024-02-29", "2024-03-01", "2024-03-02", "2024-03-03", "2024-03-04", "2024-03-05", "2024-03-06", "2024-03-07", "2024-03-08", "2024-03-09", "2024-03-10", "2024-03-11", "2024-03-12", "2024-03-13", "2024-03-14", "2024-03-15", "2024-03-16", "2024-03-17", "2024-03-18", "2024-03-19", "2024-03-20", "2024-03-21", "2024-03-22", "2024-03-23", "2024-03-24", "2024-03-25", "2024-03-26", "2024-03-27", "2024-03-28", "2024-03-29", "2024-03-30", "2024-03-31", "2024-04-01", "2024-04-02", "2024-04-03", "2024-04-04", "2024-04-05", "2024-04-06", "2024-04-07", "2024-04-09", "2024-04-10", "2024-04-11", "2024-04-12", "2024-04-14"]

const gameDates = ["2024-04-16", "2024-04-17", "2024-04-18", "2024-04-19", "2024-04-20", "2024-04-21", "2024-04-22", "2024-04-23", "2024-04-24", "2024-04-25", "2024-04-26", "2024-04-27", "2024-04-28", "2024-04-29", "2024-04-30", "2024-05-01", "2024-05-02", "2024-05-03", "2024-05-04", "2024-05-05", "2024-05-06", "2024-05-07", "2024-05-08", "2024-05-09", "2024-05-10", "2024-05-11", "2024-05-12", "2024-05-13", "2024-05-14", "2024-05-15", "2024-05-16", "2024-05-17", "2024-05-18", "2024-05-19", "2024-05-20", "2024-05-22", "2024-05-23", "2024-05-24", "2024-05-25", "2024-05-26", "2024-05-27", "2024-05-28", "2024-05-30", "2024-06-06", "2024-06-09", "2024-06-12", "2024-06-14", "2024-06-17"]

async function saveBoxScore(boxScore, game_date) {

    // look up player
    const player_query = 'SELECT * FROM players WHERE slug = $1'
    let playerResponse

    try {
        playerResponse = await pool.query(player_query, [boxScore.slug])
    } catch (error) {
        console.log(`Error finding player with slug ${boxScore.slug}`)
        throw error
    }

    // after finding player
    // console.log(`Player: ${playerResponse.rows[0]}`)
    const player_id = playerResponse.rows[0].player_id

    let home_team, away_team, player_team, opposing_team

    // condition for player on home team
    if (boxScore.location === "HOME") {
        home_team = teams.teams.filter((team) => team.name.toUpperCase() === boxScore.team)[0]
        away_team = teams.teams.filter((team) => team.name.toUpperCase() === boxScore.opponent)[0]

        player_team = home_team
        opposing_team = away_team
    } else {
        away_team = teams.teams.filter((team) => team.name.toUpperCase() === boxScore.team)[0]
        home_team = teams.teams.filter((team) => team.name.toUpperCase() === boxScore.opponent)[0]

        player_team = away_team
        opposing_team = home_team
    }

    const home_team_id = home_team.team_id
    const away_team_id = away_team.team_id

    // query for game that has matching ids for the date
    const game_query = "SELECT * FROM games WHERE date = $1 AND home_team_id = $2 AND away_team_id = $3"
    let game_response

    try {
        game_response = await pool.query(game_query, [game_date, home_team_id, away_team_id])
    } catch (error) {
        console.log(`Error finding game info ${error}`)
        throw error
    }

    // console.log(`Game: ${game_response.rows[0]}`)
    const game_id = game_response.rows[0].game_id

    // successfully queried all data we need
    // now save box score to db


    // const stat = {
    //     game_id: find game,
    //     player_id: find player,
    //     team_id: filter teams,
    //     opposing_team_id: filter teams,
    //     location: string,
    //     minutes: number,
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

    // 3 pointers are included in total made field goals
    // so must subtract made 3 pointers from field goal totals because
    // points wasn't included when I webscraped???? 

    const twoPointFGs = boxScore.made_field_goals - boxScore.made_three_point_field_goals
    const points = (boxScore.made_three_point_field_goals * 3) + (twoPointFGs * 2) + boxScore.made_free_throws

    const values = [
        // foreign keys
        game_id,
        player_id,

        // TEAMS
        player_team.team_id,
        opposing_team.team_id,

        // game stats

        // "HOME" or "AWAY"
        boxScore.location,

        // will count for game played
        // no idea how to tell if player started...
        // no box scores for a player that didn't play. Will figure out on front end?
        true,

        // outcome
        boxScore.outcome,

        // minutes & points
        Math.floor(boxScore.seconds_played / 60),
        points,

        // FGs
        boxScore.made_field_goals,
        boxScore.attempted_field_goals,
        // fg%
        boxScore.attempted_field_goals > 0 ? parseFloat(((boxScore.made_field_goals / boxScore.attempted_field_goals) * 100).toFixed(1)) : 0.0,

        // TPFGs
        boxScore.made_three_point_field_goals,
        boxScore.attempted_three_point_field_goals,
        // tp%
        boxScore.attempted_three_point_field_goals > 0 ? parseFloat(((boxScore.made_three_point_field_goals / boxScore.attempted_three_point_field_goals) * 100).toFixed(1)) : 0.0,

        // FTs
        boxScore.made_free_throws,
        boxScore.attempted_free_throws,
        // ft%
        boxScore.attempted_free_throws > 0 ? parseFloat(((boxScore.made_free_throws / boxScore.attempted_free_throws) * 100).toFixed(1)) : 0.0,

        // REBs
        boxScore.offensive_rebounds,
        boxScore.defensive_rebounds,
        // total rebounds
        boxScore.offensive_rebounds + boxScore.defensive_rebounds,

        boxScore.assists,
        boxScore.steals,
        boxScore.blocks,
        boxScore.turnovers,
        boxScore.personal_fouls
    ]

    const query = "INSERT INTO player_box_scores (game_id, player_id, player_team_id, opposing_team_id, location, played, outcome, minutes, pts, fgm, fga, fg_percentage, tpm, tpa, tp_percentage, ftm, fta, ft_percentage, orb, drb, reb, ast, stl, blk, turnovers, pf) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26)"

    try {
        await pool.query(query, values)
    } catch (error) {
        console.log(`Error adding box scores for ${playerResponse.rows[0].name} on ${game_response.rows[0].date}. ${error}`)
    }
}

async function saveBoxScores() {

    // iterate over array of dates
    for (const date of gameDates) {

        // dates and file names don't align
        // file names don't have leading 0s for month/day
        const dateSplit = date.split("-")

        const year = dateSplit[0]
        let month = dateSplit[1], day = dateSplit[2]

        // check for leading 0 and remove if there
        if (month[0] === '0') {
            month = month[1]
        }

        if (day[0] === "0") {
            day = day[1]
        }

        const dateRejoined = [year, month, day].join("-")

        // require the json with that date in the file name
        let json = require(`../../../data/player-playoff-box-scores-by-date/${dateRejoined}-player_box_scores.json`)

        // iterate over all boxscores in that file
        for (const boxScore of json) {

            // save the boxscore and pass in the current date we are iterating over
            await saveBoxScore(boxScore, date)
        }

        console.log(`All boxscores entered for date: ${date}`)
    }
}

saveBoxScores()
    .then(() => {
        console.log(`All box scores entered successfully!`)
    })
    .catch(error => {
        console.error(error)
        throw error
    })