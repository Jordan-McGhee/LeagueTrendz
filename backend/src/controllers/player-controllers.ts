import { pool } from "../server"
import { Request, Response, NextFunction } from "express"
import { Query, QueryResult } from "pg";

export const getAllPlayers = async (req: Request, res: Response, next: NextFunction) => {
    const playersQuery: string = "SELECT * FROM players"
    let playersResponse: QueryResult

    try {
        playersResponse = await pool.query(playersQuery)
    } catch (error) {
        console.log(`Error getting all players: ${error}`)

        return res.status(500).json({ message: `Error getting all players: ${error}` })
    }

    res.status(200).json({ message: `Got all players`, players: playersResponse.rows })
}

// Stat Leaders
export const getPlayerStatLeaders = async (req: Request, res: Response, next: NextFunction) => {
    // averages
    const seasonAverageStatQuery: string = "SELECT top_avg_pts, top_avg_fgm, top_avg_fg_percentage, top_avg_tpm, top_avg_tp_percentage, top_avg_ft_percentage, top_avg_reb, top_avg_ast, top_avg_stl, top_avg_blk, top_avg_pf, top_avg_turnovers FROM top_regularseason_stat_leaders"

    let seasonAverageStatResponse: QueryResult

    // season stats request
    try {
        seasonAverageStatResponse = await pool.query(seasonAverageStatQuery)
    } catch (error) {
        console.log(`Error getting season average stats: ${error}`)

        return res.status(500).json({ message: `Error getting season average stats: ${error}`})
    }

    // totals
    const seasonTotalStatQuery: string = "SELECT top_total_pts, top_total_fgm, top_total_tpm, top_total_reb, top_total_reb, top_total_ast, top_total_stl, top_total_blk, top_total_pf, top_total_turnovers FROM top_regularseason_stat_leaders"

    let seasonTotalStatResponse: QueryResult

    // season stats request
    try {
        seasonTotalStatResponse = await pool.query(seasonTotalStatQuery)
    } catch (error) {
        console.log(`Error getting season stats: ${error}`)

        return res.status(500).json({ message: `Error getting season stats: ${error}`})
    }

    res.status(200).json({ message: `Got season stats leaders!`, seasonAverageLeaders: seasonAverageStatResponse.rows[0], seasonTotalLeaders: seasonTotalStatResponse.rows[0]})
}

export const getPlayerStatLeadersTable = async (req: Request, res: Response, next: NextFunction) => {

    // variables
    const { seasonType, perMode, statCategory } = req.params

    let statLeaderResponse: QueryResult

    // regular season
    if (seasonType === 'regular-season') {

        let regularSeasonQuery: string = ''
        
        if (statCategory === "fg_percentage") {
            regularSeasonQuery = `SELECT * FROM player_2023_24_regularseason_totals_and_averages WHERE fgm >= 200 ORDER BY ${statCategory} DESC LIMIT 50`
        } else if (statCategory === "tp_percentage") {
            regularSeasonQuery = `SELECT * FROM player_2023_24_regularseason_totals_and_averages WHERE tpm >= 70 ORDER BY ${statCategory} DESC LIMIT 50`
        } else if (statCategory === "ft_percentage") {
            regularSeasonQuery = `SELECT * FROM player_2023_24_regularseason_totals_and_averages WHERE ftm >= 100 ORDER BY ${statCategory} DESC LIMIT 50`
        } else {
            const orderBy = perMode === "average" && !statCategory.includes("avg_") ? `avg_${statCategory}` : statCategory

            regularSeasonQuery = `SELECT * FROM player_2023_24_regularseason_totals_and_averages WHERE gp >= 50 ORDER BY ${orderBy} DESC LIMIT 50`
        }

        try {
            statLeaderResponse = await pool.query(regularSeasonQuery)
        } catch (error) {
            console.log(`Error getting season stats for table: ${error}`)

            return res.status(500).json({ message: `Error getting season stats for table: ${error}`})
        }

        return res.status(200).json({ message: "Got leader stats for table!", stats: statLeaderResponse.rows})
    } else {
        // playoffs

    }
}


