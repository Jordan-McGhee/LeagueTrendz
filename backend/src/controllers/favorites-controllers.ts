import { pool } from "../server"
import { Request, Response, NextFunction } from "express"
import { QueryResult } from "pg";

// create favorite
export const createFavorite = async (req: Request, res: Response, next: NextFunction) => {}

// remove favorite
export const removeFavorite = async (req: Request, res: Response, next: NextFunction) => {}

// get all favorites
export const getAllFavorites = async (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req.params

    const allFavoritesQuery: string = "SELECT * FROM user_favorites WHERE user_id = $1"
}

// get favorites home page
export const getFavoritesHome = async (req: Request, res: Response, next: NextFunction) => {}