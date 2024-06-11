import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
dotenv.config()

import { Pool, QueryResult } from 'pg';

// create and export db connection
export const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    port: 5432,
    password: process.env.DATABASE_PASSWORD,
    max: 150,
    min: 0
})


// connection test
// interface TableInfo {
//     table_name: string;
// }

// const checkDatabaseConnection = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const client = await pool.connect();

//         // Query tables in the 'public' schema.
//         const result: QueryResult<TableInfo> = await client.query(`
//         SELECT table_name
//         FROM information_schema.tables
//         WHERE table_schema = 'public'
//     `);

//         client.release(); // Release the client back to the pool.

//         const tables: string[] = result.rows.map((row: TableInfo) => row.table_name);
//         console.log('Connected to the database. Tables:', tables);

//         // Continue with the next middleware or route handler.
//         next();
//     } catch (error) {
//         console.error('Error connecting to the database', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// // Example usage in an Express route.
// app.get('/', checkDatabaseConnection, (req: Request, res: Response) => {
//     res.send('Hello, world!');
// });


// middleware to check for token
const checkAuth = require('./middleware/check-auth')

// route imports
const userRoutes = require("./routes/user-routes")
const teamRoutes = require("./routes/team-routes")
const playerRoutes = require("./routes/player-routes")
const gameRoutes = require("./routes/game-routes")

const app: Express = express();

app.use(bodyParser.json())

// middleware to work around CORS errors since our front and backend are on separate servers
// attaches headers on its responses to prevent the browser from blocking the response
app.use((req, res, next) => {
    // determines which domains have access, the * means all are acceptable
    res.setHeader("Access-Control-Allow-Origin", "*")

    // specifies which headers are allowed on incoming requests to be handled by this API
    // Content-Type and Authorization are the only 2 that aren't default in this group
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization")

    // allowed methods for incoming requests
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")

    next()
})

// route variables
app.use("/nba/teams", teamRoutes)
app.use("/nba/players", playerRoutes)
app.use("/nba/games", gameRoutes)
app.use("/user", userRoutes)
// app.use("/league", leagueRoutes)

// app.use(checkAuth)


// ERROR ROUTE
// middleware with 4 parameters is treated as a special middleware by express and will only be executed on requests that have an error associated with it
app.use((error: { message: string, code: number }, req: Request, res: Response, next: NextFunction) => {
    // checks to see if we've already sent the error response with a header to the end user
    if (res.headersSent) {
        return next(error);
    }

    // if we reach this code, no error message has been sent, so we will send one now
    // Checks for a code/message attached to the error object, or sets it to 500 and a default error message
    // this is triggered by either throwing an error or passing an error to next() in our routes
    // HAS TO BE PASSED IN NEXT() IF ASYNC CODE
    res
        .status(error.code || 500)
        .json({ message: error.message || "Something went wrong!" });
});

app.listen(4000, () => {
    console.log(`Server is running on port 4000`);
});
