CREATE OR REPLACE VIEW team_2023_24_playoffs_totals_and_averages AS
SELECT
    t.team_id,
    t.full_name,
    t.abbreviation,

    -- Games Played
    COUNT(CASE WHEN g.home_team_id = t.team_id OR g.away_team_id = t.team_id THEN 1 END) AS gp,

    -- Wins
    SUM(CASE WHEN (g.home_team_id = t.team_id AND g.home_team_score > g.away_team_score)
                OR (g.away_team_id = t.team_id AND g.away_team_score > g.home_team_score) THEN 1 ELSE 0 END) AS wins,

    -- Losses
    SUM(CASE WHEN (g.home_team_id = t.team_id AND g.home_team_score < g.away_team_score)
                OR (g.away_team_id = t.team_id AND g.away_team_score < g.home_team_score) THEN 1 ELSE 0 END) AS losses,

    -- Win Percentage
    ROUND(SUM(CASE WHEN (g.home_team_id = t.team_id AND g.home_team_score > g.away_team_score)
                        OR (g.away_team_id = t.team_id AND g.away_team_score > g.home_team_score) THEN 1 ELSE 0 END) 
          * 1.0 / NULLIF(COUNT(CASE WHEN g.home_team_id = t.team_id OR g.away_team_id = t.team_id THEN 1 END), 0), 3) AS win_percentage,

    -- Totals

    -- POINTS
    SUM(CASE WHEN g.home_team_id = t.team_id THEN g.home_team_score ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_team_score ELSE 0 END) AS total_pts,

    -- FGs
    SUM(CASE WHEN g.home_team_id = t.team_id THEN g.home_fgm ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_fgm ELSE 0 END) AS total_fgm,
    SUM(CASE WHEN g.home_team_id = t.team_id THEN g.home_fga ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_fga ELSE 0 END) AS total_fga,

    -- TPFGs
    SUM(CASE WHEN g.home_team_id = t.team_id THEN g.home_tpm ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_tpm ELSE 0 END) AS total_tpm,
    SUM(CASE WHEN g.home_team_id = t.team_id THEN g.home_tpa ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_tpa ELSE 0 END) AS total_tpa,

    -- FTs
    SUM(CASE WHEN g.home_team_id = t.team_id THEN g.home_ftm ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_ftm ELSE 0 END) AS total_ftm,
    SUM(CASE WHEN g.home_team_id = t.team_id THEN g.home_fta ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_fta ELSE 0 END) AS total_fta,

    -- REBs
    SUM(CASE WHEN g.home_team_id = t.team_id THEN g.home_reb ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_reb ELSE 0 END) AS total_reb,
    SUM(CASE WHEN g.home_team_id = t.team_id THEN g.home_orb ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_orb ELSE 0 END) AS total_orb,
    SUM(CASE WHEN g.home_team_id = t.team_id THEN g.home_drb ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_drb ELSE 0 END) AS total_drb,
    
    -- OTHER STATS
    SUM(CASE WHEN g.home_team_id = t.team_id THEN g.home_ast ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_ast ELSE 0 END) AS total_ast,
    SUM(CASE WHEN g.home_team_id = t.team_id THEN g.home_stl ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_stl ELSE 0 END) AS total_stl,
    SUM(CASE WHEN g.home_team_id = t.team_id THEN g.home_blk ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_blk ELSE 0 END) AS total_blk,
    SUM(CASE WHEN g.home_team_id = t.team_id THEN g.home_turnovers ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_turnovers ELSE 0 END) AS total_turnovers,
    SUM(CASE WHEN g.home_team_id = t.team_id THEN g.home_pf ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_pf ELSE 0 END) AS total_pf,
    
    -- Averages
	
	-- PTS
    ROUND(AVG(CASE WHEN g.home_team_id = t.team_id THEN g.home_team_score ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_team_score ELSE 0 END), 1) AS avg_pts,

	-- FGs
	ROUND(AVG(CASE WHEN g.home_team_id = t.team_id THEN g.home_fgm ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_fgm ELSE 0 END), 1) AS avg_fgm,
    ROUND(AVG(CASE WHEN g.home_team_id = t.team_id THEN g.home_fga ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_fga ELSE 0 END), 1) AS avg_fga,
	ROUND(SUM(CASE WHEN g.home_team_id = t.team_id THEN g.home_fgm ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_fgm ELSE 0 END) 
        * 100.0 / NULLIF(SUM(CASE WHEN g.home_team_id = t.team_id THEN g.home_fga ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_fga ELSE 0 END), 0), 1) AS avg_fg_percentage,

	-- TPFGs
	ROUND(AVG(CASE WHEN g.home_team_id = t.team_id THEN g.home_tpm ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_tpm ELSE 0 END), 1) AS avg_tpm,
    ROUND(AVG(CASE WHEN g.home_team_id = t.team_id THEN g.home_tpa ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_tpa ELSE 0 END), 1) AS avg_tpa,
	ROUND(SUM(CASE WHEN g.home_team_id = t.team_id THEN g.home_tpm ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_tpm ELSE 0 END) 
        * 100.0 / NULLIF(SUM(CASE WHEN g.home_team_id = t.team_id THEN g.home_tpa ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_tpa ELSE 0 END), 0), 1) AS avg_tp_percentage,
		
	-- FTs
    ROUND(AVG(CASE WHEN g.home_team_id = t.team_id THEN g.home_ftm ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_ftm ELSE 0 END), 1) AS avg_ftm,
    ROUND(AVG(CASE WHEN g.home_team_id = t.team_id THEN g.home_fta ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_fta ELSE 0 END), 1) AS avg_fta,
	ROUND(SUM(CASE WHEN g.home_team_id = t.team_id THEN g.home_ftm ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_ftm ELSE 0 END) 
        * 100.0 / NULLIF(SUM(CASE WHEN g.home_team_id = t.team_id THEN g.home_fta ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_fta ELSE 0 END), 0), 1) AS avg_ft_percentage,

	-- REBs
	ROUND(AVG(CASE WHEN g.home_team_id = t.team_id THEN g.home_reb ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_reb ELSE 0 END), 1) AS avg_reb,
    ROUND(AVG(CASE WHEN g.home_team_id = t.team_id THEN g.home_orb ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_orb ELSE 0 END), 1) AS avg_orb,
    ROUND(AVG(CASE WHEN g.home_team_id = t.team_id THEN g.home_drb ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_drb ELSE 0 END), 1) AS avg_drb,

	-- OTHER STATs
	ROUND(AVG(CASE WHEN g.home_team_id = t.team_id THEN g.home_ast ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_ast ELSE 0 END), 1) AS avg_ast,
    ROUND(AVG(CASE WHEN g.home_team_id = t.team_id THEN g.home_stl ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_stl ELSE 0 END), 1) AS avg_stl,
    ROUND(AVG(CASE WHEN g.home_team_id = t.team_id THEN g.home_blk ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_blk ELSE 0 END), 1) AS avg_blk,
    ROUND(AVG(CASE WHEN g.home_team_id = t.team_id THEN g.home_turnovers ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_turnovers ELSE 0 END), 1) AS avg_turnovers,
    ROUND(AVG(CASE WHEN g.home_team_id = t.team_id THEN g.home_pf ELSE 0 END +
        CASE WHEN g.away_team_id = t.team_id THEN g.away_pf ELSE 0 END), 1) AS avg_pf

FROM
    (SELECT * 
    FROM game_box_scores
	WHERE postseason = true) g
    JOIN teams t on g.home_team_id = t.team_id OR g.away_team_id = t.team_id
	
GROUP BY
	t.team_id,
	t.full_name,
    t.abbreviation

ORDER BY win_percentage DESC;
