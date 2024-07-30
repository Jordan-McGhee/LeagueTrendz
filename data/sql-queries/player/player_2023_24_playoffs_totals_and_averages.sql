-- CREATE OR REPLACE VIEW player_2023_24_playoffs_totals_and_averages AS
-- SELECT 
--     pbs.player_id,
--     p.name,
--     p.player_position,
--     p.jersey_number,
--     p.photo_url,
--     p.team_id,
--     p.full_name,
--     p.abbreviation,
--     COUNT(DISTINCT pbs.game_id) AS gp,

--     -- averages (rounded to one decimal place)
--     ROUND(AVG(pbs.minutes)::numeric, 1) AS avg_min,
--     ROUND(AVG(pbs.pts)::numeric, 1) AS avg_pts,
--     ROUND(AVG(pbs.fgm)::numeric, 1) AS avg_fgm,
--     ROUND(AVG(pbs.fga)::numeric, 1) AS avg_fga,
--     CASE 
--         WHEN SUM(pbs.fga) = 0 THEN 0
--         ELSE ROUND((SUM(pbs.fgm) * 100.0 / NULLIF(SUM(pbs.fga), 0))::numeric, 1)
--     END AS avg_fg_percentage,
--     ROUND(AVG(pbs.tpm)::numeric, 1) AS avg_tpm,
--     ROUND(AVG(pbs.tpa)::numeric, 1) AS avg_tpa,
--     CASE 
--         WHEN SUM(pbs.tpa) = 0 THEN 0
--         ELSE ROUND((SUM(pbs.tpm) * 100.0 / NULLIF(SUM(pbs.tpa), 0))::numeric, 1)
--     END AS avg_tp_percentage,
--     ROUND(AVG(pbs.ftm)::numeric, 1) AS avg_ftm,
--     ROUND(AVG(pbs.fta)::numeric, 1) AS avg_fta,
--     CASE 
--         WHEN SUM(pbs.fta) = 0 THEN 0
--         ELSE ROUND((SUM(pbs.ftm) * 100.0 / NULLIF(SUM(pbs.fta), 0))::numeric, 1)
--     END AS avg_ft_percentage,
--     ROUND(AVG(pbs.orb)::numeric, 1) AS avg_orb,
--     ROUND(AVG(pbs.drb)::numeric, 1) AS avg_drb,
--     ROUND(AVG(pbs.reb)::numeric, 1) AS avg_reb,
--     ROUND(AVG(pbs.ast)::numeric, 1) AS avg_ast,
--     ROUND(AVG(pbs.stl)::numeric, 1) AS avg_stl,
--     ROUND(AVG(pbs.blk)::numeric, 1) AS avg_blk,
--     ROUND(AVG(pbs.turnovers)::numeric, 1) AS avg_turnovers,
--     ROUND(AVG(pbs.pf)::numeric, 1) AS avg_pf,

--     -- totals
--     SUM(pbs.minutes) AS min,
--     SUM(pbs.pts) AS pts,
--     SUM(pbs.fgm) AS fgm,
--     SUM(pbs.fga) AS fga,
--     SUM(pbs.tpm) AS tpm,
--     SUM(pbs.tpa) AS tpa,
--     SUM(pbs.ftm) AS ftm,
--     SUM(pbs.fta) AS fta,
--     SUM(pbs.orb) AS orb,
--     SUM(pbs.drb) AS drb,
--     SUM(pbs.reb) AS reb,
--     SUM(pbs.ast) AS ast,
--     SUM(pbs.stl) AS stl,
--     SUM(pbs.blk) AS blk,
--     SUM(pbs.turnovers) AS turnovers,
--     SUM(pbs.pf) AS pf

-- FROM 
--     player_box_scores pbs
-- JOIN 
--     game_box_scores gbs ON pbs.game_id = gbs.game_id
-- JOIN 
--     player_2023_24_regularseason_totals_and_averages p ON pbs.player_id = p.player_id
-- WHERE 
--     gbs.postseason = true
-- GROUP BY 
--     pbs.player_id, p.name, p.player_position, p.jersey_number, p.photo_url, p.team_id, p.full_name, p.abbreviation;

