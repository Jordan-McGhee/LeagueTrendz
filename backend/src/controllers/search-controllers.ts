import { pool } from "../server"
import { Request, Response, NextFunction } from "express"
import { QueryResult } from "pg";

export const searchForTerm = async (req: Request, res: Response, next: NextFunction) => {
    const { term } = req.params

    // no term? return error
    if (!term) {
        return res.status(400).json({ error: 'Search term is required' });
    }

    const teamsQuery = `SELECT * FROM teams WHERE (full_name ILIKE $1 OR abbreviation ILIKE $1) AND team_id != -1 ORDER BY team_id, CASE WHEN full_name ILIKE $2 THEN 1 WHEN abbreviation ILIKE $2 THEN 2 WHEN full_name ILIKE $1 THEN 3 WHEN abbreviation ILIKE $1 THEN 4 ELSE 5 END LIMIT 5`;

    const playersQuery = 'SELECT player_id, team_id, name, height, weight, player_position, jersey_number, photo_url FROM players WHERE name ILIKE $1 ORDER BY CASE WHEN name ILIKE $2 THEN 1 WHEN name ILIKE $1 THEN 2 ELSE 3 END LIMIT 10'

    let teamsResponse: QueryResult, playersResponse: QueryResult

    try {
        // first term looks for term anywhere in the name, second looks at the beginning. For ordering matches
        teamsResponse = await pool.query(teamsQuery, [`%${term}%`, `${term}%`])
    } catch (error) {
        console.log(`Error searching for terms: ${error}`)

        return res.status(500).json({ message: `Error searching for terms: ${error}`})
    }
    
    try {
        playersResponse = await pool.query(playersQuery, [`%${term}%`, `${term}%`])
    } catch (error) {
        console.log(`Error searching for players: ${error}`)

        return res.status(500).json({ message: `Error searching for players: ${error}`})
    }

    return res.status(200).json({ message: `Returned search terms!`, teamResults: teamsResponse.rows, playerResults: playersResponse.rows})
}