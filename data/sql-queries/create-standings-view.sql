CREATE VIEW standings_view AS
SELECT
    t.team_id,
    t.full_name,
    SUM(CASE WHEN g.home_team_id = t.team_id AND g.home_team_score > g.away_team_score THEN 1
            WHEN g.away_team_id = t.team_id AND g.away_team_score > g.home_team_score THEN 1 ELSE 0 END) AS wins,
    SUM(CASE WHEN g.home_team_id = t.team_id AND g.home_team_score < g.away_team_score THEN 1
            WHEN g.away_team_id = t.team_id AND g.away_team_score < g.home_team_score THEN 1 ELSE 0 END) AS losses,
    ROUND(CAST(SUM(CASE WHEN g.home_team_id = t.team_id AND g.home_team_score > g.away_team_score THEN 1
                        WHEN g.away_team_id = t.team_id AND g.away_team_score > g.home_team_score THEN 1 ELSE 0 END) AS NUMERIC) /
        NULLIF(SUM(CASE WHEN g.home_team_id = t.team_id OR g.away_team_id = t.team_id THEN 1 ELSE 0 END), 0), 3) AS pct,
    SUM(CASE WHEN g.home_team_id = t.team_id AND g.home_team_score > g.away_team_score THEN 1 END) AS home_wins,
    SUM(CASE WHEN g.home_team_id = t.team_id AND g.home_team_score < g.away_team_score THEN 1 END) AS home_losses,
    SUM(CASE WHEN g.away_team_id = t.team_id AND g.home_team_score < g.away_team_score THEN 1 END) AS away_wins,
    SUM(CASE WHEN g.away_team_id = t.team_id AND g.home_team_score > g.away_team_score THEN 1 END) AS away_losses,
    SUM(CASE WHEN t.division = opp.division AND ((g.home_team_id = t.team_id AND g.home_team_score > g.away_team_score) OR (g.away_team_id = t.team_id AND g.home_team_score < g.away_team_score)) THEN 1 ELSE 0 END) AS div_wins,
    SUM(CASE WHEN t.division = opp.division AND ((g.home_team_id = t.team_id AND g.home_team_score < g.away_team_score) OR (g.away_team_id = t.team_id AND g.home_team_score > g.away_team_score)) THEN 1 ELSE 0 END) AS div_losses,
    SUM(CASE WHEN t.conference = opp.conference AND ((g.home_team_id = t.team_id AND g.home_team_score > g.away_team_score) OR (g.away_team_id = t.team_id AND g.home_team_score < g.away_team_score)) THEN 1 ELSE 0 END) AS conf_wins,
    SUM(CASE WHEN t.conference = opp.conference AND ((g.home_team_id = t.team_id AND g.home_team_score < g.away_team_score) OR (g.away_team_id = t.team_id AND g.home_team_score > g.away_team_score)) THEN 1 ELSE 0 END) AS conf_losses,
    ROUND(AVG(CASE WHEN g.home_team_id = t.team_id THEN g.home_team_score ELSE g.away_team_score END), 1) AS ppg,
    ROUND(AVG(CASE WHEN g.home_team_id = t.team_id THEN g.away_team_score ELSE g.home_team_score END), 1) AS opp_ppg,
    ROUND(AVG(CASE WHEN g.home_team_id = t.team_id THEN g.home_team_score - g.away_team_score ELSE g.away_team_score - g.home_team_score END), 1) AS diff,
    (
        SELECT
            STRING_AGG(CASE
                WHEN gs.home_team_id = t.team_id AND gs.home_team_score > gs.away_team_score THEN 'W'
                WHEN gs.away_team_id = t.team_id AND gs.away_team_score > gs.home_team_score THEN 'W'
                ELSE 'L'
            END, '-') 
        FROM (
            SELECT
                home_team_id,
                away_team_id,
                home_team_score,
                away_team_score,
                ROW_NUMBER() OVER (ORDER BY date DESC) AS rn
            FROM
                games
            WHERE
                home_team_id = t.team_id OR away_team_id = t.team_id
        ) gs
        WHERE
            gs.rn <= 10
    ) AS last_10
FROM
	(SELECT * 
    FROM games
	WHERE in_season_tournament = false AND postseason = false) g
INNER JOIN teams t ON g.home_team_id = t.team_id OR g.away_team_id = t.team_id
LEFT JOIN teams opp ON (g.home_team_id = opp.team_id AND g.away_team_id = t.team_id)
                    OR (g.away_team_id = opp.team_id AND g.home_team_id = t.team_id)
GROUP BY
    t.team_id,
    t.full_name
ORDER BY
    wins DESC,
    conf_wins DESC;
