CREATE OR REPLACE VIEW team_stat_leaders AS
SELECT
    t.team_id,
    t.full_name,
    t.abbreviation,
    MAX(CASE WHEN ps.avg_pts = max_pts THEN ps.player_id END) AS pts_leader_id,
    MAX(CASE WHEN ps.avg_pts = max_pts THEN ps.name END) AS pts_leader_name,
    MAX(CASE WHEN ps.avg_pts = max_pts THEN pl.player_position END) AS pts_leader_position,
    MAX(CASE WHEN ps.avg_pts = max_pts THEN pl.jersey_number END) AS pts_leader_number,
    MAX(CASE WHEN ps.avg_pts = max_pts THEN pl.photo_url END) AS pts_leader_photo_url,
    MAX(CASE WHEN ps.avg_pts = max_pts THEN max_pts END) AS pts_leader_stat,
    MAX(CASE WHEN ps.avg_ast = max_ast THEN ps.player_id END) AS ast_leader_id,
    MAX(CASE WHEN ps.avg_ast = max_ast THEN ps.name END) AS ast_leader_name,
    MAX(CASE WHEN ps.avg_ast = max_ast THEN pl.player_position END) AS ast_leader_position,
    MAX(CASE WHEN ps.avg_ast = max_ast THEN pl.jersey_number END) AS ast_leader_number,
    MAX(CASE WHEN ps.avg_ast = max_ast THEN pl.photo_url END) AS ast_leader_photo_url,
    MAX(CASE WHEN ps.avg_ast = max_ast THEN max_ast END) AS ast_leader_stat,
    MAX(CASE WHEN ps.avg_fg_percentage = max_fg_percentage THEN ps.player_id END) AS fg_percentage_leader_id,
    MAX(CASE WHEN ps.avg_fg_percentage = max_fg_percentage THEN ps.name END) AS fg_percentage_leader_name,
    MAX(CASE WHEN ps.avg_fg_percentage = max_fg_percentage THEN pl.player_position END) AS fg_percentage_leader_position,
    MAX(CASE WHEN ps.avg_fg_percentage = max_fg_percentage THEN pl.jersey_number END) AS fg_percentage_leader_number,
    MAX(CASE WHEN ps.avg_fg_percentage = max_fg_percentage THEN pl.photo_url END) AS fg_percentage_leader_photo_url,
    MAX(CASE WHEN ps.avg_fg_percentage = max_fg_percentage THEN max_fg_percentage END) AS fg_percentage_leader_stat,
    MAX(CASE WHEN ps.avg_stl = max_stl THEN ps.player_id END) AS stl_leader_id,
    MAX(CASE WHEN ps.avg_stl = max_stl THEN ps.name END) AS stl_leader_name,
    MAX(CASE WHEN ps.avg_stl = max_stl THEN pl.player_position END) AS stl_leader_position,
    MAX(CASE WHEN ps.avg_stl = max_stl THEN pl.jersey_number END) AS stl_leader_number,
    MAX(CASE WHEN ps.avg_stl = max_stl THEN pl.photo_url END) AS stl_leader_photo_url,
    MAX(CASE WHEN ps.avg_stl = max_stl THEN max_stl END) AS stl_leader_stat,
    MAX(CASE WHEN ps.avg_reb = max_reb THEN ps.player_id END) AS reb_leader_id,
    MAX(CASE WHEN ps.avg_reb = max_reb THEN ps.name END) AS reb_leader_name,
    MAX(CASE WHEN ps.avg_reb = max_reb THEN pl.player_position END) AS reb_leader_position,
    MAX(CASE WHEN ps.avg_reb = max_reb THEN pl.jersey_number END) AS reb_leader_number,
    MAX(CASE WHEN ps.avg_reb = max_reb THEN pl.photo_url END) AS reb_leader_photo_url,
    MAX(CASE WHEN ps.avg_reb = max_reb THEN max_reb END) AS reb_leader_stat,
    MAX(CASE WHEN ps.avg_blk = max_blk THEN ps.player_id END) AS blk_leader_id,
    MAX(CASE WHEN ps.avg_blk = max_blk THEN ps.name END) AS blk_leader_name,
    MAX(CASE WHEN ps.avg_blk = max_blk THEN pl.player_position END) AS blk_leader_position,
    MAX(CASE WHEN ps.avg_blk = max_blk THEN pl.jersey_number END) AS blk_leader_number,
    MAX(CASE WHEN ps.avg_blk = max_blk THEN pl.photo_url END) AS blk_leader_photo_url,
    MAX(CASE WHEN ps.avg_blk = max_blk THEN max_blk END) AS blk_leader_stat
FROM
    teams t
JOIN
    player_2023_24_regularseason_totals_and_averages ps ON t.team_id = ps.team_id
JOIN
    players pl ON ps.player_id = pl.player_id
JOIN (
    SELECT
        team_id,
        MAX(avg_pts) AS max_pts,
        MAX(avg_ast) AS max_ast,
        MAX(avg_fg_percentage) AS max_fg_percentage,
        MAX(avg_stl) AS max_stl,
        MAX(avg_reb) AS max_reb,
        MAX(avg_blk) AS max_blk
    FROM
        player_2023_24_regularseason_totals_and_averages
    GROUP BY
        team_id
) AS max_stats ON t.team_id = max_stats.team_id
GROUP BY
    t.team_id,
    t.full_name,
    t.abbreviation
ORDER BY
	t.team_id
;
