const jwt = require('jsonwebtoken')

import { Request, Response, NextFunction } from "express"

// grab token from attached headers in frontend

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    // will be Authorization : 'Bearer TOKEN' so we need split and grab the second item in the newly created array

    // on certain requests, the browser sets the method to Options automatically. This code is a workaround and will allow our POST requests to continue
    if (req.method === "OPTIONS") {
        return next()
    }

    try {
        // Authorization: 'BEARER TOKEN' so need to split
        const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            return next(new Error(`Authentication failed! No token.`))
        }

        // use jsonwebtoken package to verify the token matches the user
        // returns an object that has the parts of the user object that we added to the token payload in our auth controllers
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)

        // add our userID to the req body and can now be used in following middleware
        req.body.userData = { userID: decodedToken.userID }

        // call next and allow the request to continue through the rest of our API
        next();

    } catch (error) {
        // .split() worked, but the token is incorrect
        return next(new Error('Authentication failed. IN ERROR BLOCK. Please try again!'))
    }
}