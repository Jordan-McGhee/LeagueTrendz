import { pool } from "../server"
import { Request, Response, NextFunction } from "express"
import { QueryResult } from "pg";

// types

// get all teams
export const getAllTeams = async (req: Request, res: Response, next: NextFunction) => {
    const teamsQuery: string = "SELECT * FROM teams"

    let teamResponse: QueryResult

    try {
        teamResponse = await pool.query(teamsQuery)
    } catch (error) {
        console.log(`Error getting all teams ${error}`, 500)

        return res.status(500).json({ message: `Error getting all teams ${error}` })
    }

    res.status(200).json({ message: "Got all teams", teams: teamResponse.rows })
}

// get all teams grouped by conference
export const getConferenceTeams = async (req: Request, res: Response, next: NextFunction) => {
    const eastQuery: string = "SELECT * FROM teams WHERE conference = $1"
    const westQuery: string = "SELECT * FROM teams WHERE conference = $1"

    let eastResponse: QueryResult, westResponse: QueryResult

    try {
        eastResponse = await pool.query(eastQuery, ['Eastern'])
    } catch (error) {
        console.log(`Error getting all EASTERN teams ${error}`, 500)

        return res.status(500).json({ message: `Error getting all EASTERN teams ${error}` })
    }

    try {
        westResponse = await pool.query(westQuery, [`Western`])
    } catch (error) {
        console.log(`Error getting all WESTERN teams ${error}`, 500)

        return res.status(500).json({ message: `Error getting all WESTERN teams ${error}` })
    }

    res.status(200).json({ message: `Got all teams by conference.`, east: eastResponse.rows, west: westResponse.rows })
}

// get all teams grouped by division
export const getDivisionTeams = async (req: Request, res: Response, next: NextFunction) => {
    const teamsQuery: string = "SELECT * FROM teams"

    let teamResponse: QueryResult

    try {
        teamResponse = await pool.query(teamsQuery)
    } catch (error) {
        console.log(`Error getting all teams ${error}`, 500)

        return res.status(500).json({ message: `Error getting all teams ${error}` })
    }

    // Define variables for each division
    let atlantic: any[] = [];
    let central: any[] = [];
    let southeast: any[] = [];
    let northwest: any[] = [];
    let pacific: any[] = [];
    let southwest: any[] = [];

    // Iterate through teams and assign them to their respective division variables
    teamResponse.rows.forEach(team => {
        switch (team.division) {
            case "Atlantic":
                atlantic.push(team);
                break;
            case "Central":
                central.push(team);
                break;
            case "Southeast":
                southeast.push(team);
                break;
            case "Northwest":
                northwest.push(team);
                break;
            case "Pacific":
                pacific.push(team);
                break;
            case "Southwest":
                southwest.push(team);
                break;
            default:
                // Handle any other divisions here
                break;
        }
    })

    res.status(200).json({ message: `Got all teams by division.`, atlantic, central, southeast, northwest, pacific, southwest})
}

// get single team
export const getSingleTeam = async (req: Request, res: Response, next: NextFunction) => {
    const { abbreviation } = req.params

    const teamQuery: string = "SELECT * FROM teams WHERE LOWER(abbreviation) = LOWER($1)"

    let teamResponse: QueryResult

    try {
        teamResponse = await pool.query(teamQuery, [abbreviation])
    } catch (error) {
        console.log(`Error getting all teams ${error}`, 500)

        return res.status(500).json({ message: `Error getting all teams ${error}` })
    }

    // case for if someone types in random abbreviation
    if (!teamResponse.rows[0]) {
        return res.status(500).json({ message: `Error finding that team. Please try again!` })
    }

    res.status(200).json({ message: `Got data for the ${teamResponse.rows[0].full_name}`, team: teamResponse.rows[0]})
}