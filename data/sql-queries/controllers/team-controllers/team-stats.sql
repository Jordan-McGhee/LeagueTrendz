SELECT
    p.player_id,
    p.name,
    player.photo_url,
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

    -- ASSIST TO TURNOVER RATIO?

    -- team stats
    
    
    
    -- shooting stats
    p.avg_fgm,
    p.avg_fga,
    p.avg_fg_percentage,

    -- team shooting stats
FROM 