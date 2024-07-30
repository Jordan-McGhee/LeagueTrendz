CREATE OR REPLACE VIEW top_playoffs_stat_leaders AS
WITH ranked_stats AS (
    SELECT
        player_id,
        name,
        photo_url,
        player_position,
        jersey_number,
        team_id,
        full_name,
        abbreviation,
        gp,
        avg_pts,
        avg_fgm,
        avg_fg_percentage,
        avg_tpm,
        avg_tp_percentage,
        avg_ft_percentage,
        avg_reb,
        avg_ast,
        avg_stl,
        avg_blk,
        avg_pf,
        avg_turnovers,
        pts,
        fgm,
        tpm,
		ftm,
        reb,
        ast,
        stl,
        blk,
        pf,
        turnovers,
        ROW_NUMBER() OVER (ORDER BY avg_pts DESC, gp DESC) AS rn_avg_pts,
        ROW_NUMBER() OVER (ORDER BY avg_fgm DESC, gp DESC) AS rn_avg_fgm,
        ROW_NUMBER() OVER (ORDER BY avg_fg_percentage DESC, gp DESC) AS rn_avg_fg_percentage,
        ROW_NUMBER() OVER (ORDER BY avg_tpm DESC, gp DESC) AS rn_avg_tpm,
        ROW_NUMBER() OVER (ORDER BY avg_tp_percentage DESC, gp DESC) AS rn_avg_tp_percentage,
        ROW_NUMBER() OVER (ORDER BY avg_ft_percentage DESC, gp DESC) AS rn_avg_ft_percentage,
        ROW_NUMBER() OVER (ORDER BY avg_reb DESC, gp DESC) AS rn_avg_reb,
        ROW_NUMBER() OVER (ORDER BY avg_ast DESC, gp DESC) AS rn_avg_ast,
        ROW_NUMBER() OVER (ORDER BY avg_stl DESC, gp DESC) AS rn_avg_stl,
        ROW_NUMBER() OVER (ORDER BY avg_blk DESC, gp DESC) AS rn_avg_blk,
        ROW_NUMBER() OVER (ORDER BY avg_pf DESC, gp DESC) AS rn_avg_pf,
        ROW_NUMBER() OVER (ORDER BY avg_turnovers DESC, gp DESC) AS rn_avg_turnovers,
        ROW_NUMBER() OVER (ORDER BY pts DESC, gp DESC) AS rn_total_pts,
        ROW_NUMBER() OVER (ORDER BY fgm DESC, gp DESC) AS rn_total_fgm,
        ROW_NUMBER() OVER (ORDER BY tpm DESC, gp DESC) AS rn_total_tpm,
        ROW_NUMBER() OVER (ORDER BY reb DESC, gp DESC) AS rn_total_reb,
        ROW_NUMBER() OVER (ORDER BY ast DESC, gp DESC) AS rn_total_ast,
        ROW_NUMBER() OVER (ORDER BY stl DESC, gp DESC) AS rn_total_stl,
        ROW_NUMBER() OVER (ORDER BY blk DESC, gp DESC) AS rn_total_blk,
        ROW_NUMBER() OVER (ORDER BY pf DESC, gp DESC) AS rn_total_pf,
        ROW_NUMBER() OVER (ORDER BY turnovers DESC, gp DESC) AS rn_total_turnovers
    FROM
        player_2023_24_playoffs_totals_and_averages
    WHERE gp > 1
)
SELECT
    -- averages
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'name', name,
        'photo_url', photo_url,
        'player_position', player_position,
        'jersey_number', jersey_number,
        'team_id', team_id,
        'full_name', full_name,
        'abbreviation', abbreviation,
        'stat', 'avg_pts',
        'value', avg_pts
    ) ORDER BY avg_pts DESC) FILTER (WHERE rn_avg_pts <= 5) AS top_avg_pts,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'name', name,
        'photo_url', photo_url,
        'player_position', player_position,
        'jersey_number', jersey_number,
        'team_id', team_id,
        'full_name', full_name,
        'abbreviation', abbreviation,
        'stat', 'avg_fgm',
        'value', avg_fgm
    ) ORDER BY avg_fgm DESC) FILTER (WHERE rn_avg_fgm <= 5) AS top_avg_fgm,