// Game High Leaders and BoxScores
export const getGameHighLeaders = async (req: Request, res: Response, next: NextFunction) => {
    const gameStatQuery: string = "SELECT * FROM top_regularseason_game_stats"

    let gameStatResponse: QueryResult

    // game stats request
    try {
        gameStatResponse = await pool.query(gameStatQuery)
    } catch (error) {
        console.log(`Error getting game stat: ${error}`)

        return res.status(500).json({ message: `Error getting game stat: ${error}`})
    }

    res.status(200).json({ message: `Got game stats leaders!`, gameLeaders: gameStatResponse.rows[0]})
}

export const getGameHighBoxScoresTable = async (req: Request, res: Response, next: NextFunction) => {
    const { seasonType, statCategory } = req.params

    let boxScoreResponse: QueryResult

    // regular season
    if (seasonType === 'regular-season') {
        const regularSeasonQuery: string = `SELECT * FROM player_gamelog_view WHERE postseason = FALSE ORDER BY ${statCategory} DESC LIMIT 50`

        try {
            boxScoreResponse = await pool.query(regularSeasonQuery)
        } catch (error) {
            console.log(`Error getting box scores for table: ${error}`)

            return res.status(500).json({ message: `Error getting box scores for table: ${error}`})
        }

        return res.status(200).json({ message: `Got game box scores ordered by ${statCategory}`, games: boxScoreResponse.rows})
        
    } else {
        // playoffs
    }
}


// SINGLE PLAYER MAIN DATA
export const getSinglePlayer = async (req: Request, res: Response, next: NextFunction) => {
    const { player_id } = req.params

    const playerQuery: string = "SELECT * FROM players WHERE player_id = $1"

    let playerResponse: QueryResult

    try {
        playerResponse = await pool.query(playerQuery, [player_id])
    } catch (error) {
        console.log(`Error getting player #${player_id}. ${error}`)

        return res.status(500).json({ message: `Error getting player #${player_id}. ${error}` })
    }

    const player = playerResponse.rows[0]

    const currentTeamQuery: string = "SELECT * FROM teams WHERE team_id = $1"

    let currentTeamResponse: QueryResult

    try {
        currentTeamResponse = await pool.query(currentTeamQuery, [player.team_id])
    } catch (error) {
        console.log(`Error getting current team for ${player.name}. ${error}`)

        return res.status(500).json({ message: `Error getting current team for ${player.name}. ${error}` })
    }

    let statQuery: string = `SELECT p.name, p.player_id, pt.avg_pts, ranks.pts_rank, pt.avg_reb, ranks.reb_rank, pt.avg_ast, ranks.ast_rank, pt.avg_fg_percentage, ranks.fg_rank FROM player_2023_24_regularseason_totals_and_averages pt JOIN players p ON pt.player_id = p.player_id INNER JOIN ( SELECT player_id, DENSE_RANK() OVER (ORDER BY avg_pts DESC, gp DESC, min DESC) AS pts_rank, DENSE_RANK() OVER (ORDER BY avg_reb DESC, gp DESC, min DESC) AS reb_rank, DENSE_RANK() OVER (ORDER BY avg_ast DESC, gp DESC, min DESC) AS ast_rank, DENSE_RANK() OVER (ORDER BY avg_fg_percentage DESC, gp DESC, min DESC) AS fg_rank FROM player_2023_24_regularseason_totals_and_averages) ranks ON pt.player_id = ranks.player_id WHERE p.player_id = ${player.player_id};`

    let statResponse: QueryResult

    try {
        statResponse = await pool.query(statQuery)
    } catch (error) {
        console.log(`Error getting stats for ${player.name}`)

        return res.status(500).json({ message: `Error getting stats for ${player.name}. ${error}` })
    }

    res.status(200).json({ message: `Got player #${player_id}`, player: player, currentTeam: currentTeamResponse.rows[0], stats: statResponse.rows[0] })
}

