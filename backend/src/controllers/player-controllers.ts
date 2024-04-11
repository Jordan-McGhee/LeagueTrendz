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

    const currentTeamQuery: string = "SELECT * FROM teams WHERE team_id = $1"

    let currentTeamResponse: QueryResult

    try {
        currentTeamResponse = await pool.query(currentTeamQuery, [ playerResponse.rows[0].team_id])
    } catch (error) {
        console.log(`Error getting current team for ${playerResponse.rows[0].name}. ${error}`)

        return res.status(500).json({ message: `Error getting current team for ${playerResponse.rows[0].name}. ${error}`})
    }

    res.status(200).json({ message: `Got player #${player_id}`, player: playerResponse.rows[0], currentTeam: currentTeamResponse.rows[0]})
}