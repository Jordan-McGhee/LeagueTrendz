import { pool } from "../server"
import { Request, Response, NextFunction } from "express"
import { QueryResult } from "pg";

// get all teams
export const getAllTeams = async (req: Request, res: Response, next: NextFunction) => {
    const teamsQuery: string = "SELECT * FROM teams"

    let teamResponse: QueryResult

    try {
        teamResponse = await pool.query(teamsQuery)
    } catch (error) {
        console.log(`Error getting all teams: ${error}`)

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
        console.log(`Error getting all EASTERN teams: ${error}`)

        return res.status(500).json({ message: `Error getting all EASTERN teams ${error}` })
    }

    try {
        westResponse = await pool.query(westQuery, [`Western`])
    } catch (error) {
        console.log(`Error getting all WESTERN teams: ${error}`)

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
        console.log(`Error getting all teams: ${error}`)

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

// SINGLE TEAM PAGE

// get team home
export const getSingleTeam = async (req: Request, res: Response, next: NextFunction) => {
    const { abbreviation } = req.params

    const teamQuery: string = "SELECT * FROM teams WHERE LOWER(abbreviation) = LOWER($1)"

    let teamResponse: QueryResult

    try {
        teamResponse = await pool.query(teamQuery, [abbreviation])
    } catch (error) {
        console.log(`Error getting all teams: ${error}`)

        return res.status(500).json({ message: `Error getting all teams ${error}` })
    }

    // case for if someone types in random abbreviation
    if (!teamResponse.rows[0]) {
        return res.status(500).json({ message: `Error finding that team. Please try again!` })
    }

    res.status(200).json({ message: `Got data for the ${teamResponse.rows[0].full_name}`, team: teamResponse.rows[0]})
}


// get roster

export const getTeamRoster = async (req: Request, res: Response, next: NextFunction) => {
    const { team_id } = req.params

    const rosterQuery: string = "SELECT * FROM players WHERE team_id = $1"

    let rosterResponse: QueryResult

    try {
        rosterResponse = await pool.query(rosterQuery, [team_id])
    } catch (error) {
        console.log(`Error getting roster for team: ${team_id}. ${error}`)

        return res.status(500).json(`Error getting roster for team: ${team_id}. ${error}`)
    }

    res.status(200).json({ message: `Retrieved roster for team ${team_id}`, roster: rosterResponse.rows})
}