// SINGLE PLAYER OVERVIEW DATA
export const getSinglePlayerOverview = async (req: Request, res: Response, next: NextFunction) => {
    const { player_id, team_id } = req.params
    
    const teamStandingsQuery: string = "WITH team_division AS (SELECT division FROM standings_view WHERE team_id = $1) SELECT s.team_id, s.full_name, s.abbreviation, s.division, s.wins, s.losses, ROUND((s.wins::float / (s.wins + s.losses))::numeric, 3) AS pct, CASE WHEN ROW_NUMBER() OVER (PARTITION BY s.division ORDER BY s.wins DESC) = 1 THEN 0 ELSE (SELECT Max(wins) - s.wins FROM standings_view sv WHERE sv.division = s.division ) END AS gb, last_10 FROM standings_view s JOIN team_division td ON s.division = td.division ORDER BY wins DESC"

    let teamStandingsResponse: QueryResult
    try {
        teamStandingsResponse = await pool.query(teamStandingsQuery, [team_id])
    } catch (error) {
        console.log(`Error getting team standings for team #${team_id}'s division. ${error}`)

        return res.status(500).json({ message: `Error getting team standings for team #${team_id}'s division. ${error}`})
    }

    const lastFiveGamesQuery: string = "SELECT pgv.*, TO_CHAR(pgv.game_date, 'Day') AS day_of_week, player_team.wins AS player_team_wins, player_team.losses AS player_team_losses, opp_team.wins AS opp_team_wins, opp_team.losses AS opp_team_losses, CASE WHEN player_team.conference = opp_team.conference THEN TRUE ELSE FALSE END AS conference_game, CASE WHEN player_team.division = opp_team.division THEN TRUE ELSE FALSE END AS division_game FROM (SELECT * FROM player_gamelog_view WHERE player_id = $1 ORDER BY game_date DESC LIMIT 5) pgv LEFT JOIN standings_view AS player_team ON pgv.player_team_id = player_team.team_id LEFT JOIN standings_view AS opp_team ON pgv.opp_team_id = opp_team.team_id ORDER BY game_date DESC"
    
    let lastFiveGamesResult: QueryResult

    try {
        lastFiveGamesResult = await pool.query(lastFiveGamesQuery, [player_id])
    } catch (error) {
        console.log(`Error getting last five games for player #${player_id}. ${error}`)

        return res.status(500).json({ message: `Error getting last five games for player #${player_id}. ${error}`})
    }

    const playerSplitsQuery: string = 'SELECT * FROM player_stats_splits_view WHERE player_id = $1'

    let playerSplitsResponse: QueryResult

    try {
        playerSplitsResponse = await pool.query(playerSplitsQuery, [player_id])
    } catch (error) {
        console.log(`Error getting splits for player #${player_id}. ${error}`)

        return res.status(500).json({ message: `Error getting splits for player #${player_id}. ${error}`})
    }

    res.status(200).json({ message: `Got overview stats for player #${player_id}`, teamStandings: teamStandingsResponse.rows, lastFive: lastFiveGamesResult.rows, splits: playerSplitsResponse.rows[0]})
}

// SINGLE PLAYER STATS VIEW DATA
export const getSinglePlayerStatsView = async (req: Request, res: Response, next: NextFunction) => {
    const { player_id } = req.params

    const playerStatsQuery: string = "SELECT * FROM player_2023_24_regularseason_totals_and_averages WHERE player_id = $1"

    let playerStatsResponse: QueryResult

    try {
        playerStatsResponse = await pool.query(playerStatsQuery, [player_id])
    } catch (error) {
        console.log(`Error getting regular season stats for player #${player_id}. ${error}`)

        return res.status(500).json({ message: `Error getting regular season stats for player #${player_id}. ${error}`})
    }

    res.status(200).json({ message: `Got stats for player #${player_id}`, stats: playerStatsResponse.rows[0]})
}


// SINGLE PLAYER SPLITS VIEW DATA
export const getSinglePlayerSplitsView = async (req: Request, res: Response, next: NextFunction) => {
    const { player_id } = req.params

    const playerSplitsQuery: string = "SELECT * FROM player_stats_splits_view WHERE player_id = $1"

    let playerSplitsResponse: QueryResult

    try {
        playerSplitsResponse = await pool.query(playerSplitsQuery, [player_id])
    } catch (error) {
        console.log(`Error getting splits for player #${player_id}. ${error}`)

        return res.status(500).json({ message: `Error getting splits for player #${player_id}. ${error}`})
    }

    res.status(200).json({ message: `Got splits for player #${player_id}`, splits: playerSplitsResponse.rows[0]})
}


