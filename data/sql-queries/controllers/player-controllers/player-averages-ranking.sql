SELECT
    p.name,
	p.player_id,
    pt.avg_pts,
    ranks.pts_rank,
    pt.avg_reb,
    ranks.reb_rank,
    pt.avg_ast,
    ranks.ast_rank,
    pt.avg_fg_percentage,
    ranks.fg_rank
FROM
    player_2023_24_regularseason_totals_and_averages pt
    JOIN players p ON pt.player_id = p.player_id
    INNER JOIN (
        SELECT
            player_id,
            DENSE_RANK() OVER (ORDER BY avg_pts DESC, gp DESC, min DESC) AS pts_rank,
            DENSE_RANK() OVER (ORDER BY avg_reb DESC, gp DESC, min DESC) AS reb_rank,
            DENSE_RANK() OVER (ORDER BY avg_ast DESC, gp DESC, min DESC) AS ast_rank,
            DENSE_RANK() OVER (ORDER BY avg_fg_percentage DESC, gp DESC, min DESC) AS fg_rank
        FROM
            player_2023_24_regularseason_totals_and_averages
    ) ranks ON pt.player_id = ranks.player_id
WHERE
    p.player_id = $1;