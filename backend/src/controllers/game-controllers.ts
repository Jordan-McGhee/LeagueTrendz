import { pool } from "../server"
import { Request, Response, NextFunction } from "express"
import { Query, QueryResult } from "pg";

// get games by date
export const getGamesByDate = async (req: Request, res: Response, next: NextFunction) => {
    const { date } = req.params

    const gameQuery: string = "SELECT * FROM game_box_scores WHERE game_date = $1"

    let gameResponse: QueryResult

    try {
        gameResponse = await pool.query(gameQuery, [ date ])
    } catch (error) {
        console.log(`Error finding games from ${date}. ${error}.`)

        return res.status(500).json({ message: `Error finding games from ${date}. ${error}.`})
    }

    res.status(200).json({ message: `Got all games for ${date}`, game: gameResponse.rows})
}

// get single game
export const getGameByID = async (req: Request, res: Response, next: NextFunction) => {
    const { game_id } = req.params

    const gameQuery: string = "SELECT * FROM game_box_scores WHERE game_id = $1"

    let gameResponse: QueryResult

    try {
        gameResponse = await pool.query(gameQuery, [ game_id ])
    } catch (error) {
        console.log(`Error finding game with id #${game_id}. ${error}.`)

        return res.status(500).json({ message: `Error finding game with id #${game_id}. ${error}`})
    }

    res.status(200).json({ message: `Got data for game #${game_id}`, game: gameResponse.rows[0]})
}