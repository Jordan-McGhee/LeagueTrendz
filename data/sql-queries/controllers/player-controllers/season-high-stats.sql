-- GET ALL GAMES ORDERED BY STAT
SELECT * FROM public.player_gamelog_view
ORDER BY pts DESC
LIMIT 100

-- TOP 5 GAMES FOR EACH MAJOR STAT
CREATE OR REPLACE VIEW top_regularseason_game_stats AS
WITH ranked_gamelogs AS (
    SELECT
        -- player details
        player_id,
        player_name,
        player_position,
        jersey_number,
        photo_url,

        -- team details
        player_team_id,
        player_team_abbreviation,
        player_team_full_name,
        player_team_score,


        -- opponent details
        opp_team_id,
        opp_team_abbreviation,
        opp_team_full_name,
        opp_team_score,


        -- game details
        game_id,
        game_date,
        game_location,
        game_result,

        pts,
        reb,
        ast,
        stl,
        blk,
        tpm,
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
        'name', player_name,
        'player_position', player_position,
        'jersey_number', jersey_number,
        'photo_url', photo_url,
        'player_team_id', player_team_id,
        'player_team_abbreviation', player_team_abbreviation,
        'player_team_full_name', player_team_full_name,
        'player_team_score', player_team_score,
        'opp_team_id', opp_team_id,
        'opp_team_abbreviation', opp_team_abbreviation,
        'opp_team_full_name', opp_team_full_name,
        'opp_team_score', opp_team_score,
        'game_id', game_id,
        'game_date', game_date,
        'game_location', game_location,
        'game_result', game_result,
        'stat', 'pts',
        'value', pts
    ) ORDER BY pts DESC) FILTER (WHERE rn_pts <= 5) AS top_scoring_games,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'name', player_name,
        'player_position', player_position,
        'jersey_number', jersey_number,
        'photo_url', photo_url,
        'player_team_id', player_team_id,
        'player_team_abbreviation', player_team_abbreviation,
        'player_team_full_name', player_team_full_name,
        'player_team_score', player_team_score,
        'opp_team_id', opp_team_id,
        'opp_team_abbreviation', opp_team_abbreviation,
        'opp_team_full_name', opp_team_full_name,
        'opp_team_score', opp_team_score,
        'game_id', game_id,
        'game_date', game_date,
        'game_location', game_location,
        'game_result', game_result,
        'stat', 'reb',
        'value', reb
    ) ORDER BY reb DESC) FILTER (WHERE rn_reb <= 5) AS top_rebounding_games,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'name', player_name,
        'player_position', player_position,
        'jersey_number', jersey_number,
        'photo_url', photo_url,
        'player_team_id', player_team_id,
        'player_team_abbreviation', player_team_abbreviation,
        'player_team_full_name', player_team_full_name,
        'player_team_score', player_team_score,
        'opp_team_id', opp_team_id,
        'opp_team_abbreviation', opp_team_abbreviation,
        'opp_team_full_name', opp_team_full_name,
        'opp_team_score', opp_team_score,
        'game_id', game_id,
        'game_date', game_date,
        'game_location', game_location,
        'game_result', game_result,
        'stat', 'ast',
        'value', ast
    ) ORDER BY ast DESC) FILTER (WHERE rn_ast <= 5) AS top_assist_games,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'name', player_name,
        'player_position', player_position,
        'jersey_number', jersey_number,
        'photo_url', photo_url,
        'player_team_id', player_team_id,
        'player_team_abbreviation', player_team_abbreviation,
        'player_team_full_name', player_team_full_name,
        'player_team_score', player_team_score,
        'opp_team_id', opp_team_id,
        'opp_team_abbreviation', opp_team_abbreviation,
        'opp_team_full_name', opp_team_full_name,
        'opp_team_score', opp_team_score,
        'game_id', game_id,
        'game_date', game_date,
        'game_location', game_location,
        'game_result', game_result,
        'stat', 'stl',
        'value', stl
    ) ORDER BY stl DESC) FILTER (WHERE rn_stl <= 5) AS top_steal_games,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'name', player_name,
        'player_position', player_position,
        'jersey_number', jersey_number,
        'photo_url', photo_url,
        'player_team_id', player_team_id,
        'player_team_abbreviation', player_team_abbreviation,
        'player_team_full_name', player_team_full_name,
        'player_team_score', player_team_score,
        'opp_team_id', opp_team_id,
        'opp_team_abbreviation', opp_team_abbreviation,
        'opp_team_full_name', opp_team_full_name,
        'opp_team_score', opp_team_score,
        'game_id', game_id,
        'game_date', game_date,
        'game_location', game_location,
        'game_result', game_result,
        'stat', 'blk',
        'value', blk
    ) ORDER BY blk DESC) FILTER (WHERE rn_blk <= 5) AS top_block_games,
    jsonb_agg(jsonb_build_object(
        'player_id', player_id,
        'name', player_name,
        'player_position', player_position,
        'jersey_number', jersey_number,
        'photo_url', photo_url,
        'player_team_id', player_team_id,
        'player_team_abbreviation', player_team_abbreviation,
        'player_team_full_name', player_team_full_name,
        'player_team_score', player_team_score,
        'opp_team_id', opp_team_id,
        'opp_team_abbreviation', opp_team_abbreviation,
        'opp_team_full_name', opp_team_full_name,
        'opp_team_score', opp_team_score,
        'game_id', game_id,
        'game_date', game_date,
        'game_location', game_location,
        'game_result', game_result,
        'stat', 'tpm',
        'value', tpm
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
