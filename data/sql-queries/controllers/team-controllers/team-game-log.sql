SELECT
    g.game_id,
    g.game_date,
    TO_CHAR(g.game_date, 'Day') AS day_of_week,
    team.team_id AS team_id,
    team.full_name AS team_full_name,
    team.abbreviation AS team_abbreviation,
    CASE
        WHEN t.team_id = g.home_team_id THEN 'HOME'
        ELSE 'AWAY'
    END AS game_location,
    opponent.team_id AS opponent_team_id,
    opponent.full_name AS opponent_team_full_name,
    opponent.abbreviation AS opponent_team_abbreviation,
    CASE
        WHEN t.team_id = g.home_team_id THEN CASE
            WHEN g.home_team_score > g.away_team_score THEN 'W'
            ELSE 'L'
        END
        ELSE CASE
            WHEN g.home_team_score < g.away_team_score THEN 'W'
            ELSE 'L'
        END
    END AS result,
    CASE
        WHEN t.team_id = g.home_team_id THEN g.home_team_score
        ELSE g.away_team_score
    END AS team_score,
    CASE
        WHEN t.team_id = g.home_team_id THEN g.away_team_score
        ELSE g.home_team_score
    END AS opponent_score,
    SUM(
        CASE
            WHEN t.team_id = g.home_team_id THEN CASE
                WHEN g.home_team_score > g.away_team_score THEN 1
                ELSE 0
            END
            ELSE CASE
                WHEN g.home_team_score < g.away_team_score THEN 1
                ELSE 0
            END
        END
    ) OVER (
        ORDER BY
            g.game_date ROWS UNBOUNDED PRECEDING
    ) AS wins,
    SUM(
        CASE
            WHEN t.team_id = g.home_team_id THEN CASE
                WHEN g.home_team_score < g.away_team_score THEN 1
                ELSE 0
            END
            ELSE CASE
                WHEN g.home_team_score > g.away_team_score THEN 1
                ELSE 0
            END
        END
    ) OVER (
        ORDER BY
            g.game_date ROWS UNBOUNDED PRECEDING
    ) AS losses,
    (
		SELECT CONCAT(player_id, ' - ', player_name, ' (', pts, ')') AS pts_leader
        FROM player_gamelog_view pgl
        WHERE pgl.game_id = g.game_id
            AND pgl.player_team_id = team.team_id
        ORDER BY pts DESC
        LIMIT 1
    ),
    (
		SELECT CONCAT(player_id, ' - ', player_name, ' (', reb, ')') AS reb_leader
        FROM player_gamelog_view pgl
        WHERE pgl.game_id = g.game_id
            AND pgl.player_team_id = team.team_id
        ORDER BY reb DESC
        LIMIT 1
    ),
    (
		SELECT CONCAT(player_id, ' - ', player_name, ' (', ast, ')') AS ast_leader
        FROM player_gamelog_view pgl
        WHERE pgl.game_id = g.game_id
            AND pgl.player_team_id = team.team_id
        ORDER BY ast DESC
        LIMIT 1
    )
FROM
    game_box_scores g
    INNER JOIN (
        SELECT
            team_id
        FROM
            teams
        WHERE
            team_id = 1
    ) t ON g.home_team_id = t.team_id
    OR g.away_team_id = t.team_id
    INNER JOIN teams team ON t.team_id = team.team_id
    INNER JOIN teams opponent ON CASE
        WHEN t.team_id = g.home_team_id THEN g.away_team_id
        ELSE g.home_team_id
    END = opponent.team_id
WHERE
    NOT g.postseason AND NOT g.in_season_tournament
ORDER BY
    g.game_date;


-- string version
"SELECT g.game_id, g.game_date, TO_CHAR(g.game_date, 'Day') AS day_of_week, team.team_id AS team_id, team.full_name AS team_full_name, team.abbreviation AS team_abbreviation, CASE WHEN t.team_id = g.home_team_id THEN 'HOME' ELSE 'AWAY' END AS game_location, opponent.team_id AS opponent_team_id, opponent.full_name AS opponent_team_full_name, opponent.abbreviation AS opponent_team_abbreviation, CASE WHEN t.team_id = g.home_team_id THEN CASE WHEN g.home_team_score > g.away_team_score THEN 'W' ELSE 'L' END ELSE CASE WHEN g.home_team_score < g.away_team_score THEN 'W' ELSE 'L' END END AS result, CASE WHEN t.team_id = g.home_team_id THEN g.home_team_score ELSE g.away_team_score END AS team_score, CASE WHEN t.team_id = g.home_team_id THEN g.away_team_score ELSE g.home_team_score END AS opponent_score, SUM( CASE WHEN t.team_id = g.home_team_id THEN CASE WHEN g.home_team_score > g.away_team_score THEN 1 ELSE 0 END ELSE CASE WHEN g.home_team_score < g.away_team_score THEN 1 ELSE 0 END END ) OVER ( ORDER BY g.game_date ROWS UNBOUNDED PRECEDING ) AS wins, SUM( CASE WHEN t.team_id = g.home_team_id THEN CASE WHEN g.home_team_score < g.away_team_score THEN 1 ELSE 0 END ELSE CASE WHEN g.home_team_score > g.away_team_score THEN 1 ELSE 0 END END ) OVER ( ORDER BY g.game_date ROWS UNBOUNDED PRECEDING ) AS losses, ( SELECT CONCAT(player_id, ' - ', player_name, ' (', pts, ')') AS pts_leader FROM player_gamelog_view pgl WHERE pgl.game_id = g.game_id AND pgl.player_team_id = team.team_id ORDER BY pts DESC LIMIT 1 ), ( SELECT CONCAT(player_id, ' - ', player_name, ' (', reb, ')') AS reb_leader FROM player_gamelog_view pgl WHERE pgl.game_id = g.game_id AND pgl.player_team_id = team.team_id ORDER BY reb DESC LIMIT 1 ), ( SELECT CONCAT(player_id, ' - ', player_name, ' (', ast, ')') AS ast_leader FROM player_gamelog_view pgl WHERE pgl.game_id = g.game_id AND pgl.player_team_id = team.team_id ORDER BY ast DESC LIMIT 1 ) FROM game_box_scores g INNER JOIN ( SELECT team_id FROM teams WHERE team_id = $1 ) t ON g.home_team_id = t.team_id OR g.away_team_id = t.team_id INNER JOIN teams team ON t.team_id = team.team_id INNER JOIN teams opponent ON CASE WHEN t.team_id = g.home_team_id THEN g.away_team_id ELSE g.home_team_id END = opponent.team_id WHERE NOT g.postseason AND NOT g.in_season_tournament ORDER BY g.game_date;"