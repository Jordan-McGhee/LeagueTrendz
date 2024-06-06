CREATE VIEW standings_view_with_gb_expanded AS
SELECT
    sv.team_id,
    sv.full_name,
    sv.abbreviation,
	sv.conference,
	sv.division,
    sv.wins,
    sv.losses,
    sv.pct,
    sv.GB,

	-- 3 pt wins
    SUM(CASE
        WHEN (
            (g.home_team_score - g.away_team_score BETWEEN 1 AND 3 AND g.home_team_id = sv.team_id)
            OR (g.away_team_score - g.home_team_score BETWEEN 1 AND 3 AND g.away_team_id = sv.team_id)
        ) THEN 1 ELSE 0
    END) AS "three_point_game_wins",
	
	-- 3 pt losses
    SUM(CASE
        WHEN (
            (g.away_team_score - g.home_team_score BETWEEN 1 AND 3 AND g.home_team_id = sv.team_id)
            OR (g.home_team_score - g.away_team_score BETWEEN 1 AND 3 AND g.away_team_id = sv.team_id)
        ) THEN 1 ELSE 0
    END) AS "three_point_game_losses",

	-- 10+ pt wins
    SUM(CASE
        WHEN (
            (g.home_team_score - g.away_team_score >= 10 AND g.home_team_id = sv.team_id)
            OR (g.away_team_score - g.home_team_score  >= 10 AND g.away_team_id = sv.team_id)
        ) THEN 1 ELSE 0
    END) AS "ten_point_game_wins",

	-- 10+ pt losses
    SUM(CASE 
        WHEN (
            (g.away_team_score - g.home_team_score  >= 10 AND g.home_team_id = sv.team_id)
            OR (g.home_team_score - g.away_team_score  >= 10 AND g.away_team_id = sv.team_id)
        ) THEN 1 ELSE 0
    END) AS "ten_point_game_losses",

	-- wins vs top half of league
    SUM(CASE
        WHEN (opp.pct >= 0.500 AND g.home_team_id = sv.team_id AND g.home_team_score > g.away_team_score)
            OR (opp.pct >= 0.500 AND g.away_team_id = sv.team_id AND g.away_team_score > g.home_team_score)
        THEN 1 ELSE 0
    END) AS "top_half_wins",

	-- losses vs top half of league
    SUM(CASE
        WHEN (opp.pct >= 0.500 AND g.home_team_id = sv.team_id AND g.home_team_score < g.away_team_score)
            OR (opp.pct >= 0.500 AND g.away_team_id = sv.team_id AND g.away_team_score < g.home_team_score)
        THEN 1 ELSE 0
    END) AS "top_half_losses",

	-- wins vs bottom half of league
    SUM(CASE
        WHEN (opp.pct < 0.500 AND g.home_team_id = sv.team_id AND g.home_team_score > g.away_team_score)
            OR (opp.pct < 0.500 AND g.away_team_id = sv.team_id AND g.away_team_score > g.home_team_score)
        THEN 1 ELSE 0
    END) AS "bottom_half_wins",

	-- losses vs bottom half of league
    SUM(CASE
        WHEN (opp.pct < 0.500 AND g.home_team_id = sv.team_id AND g.home_team_score < g.away_team_score)
            OR (opp.pct < 0.500 AND g.away_team_id = sv.team_id AND g.away_team_score < g.home_team_score)
        THEN 1 ELSE 0
    END) AS "bottom_half_losses"

FROM standings_view_with_gb sv
INNER JOIN games g ON g.home_team_id = sv.team_id OR g.away_team_id = sv.team_id
LEFT JOIN teams t ON (g.home_team_id = t.team_id AND g.away_team_id = sv.team_id)
    OR (g.away_team_id = t.team_id AND g.home_team_id = sv.team_id)
LEFT JOIN standings_view_with_gb opp ON (g.home_team_id = opp.team_id AND g.away_team_id = sv.team_id)
    OR (g.away_team_id = opp.team_id AND g.home_team_id = sv.team_id)
WHERE g.in_season_tournament = FALSE AND g.postseason = FALSE
GROUP BY sv.team_id, sv.full_name, sv.abbreviation, sv.conference, sv.division, sv.wins, sv.losses, sv.pct, sv.GB
ORDER BY sv.wins DESC