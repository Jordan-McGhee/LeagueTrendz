CREATE OR REPLACE VIEW team_stat_leaders AS
WITH ranked_players AS (
    SELECT
        t.team_id,
        t.full_name,
        t.abbreviation,
        ps.player_id,
        ps.name,
        pl.player_position,
        pl.jersey_number,
        pl.photo_url,
        ps.avg_pts,
        ps.avg_ast,
        ps.avg_fg_percentage,
        ps.avg_stl,
        ps.avg_reb,
        ps.avg_blk,
        ROW_NUMBER() OVER (PARTITION BY t.team_id ORDER BY ps.avg_pts DESC) AS pts_rank,
        ROW_NUMBER() OVER (PARTITION BY t.team_id ORDER BY ps.avg_ast DESC) AS ast_rank,
        ROW_NUMBER() OVER (PARTITION BY t.team_id ORDER BY ps.avg_fg_percentage DESC) AS fg_percentage_rank,
        ROW_NUMBER() OVER (PARTITION BY t.team_id ORDER BY ps.avg_stl DESC) AS stl_rank,
        ROW_NUMBER() OVER (PARTITION BY t.team_id ORDER BY ps.avg_reb DESC) AS reb_rank,
        ROW_NUMBER() OVER (PARTITION BY t.team_id ORDER BY ps.avg_blk DESC) AS blk_rank
    FROM
        teams t
    JOIN
        player_2023_24_regularseason_totals_and_averages ps ON t.team_id = ps.team_id
    JOIN
        players pl ON ps.player_id = pl.player_id
)
SELECT
    team_id,
    full_name,
    abbreviation,
    MAX(CASE WHEN pts_rank = 1 THEN player_id END) AS pts_leader_id,
    MAX(CASE WHEN pts_rank = 1 THEN name END) AS pts_leader_name,
    MAX(CASE WHEN pts_rank = 1 THEN player_position END) AS pts_leader_position,
    MAX(CASE WHEN pts_rank = 1 THEN jersey_number END) AS pts_leader_number,
    MAX(CASE WHEN pts_rank = 1 THEN photo_url END) AS pts_leader_photo_url,
    MAX(CASE WHEN pts_rank = 1 THEN avg_pts END) AS pts_leader_stat,
    MAX(CASE WHEN ast_rank = 1 THEN player_id END) AS ast_leader_id,
    MAX(CASE WHEN ast_rank = 1 THEN name END) AS ast_leader_name,
    MAX(CASE WHEN ast_rank = 1 THEN player_position END) AS ast_leader_position,
    MAX(CASE WHEN ast_rank = 1 THEN jersey_number END) AS ast_leader_number,
    MAX(CASE WHEN ast_rank = 1 THEN photo_url END) AS ast_leader_photo_url,
    MAX(CASE WHEN ast_rank = 1 THEN avg_ast END) AS ast_leader_stat,
    MAX(CASE WHEN fg_percentage_rank = 1 THEN player_id END) AS fg_percentage_leader_id,
    MAX(CASE WHEN fg_percentage_rank = 1 THEN name END) AS fg_percentage_leader_name,
    MAX(CASE WHEN fg_percentage_rank = 1 THEN player_position END) AS fg_percentage_leader_position,
    MAX(CASE WHEN fg_percentage_rank = 1 THEN jersey_number END) AS fg_percentage_leader_number,
    MAX(CASE WHEN fg_percentage_rank = 1 THEN photo_url END) AS fg_percentage_leader_photo_url,
    MAX(CASE WHEN fg_percentage_rank = 1 THEN avg_fg_percentage END) AS fg_percentage_leader_stat,
    MAX(CASE WHEN stl_rank = 1 THEN player_id END) AS stl_leader_id,
    MAX(CASE WHEN stl_rank = 1 THEN name END) AS stl_leader_name,
    MAX(CASE WHEN stl_rank = 1 THEN player_position END) AS stl_leader_position,
    MAX(CASE WHEN stl_rank = 1 THEN jersey_number END) AS stl_leader_number,
    MAX(CASE WHEN stl_rank = 1 THEN photo_url END) AS stl_leader_photo_url,
    MAX(CASE WHEN stl_rank = 1 THEN avg_stl END) AS stl_leader_stat,
    MAX(CASE WHEN reb_rank = 1 THEN player_id END) AS reb_leader_id,
    MAX(CASE WHEN reb_rank = 1 THEN name END) AS reb_leader_name,
    MAX(CASE WHEN reb_rank = 1 THEN player_position END) AS reb_leader_position,
    MAX(CASE WHEN reb_rank = 1 THEN jersey_number END) AS reb_leader_number,
    MAX(CASE WHEN reb_rank = 1 THEN photo_url END) AS reb_leader_photo_url,
    MAX(CASE WHEN reb_rank = 1 THEN avg_reb END) AS reb_leader_stat,
    MAX(CASE WHEN blk_rank = 1 THEN player_id END) AS blk_leader_id,
    MAX(CASE WHEN blk_rank = 1 THEN name END) AS blk_leader_name,
    MAX(CASE WHEN blk_rank = 1 THEN player_position END) AS blk_leader_position,
    MAX(CASE WHEN blk_rank = 1 THEN jersey_number END) AS blk_leader_number,
    MAX(CASE WHEN blk_rank = 1 THEN photo_url END) AS blk_leader_photo_url,
    MAX(CASE WHEN blk_rank = 1 THEN avg_blk END) AS blk_leader_stat
FROM
    ranked_players
GROUP BY
    team_id,
    full_name,
    abbreviation
ORDER BY
    team_id;