-- standings
SELECT JSON_AGG(
    JSON_BUILD_OBJECT(
        'team_id', s.team_id,
        'abbreviation', s.abbreviation,
        'team_full_name', s.full_name,
        'wins', s.wins,
        'losses', s.losses,
        'pct', s.pct,
        'gb', (SELECT COALESCE(MAX(wins) - s.wins, 0) FROM standings_view),
        'last_10', s.last_10
    )
)
	FROM standings_view s
    WHERE s.division = (SELECT division FROM standings_view WHERE team_id =$1),

-- recent games
SELECT JSON_AGG(
    JSON_BUILD_OBJECT(
        
    )
)

WITH team_standings AS (
    SELECT JSON_AGG(
    JSON_BUILD_OBJECT(
        'team_id', s.team_id,
        'abbreviation', s.abbreviation,
        'team_full_name', s.full_name,
        'wins', s.wins,
        'losses', s.losses,
        'pct', s.pct,
        'gb', (SELECT COALESCE(MAX(wins) - s.wins, 0) FROM standings_view),
        'last_10', s.last_10
    )
)
	FROM standings_view s
    WHERE s.division = (SELECT division FROM standings_view WHERE team_id =$1),

)