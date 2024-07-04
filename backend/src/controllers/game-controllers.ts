import { pool } from "../server"
import { Request, Response, NextFunction } from "express"
import { QueryResult } from "pg";

// get games by date
export const getGamesByDate = async (req: Request, res: Response, next: NextFunction) => {
    const { date } = req.params

    const gameQuery: string = "SELECT * FROM game_box_scores WHERE game_date = $1"

    let gameResponse: QueryResult

    try {
        gameResponse = await pool.query(gameQuery, [date])
    } catch (error) {
        console.log(`Error finding games from ${date}. ${error}.`)

        return res.status(500).json({ message: `Error finding games from ${date}. ${error}.` })
    }

    res.status(200).json({ message: `Got all games for ${date}`, game: gameResponse.rows })
}

// get single game
export const getGameByID = async (req: Request, res: Response, next: NextFunction) => {
    const { game_id } = req.params

    const gameQuery: string = "SELECT * FROM game_box_scores WHERE game_id = $1"

    let gameResponse: QueryResult

    try {
        gameResponse = await pool.query(gameQuery, [game_id])
    } catch (error) {
        console.log(`Error finding game with id #${game_id}. ${error}.`)

        return res.status(500).json({ message: `Error finding game with id #${game_id}. ${error}` })
    }

    const standingsQuery: string = "SELECT h.team_id AS home_team_id, h.division AS home_team_division, h.wins AS home_team_wins, h.losses AS home_team_losses, h.home_wins AS home_team_home_wins, h.home_losses AS home_team_home_losses, a.team_id AS away_team_id, a.division AS away_team_division, a.wins AS away_team_wins, a.losses AS away_team_losses, a.away_wins AS away_team_away_wins, a.away_losses AS away_team_away_losses FROM standings_view_with_gb h JOIN standings_view_with_gb a ON h.team_id = $1 AND a.team_id = $2"

    let standingsResponse: QueryResult

    try {
        standingsResponse = await pool.query(standingsQuery, [gameResponse.rows[0].home_team_id, gameResponse.rows[0].away_team_id])
    } catch (error) {
        console.log(`Error querying for standings data. ${error}`)

        return res.status(500).json({ message: `Error querying for standings data. ${error}` })
    }

    res.status(200).json({ message: `Got data for game #${game_id}`, game: gameResponse.rows[0], standingsData: standingsResponse.rows[0] })
}

