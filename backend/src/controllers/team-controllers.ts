import { pool } from "../server"
import { Request, Response, NextFunction } from "express"
import { Query, QueryResult } from "pg";

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

    // returns team id, name, abbreviation, wins/losses, avg stats and ranks in league, as well as data for team standings
    const teamQuery: string = "WITH team_ranks AS (SELECT team_id, avg_pts, DENSE_RANK() OVER (ORDER BY avg_pts DESC) AS pts_rank, avg_reb, DENSE_RANK() OVER (ORDER BY avg_reb DESC) AS reb_rank, avg_ast, DENSE_RANK() OVER (ORDER BY avg_ast DESC) AS ast_rank FROM team_2023_24_regularseason_totals_and_averages), team_standings_data AS (SELECT s.division, json_build_object('team_id', s.team_id, 'full_name', s.full_name, 'abbreviation', s.abbreviation, 'wins', s.wins, 'losses', s.losses, 'pct', CAST(ROUND((s.wins * 1.0/ (s.wins + s.losses)), 3) AS VARCHAR), 'gb', CASE WHEN ROW_NUMBER() OVER (PARTITION BY s.division ORDER BY s.wins DESC) = 1 THEN 0 ELSE (SELECT MAX(wins) - s.wins FROM standings_view sv WHERE sv.division = s.division) END, 'last_10', s.last_10) AS team_standings FROM standings_view s), team_standings_agg AS (SELECT division, json_agg(team_standings) AS division_standings FROM team_standings_data GROUP BY division) SELECT t.team_id, t.full_name, t.abbreviation, t.league_id, t.description, t.conference, t.division, t.stadium, t.stadium_location, t.head_coach, t.main_color, team.wins, team.losses, team.avg_pts, tr.pts_rank, team.avg_reb, tr.reb_rank, team.avg_ast, tr.ast_rank, (SELECT division_standings FROM team_standings_agg WHERE division = t.division) AS team_standings FROM teams t JOIN team_2023_24_regularseason_totals_and_averages team ON t.team_id = team.team_id JOIN team_ranks tr ON t.team_id = tr.team_id WHERE LOWER(t.abbreviation) = LOWER($1)"

    let teamResponse: QueryResult

    try {
        teamResponse = await pool.query(teamQuery, [abbreviation])
    } catch (error) {
        console.log(`Error getting team: ${error}`)

        return res.status(500).json({ message: `Error getting team: ${error}` })
    }

    // case for if someone types in random abbreviation
    if (!teamResponse.rows[0]) {
        return res.status(500).json({ message: `Error finding that team. Please try again!` })
    }

    const team = teamResponse.rows[0]

    let lastTenQuery: string = "SELECT gb.game_id, gb.game_date, CASE WHEN gb.home_team_id = $1 THEN gb.home_team_score WHEN gb.away_team_id = $1 THEN gb.away_team_score END AS team_score, CASE WHEN gb.home_team_id = $1 THEN gb.away_team_id WHEN gb.away_team_id = $1 THEN gb.home_team_id END AS opp_team_id, t.abbreviation AS opp_abbreviation, CASE WHEN gb.home_team_id = $1 THEN gb.away_team_full_name WHEN gb.away_team_id = $1 THEN gb.home_team_full_name END AS opp_full_name, CASE WHEN gb.home_team_id = $1 THEN gb.away_team_score WHEN gb.away_team_id = $1 THEN gb.home_team_score END AS opp_team_score, CASE WHEN (gb.home_team_id = $1 AND gb.home_team_score > gb.away_team_score) OR (gb.away_team_id = $1 AND gb.away_team_score > gb.home_team_score) THEN 'W' ELSE 'L' END AS game_result, CASE WHEN gb.home_team_id = $1 THEN 'HOME' WHEN gb.away_team_id = $1 THEN 'AWAY' END AS game_location FROM game_box_scores gb JOIN teams t ON CASE WHEN gb.home_team_id = $1 THEN gb.away_team_id WHEN gb.away_team_id = $1 THEN gb.home_team_id END = t.team_id WHERE $1 IN (gb.home_team_id, gb.away_team_id) ORDER BY gb.game_date DESC LIMIT 10;"

    let lastTenResponse: QueryResult

    try {
        lastTenResponse = await pool.query(lastTenQuery, [team.team_id])
    } catch (error) {
        console.log(`Error getting last ten games for the ${team.full_name}: ${error}`)

        return res.status(500).json({ message: `Error getting last ten games for the ${team.full_name}: ${error}` })
    }

    const topPlayersQuery: string = "SELECT * FROM team_stat_leaders WHERE team_id = $1"

    let topPlayersResponse: QueryResult

    try {
        topPlayersResponse = await pool.query(topPlayersQuery, [team.team_id])
    } catch (error) {
        console.log(`Error getting top players for the ${team.full_name}: ${error}`)

        return res.status(500).json({ message: `Error getting top players for the ${team.full_name}: ${error}` })
    }

    res.status(200).json({ message: `Got data for the ${teamResponse.rows[0].full_name}`, team: teamResponse.rows[0], games: lastTenResponse.rows, players: topPlayersResponse.rows[0] })
}

// get status
export const getTeamStatsRegularSeason = async (req: Request, res: Response, next: NextFunction) => {
    const { team_id } = req.params

    const statsQuery: string = "SELECT p.player_id, p.name, player.player_position, player.jersey_number, p.gp, p.gs, p.avg_min, p.avg_pts, p.avg_orb, p.avg_drb, p.avg_reb, p.avg_ast, p.avg_stl, p.avg_blk, p.avg_pf, p.avg_turnovers, CASE WHEN p.avg_turnovers = 0 THEN '0' ELSE ROUND(((p.avg_ast * 1.0) / p.avg_turnovers), 1) END AS ast_to_ratio, p.avg_fgm, p.avg_fga, p.avg_fg_percentage, p.avg_tpm, p.avg_tpa, p.avg_tp_percentage, p.avg_ftm, p.avg_fta, p.avg_ft_percentage, (p.avg_fgm - p.avg_tpm) AS player_avg_two_m, (p.avg_fga - p.avg_tpa) AS player_avg_two_a, ROUND(((p.avg_fgm - p.avg_tpm) * 100.0)/(p.avg_fga - p.avg_tpa), 1) AS player_avg_two_percentage FROM player_2023_24_regularseason_totals_and_averages p JOIN players player ON player.player_id = p.player_id WHERE p.team_id = $1;"

    let statsResponse: QueryResult

    try {
        statsResponse = await pool.query(statsQuery, [team_id])
    } catch (error) {
        console.log(`Error getting player stats for team: ${team_id}. ${error}`)

        return res.status(500).json(`Error getting player stats for team: ${team_id}. ${error}`)
    }

    const teamStatsQuery: string = "SELECT * FROM team_2023_24_regularseason_totals_and_averages WHERE team_id = $1"

    let teamStatsResponse: QueryResult

    try {
        teamStatsResponse = await pool.query(teamStatsQuery, [team_id])
    } catch (error) {
        console.log(`Error getting stats for team: ${team_id}. ${error}`)

        return res.status(500).json(`Error getting stats for team: ${team_id}. ${error}`)
    }

    res.status(200).json({ message: `Got stats for team #${team_id}`, player_stats: statsResponse.rows, team_stats: teamStatsResponse.rows[0] })
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