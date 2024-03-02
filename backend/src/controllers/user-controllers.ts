const HttpError = require("../models/http-error")
const bcrypt = require('bcrypt');
import { pool, tempPool } from "../db"
import { Request, Response, NextFunction } from "express"

// signUp a new user
export const signUp = async (req: Request, res: Response, next: NextFunction) => {

    // interfaces
    interface SignUpRequestBody {
        username: string,
        email: string,
        password: string
    }

    // pull data from body
    const { username, email, password }: SignUpRequestBody = req.body
    

    // query database to see if username or email is already taken
    const nameCheckQuery: string = "SELECT * FROM users WHERE username = $1"
    const emailCheckQuery: string = "SELECT * FROM users WHERE email = $1"

    let nameResponse, emailResponse

    try {
        nameResponse = await tempPool.query(nameCheckQuery, [ username ])
    } catch (error) {
        console.log(error)
        return next(new HttpError(
            `Error checking if username is available: ${ error }`, 500
        ))
    }

    try {
        emailResponse = await tempPool.query(emailCheckQuery, [ email ])
    } catch (error) {
        console.log(error)
        return next(new HttpError(
            `Error checking if email is available: ${ error }`, 500
        ))
    }

    if (nameResponse.rows.length > 0) {
        res.status(409).json({ message: "This username is taken!", user_id: nameResponse.rows[0].user_id})
    } else if (emailResponse.rows.length > 0) {
        res.status(409).json({ message: "This email is taken!", user_id: emailResponse.rows[0].user_id})
    }

    // if we don't get any responses, create the user


    const createUserQuery: string = "INSERT INTO users (username, email, password, admin, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *"
    let createUserResponse, encryptedPassword

    try {
        // encrypt password
        encryptedPassword = await bcrypt.hash(password, 10)
    } catch (error) {
        console.log(`Error hashing password: ${error}`)
        return next(new HttpError(
            `Error hashing password: ${error}`, 500
        ))
    }

    // create user with hashed password
    try {
        console.log('Attempting to create user')
        createUserResponse = await tempPool.query(createUserQuery, [ username, email, encryptedPassword, false ])
    } catch (error) {
        console.log(`Error creating new user: ${error}`)
        return next(new HttpError(
            `Error creating new user: ${error}`, 500
        ))
    }

    res.status(201).json(createUserResponse.rows[0])
}

// login user
// export const login = async (req: Request, res: Response, next: NextFunction) => {

// check if username exists already
export const getUserIDByUsername = async (req:Request, res: Response, next: NextFunction) => {
        // pull data from body
        const username = (req.body as { username: string }).username
    
        // query database to see if username or email is already taken
        let nameCheckQuery: string = "SELECT * FROM users WHERE username = $1"

        let nameResponse
    
        try {
            nameResponse = await pool.query(nameCheckQuery, [ username ])
        } catch (error) {
            console.log(error)
            return next(new HttpError(
                `Error checking if username is available: ${ error }`, 500
            ))
        }
    
        if (nameResponse.rows.length > 0) {
    
        }
}
