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
    const { player_id } = req.params
    


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

    let playerSplitsReponse: QueryResult

    try {
        playerSplitsReponse = await pool.query(playerSplitsQuery, [player_id])
    } catch (error) {
        console.log(`Error getting regular season stats for player #${player_id}. ${error}`)

        return res.status(500).json({ message: `Error getting regular season stats for player #${player_id}. ${error}`})
    }

    res.status(200).json({ message: `Got stats for player #${player_id}`, splits: playerSplitsReponse.rows[0]})
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