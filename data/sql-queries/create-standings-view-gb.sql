CREATE VIEW standings_view_with_GB AS
SELECT
    team_id,
    full_name,
    wins,
    pct,
    CASE
        WHEN wins = MAX(wins) OVER () THEN '-' -- Leading team
        ELSE (MAX(wins) OVER () - wins)::text
    END AS GB,
    home_wins,
    home_losses,
    away_wins,
    away_losses,
    div_wins,
    div_losses,
    conf_wins,
    conf_losses,
    ppg,
    opp_ppg,
    diff,
    last_10
FROM standings_view;
