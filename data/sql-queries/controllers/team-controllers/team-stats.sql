-- players

SELECT
    p.player_id,
    p.name,
    player.player_position,
    player.jersey_number,

    -- player stats
    p.gp,
    p.gs,
    p.avg_min,
    p.avg_pts,
    p.avg_orb,
    p.avg_drb,
    p.avg_reb,
    p.avg_ast,
    p.avg_stl,
    p.avg_blk,
    p.avg_pf,
	p.avg_turnovers,
	ROUND(((p.avg_ast * 1.0) / p.avg_turnovers), 1) AS ast_to_ratio,

    -- shooting stats
    p.avg_fgm,
    p.avg_fga,
    p.avg_fg_percentage,
    p.avg_tpm,
    p.avg_tpa,
    p.avg_tp_percentage,
    p.avg_ftm,
    p.avg_fta,
    p.avg_ft_percentage,
	(p.avg_fgm - p.avg_tpm) AS player_avg_two_m,
    (p.avg_fga - p.avg_tpa) AS player_avg_two_a,
	ROUND(((p.avg_fgm - p.avg_tpm) * 100.0)/(p.avg_fga - p.avg_tpa), 1) AS player_avg_two_percentage
FROM
    player_2023_24_regularseason_totals_and_averages p
JOIN
    players player ON player.player_id = p.player_id
WHERE
    p.team_id = $1;

-- string
"SELECT p.player_id, p.name, player.player_position, player.jersey_number, p.gp, p.gs, p.avg_min, p.avg_pts, p.avg_orb, p.avg_drb, p.avg_reb, p.avg_ast, p.avg_stl, p.avg_blk, p.avg_pf, p.avg_turnovers, ROUND(((p.avg_ast * 1.0) / p.avg_turnovers), 1) AS ast_to_ratio, p.avg_fgm, p.avg_fga, p.avg_fg_percentage, p.avg_tpm, p.avg_tpa, p.avg_tp_percentage, p.avg_ftm, p.avg_fta, p.avg_ft_percentage, (p.avg_fgm - p.avg_tpm) AS player_avg_two_m, (p.avg_fga - p.avg_tpa) AS player_avg_two_a, ROUND(((p.avg_fgm - p.avg_tpm) * 100.0)/(p.avg_fga - p.avg_tpa), 1) AS player_avg_two_percentage FROM player_2023_24_regularseason_totals_and_averages p JOIN players player ON player.player_id = p.player_id WHERE p.team_id = $1;"


-- team data
SELECT * FROM team_2023_24_regularseason_totals_and_averages WHERE team_id = $1

-- string
"SELECT * FROM team_2023_24_regularseason_totals_and_averages WHERE team_id = $1"