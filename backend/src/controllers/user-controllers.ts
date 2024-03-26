const bcrypt = require('bcryptjs');
import { pool } from "../server"
import { Request, Response, NextFunction } from "express"
const { validationResult } = require("express-validator")
import { QueryResult } from "pg";
const jwt = require("jsonwebtoken")

// types/interfaces
interface SignUpRequestBody {
    username: string,
    email: string,
    password: string
}

interface LoginRequestBody {
    username?: string,
    email?: string,
    password: string
}

// get all users
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const userQuery: string = "SELECT * FROM users"
    let userResponse

    try {
        userResponse = await pool.query(userQuery)
    } catch (error) {
        console.log(`Error getting all users`, 500)

        return res.status(500).json({ message: "Error getting all users." })
    }

    res.status(200).json({ message: 'Got all users.', users: userResponse.rows })
}

// signUp a new user
export const signUp = async (req: Request, res: Response, next: NextFunction) => {

    // looks into req object and checks for any validation errors that were picked up. Returns an object
    const errors = validationResult(req)

    // check to see if there are any errors and throw error if so
    if (!errors.isEmpty()) {

        console.log(errors)

        return res.status(401).json({ message: "There's something wrong with the information you entered. Please make sure you entered a valid email and password." })
    }

    // pull data from body
    const { username, email, password }: SignUpRequestBody = req.body


    // query database to see if username or email is already taken
    const nameCheckQuery: string = "SELECT * FROM users WHERE username = $1"
    const emailCheckQuery: string = "SELECT * FROM users WHERE email = $1"

    let nameResponse: QueryResult, emailResponse: QueryResult

    try {
        nameResponse = await pool.query(nameCheckQuery, [username])
    } catch (error) {
        console.log(error)

        return res.status(500).json({ message: `Error checking if username is available: ${error}` })
    }

    try {
        emailResponse = await pool.query(emailCheckQuery, [email])
    } catch (error) {
        console.log(error)

        return res.status(500).json({ message: `Error checking if email is available: ${error}` })
    }

    if (nameResponse.rows.length > 0) {
        res.status(409).json({ message: "This username is taken!", user_id: nameResponse.rows[0].user_id })
        return
    } else if (emailResponse.rows.length > 0) {
        res.status(409).json({ message: "This email is taken!", user_id: emailResponse.rows[0].user_id })
        return
    }

    // if we don't get any responses, create the user
    const createUserQuery: string = "INSERT INTO users (username, email, password, admin, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *"
    let createUserResponse: QueryResult, encryptedPassword: string

    try {
        // encrypt password
        encryptedPassword = await bcrypt.hash(password, 10)
    } catch (error) {
        console.log(`Error hashing password: ${error}`)

        return res.status(500).json({ message: `Error hashing password: ${error}` })
    }

    // create user with hashed password
    try {
        console.log('Attempting to create user')
        createUserResponse = await pool.query(createUserQuery, [username, email, encryptedPassword, false])
    } catch (error) {
        console.log(`Error creating new user: ${error}`)

        return res.status(500).json({ message: `Error creating new user: ${error}` })
    }

    let token
    try {
        token = jwt.sign({ user_id: createUserResponse.rows[0].user_id, email: createUserResponse.rows[0].email },
            process.env.JWT_TOKEN,
            { expiresIn: '1h' }
        )
    } catch (error) {
        console.log(`Error creating token: ${error}`)

        return res.status(500).json({ message: `Error creating token: ${error}` })
    }

    res.status(201).json({ message: "Successfully created user!", user_id: createUserResponse.rows[0].user_id, email: createUserResponse.rows[0].email, token: token })
}

// login user
export const login = async (req: Request, res: Response, next: NextFunction) => {
    // grab username and password from req body
    const { username, email, password }: LoginRequestBody = req.body

    // check if user exists in database
    let userQuery: string, userQueryResult: QueryResult

    // update query based on if user signs in with email or username
    username ? userQuery = "SELECT * FROM users WHERE username = $1" : userQuery = "SELECT * FROM users WHERE email = $1"

    try {
        userQueryResult = await pool.query(userQuery, [username ? username : email])
    } catch (error) {
        console.log(`Something went wrong trying to find the user. Please try again. ${error}`, 500)

        return res.status(500).json({ message: `Something went wrong trying to find the user. Please try again. ${error}` })
    }

    // if query didn't return a user, ask user to create an account
    if (userQueryResult.rows.length === 0) {

        return res.status(404).json({ message: `Couldn't find a user with that username. Maybe try signing up?` })
    }

    // reach this point, there's a user in our database with that username or email. Now we check the password
    let isValidPassword: boolean = false

    try {
        // compare given password with stored db password
        isValidPassword = await bcrypt.compare(password, userQueryResult.rows[0].password)
    } catch (error) {
        console.log(`Error comparing entered password to stored password. ${error}`)

        return res.status(500).json({ message: `Error comparing entred password to stored password. ${error}` })
    }

    // no match case
    if (!isValidPassword) {
        return res.status(401).json({ message: "Incorrect Password. Please try again." })
    }

    let token
    try {
        token = jwt.sign({ user_id: userQueryResult.rows[0].user_id, email: userQueryResult.rows[0].email },
            process.env.JWT_TOKEN,
            { expiresIn: '1h' }
        )
    } catch (error) {
        console.log(`Error creating login token: ${error}`)

        return res.status(500).json({ message: `Error creating login token: ${error}` })
    }

    // no issues, log user in
    res.status(200).json({ message: `login successful!`, user_id: userQueryResult.rows[0].user_id, email: userQueryResult.rows[0].email, token: token })
}