CREATE OR REPLACE VIEW player_2023_24_playoffs_totals_and_averages AS
SELECT 
    pbs.player_id::integer,
    p.name,
    p.player_position,
    p.jersey_number::integer,
    p.photo_url,
    p.team_id::integer,
    p.full_name,
    p.abbreviation,
    COUNT(DISTINCT pbs.game_id)::bigint AS gp,

    -- averages (rounded to one decimal place)
    ROUND(AVG(pbs.minutes)::numeric, 1)::numeric AS avg_min,
    ROUND(AVG(pbs.pts)::numeric, 1)::numeric AS avg_pts,
    ROUND(AVG(pbs.fgm)::numeric, 1)::numeric AS avg_fgm,
    ROUND(AVG(pbs.fga)::numeric, 1)::numeric AS avg_fga,
    CASE 
        WHEN SUM(pbs.fga) = 0 THEN 0::numeric
        ELSE ROUND((SUM(pbs.fgm) * 100.0 / NULLIF(SUM(pbs.fga), 0))::numeric, 1)::numeric
    END AS avg_fg_percentage,
    ROUND(AVG(pbs.tpm)::numeric, 1)::numeric AS avg_tpm,
    ROUND(AVG(pbs.tpa)::numeric, 1)::numeric AS avg_tpa,
    CASE 
        WHEN SUM(pbs.tpa) = 0 THEN 0::numeric
        ELSE ROUND((SUM(pbs.tpm) * 100.0 / NULLIF(SUM(pbs.tpa), 0))::numeric, 1)::numeric
    END AS avg_tp_percentage,
    ROUND(AVG(pbs.ftm)::numeric, 1)::numeric AS avg_ftm,
    ROUND(AVG(pbs.fta)::numeric, 1)::numeric AS avg_fta,
    CASE 
        WHEN SUM(pbs.fta) = 0 THEN 0::numeric
        ELSE ROUND((SUM(pbs.ftm) * 100.0 / NULLIF(SUM(pbs.fta), 0))::numeric, 1)::numeric
    END AS avg_ft_percentage,
    ROUND(AVG(pbs.orb)::numeric, 1)::numeric AS avg_orb,
    ROUND(AVG(pbs.drb)::numeric, 1)::numeric AS avg_drb,
    ROUND(AVG(pbs.reb)::numeric, 1)::numeric AS avg_reb,
    ROUND(AVG(pbs.ast)::numeric, 1)::numeric AS avg_ast,
    ROUND(AVG(pbs.stl)::numeric, 1)::numeric AS avg_stl,
    ROUND(AVG(pbs.blk)::numeric, 1)::numeric AS avg_blk,
    ROUND(AVG(pbs.turnovers)::numeric, 1)::numeric AS avg_turnovers,
    ROUND(AVG(pbs.pf)::numeric, 1)::numeric AS avg_pf,

    -- totals
    SUM(pbs.minutes)::integer AS min,
    SUM(pbs.pts)::integer AS pts,
    SUM(pbs.fgm)::integer AS fgm,
    SUM(pbs.fga)::integer AS fga,
    SUM(pbs.tpm)::integer AS tpm,
    SUM(pbs.tpa)::integer AS tpa,
    SUM(pbs.ftm)::integer AS ftm,
    SUM(pbs.fta)::integer AS fta,
    SUM(pbs.orb)::integer AS orb,
    SUM(pbs.drb)::integer AS drb,
    SUM(pbs.reb)::integer AS reb,
    SUM(pbs.ast)::integer AS ast,
    SUM(pbs.stl)::integer AS stl,
    SUM(pbs.blk)::integer AS blk,
    SUM(pbs.turnovers)::integer AS turnovers,
    SUM(pbs.pf)::integer AS pf,
    CASE 
        WHEN SUM(pbs.fga) = 0 THEN 0::numeric
        ELSE ROUND((SUM(pbs.fgm) * 100.0 / NULLIF(SUM(pbs.fga), 0))::numeric, 1)::numeric
    END AS fg_percentage,
    CASE 
        WHEN SUM(pbs.tpa) = 0 THEN 0::numeric
        ELSE ROUND((SUM(pbs.tpm) * 100.0 / NULLIF(SUM(pbs.tpa), 0))::numeric, 1)::numeric
    END AS tp_percentage,
    CASE 
        WHEN SUM(pbs.fta) = 0 THEN 0::numeric
        ELSE ROUND((SUM(pbs.ftm) * 100.0 / NULLIF(SUM(pbs.fta), 0))::numeric, 1)::numeric
    END AS ft_percentage

FROM 
    player_box_scores pbs
JOIN 
    game_box_scores gbs ON pbs.game_id = gbs.game_id
JOIN 
    player_2023_24_regularseason_totals_and_averages p ON pbs.player_id = p.player_id
WHERE 
    gbs.postseason = true
GROUP BY 
    pbs.player_id, p.name, p.player_position, p.jersey_number, p.photo_url, p.team_id, p.full_name, p.abbreviation;