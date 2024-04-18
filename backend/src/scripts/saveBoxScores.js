const { Pool } = require("pg")
const gamesData = require("../../../data/2023-24_NBA_season_games.json")
const teams = require("../../../data/teams.json")

const pool = new Pool({
    user: 'ctqmvlqf',
    host: 'ruby.db.elephantsql.com',
    database: 'ctqmvlqf',
    port: 5432,
    password: 'pdZjkxf-n-wtvBPlpCZR4B8DY79dH996',
    max: 150,
    min: 0
})


// UPDATE PLAYER TO INCLUDE BASKETBALL REFERENCE SLUG???

// STAT OBJECT EXAMPLE
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

// EXCEPTIONS OR ISSUES
const issueNames = {

}

// REPLACING UNICODE CHARACTERS
function replaceUnicodeCharacters(name) {
    // Replace special characters with their plain English equivalents using regular expressions
    let replacedName = name.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Remove diacritics
    return replacedName;
}