// get team stats
export const getTeamStats = async (req: Request, res: Response, next: NextFunction) => {

    const { game_id, home_team_id, away_team_id } = req.params

    // get game series
    const gameSeriesQuery: string = "SELECT game_id, game_date, postseason, home_team_id, home_team_full_name, home_team_abbreviation, home_team_division, home_team_score, away_team_id, away_team_full_name, away_team_abbreviation, away_team_division, away_team_score FROM game_box_scores WHERE (home_team_id = $1 AND away_team_id = $2) OR (home_team_id = $2 AND away_team_id = $1)"

    let gameSeriesResponse: QueryResult

    try {
        gameSeriesResponse = await pool.query(gameSeriesQuery, [home_team_id, away_team_id])
    } catch (error) {
        console.log(`Error querying for game series for teams #${home_team_id} and #${away_team_id}. ${error}`)

        return res.status(500).json({ message: `Error querying for game series for teams #${home_team_id} and #${away_team_id}. ${error}` })
    }

    // const firstTeamDivision = gameSeriesResponse.rows[0].home_team_division
    // const secondTeamDivision = gameSeriesResponse.rows[0].away_team_division


    // // get standings
    // const standingsQuery: string = "SELECT division, team_id, full_name, abbreviation, wins, losses, pct, last_10 FROM standings_view_with_gb WHERE LOWER(division) = LOWER($1)"

    // let firstTeamStandingsResponse: QueryResult
    // let secondTeamStandingsResponse: any = null

    // try {
    //     firstTeamStandingsResponse = await pool.query(standingsQuery, [firstTeamDivision])
    // } catch (error) {
    //     console.log(`Error querying for home team standings. ${error}`)

    //     return res.status(500).json({ message: `Error querying for home team standings. ${error}` })
    // }

    // if (firstTeamDivision != secondTeamDivision) {

    //     try {
    //         secondTeamStandingsResponse = await pool.query(standingsQuery, [secondTeamDivision])
    //     } catch (error) {
    //         console.log(`Error querying for away team standings. ${error}`)

    //         return res.status(500).json({ message: `Error querying for away team standings. ${error}` })
    //     }
    // }

    // get game leaders
    const gameLeadersQuery: string = "WITH game_teams AS (SELECT DISTINCT player_team_id, player_team_abbreviation, player_team_full_name, game_location FROM player_gamelog_view WHERE game_id = $1), ranked_players AS (SELECT player_team_id, player_team_abbreviation, player_team_full_name, player_id, player_name, photo_url, player_position, pts, fgm, fga, ftm, fta, reb, drb, orb, ast, stl, turnovers, ROW_NUMBER() OVER (PARTITION BY player_team_id ORDER BY pts DESC) AS pts_rank, ROW_NUMBER() OVER (PARTITION BY player_team_id ORDER BY reb DESC) AS reb_rank, ROW_NUMBER() OVER (PARTITION BY player_team_id ORDER BY ast DESC) AS ast_rank FROM player_gamelog_view WHERE game_id = $1) SELECT team.player_team_id, team.player_team_abbreviation, team.player_team_full_name, team.game_location, pts_leader.player_id AS pts_leader_id, pts_leader.player_name AS pts_leader_name, pts_leader.photo_url AS pts_leader_photo, pts_leader.player_position AS pts_leader_position, pts_leader.pts AS pts_leader_pts, pts_leader.fgm AS pts_leader_fgm, pts_leader.fga AS pts_leader_fga, pts_leader.ftm AS pts_leader_ftm, pts_leader.fta AS pts_leader_fta, reb_leader.player_id AS reb_leader_id, reb_leader.player_name AS reb_leader_name, reb_leader.photo_url AS reb_leader_photo, reb_leader.player_position AS reb_leader_position, reb_leader.reb AS reb_leader_reb, reb_leader.drb AS reb_leader_drb, reb_leader.orb AS reb_leader_orb, ast_leader.player_id AS ast_leader_id, ast_leader.player_name AS ast_leader_name, ast_leader.photo_url AS ast_leader_photo, ast_leader.player_position AS ast_leader_position, ast_leader.ast AS ast_leader_ast, ast_leader.stl AS ast_leader_stl, ast_leader.turnovers AS ast_leader_turnovers FROM game_teams team LEFT JOIN LATERAL (SELECT * FROM ranked_players WHERE player_team_id = team.player_team_id AND pts_rank = 1) pts_leader ON true LEFT JOIN LATERAL (SELECT * FROM ranked_players WHERE player_team_id = team.player_team_id AND reb_rank = 1) reb_leader ON true LEFT JOIN LATERAL (SELECT * FROM ranked_players WHERE player_team_id = team.player_team_id AND ast_rank = 1) ast_leader ON true ORDER BY team.player_team_id"

    let gameLeadersResponse: QueryResult

    try {
        gameLeadersResponse = await pool.query(gameLeadersQuery, [game_id])
    } catch (error) {
        console.log(`Error querying for game leaders for game #${game_id}. ${error}`)

        return res.status(500).json({ message: `Error querying for game leaders for game #${game_id}. ${error}`})
    }


    res.status(200).json({ message: `Got team stats for game #${game_id}`, gameSeries: gameSeriesResponse.rows, gameLeaders: gameLeadersResponse.rows  })
}

// get box score
export const getGameBoxScore = async (req: Request, res: Response, next: NextFunction) => {
    const { game_id } = req.params

    const boxScoreQuery: string = "SELECT game_id, player_team_id, player_id, player_name, player_position, minutes, pts, fgm, fga, fg_percentage, tpm, tpa, tp_percentage, ftm, fta, ft_percentage, orb, drb, reb, ast, stl, blk, turnovers, pf FROM player_gamelog_view WHERE game_id = $1 ORDER BY minutes DESC"

    let boxScoreResponse: QueryResult

    try {
        boxScoreResponse = await pool.query(boxScoreQuery, [game_id])
    } catch (error) {
        console.log(`Error querying for box score data. ${error}`)

        return res.status(500).json({ message: `Error querying for box score data. ${error}` })
    }

    res.status(200).json({ message: `Got box scores for game #${game_id}`, players: boxScoreResponse.rows })
}