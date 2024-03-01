const HttpError = require("../models/http-error")
import { pool } from "../db"
import { Request, Response, NextFunction } from "express"

const signUp = async (req: Request, res: Response, next: NextFunction) => {

    // pull data from body
    const { username, email, password } = req.body

    // query database to see if username or email is already taken
    let nameQuery: string = ""
}