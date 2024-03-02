import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { pool, tempPool } from "./db"
import dotenv from 'dotenv'
dotenv.config()

import { Pool, QueryResult } from 'pg';



// route imports
const userRoutes = require("./routes/user-routes")
// import * as leagueRoutes from './routes/league-routes'

const app: Express = express();

app.use(bodyParser.json())

// route variables
app.use("/user", userRoutes)
// app.use("/league", leagueRoutes)


interface TableInfo {
    table_name: string;
}

const checkDatabaseConnection = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = await tempPool.connect();

        // Query tables in the 'public' schema.
        const result: QueryResult<TableInfo> = await client.query(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
    `);

        client.release(); // Release the client back to the pool.

        const tables: string[] = result.rows.map((row: TableInfo) => row.table_name);
        console.log('Connected to the database. Tables:', tables);

        // Continue with the next middleware or route handler.
        next();
    } catch (error) {
        console.error('Error connecting to the database', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Example usage in an Express route.
app.get('/', checkDatabaseConnection, (req: Request, res: Response) => {
    res.send('Hello, world!');
});


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

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});
