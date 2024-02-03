import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

import dotenv from 'dotenv'
dotenv.config()

// route imports


const app: Express = express();

app.use(bodyParser.json())

// route variables
const PORT = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello PERN with TypeScript!');
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
