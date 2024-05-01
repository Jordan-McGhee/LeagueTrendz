-- team standings
WITH team_division AS (
    SELECT division
    FROM standings_view
    WHERE team_id = $1 -- Replace with the desired team_id
)
SELECT
    s.team_id,
    s.full_name,
    s.abbreviation,
    s.division,
    s.wins,
    s.losses,
    ROUND((s.wins::float / (s.wins + s.losses))::numeric, 3) AS win_pct,
    CASE
        WHEN ROW_NUMBER() OVER (PARTITION BY s.division ORDER BY s.wins DESC) = 1 THEN 0
        ELSE (
            SELECT MAX(wins) - s.wins
            FROM standings_view sv
            WHERE sv.division = s.division
        )
    END AS gb,
	last_10
FROM
    standings_view s
    JOIN team_division td ON s.division = td.division
ORDER BY
	wins DESC;

-- last 5 games
SELECT
    pgv.*,
    TO_CHAR(pgv.game_date, 'Day') AS day_of_week,
    player_team.wins AS player_team_wins,
    player_team.losses AS player_team_losses,
    opp_team.wins AS opp_team_wins,
    opp_team.losses AS opp_team_losses,
    CASE
        WHEN player_team.conference = opp_team.conference THEN TRUE
        ELSE FALSE
    END AS conference_game,
    CASE
        WHEN player_team.division = opp_team.division THEN TRUE
        ELSE FALSE
    END AS division_game
FROM
    (
        SELECT
            *
        FROM
            player_gamelog_view
        WHERE
            player_id = 13
		ORDER BY
            game_date DESC
        LIMIT
            5
    ) pgv
    LEFT JOIN standings_view AS player_team ON
        pgv.player_team_id = player_team.team_id
    LEFT JOIN standings_view AS opp_team ON
        pgv.opp_team_id = opp_team.team_id
	ORDER BY
		game_date DESC

SELECT
    player_id,
    player_name,
    overall_averages,
    home_averages,
    away_averages

FROM
    player_stats_splits_view
    WHERE player_id = $1
