-- GET ALL GAMES ORDERED BY STAT
SELECT * FROM public.player_gamelog_view
ORDER BY pts DESC
LIMIT 100

-- TOP 5 GAMES FOR EACH MAJOR STAT
WITH ranked_gamelogs AS (
    SELECT
        player_id,
        game_id,
        pts,
        reb,
        ast,
        stl,
        blk,
        tpm,
        player_name,
        ROW_NUMBER() OVER (ORDER BY pts DESC, game_id) AS rn_pts,
        ROW_NUMBER() OVER (ORDER BY reb DESC, game_id) AS rn_reb,
        ROW_NUMBER() OVER (ORDER BY ast DESC, game_id) AS rn_ast,
        ROW_NUMBER() OVER (ORDER BY stl DESC, game_id) AS rn_stl,
        ROW_NUMBER() OVER (ORDER BY blk DESC, game_id) AS rn_blk,
        ROW_NUMBER() OVER (ORDER BY tpm DESC, game_id) AS rn_tpm
    FROM
        player_gamelog_view
)
SELECT
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'game_id', game_id,
        'pts', pts,
        'name', player_name
    ) ORDER BY pts DESC) FILTER (WHERE rn_pts <= 5) AS top_scoring_games,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'game_id', game_id,
        'reb', reb,
        'name', player_name
    ) ORDER BY reb DESC) FILTER (WHERE rn_reb <= 5) AS top_rebounding_games,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'game_id', game_id,
        'ast', ast,
        'name', player_name
    ) ORDER BY ast DESC) FILTER (WHERE rn_ast <= 5) AS top_assist_games,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'game_id', game_id,
        'stl', stl,
        'name', player_name
    ) ORDER BY stl DESC) FILTER (WHERE rn_stl <= 5) AS top_steal_games,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'game_id', game_id,
        'blk', blk,
        'name', player_name
    ) ORDER BY blk DESC) FILTER (WHERE rn_blk <= 5) AS top_block_games,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'game_id', game_id,
        'tpm', tpm,
        'name', player_name
    ) ORDER BY tpm DESC) FILTER (WHERE rn_tpm <= 5) AS top_tpm_games
FROM
    ranked_gamelogs
WHERE
    rn_pts <= 5 OR
    rn_reb <= 5 OR
    rn_ast <= 5 OR
    rn_stl <= 5 OR
    rn_blk <= 5 OR
    rn_tpm <= 5;
