CREATE VIEW standings_view_with_gb_division AS
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

    -- WINS vs EASTERN CONFERENCE TEAMS
	SUM(CASE
        WHEN opp.conference = 'Eastern' THEN
            CASE
                WHEN (g.home_team_id = sv.team_id AND g.home_team_score > g.away_team_score)
                    OR (g.away_team_id = sv.team_id AND g.away_team_score > g.home_team_score) THEN 1
                ELSE 0
            END
        ELSE 0
    END) AS "east_wins",

    -- LOSSES vs EASTERN CONFERENCE TEAMS
    SUM(CASE
        WHEN opp.conference = 'Eastern' THEN
            CASE
                WHEN (g.home_team_id = sv.team_id AND g.home_team_score < g.away_team_score)
                    OR (g.away_team_id = sv.team_id AND g.away_team_score < g.home_team_score) THEN 1
                ELSE 0
            END
        ELSE 0
    END) AS "east_losses",

    -- WINS vs ATLANTIC DIVISION TEAMS
	SUM(CASE
        WHEN opp.division = 'Atlantic' THEN
            CASE
                WHEN (g.home_team_id = sv.team_id AND g.home_team_score > g.away_team_score)
                    OR (g.away_team_id = sv.team_id AND g.away_team_score > g.home_team_score) THEN 1
                ELSE 0
            END
        ELSE 0
    END) AS "atlantic_wins",

    -- LOSSES vs ATLANTIC DIVISION TEAMS
    SUM(CASE
        WHEN opp.division = 'Atlantic' THEN
            CASE
                WHEN (g.home_team_id = sv.team_id AND g.home_team_score < g.away_team_score)
                    OR (g.away_team_id = sv.team_id AND g.away_team_score < g.home_team_score) THEN 1
                ELSE 0
            END
        ELSE 0
    END) AS "atlantic_losses",

        -- WINS vs CENTRAL DIVISION TEAMS
	SUM(CASE
        WHEN opp.division = 'Central' THEN
            CASE
                WHEN (g.home_team_id = sv.team_id AND g.home_team_score > g.away_team_score)
                    OR (g.away_team_id = sv.team_id AND g.away_team_score > g.home_team_score) THEN 1
                ELSE 0
            END
        ELSE 0
    END) AS "central_wins",

    -- LOSSES vs CENTRAL DIVISION TEAMS
    SUM(CASE
        WHEN opp.division = 'Central' THEN
            CASE
                WHEN (g.home_team_id = sv.team_id AND g.home_team_score < g.away_team_score)
                    OR (g.away_team_id = sv.team_id AND g.away_team_score < g.home_team_score) THEN 1
                ELSE 0
            END
        ELSE 0
    END) AS "central_losses",

        -- WINS vs SOUTHEAST DIVISION TEAMS
	SUM(CASE
        WHEN opp.division = 'Southeast' THEN
            CASE
                WHEN (g.home_team_id = sv.team_id AND g.home_team_score > g.away_team_score)
                    OR (g.away_team_id = sv.team_id AND g.away_team_score > g.home_team_score) THEN 1
                ELSE 0
            END
        ELSE 0
    END) AS "southeast_wins",

    -- LOSSES vs SOUTHEAST DIVISION TEAMS
    SUM(CASE
        WHEN opp.division = 'Southeast' THEN
            CASE
                WHEN (g.home_team_id = sv.team_id AND g.home_team_score < g.away_team_score)
                    OR (g.away_team_id = sv.team_id AND g.away_team_score < g.home_team_score) THEN 1
                ELSE 0
            END
        ELSE 0
    END) AS "southeast_losses",

        -- WINS vs WESTERN CONFERENCE TEAMS
	SUM(CASE
        WHEN opp.conference = 'Western' THEN
            CASE
                WHEN (g.home_team_id = sv.team_id AND g.home_team_score > g.away_team_score)
                    OR (g.away_team_id = sv.team_id AND g.away_team_score > g.home_team_score) THEN 1
                ELSE 0
            END
        ELSE 0
    END) AS "west_wins",

    -- LOSSES vs WESTERN CONFERENCE TEAMS
    SUM(CASE
        WHEN opp.conference = 'Western' THEN
            CASE
                WHEN (g.home_team_id = sv.team_id AND g.home_team_score < g.away_team_score)
                    OR (g.away_team_id = sv.team_id AND g.away_team_score < g.home_team_score) THEN 1
                ELSE 0
            END
        ELSE 0
    END) AS "west_losses",

    -- WINS vs NORTHWEST DIVISION TEAMS
	SUM(CASE
        WHEN opp.division = 'Northwest' THEN
            CASE
                WHEN (g.home_team_id = sv.team_id AND g.home_team_score > g.away_team_score)
                    OR (g.away_team_id = sv.team_id AND g.away_team_score > g.home_team_score) THEN 1
                ELSE 0
            END
        ELSE 0
    END) AS "northwest_wins",

    -- LOSSES vs NORTHWEST DIVISION TEAMS
    SUM(CASE
        WHEN opp.division = 'Northwest' THEN
            CASE
                WHEN (g.home_team_id = sv.team_id AND g.home_team_score < g.away_team_score)
                    OR (g.away_team_id = sv.team_id AND g.away_team_score < g.home_team_score) THEN 1
                ELSE 0
            END
        ELSE 0
    END) AS "northwest_losses",

        -- WINS vs PACIFIC DIVISION TEAMS
	SUM(CASE
        WHEN opp.division = 'Pacific' THEN
            CASE
                WHEN (g.home_team_id = sv.team_id AND g.home_team_score > g.away_team_score)
                    OR (g.away_team_id = sv.team_id AND g.away_team_score > g.home_team_score) THEN 1
                ELSE 0
            END
        ELSE 0
    END) AS "pacific_wins",

    -- LOSSES vs PACIFIC DIVISION TEAMS
    SUM(CASE
        WHEN opp.division = 'Pacific' THEN
            CASE
                WHEN (g.home_team_id = sv.team_id AND g.home_team_score < g.away_team_score)
                    OR (g.away_team_id = sv.team_id AND g.away_team_score < g.home_team_score) THEN 1
                ELSE 0
            END
        ELSE 0
    END) AS "pacific_losses",

        -- WINS vs SOUTHWEST DIVISION TEAMS
	SUM(CASE
        WHEN opp.division = 'Southwest' THEN
            CASE
                WHEN (g.home_team_id = sv.team_id AND g.home_team_score > g.away_team_score)
                    OR (g.away_team_id = sv.team_id AND g.away_team_score > g.home_team_score) THEN 1
                ELSE 0
            END
        ELSE 0
    END) AS "southwest_wins",

    -- LOSSES vs SOUTHWEST DIVISION TEAMS
    SUM(CASE
        WHEN opp.division = 'Southwest' THEN
            CASE
                WHEN (g.home_team_id = sv.team_id AND g.home_team_score < g.away_team_score)
                    OR (g.away_team_id = sv.team_id AND g.away_team_score < g.home_team_score) THEN 1
                ELSE 0
            END
        ELSE 0
    END) AS "southwest_losses"

FROM standings_view_with_gb sv
INNER JOIN games g ON g.home_team_id = sv.team_id OR g.away_team_id = sv.team_id

LEFT JOIN teams t ON (g.home_team_id = t.team_id AND g.away_team_id = sv.team_id)
    OR (g.away_team_id = t.team_id AND g.home_team_id = sv.team_id)

LEFT JOIN standings_view_with_gb opp ON (g.home_team_id = opp.team_id AND g.away_team_id = sv.team_id)
    OR (g.away_team_id = opp.team_id AND g.home_team_id = sv.team_id)

WHERE g.in_season_tournament = FALSE AND g.postseason = FALSE

GROUP BY sv.team_id, sv.full_name, sv.abbreviation, sv.conference, sv.division, sv.wins, sv.losses, sv.pct, sv.GB

ORDER BY sv.wins DESC