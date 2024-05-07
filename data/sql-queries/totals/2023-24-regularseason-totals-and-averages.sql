CREATE VIEW player_2023_24_regularseason_totals_and_averages AS
SELECT
    pt.player_id,
    p.name,
    pt.team_id,
    t.full_name,
    t.abbreviation,
    pt.gp,
    pt.gs,
    ROUND(pt.min * 1.0 / pt.gp, 1) AS avg_min,
    ROUND(pt.pts * 1.0 / pt.gp, 1) AS avg_pts,
    ROUND(pt.fgm * 1.0 / pt.gp, 1) AS avg_fgm,
    ROUND(pt.fga * 1.0 / pt.gp, 1) AS avg_fga,
    ROUND(pt.fg_percentage, 1) AS avg_fg_percentage,
    ROUND(pt.tpm * 1.0 / pt.gp, 1) AS avg_tpm,
    ROUND(pt.tpa * 1.0 / pt.gp, 1) AS avg_tpa,
    ROUND(pt.tp_percentage, 1) AS avg_tp_percentage,
    ROUND(pt.ftm * 1.0 / pt.gp, 1) AS avg_ftm,
    ROUND(pt.fta * 1.0 / pt.gp, 1) AS avg_fta,
    ROUND(pt.ft_percentage, 1) AS avg_ft_percentage,
    ROUND(pt.orb * 1.0 / pt.gp, 1) AS avg_orb,
    ROUND(pt.drb * 1.0 / pt.gp, 1) AS avg_drb,
    ROUND(pt.reb * 1.0 / pt.gp, 1) AS avg_reb,
    ROUND(pt.ast * 1.0 / pt.gp, 1) AS avg_ast,
    ROUND(pt.stl * 1.0 / pt.gp, 1) AS avg_stl,
    ROUND(pt.blk * 1.0 / pt.gp, 1) AS avg_blk,
    ROUND(pt.turnovers * 1.0 / pt.gp, 1) AS avg_turnovers,
    ROUND(pt.pf * 1.0 / pt.gp, 1) AS avg_pf,
    pt.min,
    pt.pts,
    pt.fgm,
    pt.fga,
    pt.fg_percentage,
    pt.tpm,
    pt.tpa,
    pt.tp_percentage,
    pt.ftm,
    pt.fta,
    pt.ft_percentage,
    pt.orb,
    pt.drb,
    pt.reb,
    pt.ast,
    pt.stl,
    pt.blk,
    pt.turnovers,
    pt.pf
FROM
    player_totals_2023_24 pt
    JOIN players p ON pt.player_id = p.player_id
    JOIN teams t ON pt.team_id = t.team_id
	
ORDER BY pt.player_id