// change password
export const changePassword = async (req: Request, res: Response, next: NextFunction) => {

    // looks into req object and checks for any validation errors that were picked up. Returns an object
    const errors = validationResult(req)

    // check to see if there are any errors and throw error if so
    if (!errors.isEmpty()) {

        console.log(errors)

        return res.status(401).json({ message: `Please make sure your new password is formatted correctly.` })
    }

    // need username, email, current password, and new password from req.body
    const { username, email, password }: LoginRequestBody = req.body
    const new_password = (req.body as { new_password: string }).new_password

    // fetch user from database
    let userQuery: string, userQueryResult: QueryResult

    // update query based on if user signs in with email or username
    username ? userQuery = "SELECT * FROM users WHERE username = $1" : userQuery = "SELECT * FROM users WHERE email = $1"

    try {
        userQueryResult = await pool.query(userQuery, [username ? username : email])
    } catch (error) {
        console.log(`Something went wrong trying to find the user. Please try again. ${error}`, 500)

        return res.status(500).json({ message: `Something went wrong trying to find the user. Please try again. ${error}` })
    }

    // if query didn't return a user, return error
    if (userQueryResult.rows.length === 0) {

        return res.status(401).json({ message: `Couldn't find a user with that email or username.` })
    }

    // found user, now need to verify password = saved password in database
    let passwordsMatch: boolean

    try {
        // compare given password with stored db password
        passwordsMatch = await bcrypt.compare(password, userQueryResult.rows[0].password)
    } catch (error) {
        console.log(`Error comparing current password to stored password. ${error}`)

        return res.status(500).json({ message: `Error comparing current password to stored password: ${error}` })
    }

    if (!passwordsMatch) {
        return res.status(401).json({ message: `Incorrect password. Please try again.` })
    }

    // if passwords match, hash new password
    let encryptedPassword: string

    try {
        // encrypt password
        encryptedPassword = await bcrypt.hash(new_password, 10)
    } catch (error) {
        console.log(`Error hashing password: ${error}`)

        return res.status(500).json({ message: `Error hashing password: ${error}` })
    }

    //  and save it as user's password
    const updatePasswordQuery: string = "UPDATE users SET password = $1, updated_at = NOW() WHERE user_id = $2 RETURNING *"
    let updatePasswordResult: QueryResult
    try {
        updatePasswordResult = await pool.query(updatePasswordQuery, [encryptedPassword, userQueryResult.rows[0].user_id])
    } catch (error) {
        console.log(`Error updating user password: ${error}`)

        return res.status(500).json({ message: `Error updating user password: ${error}` })
    }

    res.status(201).json({ message: "Updated password!", user_id: userQueryResult.rows[0].user_id })
}

// check if username exists already
export const getUserIDByUsername = async (req: Request, res: Response, next: NextFunction) => {
    // pull data from body
    const username = (req.body as { username: string }).username

    // query database to see if username or email is already taken
    let nameCheckQuery: string = "SELECT * FROM users WHERE username = $1"

    let nameResponse: QueryResult

    try {
        nameResponse = await pool.query(nameCheckQuery, [username])
    } catch (error) {
        console.log(error)

        return res.status(500).json({ message: `Error checking if username is available: ${error}` })
    }

    if (nameResponse.rows.length > 0) {
        return res.status(200).json({ message: "Username Taken.", user_id: nameResponse.rows[0].user_id })
    } else {
        return res.status(200).json({ message: "Username available" })
    }
}

export const changeAdminStatus = async (req: Request, res: Response, next: NextFunction) => {

    // pull data from params
    const user_id: string = req.params.user_id

    // query database for user
    let userQuery: string = "SELECT * FROM users WHERE user_id = $1"
    let userQueryResult: QueryResult

    try {
        userQueryResult = await pool.query(userQuery, [user_id])
    } catch (error) {
        console.log(`Error finding user`, 500)

        return res.status(500).json({ message: `Error finding user: ${error}` })
    }

    if (userQueryResult.rows.length < 0) {

        return res.status(500).json({ message: `No user with this id. Please try again.` })
    }

    // query database and update based on current status
    let adminStatus: boolean
    userQueryResult.rows[0].admin ? adminStatus = false : adminStatus = true

    let adminQuery: string = "UPDATE users SET admin = $1, updated_at = NOW() WHERE user_id = $2 RETURNING *"
    let adminQueryResult: QueryResult

    try {
        adminQueryResult = await pool.query(adminQuery, [adminStatus, user_id])
    } catch (error) {
        console.log(`Error updating user #${user_id}'s admin status to ${adminStatus}. ${error}`, 500)

        return res.status(500).json({ message: `Error updating user #${user_id}'s admin status to ${adminStatus}. ${error}` })
    }

    res.status(201).json({ message: `Updated user #${user_id}'s admin status to ${adminStatus}`, user_id: user_id })
}