(SELECT jsonb_agg(jsonb_build_object(
    'player_id', player_id,
    'name', name,
    'photo_url', photo_url,
    'player_position', player_position,
    'jersey_number', jersey_number,
    'team_id', team_id,
    'full_name', full_name,
    'abbreviation', abbreviation,
    'stat', 'avg_fg_percentage',
    'value', avg_fg_percentage
) ORDER BY avg_fg_percentage DESC)
FROM (
    SELECT *
    FROM ranked_stats
    WHERE fgm >= 20
    ORDER BY avg_fg_percentage DESC
    LIMIT 5
) sub) AS top_avg_fg_percentage,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'name', name,
        'photo_url', photo_url,
        'player_position', player_position,
        'jersey_number', jersey_number,
        'team_id', team_id,
        'full_name', full_name,
        'abbreviation', abbreviation,
        'stat', 'avg_tpm',
        'value', avg_tpm
    ) ORDER BY avg_tpm DESC) FILTER (WHERE rn_avg_tpm <= 5) AS top_avg_tpm,
(SELECT jsonb_agg(jsonb_build_object(
    'player_id', player_id,
    'name', name,
    'photo_url', photo_url,
    'player_position', player_position,
    'jersey_number', jersey_number,
    'team_id', team_id,
    'full_name', full_name,
    'abbreviation', abbreviation,
    'stat', 'avg_tp_percentage',
    'value', avg_tp_percentage
) ORDER BY avg_tp_percentage DESC)
FROM (
    SELECT *
    FROM ranked_stats
    WHERE tpm >= 5
    ORDER BY avg_tp_percentage DESC
    LIMIT 5
) sub) AS top_avg_tp_percentage,
(SELECT jsonb_agg(jsonb_build_object(
    'player_id', player_id,
    'name', name,
    'photo_url', photo_url,
    'player_position', player_position,
    'jersey_number', jersey_number,
    'team_id', team_id,
    'full_name', full_name,
    'abbreviation', abbreviation,
    'stat', 'avg_ft_percentage',
    'value', avg_ft_percentage
) ORDER BY avg_ft_percentage DESC)
FROM (
    SELECT *
    FROM ranked_stats
    WHERE ftm >= 10
    ORDER BY avg_ft_percentage DESC
    LIMIT 5
) sub) AS top_avg_ft_percentage,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'name', name,
        'photo_url', photo_url,
        'player_position', player_position,
        'jersey_number', jersey_number,
        'team_id', team_id,
        'full_name', full_name,
        'abbreviation', abbreviation,
        'stat', 'avg_reb',
        'value', avg_reb
    ) ORDER BY avg_reb DESC) FILTER (WHERE rn_avg_reb <= 5) AS top_avg_reb,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'name', name,
        'photo_url', photo_url,
        'player_position', player_position,
        'jersey_number', jersey_number,
        'team_id', team_id,
        'full_name', full_name,
        'abbreviation', abbreviation,
        'stat', 'avg_ast',
        'value', avg_ast
    ) ORDER BY avg_ast DESC) FILTER (WHERE rn_avg_ast <= 5) AS top_avg_ast,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'name', name,
        'photo_url', photo_url,
        'player_position', player_position,
        'jersey_number', jersey_number,
        'team_id', team_id,
        'full_name', full_name,
        'abbreviation', abbreviation,
        'stat', 'avg_stl',
        'value', avg_stl
    ) ORDER BY avg_stl DESC) FILTER (WHERE rn_avg_stl <= 5) AS top_avg_stl,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'name', name,
        'photo_url', photo_url,
        'player_position', player_position,
        'jersey_number', jersey_number,
        'team_id', team_id,
        'full_name', full_name,
        'abbreviation', abbreviation,
        'stat', 'avg_blk',
        'value', avg_blk
    ) ORDER BY avg_blk DESC) FILTER (WHERE rn_avg_blk <= 5) AS top_avg_blk,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'name', name,
        'photo_url', photo_url,
        'player_position', player_position,
        'jersey_number', jersey_number,
        'team_id', team_id,
        'full_name', full_name,
        'abbreviation', abbreviation,
        'stat', 'avg_pf',
        'value', avg_pf
    ) ORDER BY avg_pf DESC) FILTER (WHERE rn_avg_pf <= 5) AS top_avg_pf,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'name', name,
        'photo_url', photo_url,
        'player_position', player_position,
        'jersey_number', jersey_number,
        'team_id', team_id,
        'full_name', full_name,
        'abbreviation', abbreviation,
        'stat', 'avg_turnovers',
        'value', avg_turnovers
    ) ORDER BY avg_turnovers DESC) FILTER (WHERE rn_avg_turnovers <= 5) AS top_avg_turnovers,

    -- totals
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'name', name,
        'photo_url', photo_url,
        'player_position', player_position,
        'jersey_number', jersey_number,
        'team_id', team_id,
        'full_name', full_name,
        'abbreviation', abbreviation,
        'stat', 'total_pts',
        'value', pts
    ) ORDER BY pts DESC) FILTER (WHERE rn_total_pts <= 5) AS top_total_pts,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'name', name,
        'photo_url', photo_url,
        'player_position', player_position,
        'jersey_number', jersey_number,
        'team_id', team_id,
        'full_name', full_name,
        'abbreviation', abbreviation,
        'stat', 'total_fgm',
        'value', fgm
    ) ORDER BY fgm DESC) FILTER (WHERE rn_total_fgm <= 5) AS top_total_fgm,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'name', name,
        'photo_url', photo_url,
        'player_position', player_position,
        'jersey_number', jersey_number,
        'team_id', team_id,
        'full_name', full_name,
        'abbreviation', abbreviation,
        'stat', 'total_tpm',
        'value', tpm
    ) ORDER BY tpm DESC) FILTER (WHERE rn_total_tpm <= 5) AS top_total_tpm,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'name', name,
        'photo_url', photo_url,
        'player_position', player_position,
        'jersey_number', jersey_number,
        'team_id', team_id,
        'full_name', full_name,
        'abbreviation', abbreviation,
        'stat', 'total_reb',
        'value', reb
    ) ORDER BY reb DESC) FILTER (WHERE rn_total_reb <= 5) AS top_total_reb,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'name', name,
        'photo_url', photo_url,
        'player_position', player_position,
        'jersey_number', jersey_number,
        'team_id', team_id,
        'full_name', full_name,
        'abbreviation', abbreviation,
        'stat', 'total_ast',
        'value', ast
    ) ORDER BY ast DESC) FILTER (WHERE rn_total_ast <= 5) AS top_total_ast,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'name', name,
        'photo_url', photo_url,
        'player_position', player_position,
        'jersey_number', jersey_number,
        'team_id', team_id,
        'full_name', full_name,
        'abbreviation', abbreviation,
        'stat', 'total_stl',
        'value', stl
    ) ORDER BY stl DESC) FILTER (WHERE rn_total_stl <= 5) AS top_total_stl,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'name', name,
        'photo_url', photo_url,
        'player_position', player_position,
        'jersey_number', jersey_number,
        'team_id', team_id,
        'full_name', full_name,
        'abbreviation', abbreviation,
        'stat', 'total_blk',
        'value', blk
    ) ORDER BY blk DESC) FILTER (WHERE rn_total_blk <= 5) AS top_total_blk,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'name', name,
        'photo_url', photo_url,
        'player_position', player_position,
        'jersey_number', jersey_number,
        'team_id', team_id,
        'full_name', full_name,
        'abbreviation', abbreviation,
        'stat', 'total_pf',
        'value', pf
    ) ORDER BY pf DESC) FILTER (WHERE rn_total_pf <= 5) AS top_total_pf,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'name', name,
        'photo_url', photo_url,
        'player_position', player_position,
        'jersey_number', jersey_number,
        'team_id', team_id,
        'full_name', full_name,
        'abbreviation', abbreviation,
        'stat', 'total_turnovers',
        'value', turnovers
    ) ORDER BY turnovers DESC) FILTER (WHERE rn_total_turnovers <= 5) AS top_total_turnovers
FROM
    ranked_stats;
