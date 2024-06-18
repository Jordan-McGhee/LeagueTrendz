import { pool } from "../server"
import { Request, Response, NextFunction } from "express"
import { Query, QueryResult } from "pg";

// get games by date
export const getGamesByDate = async (req: Request, res: Response, next: NextFunction) => {
    const { date } = req.params

    const gameQuery: string = "SELECT * FROM game_box_scores WHERE game_date = $1"

    let gameResponse: QueryResult

    try {
        gameResponse = await pool.query(gameQuery, [date])
    } catch (error) {
        console.log(`Error finding games from ${date}. ${error}.`)

        return res.status(500).json({ message: `Error finding games from ${date}. ${error}.` })
    }

    res.status(200).json({ message: `Got all games for ${date}`, game: gameResponse.rows })
}

// get single game
export const getGameByID = async (req: Request, res: Response, next: NextFunction) => {
    const { game_id } = req.params

    const gameQuery: string = "SELECT * FROM game_box_scores WHERE game_id = $1"

    let gameResponse: QueryResult

    try {
        gameResponse = await pool.query(gameQuery, [game_id])
    } catch (error) {
        console.log(`Error finding game with id #${game_id}. ${error}.`)

        return res.status(500).json({ message: `Error finding game with id #${game_id}. ${error}` })
    }

    const standingsQuery: string = "SELECT h.team_id AS home_team_id, h.wins AS home_team_wins, h.losses AS home_team_losses, h.home_wins AS home_team_home_wins, h.home_losses AS home_team_home_losses, a.team_id AS away_team_id, a.wins AS away_team_wins, a.losses AS away_team_losses, a.away_wins AS away_team_away_wins, a.away_losses AS away_team_away_losses FROM standings_view_with_gb h JOIN standings_view_with_gb a ON h.team_id = $1 AND a.team_id = $2"

    let standingsResponse: QueryResult

    try {
        standingsResponse = await pool.query(standingsQuery, [gameResponse.rows[0].home_team_id, gameResponse.rows[0].away_team_id])
    } catch (error) {
        console.log(`Error querying for standings data. ${error}`)

        return res.status(500).json({ message: `Error querying for standings data. ${error}` })
    }

    res.status(200).json({ message: `Got data for game #${game_id}`, game: gameResponse.rows[0], standingsData: standingsResponse.rows[0] })
}

// get team stats
export const getTeamStats = async (req: Request, res: Response, next: NextFunction) => {
    
}

// get box score
export const getGameBoxScore = async (req: Request, res: Response, next: NextFunction) => {
    const { game_id } = req.params

    const boxScoreQuery: string = "SELECT game_id, player_team_id, player_id, player_name, player_position, minutes, pts, fgm, fga, fg_percentage, tpm, tpa, tp_percentage, ftm, fta, ft_percentage, orb, drb, reb, ast, stl, blk, turnovers, pf FROM player_gamelog_view WHERE game_id = $1 ORDER BY minutes DESC"

    let boxScoreResponse: QueryResult

    try {
        boxScoreResponse = await pool.query(boxScoreQuery, [game_id])
    } catch (error) {
        console.log(`Error querying for box score data. ${error}`)

        return res.status(500).json({ message: `Error querying for box score data. ${error}` })
    }

    res.status(200).json({ message: `Got box scores for game #${game_id}`, players: boxScoreResponse.rows })
}