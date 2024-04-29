CREATE OR REPLACE VIEW player_stats_splits AS
SELECT
    player_id,
    player_name,

    -- all averages
    (
        SELECT JSON_BUILD_OBJECT(
            'gp', COUNT(*),
            'avg_minutes', ROUND(((SUM(minutes) * 1.0) / COUNT(*)), 1),
            'avg_pts', ROUND(AVG(pts), 1),
            'avg_fgm', ROUND(AVG(fgm), 1),
            'avg_fga', ROUND(AVG(fga), 1),
            'avg_fg_percentage', ROUND((SUM(fgm) * 100.0 / NULLIF(SUM(fga), 0)), 1),
            'avg_tpm', ROUND(AVG(tpm), 1),
            'avg_tpa', ROUND(AVG(tpa), 1),
            'avg_tp_percentage', ROUND((SUM(tpm) * 100.0 / NULLIF(SUM(tpa), 0)), 1),
            'avg_ftm', ROUND(AVG(ftm), 1),
            'avg_fta', ROUND(AVG(fta), 1),
            'avg_ft_percentage', ROUND((SUM(ftm) * 100.0 / NULLIF(SUM(fta), 0)), 1),
            'avg_orb', ROUND(AVG(orb), 1),
            'avg_drb', ROUND(AVG(drb), 1),
            'avg_reb', ROUND(AVG(reb), 1),
            'avg_ast', ROUND(AVG(ast), 1),
            'avg_stl', ROUND(AVG(stl), 1),
            'avg_blk', ROUND(AVG(blk), 1),
            'avg_turnovers', ROUND(AVG(turnovers), 1),
            'avg_pf', ROUND(AVG(pf), 1)
        )
        FROM player_gamelog_view
        WHERE player_id = p.player_id
		AND NOT in_season_tournament
    ) AS overall_averages,

    -- home
    (
        SELECT JSON_BUILD_OBJECT(
            'gp', COUNT(*),
            'avg_minutes', ROUND(((SUM(minutes) * 1.0) / COUNT(*)), 1),
            'avg_pts', ROUND(AVG(pts), 1),
            'avg_fgm', ROUND(AVG(fgm), 1),
            'avg_fga', ROUND(AVG(fga), 1),
            'avg_fg_percentage', ROUND((SUM(fgm) * 100.0 / NULLIF(SUM(fga), 0)), 1),
            'avg_tpm', ROUND(AVG(tpm), 1),
            'avg_tpa', ROUND(AVG(tpa), 1),
            'avg_tp_percentage', ROUND((SUM(tpm) * 100.0 / NULLIF(SUM(tpa), 0)), 1),
            'avg_ftm', ROUND(AVG(ftm), 1),
            'avg_fta', ROUND(AVG(fta), 1),
            'avg_ft_percentage', ROUND((SUM(ftm) * 100.0 / NULLIF(SUM(fta), 0)), 1),
            'avg_orb', ROUND(AVG(orb), 1),
            'avg_drb', ROUND(AVG(drb), 1),
            'avg_reb', ROUND(AVG(reb), 1),
            'avg_ast', ROUND(AVG(ast), 1),
            'avg_stl', ROUND(AVG(stl), 1),
            'avg_blk', ROUND(AVG(blk), 1),
            'avg_turnovers', ROUND(AVG(turnovers), 1),
            'avg_pf', ROUND(AVG(pf), 1)
        )
        FROM player_gamelog_view
        WHERE player_id = p.player_id
        AND game_location = 'HOME'
		AND NOT in_season_tournament
    ) AS home_averages,

    -- away
    (
        SELECT JSON_BUILD_OBJECT(
            'gp', COUNT(*),
            'avg_minutes', ROUND(((SUM(minutes) * 1.0) / COUNT(*)), 1),
            'avg_pts', ROUND(AVG(pts), 1),
            'avg_fgm', ROUND(AVG(fgm), 1),
            'avg_fga', ROUND(AVG(fga), 1),
            'avg_fg_percentage', ROUND((SUM(fgm) * 100.0 / NULLIF(SUM(fga), 0)), 1),
            'avg_tpm', ROUND(AVG(tpm), 1),
            'avg_tpa', ROUND(AVG(tpa), 1),
            'avg_tp_percentage', ROUND((SUM(tpm) * 100.0 / NULLIF(SUM(tpa), 0)), 1),
            'avg_ftm', ROUND(AVG(ftm), 1),
            'avg_fta', ROUND(AVG(fta), 1),
            'avg_ft_percentage', ROUND((SUM(ftm) * 100.0 / NULLIF(SUM(fta), 0)), 1),
            'avg_orb', ROUND(AVG(orb), 1),
            'avg_drb', ROUND(AVG(drb), 1),
            'avg_reb', ROUND(AVG(reb), 1),
            'avg_ast', ROUND(AVG(ast), 1),
            'avg_stl', ROUND(AVG(stl), 1),
            'avg_blk', ROUND(AVG(blk), 1),
            'avg_turnovers', ROUND(AVG(turnovers), 1),
            'avg_pf', ROUND(AVG(pf), 1)
        )
        FROM player_gamelog_view
        WHERE player_id = p.player_id
        AND game_location = 'AWAY'
		AND NOT in_season_tournament
    ) AS away_averages,

    -- conference
    (
        SELECT JSON_BUILD_OBJECT(
            'gp', COUNT(*),
            'avg_minutes', ROUND(((SUM(minutes) * 1.0) / COUNT(*)), 1),
            'avg_pts', ROUND(AVG(pts), 1),
            'avg_fgm', ROUND(AVG(fgm), 1),
            'avg_fga', ROUND(AVG(fga), 1),
            'avg_fg_percentage', ROUND((SUM(fgm) * 100.0 / NULLIF(SUM(fga), 0)), 1),
            'avg_tpm', ROUND(AVG(tpm), 1),
            'avg_tpa', ROUND(AVG(tpa), 1),
            'avg_tp_percentage', ROUND((SUM(tpm) * 100.0 / NULLIF(SUM(tpa), 0)), 1),
            'avg_ftm', ROUND(AVG(ftm), 1),
            'avg_fta', ROUND(AVG(fta), 1),
            'avg_ft_percentage', ROUND((SUM(ftm) * 100.0 / NULLIF(SUM(fta), 0)), 1),
            'avg_orb', ROUND(AVG(orb), 1),
            'avg_drb', ROUND(AVG(drb), 1),
            'avg_reb', ROUND(AVG(reb), 1),
            'avg_ast', ROUND(AVG(ast), 1),
            'avg_stl', ROUND(AVG(stl), 1),
            'avg_blk', ROUND(AVG(blk), 1),
            'avg_turnovers', ROUND(AVG(turnovers), 1),
            'avg_pf', ROUND(AVG(pf), 1)
        )
        FROM player_gamelog_view
        JOIN teams player_team ON player_gamelog_view.player_team_id = player_team.team_id
        JOIN teams opp_team ON player_gamelog_view.opp_team_id = opp_team.team_id
        WHERE player_id = p.player_id
        AND player_team.conference = opp_team.conference
		AND NOT in_season_tournament
    ) AS conference_averages,


    -- division
    (
        SELECT JSON_BUILD_OBJECT(
            'gp', COUNT(*),
            'avg_minutes', ROUND(((SUM(minutes) * 1.0) / COUNT(*)), 1),
            'avg_pts', ROUND(AVG(pts), 1),
            'avg_fgm', ROUND(AVG(fgm), 1),
            'avg_fga', ROUND(AVG(fga), 1),
            'avg_fg_percentage', ROUND((SUM(fgm) * 100.0 / NULLIF(SUM(fga), 0)), 1),
            'avg_tpm', ROUND(AVG(tpm), 1),
            'avg_tpa', ROUND(AVG(tpa), 1),
            'avg_tp_percentage', ROUND((SUM(tpm) * 100.0 / NULLIF(SUM(tpa), 0)), 1),
            'avg_ftm', ROUND(AVG(ftm), 1),
            'avg_fta', ROUND(AVG(fta), 1),
            'avg_ft_percentage', ROUND((SUM(ftm) * 100.0 / NULLIF(SUM(fta), 0)), 1),
            'avg_orb', ROUND(AVG(orb), 1),
            'avg_drb', ROUND(AVG(drb), 1),
            'avg_reb', ROUND(AVG(reb), 1),
            'avg_ast', ROUND(AVG(ast), 1),
            'avg_stl', ROUND(AVG(stl), 1),
            'avg_blk', ROUND(AVG(blk), 1),
            'avg_turnovers', ROUND(AVG(turnovers), 1),
            'avg_pf', ROUND(AVG(pf), 1)
        )
        FROM player_gamelog_view
        JOIN teams player_team ON player_gamelog_view.player_team_id = player_team.team_id
        JOIN teams opp_team ON player_gamelog_view.opp_team_id = opp_team.team_id
        WHERE player_id = p.player_id
        AND player_team.division = opp_team.division
		AND NOT in_season_tournament
    ) AS division_averages,

    -- wins
    (
        SELECT JSON_BUILD_OBJECT(
            'gp', COUNT(*),
            'avg_minutes', ROUND(((SUM(minutes) * 1.0) / COUNT(*)), 1),
            'avg_pts', ROUND(AVG(pts), 1),
            'avg_fgm', ROUND(AVG(fgm), 1),
            'avg_fga', ROUND(AVG(fga), 1),
            'avg_fg_percentage', ROUND((SUM(fgm) * 100.0 / NULLIF(SUM(fga), 0)), 1),
            'avg_tpm', ROUND(AVG(tpm), 1),
            'avg_tpa', ROUND(AVG(tpa), 1),
            'avg_tp_percentage', ROUND((SUM(tpm) * 100.0 / NULLIF(SUM(tpa), 0)), 1),
            'avg_ftm', ROUND(AVG(ftm), 1),
            'avg_fta', ROUND(AVG(fta), 1),
            'avg_ft_percentage', ROUND((SUM(ftm) * 100.0 / NULLIF(SUM(fta), 0)), 1),
            'avg_orb', ROUND(AVG(orb), 1),
            'avg_drb', ROUND(AVG(drb), 1),
            'avg_reb', ROUND(AVG(reb), 1),
            'avg_ast', ROUND(AVG(ast), 1),
            'avg_stl', ROUND(AVG(stl), 1),
            'avg_blk', ROUND(AVG(blk), 1),
            'avg_turnovers', ROUND(AVG(turnovers), 1),
            'avg_pf', ROUND(AVG(pf), 1)
        )
        FROM player_gamelog_view
        WHERE player_id = p.player_id
        AND game_result = 'W'
		AND NOT in_season_tournament
    ) AS win_averages,

    -- losses
	(
        SELECT JSON_BUILD_OBJECT(
            'gp', COUNT(*),
            'avg_minutes', ROUND(((SUM(minutes) * 1.0) / COUNT(*)), 1),
            'avg_pts', ROUND(AVG(pts), 1),
            'avg_fgm', ROUND(AVG(fgm), 1),
            'avg_fga', ROUND(AVG(fga), 1),
            'avg_fg_percentage', ROUND((SUM(fgm) * 100.0 / NULLIF(SUM(fga), 0)), 1),
            'avg_tpm', ROUND(AVG(tpm), 1),
            'avg_tpa', ROUND(AVG(tpa), 1),
            'avg_tp_percentage', ROUND((SUM(tpm) * 100.0 / NULLIF(SUM(tpa), 0)), 1),
            'avg_ftm', ROUND(AVG(ftm), 1),
            'avg_fta', ROUND(AVG(fta), 1),
            'avg_ft_percentage', ROUND((SUM(ftm) * 100.0 / NULLIF(SUM(fta), 0)), 1),
            'avg_orb', ROUND(AVG(orb), 1),
            'avg_drb', ROUND(AVG(drb), 1),
            'avg_reb', ROUND(AVG(reb), 1),
            'avg_ast', ROUND(AVG(ast), 1),
            'avg_stl', ROUND(AVG(stl), 1),
            'avg_blk', ROUND(AVG(blk), 1),
            'avg_turnovers', ROUND(AVG(turnovers), 1),
            'avg_pf', ROUND(AVG(pf), 1)
        )
        FROM player_gamelog_view
        WHERE player_id = p.player_id
        AND game_result = 'L'
		AND NOT in_season_tournament
    ) AS loss_averages

FROM 
    (SELECT DISTINCT player_id, player_name FROM player_gamelog_view) p;