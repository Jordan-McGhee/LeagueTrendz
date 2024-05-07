WITH team_ranks AS (
    SELECT
        team_id,
        avg_pts,
        DENSE_RANK() OVER (ORDER BY avg_pts DESC) AS pts_rank,
        avg_reb,
        DENSE_RANK() OVER (ORDER BY avg_reb DESC) AS reb_rank,
        avg_ast,
        DENSE_RANK() OVER (ORDER BY avg_ast DESC) AS ast_rank
    FROM
        team_2023_24_regularseason_totals_and_averages
),
team_standings_data AS (
    SELECT
        s.division,
        json_build_object(
            'team_id', s.team_id,
            'full_name', s.full_name,
            'abbreviation', s.abbreviation,
            'wins', s.wins,
            'losses', s.losses,
            'pct', CAST(ROUND((s.wins * 1.0/ (s.wins + s.losses)), 3) AS VARCHAR),
            'gb',
            CASE 
                WHEN ROW_NUMBER() OVER (PARTITION BY s.division ORDER BY s.wins DESC) = 1 THEN 0
                ELSE (SELECT MAX(wins) - s.wins FROM standings_view sv WHERE sv.division = s.division)
            END,
            'last_10', s.last_10
        ) AS team_standings
    FROM
        standings_view s
),
team_standings_agg AS (
    SELECT
        division,
        json_agg(team_standings) AS division_standings
    FROM
        team_standings_data
    GROUP BY
        division
)
SELECT
    t.team_id,
    t.full_name,
    t.abbreviation,
    t.league_id,
    t.description,
    t.conference,
    t.division,
    t.stadium,
    t.stadium_location,
    t.head_coach,
    t.main_color,
    team.wins,
    team.losses,
    team.avg_pts,
    tr.pts_rank,
    team.avg_reb,
    tr.reb_rank,
    team.avg_ast,
    tr.ast_rank,
    (SELECT division_standings FROM team_standings_agg WHERE division = t.division) AS team_standings
FROM
    teams t
JOIN
    team_2023_24_regularseason_totals_and_averages team ON t.team_id = team.team_id
JOIN
    team_ranks tr ON t.team_id = tr.team_id
WHERE
    LOWER(t.abbreviation) = LOWER('BOS');


-- string version
"WITH team_ranks AS (SELECT team_id, avg_pts, DENSE_RANK() OVER (ORDER BY avg_pts DESC) AS pts_rank, avg_reb, DENSE_RANK() OVER (ORDER BY avg_reb DESC) AS reb_rank, avg_ast, DENSE_RANK() OVER (ORDER BY avg_ast DESC) AS ast_rank FROM team_2023_24_regularseason_totals_and_averages), team_standings_data AS (SELECT s.division, json_build_object('team_id', s.team_id, 'full_name', s.full_name, 'abbreviation', s.abbreviation, 'wins', s.wins, 'losses', s.losses, 'pct', CAST(ROUND((s.wins * 1.0/ (s.wins + s.losses)), 3) AS VARCHAR), 'gb', CASE WHEN ROW_NUMBER() OVER (PARTITION BY s.division ORDER BY s.wins DESC) = 1 THEN 0 ELSE (SELECT MAX(wins) - s.wins FROM standings_view sv WHERE sv.division = s.division) END, 'last_10', s.last_10) AS team_standings FROM standings_view s), team_standings_agg AS (SELECT division, json_agg(team_standings) AS division_standings FROM team_standings_data GROUP BY division) SELECT t.team_id, t.full_name, t.abbreviation, t.league_id, t.description, t.conference, t.division, t.stadium, t.stadium_location, t.head_coach, t.main_color, team.wins, team.losses, team.avg_pts, tr.pts_rank, team.avg_reb, tr.reb_rank, team.avg_ast, tr.ast_rank, (SELECT division_standings FROM team_standings_agg WHERE division = t.division) AS team_standings FROM teams t JOIN team_2023_24_regularseason_totals_and_averages team ON t.team_id = team.team_id JOIN team_ranks tr ON t.team_id = tr.team_id WHERE LOWER(t.abbreviation) = LOWER($1)"



-- last 10 games
SELECT
    gb.game_id,
    gb.game_date,
    CASE
        WHEN gb.home_team_id = $1 THEN gb.home_team_score
        WHEN gb.away_team_id = $1 THEN gb.away_team_score
    END AS team_score,
    CASE
        WHEN gb.home_team_id = $1 THEN gb.away_team_id
        WHEN gb.away_team_id = $1 THEN gb.home_team_id
    END AS opp_team_id,
    t.abbreviation AS opp_abbreviation,
    CASE
        WHEN gb.home_team_id = $1 THEN gb.away_team_full_name
        WHEN gb.away_team_id = $1 THEN gb.home_team_full_name
    END AS opp_full_name,
    CASE
        WHEN gb.home_team_id = $1 THEN gb.away_team_score
        WHEN gb.away_team_id = $1 THEN gb.home_team_score
    END AS opp_team_score,
    CASE
        WHEN (gb.home_team_id = $1 AND gb.home_team_score > gb.away_team_score)
            OR (gb.away_team_id = $1 AND gb.away_team_score > gb.home_team_score)
        THEN 'W'
        ELSE 'L'
    END AS game_result,
    CASE
        WHEN gb.home_team_id = $1 THEN 'HOME'
        WHEN gb.away_team_id = $1 THEN 'AWAY'
    END AS game_location
FROM
    game_box_scores gb
JOIN
    teams t ON CASE
        WHEN gb.home_team_id = $1 THEN gb.away_team_id
        WHEN gb.away_team_id = $1 THEN gb.home_team_id
    END = t.team_id
WHERE
    $1 IN (gb.home_team_id, gb.away_team_id)
ORDER BY
    gb.game_date DESC
LIMIT
    10;

-- string
"SELECT gb.game_id, gb.game_date, CASE WHEN gb.home_team_id = $1 THEN gb.home_team_score WHEN gb.away_team_id = $1 THEN gb.away_team_score END AS team_score, CASE WHEN gb.home_team_id = $1 THEN gb.away_team_id WHEN gb.away_team_id = $1 THEN gb.home_team_id END AS opp_team_id, t.abbreviation AS opp_abbreviation, CASE WHEN gb.home_team_id = $1 THEN gb.away_team_full_name WHEN gb.away_team_id = $1 THEN gb.home_team_full_name END AS opp_full_name, CASE WHEN gb.home_team_id = $1 THEN gb.away_team_score WHEN gb.away_team_id = $1 THEN gb.home_team_score END AS opp_team_score, CASE WHEN (gb.home_team_id = $1 AND gb.home_team_score > gb.away_team_score) OR (gb.away_team_id = $1 AND gb.away_team_score > gb.home_team_score) THEN 'W' ELSE 'L' END AS game_result, CASE WHEN gb.home_team_id = $1 THEN 'HOME' WHEN gb.away_team_id = $1 THEN 'AWAY' END AS game_location FROM game_box_scores gb JOIN teams t ON CASE WHEN gb.home_team_id = $1 THEN gb.away_team_id WHEN gb.away_team_id = $1 THEN gb.home_team_id END = t.team_id WHERE $1 IN (gb.home_team_id, gb.away_team_id) ORDER BY gb.game_date DESC LIMIT 10;"

-- top players
"SELECT * FROM team_stat_leaders WHERE team_id = $1"