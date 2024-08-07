import { pool } from "../server"
import { Request, Response, NextFunction } from "express"
import { QueryResult } from "pg";

// create favorite
export const createFavorite = async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, team_id, player_id, game_id } = req.body

    const favoriteQuery: string = `INSERT INTO user_favorites (user_id, team_id, player_id, game_id) VALUES ($1, $2, $3, $4) RETURNING *`

    let favoriteResponse: QueryResult

    // insert into databse user_favorites table
    try {
        favoriteResponse = await pool.query(favoriteQuery, [user_id, team_id, player_id, game_id])
    } catch (error) {
        console.log(`Error adding favorite: ${error}`)

        return res.status(500).json({ message: `Error adding favorite: ${error}` })
    }

    res.status(201).json({ message: `Added favorite!`, favorite: favoriteResponse.rows[0] })
}

// remove favorite
export const removeFavorite = async (req: Request, res: Response, next: NextFunction) => {
    const { favorite_id } = req.params

    const deleteQuery: string = `DELETE FROM user_favorites WHERE favorite_id = $1`

    let deleteResponse: QueryResult

    try {
        deleteResponse = await pool.query(deleteQuery, [favorite_id])
    } catch (error) {
        console.log(`Error deleting favorite #${favorite_id}. ${error}`)

        return res.status(500).json({ message: `Error deleting favorite #${favorite_id}. ${error}` })
    }

    return res.status(204).json({ message: `Deleted favorite #${favorite_id}` })
}

// get all favorites
export const getAllFavorites = async (req: Request, res: Response, next: NextFunction) => {

    interface Favorite {
        favorites_id: number;
        user_id: number;
        team_id?: number;
        player_id?: number;
        game_id?: number;
    }

    interface GroupedFavorites {
        favorite_teams: Favorite[];
        favorite_players: Favorite[];
        favorite_games: Favorite[];
    }


    const { user_id } = req.params

    const allFavoritesQuery: string = "SELECT * FROM user_favorites WHERE user_id = $1"

    let allFavoritesResponse: QueryResult

    try {
        allFavoritesResponse = await pool.query(allFavoritesQuery, [user_id])
    } catch (error) {
        console.log(`Error getting favorites for user ${user_id}, ${error}`)

        return res.status(500).json({ message: `Error getting favorites for user ${user_id}, ${error}` })
    }

    const favorites: GroupedFavorites = {
        favorite_teams: [],
        favorite_players: [],
        favorite_games: []
    };

    allFavoritesResponse.rows.forEach((row: any) => {
        if (row.team_id !== null) favorites.favorite_teams.push(row);
        if (row.player_id !== null) favorites.favorite_players.push(row);
        if (row.game_id !== null) favorites.favorite_games.push(row);
    });

    return res.status(200).json({ message: `Got favorites for user ${user_id}`, favorites: favorites })
}