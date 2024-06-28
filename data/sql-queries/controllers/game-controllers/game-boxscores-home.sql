-- games
    -- home team (id, full name, abbreviation)
    -- home team score
    -- away team (id, full name, abbreviation)
    -- away team score
    -- date
    -- game id

SELECT
    game_id,
    game_date,
    postseason,
    home_team_id,
    home_team_full_name,
    home_team_abbreviation,
    home_team_division,
    home_team_score,
    away_team_id,
    away_team_full_name,
    away_team_abbreviation,
    away_team_division,
    away_team_score
FROM
    game_box_scores
WHERE
    (home_team_id = $1 AND away_team_id = $2)
    OR (home_team_id = $2 AND away_team_id = $1)

    "SELECT game_id, game_date, postseason, home_team_id, home_team_full_name, home_team_abbreviation, home_team_division, home_team_score, away_team_id, away_team_full_name, away_team_abbreviation, away_team_division, away_team_score FROM game_box_scores WHERE (home_team_id = $1 AND away_team_id = $2) OR (home_team_id = $2 AND away_team_id = $1)"

-- game leaders
    -- point, rebound, assist leaders for both teams
    -- player id, photo url, full name, position, team_id
        -- points, fgm/fga, ftm/fta
        -- reb, drb, orb
        -- ast, to, min

WITH game_teams AS (
    SELECT DISTINCT player_team_id, player_team_abbreviation, player_team_full_name, game_location
    FROM player_gamelog_view
    WHERE game_id = 1
),
ranked_players AS (
    SELECT 
    player_team_id,
    player_team_abbreviation,
    player_team_full_name,
    player_id,
    player_name,
    photo_url,
    player_position,
    pts,
	fgm,
	fga,
	ftm,
	fta,
    reb,
	drb,
	orb,
    ast,
	stl,
	turnovers,
    ROW_NUMBER() OVER (PARTITION BY player_team_id ORDER BY pts DESC) AS pts_rank,
    ROW_NUMBER() OVER (PARTITION BY player_team_id ORDER BY reb DESC) AS reb_rank,
    ROW_NUMBER() OVER (PARTITION BY player_team_id ORDER BY ast DESC) AS ast_rank
    FROM player_gamelog_view
    WHERE game_id = 1
)
SELECT 
    team.player_team_id,
    team.player_team_abbreviation,
    team.player_team_full_name,
    team.game_location,

    pts_leader.player_id AS pts_leader_id,
    pts_leader.player_name AS pts_leader_name,
    pts_leader.photo_url AS pts_leader_photo,
    pts_leader.player_position AS pts_leader_position,
    pts_leader.pts AS pts_leader_pts,
    pts_leader.fgm AS pts_leader_fgm,
    pts_leader.fga AS pts_leader_fga,
    pts_leader.ftm AS pts_leader_ftm,
    pts_leader.fta AS pts_leader_fta,

    reb_leader.player_id AS reb_leader_id,
    reb_leader.player_name AS reb_leader_name,
    reb_leader.photo_url AS reb_leader_photo,
    reb_leader.player_position AS reb_leader_position,
    reb_leader.reb AS reb_leader_reb,
    reb_leader.drb AS reb_leader_drb,
    reb_leader.orb AS reb_leader_orb,

    ast_leader.player_id AS ast_leader_id,
    ast_leader.player_name AS ast_leader_name,
    ast_leader.photo_url AS ast_leader_photo,
    ast_leader.player_position AS ast_leader_position,
    ast_leader.ast AS ast_leader_ast,
    ast_leader.stl AS ast_leader_stl,
    ast_leader.turnovers AS ast_leader_turnovers

FROM game_teams team
LEFT JOIN LATERAL (
    SELECT * FROM ranked_players
    WHERE player_team_id = team.player_team_id AND pts_rank = 1
) pts_leader ON true
LEFT JOIN LATERAL (
    SELECT * FROM ranked_players
    WHERE player_team_id = team.player_team_id AND reb_rank = 1
) reb_leader ON true
LEFT JOIN LATERAL (
    SELECT * FROM ranked_players
    WHERE player_team_id = team.player_team_id AND ast_rank = 1
) ast_leader ON true
ORDER BY team.player_team_id;

"WITH game_teams AS (SELECT DISTINCT player_team_id, player_team_abbreviation, player_team_full_name, game_location FROM player_gamelog_view WHERE game_id = $1), ranked_players AS (SELECT player_team_id, player_team_abbreviation, player_team_full_name, player_id, player_name, photo_url, player_position, pts, fgm, fga, ftm, fta, reb, drb, orb, ast, stl, turnovers, ROW_NUMBER() OVER (PARTITION BY player_team_id ORDER BY pts DESC) AS pts_rank, ROW_NUMBER() OVER (PARTITION BY player_team_id ORDER BY reb DESC) AS reb_rank, ROW_NUMBER() OVER (PARTITION BY player_team_id ORDER BY ast DESC) AS ast_rank FROM player_gamelog_view WHERE game_id = $1) SELECT team.player_team_id, team.player_team_abbreviation, team.player_team_full_name, team.game_location, pts_leader.player_id AS pts_leader_id, pts_leader.player_name AS pts_leader_name, pts_leader.photo_url AS pts_leader_photo, pts_leader.player_position AS pts_leader_position, pts_leader.pts AS pts_leader_pts, pts_leader.fgm AS pts_leader_fgm, pts_leader.fga AS pts_leader_fga, pts_leader.ftm AS pts_leader_ftm, pts_leader.fta AS pts_leader_fta, reb_leader.player_id AS reb_leader_id, reb_leader.player_name AS reb_leader_name, reb_leader.photo_url AS reb_leader_photo, reb_leader.player_position AS reb_leader_position, reb_leader.reb AS reb_leader_reb, reb_leader.drb AS reb_leader_drb, reb_leader.orb AS reb_leader_orb, ast_leader.player_id AS ast_leader_id, ast_leader.player_name AS ast_leader_name, ast_leader.photo_url AS ast_leader_photo, ast_leader.player_position AS ast_leader_position, ast_leader.ast AS ast_leader_ast, ast_leader.stl AS ast_leader_stl, ast_leader.turnovers AS ast_leader_turnovers FROM game_teams team LEFT JOIN LATERAL (SELECT * FROM ranked_players WHERE player_team_id = team.player_team_id AND pts_rank = 1) pts_leader ON true LEFT JOIN LATERAL (SELECT * FROM ranked_players WHERE player_team_id = team.player_team_id AND reb_rank = 1) reb_leader ON true LEFT JOIN LATERAL (SELECT * FROM ranked_players WHERE player_team_id = team.player_team_id AND ast_rank = 1) ast_leader ON true ORDER BY team.player_team_id"


-- standings

SELECT
    team_id,
    full_name,
    abbreviation,
    wins,
    losses,
    pct,
    last_10
FROM
    standings_view_with_gb
WHERE
    LOWER(division) = LOWER($1)

"SELECT team_id, full_name, abbreviation, wins, losses, pct, last_10 FROM standings_view_with_gb WHERE LOWER(division) = LOWER($1)"