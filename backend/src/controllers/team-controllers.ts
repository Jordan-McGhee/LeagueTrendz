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

    res.status(200).json({ message: `Got all teams by division.`, atlantic, central, southeast, northwest, pacific, southwest })
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

    res.status(200).json({ message: `Got data for the ${teamResponse.rows[0].full_name}`, team: teamResponse.rows[0] })
}

// get schedule
export const getTeamScheduleRegularSeason = async (req: Request, res: Response, next: NextFunction) => {
    const { team_id } = req.params

    const scheduleQuery: string = "SELECT g.game_id, g.game_date, TO_CHAR(g.game_date, 'Day') AS day_of_week, team.team_id AS team_id, team.full_name AS team_full_name, team.abbreviation AS team_abbreviation, CASE WHEN t.team_id = g.home_team_id THEN 'HOME' ELSE 'AWAY' END AS game_location, opponent.team_id AS opponent_team_id, opponent.full_name AS opponent_team_full_name, opponent.abbreviation AS opponent_team_abbreviation, CASE WHEN t.team_id = g.home_team_id THEN CASE WHEN g.home_team_score > g.away_team_score THEN 'W' ELSE 'L' END ELSE CASE WHEN g.home_team_score < g.away_team_score THEN 'W' ELSE 'L' END END AS result, CASE WHEN t.team_id = g.home_team_id THEN g.home_team_score ELSE g.away_team_score END AS team_score, CASE WHEN t.team_id = g.home_team_id THEN g.away_team_score ELSE g.home_team_score END AS opponent_score, SUM( CASE WHEN t.team_id = g.home_team_id THEN CASE WHEN g.home_team_score > g.away_team_score THEN 1 ELSE 0 END ELSE CASE WHEN g.home_team_score < g.away_team_score THEN 1 ELSE 0 END END ) OVER ( ORDER BY g.game_date ROWS UNBOUNDED PRECEDING ) AS wins, SUM( CASE WHEN t.team_id = g.home_team_id THEN CASE WHEN g.home_team_score < g.away_team_score THEN 1 ELSE 0 END ELSE CASE WHEN g.home_team_score > g.away_team_score THEN 1 ELSE 0 END END ) OVER ( ORDER BY g.game_date ROWS UNBOUNDED PRECEDING ) AS losses, ( SELECT CONCAT(player_id, ' - ', player_name, ' (', pts, ')') AS pts_leader FROM player_gamelog_view pgl WHERE pgl.game_id = g.game_id AND pgl.player_team_id = team.team_id ORDER BY pts DESC LIMIT 1 ), ( SELECT CONCAT(player_id, ' - ', player_name, ' (', reb, ')') AS reb_leader FROM player_gamelog_view pgl WHERE pgl.game_id = g.game_id AND pgl.player_team_id = team.team_id ORDER BY reb DESC LIMIT 1 ), ( SELECT CONCAT(player_id, ' - ', player_name, ' (', ast, ')') AS ast_leader FROM player_gamelog_view pgl WHERE pgl.game_id = g.game_id AND pgl.player_team_id = team.team_id ORDER BY ast DESC LIMIT 1 ) FROM game_box_scores g INNER JOIN ( SELECT team_id FROM teams WHERE team_id = $1 ) t ON g.home_team_id = t.team_id OR g.away_team_id = t.team_id INNER JOIN teams team ON t.team_id = team.team_id INNER JOIN teams opponent ON CASE WHEN t.team_id = g.home_team_id THEN g.away_team_id ELSE g.home_team_id END = opponent.team_id WHERE NOT g.postseason AND NOT g.in_season_tournament ORDER BY g.game_date;"

    let scheduleResponse: QueryResult

    try {
        scheduleResponse = await pool.query(scheduleQuery, [team_id])
    } catch (error) {
        console.log(`Error getting schedule for team: ${team_id}. ${error}`)

        return res.status(500).json(`Error getting schedule for team: ${team_id}. ${error}`)
    }

    res.status(200).json({ message: `Retrieved schedule for team ${team_id}`, schedule: scheduleResponse.rows })
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

    res.status(200).json({ message: `Retrieved roster for team ${team_id}`, roster: rosterResponse.rows })
}