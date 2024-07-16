CREATE OR REPLACE VIEW player_gamelog_view AS
SELECT
    g.game_id AS game_id,
    g.in_season_tournament,
    g.postseason,

    -- date
    g.game_date AS game_date,
    -- home or away
    CASE WHEN pbs.location = 'HOME' THEN 'HOME' ELSE 'AWAY' END AS game_location,

    -- RESULT WIN OR LOSS
    CASE WHEN pbs.outcome = 'WIN' THEN 'W' ELSE 'L' END AS game_result,

    -- player team score
    CASE WHEN pbs.player_team_id = g.home_team_id THEN g.home_team_score ELSE g.away_team_score END AS player_team_score,

    -- player team info
    player_team.team_id AS player_team_id,
    player_team.abbreviation AS player_team_abbreviation,
    player_team.full_name AS player_team_full_name,

    -- opp_team score
    CASE WHEN pbs.player_team_id = g.home_team_id THEN g.away_team_score ELSE g.home_team_score END AS opp_team_score,

    -- opp team info
    opp_team.team_id AS opp_team_id,
    opp_team.abbreviation AS opp_team_abbreviation,
    opp_team.full_name AS opp_team_full_name,
	
	-- 	player info
	pbs.player_id,
	p.name AS player_name,
	
    -- player stats
    pbs.minutes,
    pbs.pts,
    pbs.fgm,
    pbs.fga,
    pbs.fg_percentage,
    pbs.tpm,
    pbs.tpa,
    pbs.tp_percentage,
    pbs.ftm,
    pbs.fta,
    pbs.ft_percentage,
    pbs.orb,
    pbs.drb,
    pbs.reb,
    pbs.ast,
    pbs.stl,
    pbs.blk,
    pbs.turnovers,
    pbs.pf,

    p.player_position AS player_position,
    p.photo_url AS photo_url,
    p.jersey_number AS jersey_number

    

FROM game_box_scores g
    JOIN player_box_scores pbs on g.game_id = pbs.game_id
	JOIN players p on pbs.player_id = p.player_id
    LEFT JOIN teams player_team on pbs.player_team_id = player_team.team_id
    LEFT JOIN teams opp_team on pbs.opposing_team_id = opp_team.team_id
	
ORDER BY game_id