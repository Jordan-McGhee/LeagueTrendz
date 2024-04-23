CREATE OR REPLACE VIEW game_box_scores AS
SELECT
	pbs.game_id AS game_id,
	-- HOME TEAM
    home.team_id AS home_team_id,
    home.full_name AS home_team_full_name,
	-- 	total score
    SUM(CASE WHEN pbs.location = 'HOME' THEN pbs.pts ELSE 0 END) AS home_team_score,
	
	-- 	field goals
	SUM(CASE WHEN pbs.location = 'HOME' THEN pbs.fgm ELSE 0 END) AS home_fgm,
    SUM(CASE WHEN pbs.location = 'HOME' THEN pbs.fga ELSE 0 END) AS home_fga,
--     ROUND((SUM(CASE WHEN pbs.location = 'HOME' THEN pbs.fgm ELSE 0 END) * 1.0)/SUM(CASE WHEN pbs.location = 'HOME' THEN pbs.fga ELSE 0 END), 1) AS home_fg_percentage,

	-- three pointers
	SUM(CASE WHEN pbs.location = 'HOME' THEN pbs.tpm ELSE 0 END) AS home_tpm,
    SUM(CASE WHEN pbs.location = 'HOME' THEN pbs.tpa ELSE 0 END) AS home_tpa,
-- 	ROUND((SUM(CASE WHEN pbs.location = 'HOME' THEN pbs.tpm ELSE 0 END) * 1.0)/SUM(CASE WHEN pbs.location = 'HOME' THEN pbs.tpa ELSE 0 END), 1) AS home_tp_percentage,
    
	-- 	free throws
	SUM(CASE WHEN pbs.location = 'HOME' THEN pbs.ftm ELSE 0 END) AS home_ftm,
    SUM(CASE WHEN pbs.location = 'HOME' THEN pbs.fta ELSE 0 END) AS home_fta,
--     ROUND((SUM(CASE WHEN pbs.location = 'HOME' THEN pbs.ftm ELSE 0 END) * 1.0)/SUM(CASE WHEN pbs.location = 'HOME' THEN pbs.fta ELSE 0 END), 1) AS home_ft_percentage,
    
	-- 	rebounds
	SUM(CASE WHEN pbs.location = 'HOME' THEN pbs.orb ELSE 0 END) AS home_orb,
    SUM(CASE WHEN pbs.location = 'HOME' THEN pbs.drb ELSE 0 END) AS home_drb,
    SUM(CASE WHEN pbs.location = 'HOME' THEN pbs.reb ELSE 0 END) AS home_reb,
	
	-- assists, steals, blocks, turnovers, personal fouls
    SUM(CASE WHEN pbs.location = 'HOME' THEN pbs.ast ELSE 0 END) AS home_ast,
    SUM(CASE WHEN pbs.location = 'HOME' THEN pbs.stl ELSE 0 END) AS home_stl,
    SUM(CASE WHEN pbs.location = 'HOME' THEN pbs.blk ELSE 0 END) AS home_blk,
    SUM(CASE WHEN pbs.location = 'HOME' THEN pbs.turnovers ELSE 0 END) AS home_turnovers,
    SUM(CASE WHEN pbs.location = 'HOME' THEN pbs.pf ELSE 0 END) AS home_pf,
	
	-- AWAY TEAM
    away.team_id AS away_team_id,
    away.full_name AS away_team_full_name,
	
	-- 	total score
    SUM(CASE WHEN pbs.location = 'AWAY' THEN pbs.pts ELSE 0 END) AS away_team_score,
	
	-- field goals
    SUM(CASE WHEN pbs.location = 'AWAY' THEN pbs.fgm ELSE 0 END) AS away_fgm,
    SUM(CASE WHEN pbs.location = 'AWAY' THEN pbs.fga ELSE 0 END) AS away_fga,
--     ROUND((SUM(CASE WHEN pbs.location = 'AWAY' THEN pbs.fgm ELSE 0 END) * 1.0)/SUM(CASE WHEN pbs.location = 'AWAY' THEN pbs.fga ELSE 0 END), 1) AS away_fg_percentage,

	-- three pointers
	SUM(CASE WHEN pbs.location = 'AWAY' THEN pbs.tpm ELSE 0 END) AS away_tpm,
    SUM(CASE WHEN pbs.location = 'AWAY' THEN pbs.tpa ELSE 0 END) AS away_tpa,
--     ROUND((SUM(CASE WHEN pbs.location = 'AWAY' THEN pbs.tpm ELSE 0 END) * 1.0)/SUM(CASE WHEN pbs.location = 'AWAY' THEN pbs.tpa ELSE 0 END), 1) AS away_tp_percentage,

	-- free throws
	SUM(CASE WHEN pbs.location = 'AWAY' THEN pbs.ftm ELSE 0 END) AS away_ftm,
    SUM(CASE WHEN pbs.location = 'AWAY' THEN pbs.fta ELSE 0 END) AS away_fta,
--     ROUND((SUM(CASE WHEN pbs.location = 'AWAY' THEN pbs.ftm ELSE 0 END) * 1.0)/SUM(CASE WHEN pbs.location = 'AWAY' THEN pbs.fta ELSE 0 END), 1) AS away_ft_percentage,

	-- rebounds
	SUM(CASE WHEN pbs.location = 'AWAY' THEN pbs.orb ELSE 0 END) AS away_orb,
    SUM(CASE WHEN pbs.location = 'AWAY' THEN pbs.drb ELSE 0 END) AS away_drb,
    SUM(CASE WHEN pbs.location = 'AWAY' THEN pbs.reb ELSE 0 END) AS away_reb,

	-- assists, steals, blocks, turnovers, personal fouls
	SUM(CASE WHEN pbs.location = 'AWAY' THEN pbs.ast ELSE 0 END) AS away_ast,
    SUM(CASE WHEN pbs.location = 'AWAY' THEN pbs.stl ELSE 0 END) AS away_stl,
    SUM(CASE WHEN pbs.location = 'AWAY' THEN pbs.blk ELSE 0 END) AS away_blk,
    SUM(CASE WHEN pbs.location = 'AWAY' THEN pbs.turnovers ELSE 0 END) AS away_turnovers,
    SUM(CASE WHEN pbs.location = 'AWAY' THEN pbs.pf ELSE 0 END) AS away_pf
FROM
    player_box_scores pbs
    left JOIN teams home ON pbs.player_team_id = home.team_id AND pbs.location = 'HOME'
    left JOIN teams away ON pbs.player_team_id = away.team_id AND pbs.location = 'AWAY'
	
GROUP BY
	pbs.game_id,
    home.team_id,
    home.full_name,
    away.team_id,
    away.full_name;