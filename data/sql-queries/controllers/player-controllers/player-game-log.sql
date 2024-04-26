-- grabs all games broken up by month for specific player to view on player/gamelog view

SELECT EXTRACT(MONTH FROM g.game_date) AS month, EXTRACT(YEAR FROM g.game_date) AS year, g.player_id AS player_id, g.player_name AS name,COUNT(*) AS games_played, ARRAY_AGG(JSON_BUILD_OBJECT('game_id', g.game_id,'game_date', g.game_date,'day_of_week', TO_CHAR(g.game_date, 'Day'), 'game_location', g.game_location, 'game_result', g.game_result, 'player_team_score', g.player_team_score, 'opp_team_id', g.opp_team_id, 'opp_team_abbreviation', g.opp_team_abbreviation, 'opp_team_full_name', g.opp_team_full_name, 'opp_team_score', g.opp_team_score, 'player_id', g.player_id, 'player_name', g.player_name, 'minutes', g.minutes, 'pts', g.pts, 'fgm', g.fgm, 'fga', g.fga, 'fg_percentage', g.fg_percentage, 'tpm', g.tpm, 'tpa', g.tpa, 'tp_percentage', g.tp_percentage, 'ftm', g.ftm, 'fta', g.fta, 'ft_percentage', g.ft_percentage, 'orb', g.orb, 'drb', g.drb, 'reb', g.reb, 'ast', g.ast, 'stl', g.stl, 'blk', g.blk, 'turnovers', g.turnovers, 'pf', g.pf)) AS games, JSON_BUILD_OBJECT('avg_minutes', ROUND(SUM(g.minutes) * 1.0 / COUNT(*), 1),'avg_pts', ROUND(AVG(g.pts), 1),'avg_fgm', ROUND(AVG(g.fgm), 1),'avg_fga', ROUND(AVG(g.fga), 1),'avg_fg_percentage', ROUND(SUM(g.fgm) * 100.0 / NULLIF(SUM(g.fga), 0), 1),'avg_tpm', ROUND(AVG(g.tpm), 1),'avg_tpa', ROUND(AVG(g.tpa), 1),'avg_tp_percentage', ROUND(SUM(g.tpm) * 100.0 / NULLIF(SUM(g.tpa), 0), 1),'avg_ftm', ROUND(AVG(g.ftm), 1),'avg_fta', ROUND(AVG(g.fta), 1),'avg_ft_percentage', ROUND(SUM(g.ftm) * 100.0 / NULLIF(SUM(g.fta), 0), 1),'avg_orb', ROUND(AVG(g.orb), 1),'avg_drb', ROUND(AVG(g.drb), 1),'avg_reb', ROUND(AVG(g.reb), 1),'avg_ast', ROUND(AVG(g.ast), 1),'avg_stl', ROUND(AVG(g.stl), 1),'avg_blk', ROUND(AVG(g.blk), 1),'avg_turnovers', ROUND(AVG(g.turnovers), 1),'avg_pf', ROUND(AVG(g.pf), 1)) AS avg_stats FROM player_gamelog_view g WHERE g.player_id = $1 GROUP BY EXTRACT(MONTH FROM g.game_date), EXTRACT(YEAR FROM g.game_date), g.player_id, g.player_name ORDER BY EXTRACT(YEAR FROM g.game_date), EXTRACT(MONTH FROM g.game_date);