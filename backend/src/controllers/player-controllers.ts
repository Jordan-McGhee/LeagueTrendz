import { pool } from "../server"
import { Request, Response, NextFunction } from "express"
import { QueryResult } from "pg";

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
        currentTeamResponse = await pool.query(currentTeamQuery, [ player.team_id ])
    } catch (error) {
        console.log(`Error getting current team for ${player.name}. ${error}`)

        return res.status(500).json({ message: `Error getting current team for ${player.name}. ${error}`})
    }

    let statQuery: string = `SELECT p.name, p.player_id, pt.avg_pts, ranks.pts_rank, pt.avg_reb, ranks.reb_rank, pt.avg_ast, ranks.ast_rank, pt.avg_fg_percentage, ranks.fg_rank FROM player_2023_24_regularseason_totals_and_averages pt JOIN players p ON pt.player_id = p.player_id INNER JOIN ( SELECT player_id, DENSE_RANK() OVER (ORDER BY avg_pts DESC, gp DESC, min DESC) AS pts_rank, DENSE_RANK() OVER (ORDER BY avg_reb DESC, gp DESC, min DESC) AS reb_rank, DENSE_RANK() OVER (ORDER BY avg_ast DESC, gp DESC, min DESC) AS ast_rank, DENSE_RANK() OVER (ORDER BY avg_fg_percentage DESC, gp DESC, min DESC) AS fg_rank FROM player_2023_24_regularseason_totals_and_averages) ranks ON pt.player_id = ranks.player_id WHERE p.player_id = ${player.player_id};`

    let statResponse: QueryResult

    try {
        statResponse = await pool.query(statQuery)
    } catch (error) {
        console.log(`Error getting stats for ${player.name}`)

        return res.status(500).json({ message: `Error getting stats for ${player.name}. ${error}`})
    }

    res.status(200).json({ message: `Got player #${player_id}`, player: player, currentTeam: currentTeamResponse.rows[0], stats: statResponse.rows[0]})
}