// SINGLE PLAYER GAME LOG VIEW DATA
export const getSinglePlayerGameLogView = async (req: Request, res: Response, next: NextFunction) => {
    const { player_id } = req.params

    const playerGameLogQuery: string = "SELECT EXTRACT(MONTH FROM g.game_date) AS month, EXTRACT(YEAR FROM g.game_date) AS year, g.player_id AS player_id, g.player_name AS name,COUNT(*) AS games_played, ARRAY_AGG(JSON_BUILD_OBJECT('game_id', g.game_id,'game_date', g.game_date,'day_of_week', TO_CHAR(g.game_date, 'Day'), 'game_location', g.game_location, 'game_result', g.game_result, 'player_team_score', g.player_team_score, 'opp_team_id', g.opp_team_id, 'opp_team_abbreviation', g.opp_team_abbreviation, 'opp_team_full_name', g.opp_team_full_name, 'opp_team_score', g.opp_team_score, 'player_id', g.player_id, 'player_name', g.player_name, 'minutes', g.minutes, 'pts', g.pts, 'fgm', g.fgm, 'fga', g.fga, 'fg_percentage', g.fg_percentage, 'tpm', g.tpm, 'tpa', g.tpa, 'tp_percentage', g.tp_percentage, 'ftm', g.ftm, 'fta', g.fta, 'ft_percentage', g.ft_percentage, 'orb', g.orb, 'drb', g.drb, 'reb', g.reb, 'ast', g.ast, 'stl', g.stl, 'blk', g.blk, 'turnovers', g.turnovers, 'pf', g.pf) ORDER BY g.game_date DESC) AS games, JSON_BUILD_OBJECT('avg_minutes', ROUND(SUM(g.minutes) * 1.0 / COUNT(*), 1),'avg_pts', ROUND(AVG(g.pts), 1),'avg_fgm', ROUND(AVG(g.fgm), 1),'avg_fga', ROUND(AVG(g.fga), 1),'avg_fg_percentage', ROUND(SUM(g.fgm) * 100.0 / NULLIF(SUM(g.fga), 0), 1),'avg_tpm', ROUND(AVG(g.tpm), 1),'avg_tpa', ROUND(AVG(g.tpa), 1),'avg_tp_percentage', ROUND(SUM(g.tpm) * 100.0 / NULLIF(SUM(g.tpa), 0), 1),'avg_ftm', ROUND(AVG(g.ftm), 1),'avg_fta', ROUND(AVG(g.fta), 1),'avg_ft_percentage', ROUND(SUM(g.ftm) * 100.0 / NULLIF(SUM(g.fta), 0), 1),'avg_orb', ROUND(AVG(g.orb), 1),'avg_drb', ROUND(AVG(g.drb), 1),'avg_reb', ROUND(AVG(g.reb), 1),'avg_ast', ROUND(AVG(g.ast), 1),'avg_stl', ROUND(AVG(g.stl), 1),'avg_blk', ROUND(AVG(g.blk), 1),'avg_turnovers', ROUND(AVG(g.turnovers), 1),'avg_pf', ROUND(AVG(g.pf), 1)) AS avg_stats FROM player_gamelog_view g WHERE g.player_id = $1 GROUP BY EXTRACT(MONTH FROM g.game_date), EXTRACT(YEAR FROM g.game_date), g.player_id, g.player_name ORDER BY EXTRACT(YEAR FROM g.game_date) DESC, EXTRACT(MONTH FROM g.game_date) DESC;"

    let playerGameLogResponse: QueryResult

    try {
        playerGameLogResponse = await pool.query(playerGameLogQuery, [player_id])
    } catch (error) {
        console.log(`Error getting game logs for player #${player_id}. ${error}`)

        return res.status(500).json({ message: `Error getting game logs for player #${player_id}. ${error}`})
    }

    res.status(200).json({ message: `Got game logs for player #${player_id}`, log: playerGameLogResponse.rows})
}