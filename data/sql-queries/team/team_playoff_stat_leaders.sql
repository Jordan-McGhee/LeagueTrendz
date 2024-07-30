CREATE OR REPLACE VIEW team_playoff_stat_leaders AS
WITH ranked_players AS (
    SELECT
        ps.*,
        pl.player_position AS pl_player_position,
        pl.jersey_number AS pl_jersey_number,
        pl.photo_url AS pl_photo_url,
        ROW_NUMBER() OVER (PARTITION BY ps.team_id ORDER BY ps.avg_pts DESC) AS pts_rank,
        ROW_NUMBER() OVER (PARTITION BY ps.team_id ORDER BY ps.avg_ast DESC) AS ast_rank,
        ROW_NUMBER() OVER (PARTITION BY ps.team_id ORDER BY ps.avg_fg_percentage DESC) AS fg_percentage_rank,
        ROW_NUMBER() OVER (PARTITION BY ps.team_id ORDER BY ps.avg_stl DESC) AS stl_rank,
        ROW_NUMBER() OVER (PARTITION BY ps.team_id ORDER BY ps.avg_reb DESC) AS reb_rank,
        ROW_NUMBER() OVER (PARTITION BY ps.team_id ORDER BY ps.avg_blk DESC) AS blk_rank
    FROM
        player_2023_24_playoffs_totals_and_averages ps
    JOIN
        players pl ON ps.player_id = pl.player_id
)
SELECT
    t.team_id,
    t.full_name,
    t.abbreviation,
    pts.player_id AS pts_leader_id,
    pts.name AS pts_leader_name,
    pts.pl_player_position AS pts_leader_position,
    pts.pl_jersey_number AS pts_leader_number,
    pts.pl_photo_url AS pts_leader_photo_url,
    pts.avg_pts AS pts_leader_stat,
    ast.player_id AS ast_leader_id,
    ast.name AS ast_leader_name,
    ast.pl_player_position AS ast_leader_position,
    ast.pl_jersey_number AS ast_leader_number,
    ast.pl_photo_url AS ast_leader_photo_url,
    ast.avg_ast AS ast_leader_stat,
    fg.player_id AS fg_percentage_leader_id,
    fg.name AS fg_percentage_leader_name,
    fg.pl_player_position AS fg_percentage_leader_position,
    fg.pl_jersey_number AS fg_percentage_leader_number,
    fg.pl_photo_url AS fg_percentage_leader_photo_url,
    fg.avg_fg_percentage AS fg_percentage_leader_stat,
    stl.player_id AS stl_leader_id,
    stl.name AS stl_leader_name,
    stl.pl_player_position AS stl_leader_position,
    stl.pl_jersey_number AS stl_leader_number,
    stl.pl_photo_url AS stl_leader_photo_url,
    stl.avg_stl AS stl_leader_stat,
    reb.player_id AS reb_leader_id,
    reb.name AS reb_leader_name,
    reb.pl_player_position AS reb_leader_position,
    reb.pl_jersey_number AS reb_leader_number,
    reb.pl_photo_url AS reb_leader_photo_url,
    reb.avg_reb AS reb_leader_stat,
    blk.player_id AS blk_leader_id,
    blk.name AS blk_leader_name,
    blk.pl_player_position AS blk_leader_position,
    blk.pl_jersey_number AS blk_leader_number,
    blk.pl_photo_url AS blk_leader_photo_url,
    blk.avg_blk AS blk_leader_stat
FROM
    teams t
LEFT JOIN ranked_players pts ON t.team_id = pts.team_id AND pts.pts_rank = 1
LEFT JOIN ranked_players ast ON t.team_id = ast.team_id AND ast.ast_rank = 1
LEFT JOIN ranked_players fg ON t.team_id = fg.team_id AND fg.fg_percentage_rank = 1
LEFT JOIN ranked_players stl ON t.team_id = stl.team_id AND stl.stl_rank = 1
LEFT JOIN ranked_players reb ON t.team_id = reb.team_id AND reb.reb_rank = 1
LEFT JOIN ranked_players blk ON t.team_id = blk.team_id AND blk.blk_rank = 1
ORDER BY
    t.team_id;