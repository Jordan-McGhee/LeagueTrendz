// // CONTEXT & AUTH TYPES

// context
export interface ContextType {
    isLoggedIn: boolean,
    user_id: number | null,
    token: string | null,
    login: (user_id: number, token: string) => void
    logout: () => void
}

// auth popup
export interface AuthPopupProps {
    changeDialogSetting: () => void
}

// login/signup
export interface SignUpForm {
    username: string,
    email: string,
    password: string
}

export interface LoginForm {
    username?: string,
    email?: string,
    password: string
}

// auth form
export interface AuthFormProps {
    isLoggingIn: boolean,
    changeDialogSetting: () => void
    passErrorUp: (errorMessage: string | undefined) => void
}

// auth input
export interface AuthInputProps {
    name: string,
    placeholder?: string,
    bottomText?: string,
    errorBottomText?: string | null,
    isPassword?: boolean,
    value: string,
    entered_password?: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    changeFormErrors: (input: string, remove: boolean, newError?: string) => void
}

// // USER PAGE
export interface UserPageProps {
    user_id: number | null
}

export interface User {
    username: string,
    created_at: string,
    isAdmin: boolean,
    // favorites?: 
}

// ERROR TYPES
export interface ErrorModalProps {
    error: boolean,
    errorMessage: string | undefined,
    onClear: () => void
}

// LOGO TYPES
export interface TeamLogoProps {
    team_id: number,
    abbreviation: string,
    logoClass?: string
}

// TEAM TYPES
export interface Team {
    team_id: number,
    full_name: string,
    abbreviation: string,
    league_id: number,
    description: string,
    wins: number,
    losses: number,
    conference: string,
    division: string,
    stadium: string,
    stadium_location: string,
    head_coach: string,
    main_color: string
}

export interface AllTeamsState {
    message: string,
    atlantic: Team[],
    central: Team[],
    southeast: Team[],
    northwest: Team[],
    pacific: Team[],
    southwest: Team[]
}

// // STANDINGS PAGE

export interface StandingsTeamItem {
    team_id: number,
    full_name: string,
    abbreviation: string,
    conference: string,
    division: string,
    wins: string,
    losses: string,
    pct: string,
    gb: string,
    home_wins: string,
    home_losses: string,
    away_wins: string,
    away_losses: string,
    div_wins: string,
    div_losses: string,
    conf_wins: string,
    conf_losses: string,
    ppg: string,
    opp_ppg: string,
    diff: string,
    last_10: string
}

export interface ExpandedTeamItem {
    team_id: number,
    full_name: string,
    abbreviation: string,
    conference: string,
    division: string,
    wins: string,
    losses: string,
    pct: string,
    gb: string,
    three_point_game_wins: string,
    three_point_game_losses: string,
    ten_point_game_wins: string,
    ten_point_game_losses: string,
    top_half_wins: string,
    top_half_losses: string,
    bottom_half_wins: string,
    bottom_half_losses: string
}

export interface DivisionTeamItem {
    team_id: number,
    full_name: string,
    abbreviation: string,
    conference: string,
    division: string,
    wins: string,
    losses: string,
    pct: string,
    gb: string,
    east_wins: string,
    east_losses: string,
    atlantic_wins: string,
    atlantic_losses: string,
    central_wins: string,
    central_losses: string,
    southeast_wins: string,
    southeast_losses: string,
    west_wins: string,
    west_losses: string,
    northwest_wins: string,
    northwest_losses: string,
    pacific_wins: string,
    pacific_losses: string,
    southwest_wins: string,
    southwest_losses: string
}

// // TEAM PAGE 

// TEAM HOME STATE

export interface TeamStandingsItem {
    team_id: number,
    full_name: string,
    abbreviation: string,
    wins: number,
    losses: number,
    pct: string,
    gb: number,
    last_10: string
}

export interface TeamExpanded {
    team_id: number,
    full_name: string,
    abbreviation: string,
    league_id: number,
    description: string,
    wins: number,
    losses: number,
    conference: string,
    division: string,
    stadium: string,
    stadium_location: string,
    head_coach: string,
    main_color: string,
    avg_pts: string,
    pts_rank: string,
    avg_reb: string,
    reb_rank: string,
    avg_ast: string,
    ast_rank: string,
    team_standings: TeamStandingsItem[]
}

export interface TeamGames {
    game_id: number,
    game_date: string,
    team_score: string,
    opp_team_id: number,
    opp_abbreviation: string,
    opp_full_name: string,
    opp_team_score: string,
    game_result: string,
    game_location: string
}

export interface TeamGamesState {
    games: TeamGames[]
}

export interface TeamPlayersState {
    team_id: number,
    full_name: string,
    abbreviation: string,
    pts_leader_id: number,
    pts_leader_name: string,
    pts_leader_position: string,
    pts_leader_number: number,
    pts_leader_photo_url: string,
    pts_leader_stat: string,
    ast_leader_id: number,
    ast_leader_name: string,
    ast_leader_position: string,
    ast_leader_number: number,
    ast_leader_photo_url: string,
    ast_leader_stat: string,
    fg_percentage_leader_id: number,
    fg_percentage_leader_name: string,
    fg_percentage_leader_position: string,
    fg_percentage_leader_number: number,
    fg_percentage_leader_photo_url: string,
    fg_percentage_leader_stat: string,
    stl_leader_id: number,
    stl_leader_name: string,
    stl_leader_position: string,
    stl_leader_number: number,
    stl_leader_photo_url: string,
    stl_leader_stat: string,
    reb_leader_id: number,
    reb_leader_name: string,
    reb_leader_position: string,
    reb_leader_number: number,
    reb_leader_photo_url: string,
    reb_leader_stat: string,
    blk_leader_id: number,
    blk_leader_name: string,
    blk_leader_position: string,
    blk_leader_number: number,
    blk_leader_photo_url: string,
    blk_leader_stat: string,
}

// TEAM PAGEPROPS
export interface TeamHomeProps {
    team: TeamExpanded,
    games: TeamGames[],
    players: TeamPlayersState,
    history: TeamHistoryState
}

export interface TeamPageProps {
    team: TeamExpanded
}

export interface TeamScheduleProps {
    team: TeamExpanded,
    games: TeamGames[]
}

export interface TeamPlayersProps {
    team: TeamExpanded,
    players: TeamPlayersState
}

export interface TeamHistoryProps {
    team: TeamExpanded,
    history: TeamHistoryState
}

// TEAM STATS
export interface PlayerStatsObject {
    player_id: string,
    name: string,
    player_position: string,
    jersey_number: number,
    gp: number,
    gs: number,
    avg_min: string,
    avg_pts: string,
    avg_orb: string,
    avg_drb: string,
    avg_reb: string,
    avg_ast: string,
    avg_stl: string,
    avg_blk: string,
    avg_pf: string,
    avg_turnovers: string,
    ast_to_ratio: string,
    avg_fgm: string,
    avg_fga: string,
    avg_fg_percentage: string,
    avg_tpm: string,
    avg_tpa: string,
    avg_tp_percentage: string,
    avg_ftm: string,
    avg_fta: string,
    avg_ft_percentage: string,
    player_avg_two_m: string,
    player_avg_two_a: string,
    player_avg_two_percentage: string
}

export interface TeamStatsObject {
    team_id: number,
    full_name: string,
    abbreviation: string,
    gp: string,
    wins: string,
    losses: string,
    win_percentage: string,
    total_pts: string,
    total_fgm: string,
    total_fga: string,
    total_tpm: string,
    total_tpa: string,
    total_ftm: string,
    total_fta: string,
    total_reb: string,
    total_orb: string,
    total_drb: string,
    total_ast: string,
    total_stl: string,
    total_blk: string,
    total_turnovers: string,
    total_pf: string,
    avg_pts: string,
    avg_fgm: string,
    avg_fga: string,
    avg_fg_percentage: string,
    avg_tpm: string,
    avg_tpa: string,
    avg_tp_percentage: string,
    avg_ftm: string,
    avg_fta: string,
    avg_ft_percentage: string,
    avg_reb: string,
    avg_orb: string,
    avg_drb: string,
    avg_ast: string,
    avg_stl: string,
    avg_blk: string,
    avg_turnovers: string,
    avg_pf: string
}

export interface TeamStatsTableProps {
    playerStats: PlayerStatsObject[],
    teamStats: TeamStatsObject
}

// TEAM SCHEDULE
export interface TeamScheduleObject {
    game_id: number,
    game_date: string,
    day_of_week: string,
    team_id: number,
    team_full_name: string,
    team_abbreviation: string,
    game_location: string,
    opponent_team_id: number,
    opponent_team_full_name: string,
    opponent_team_abbreviation: string,
    result: string,
    team_score: string,
    opponent_score: string,
    wins: string,
    losses: string,
    pts_leader: string,
    reb_leader: string,
    ast_leader: string
}

// TEAM HISTORY
export interface TeamHistoryState {
    history_id: number,
    team_id: number,
    abbreviation: string,
    jersey_numbers: {
        number: string,
        season_retired: number,
        player_name: string
    }[],
    seasons: {
        team_name: string,
        season: number,
        wins: number,
        losses: number,
        pct: string,
        playoffs: number,
        champion: boolean,
        conference_champion: boolean,
        img_url: string | null,
        img_url_small: string | null
    }[]
}



// STATS TYPES
export interface StatObject {
    playoffs: boolean,
    yearsWithTeam: number,
    jerseyNumber: string,
    season: number,
    tid: number,

    per: number,

    // GAMES PLAYED
    gp: number,
    gs: number,
    pts: number,
    min: number,
    fg: number,
    fga: number,
    tp: number,
    tpa: number,
    ft: number,
    fta: number,
    orb: number,
    drb: number,
    ast: number,
    stl: number,
    blk: number,
    pf: number,
    tov: number,
    dd: number,
    td: number,

    // SEASON HIGHS
    minMax: number[],
    fgMax: number[],
    fgaMax: number[],
    tpMax: number[],
    tpaMax: number[],
    ftMax: number[],
    ftaMax: number[],
    orbMax: number[],
    drbMax: number[],
    trbMax: number[],
    astMax: number[],
    stlMax: number[],
    blkMax: number[],
    tovMax: number[],
    pfMax: number[],
    ptsMax: number[],
}

export interface TotalsAndAveragesObject {
    // player info
    player_id: number,
    name: string,
    photo_url: string,
    player_position: string,
    jersey_number: number,
    
    // team info
    team_id: number,
    full_name: string,
    abbreviation: string,
    conference: string,
    division: string,

    // stats
    gp: number,
    gs: number,

    // averages
    avg_min: number,
    avg_pts: number,
    avg_fgm: number,
    avg_fga: number,
    avg_fg_percentage: number,
    avg_tpm: number,
    avg_tpa: number,
    avg_tp_percentage: number,
    avg_ftm: number,
    avg_fta: number,
    avg_ft_percentage: number,
    avg_orb: number,
    avg_drb: number,
    avg_reb: number,
    avg_ast: number,
    avg_stl: number,
    avg_blk: number,
    avg_turnovers: number,
    avg_pf: number,

    // totals
    min: number,
    pts: number,
    fgm: number,
    fga: number,
    fg_percentage: number,
    tpm: number,
    tpa: number,
    tp_percentage: number,
    ftm: number,
    fta: number,
    ft_percentage: number,
    orb: number,
    drb: number,
    reb: number,
    ast: number,
    stl: number,
    blk: number,
    turnovers: number,
    pf: number
}

// PLAYER TYPES

// ALL PLAYERS PAGE

export interface GameLeaderStat {
    stat: string,
    value: number,
    name: string,
    game_id: number,
    game_date: string,
    photo_url: string,
    player_id: number,
    game_result: string,
    opp_team_id: number,
    game_location: string,
    opp_team_score: number,
    player_team_id: number,
    player_position: string,
    jersey_number: number,
    player_team_score: number,
    opp_team_full_name: string,
    opp_team_abbreviation: string,
    player_team_full_name: string,
    player_team_abbreviation: string
}

export interface GameLeadersState {
    top_scoring_games: GameLeaderStat[],
    top_rebounding_games: GameLeaderStat[],
    top_assist_games: GameLeaderStat[],
    top_steal_games: GameLeaderStat[],
    top_block_games: GameLeaderStat[],
    top_tpm_games: GameLeaderStat[]
}

export interface TopStat {
    name: string,
    stat: string,
    value: number,
    team_id: number,
    full_name: string,
    photo_url: string,
    player_id: number,
    abbreviation: string,
    jersey_number: number,
    player_position: string
}

export interface SeasonAverageLeadersState {
    top_avg_pts: TopStat[],
    top_avg_fgm: TopStat[],
    top_avg_fg_percentage: TopStat[],
    top_avg_tpm: TopStat[],
    top_avg_tp_percentage: TopStat[],
    top_avg_ft_percentage: TopStat[],
    top_avg_reb: TopStat[],
    top_avg_ast: TopStat[],
    top_avg_stl: TopStat[],
    top_avg_blk: TopStat[],
    top_avg_pf: TopStat[],
    top_avg_turnovers: TopStat[],
}

export interface SeasonTotalLeadersState {
    top_total_pts: TopStat[],
    top_total_fgm: TopStat[],
    top_total_tpm: TopStat[],
    top_total_reb: TopStat[],
    top_total_ast: TopStat[],
    top_total_stl: TopStat[],
    top_total_blk: TopStat[],
    top_total_pf: TopStat[],
    top_total_turnovers: TopStat[]
}

export interface LeaderCardProps {
    title: string,
    cardClass?: string,
    averages: boolean,
    topStatPlayers: TopStat[]
}

export interface GameHighCardProps {
    title: string,
    cardClass?: string,
    gameLeaderPlayers: GameLeaderStat[]
}

// SINGLE PLAYER PAGE
export interface Player {
    player_id: number,
    name: string,
    height: string,
    weight: string,
    status: {
        type: string,
        gamesRemaining: number
    },
    player_position: string,
    jersey_number: number,
    photo_url: string,
    transactions: any,
    draft: {
        round: number,
        pick: number,
        tid: number,
        originalTid: number,
        year: number
    },
    awards: {
        season: number,
        type: string
    }[],
    born: {
        year: number,
        loc: string
    },
    age: number,
    college: string,
    team_id: number,

    // remove?
    regular_season_stats?: StatObject[],

    playoff_stats?: StatObject[]
}

export interface PlayerPageProps {
    player: Player,
    currentTeam: Team,
    mainStats?: any,
}

// PLAYER STATS
export interface PlayerStatsProps {
    player: Player,
    currentTeam: Team
}

export interface PlayerStatsTableAveragesProps {
    title: string,
    data: StatObject[] | undefined,
    currentData?: TotalsAndAveragesObject
}

// PLAYER GAME LOG
export interface Game {
    game_id: number,
    game_date: string,
    day_of_week: string,
    game_location: string,
    game_result: "W" | "L",
    player_team_score: number,
    opp_team_id: number,
    opp_team_abbreviation: string,
    opp_team_full_name: string,
    opp_team_score: number,
    player_id: number,
    player_name: string,
    minutes: number,
    pts: number,
    fgm: number,
    fga: number,
    fg_percentage: number,
    tpm: number,
    tpa: number,
    tp_percentage: number,
    ftm: number,
    fta: number,
    ft_percentage: number,
    orb: number,
    drb: number,
    reb: number,
    ast: number,
    stl: number,
    blk: number,
    turnovers: number,
    pf: number
}

export interface MonthAverages {
    avg_minutes: number,
    avg_pts: number,
    avg_fgm: number,
    avg_fga: number,
    avg_fg_percentage: number,
    avg_tpm: number,
    avg_tpa: number,
    avg_tp_percentage: number,
    avg_ftm: number,
    avg_fta: number,
    avg_ft_percentage: number,
    avg_orb: number,
    avg_drb: number,
    avg_reb: number,
    avg_ast: number,
    avg_stl: number,
    avg_blk: number,
    avg_turnovers: number,
    avg_pf: number
}

export interface PlayerGameLogProps {
    month: number,
    games: Game[],
    avg_stats: MonthAverages
}

export interface GameLogData {
    month: number,
    year: number,
    player_id: number,
    name: string,
    games_played: number,
    games: Game[],
    avg_stats: MonthAverages
}

// PLAYER SPLITS
export interface SplitAverages {
    gp: number,
    avg_minutes: number,
    avg_pts: number,
    avg_fgm: number,
    avg_fga: number,
    avg_fg_percentage: number,
    avg_tpm: number,
    avg_tpa: number,
    avg_tp_percentage: number,
    avg_ftm: number,
    avg_fta: number,
    avg_ft_percentage: number,
    avg_orb: number,
    avg_drb: number,
    avg_reb: number,
    avg_ast: number,
    avg_stl: number,
    avg_blk: number,
    avg_turnovers: number,
    avg_pf: number
}

export interface SplitsData {
    player_id: number,
    player_name: string,
    overall_averages: SplitAverages,
    home_averages: SplitAverages,
    away_averages: SplitAverages,
    conference_averages: SplitAverages,
    division_averages: SplitAverages,
    win_averages: SplitAverages,
    loss_averages: SplitAverages
}

export interface SplitsTableProps {
    data: SplitsData | undefined
}

// PLAYER OVERVIEW

export interface OverviewGameInfo {
    game_id: number,
    game_date: string,
    day_of_week: string,
    game_location: string,
    game_result: string,
    player_team_id: number,
    player_team_full_name: string,
    player_team_abbreviation: string,
    player_team_score: number,
    player_team_wins: number,
    player_team_losses: number,
    opp_team_id: number,
    opp_team_abbreviation: string,
    opp_team_full_name: string,
    opp_team_score: number,
    opp_team_wins: number,
    opp_team_losses: number,
    conference_game: boolean,
    division_game: boolean,
    minutes: number,
    pts: number,
    fgm: number,
    fga: number,
    fg_percentage: number,
    tpm: number,
    tpa: number,
    tp_percentage: number,
    ftm: number,
    fta: number,
    ft_percentage: number,
    orb: number,
    drb: number,
    reb: number,
    ast: number,
    stl: number,
    blk: number,
    turnovers: number,
    pf: number
}

export interface OverviewData {
    message: string,
    teamStandings: {
        team_id: number,
        full_name: string,
        abbreviation: string,
        division: string,
        wins: number,
        losses: number,
        pct: string,
        gb: string,
        last_10: string
    }[],
    lastFive: OverviewGameInfo[],
    splits: SplitsData
}

export interface OverviewRecentGamesProps {
    player: Player,
    games: OverviewGameInfo[]
}

export interface OverviewStandingsProps {
    currentTeam: Team,
    standings: {
        team_id: number,
        full_name: string,
        abbreviation: string,
        division: string,
        wins: number,
        losses: number,
        pct: string,
        gb: string,
        last_10: string
    }[]
}

export interface OverviewSplitsProps {
    currentTeam: Team,
    lastGame: OverviewGameInfo,
    splits: SplitsData
}

export interface OverviewSplitsTableProps {
    splits: SplitsData,
    showHome: boolean,
    showWins: boolean,
    showConference: boolean,
    showDivision: boolean
}

// PLAYER BIO
export interface AwardsDict {
    // awards
    rookieOTY: number[];
    mostImproved: number[];
    defensivePOTY: number[];
    clutchPOTY: number[];
    sixthMan: number[];
    MVP: number[];
    // allstar
    allStar: number[];
    allStarMVP: number[];
    threePointChamp: number[];
    slamDunkChamp: number[];
    // all league
    firstTeam: number[];
    secondTeam: number[];
    thirdTeam: number[];
    firstTeamDefense: number[];
    secondTeamDefense: number[];
    rookieTeam: number[];
    inSeasonTournamentTeam: number[];
    // league leaders
    scoringLeader: number[];
    assistLeader: number[];
    reboundLeader: number[];
    stealLeader: number[];
    blockLeader: number[];
    // champion/finals mvp
    champion: number[];
    finalsMVP: number[];
    semifinalsMVP: number[];
    //in season tournament
    inSeasonChamp: number[],
    inSeasonMVP: number[]
};

export interface AwardItemProps {
    award: string,
    years: number[]
}

// player career history
export interface PlayerCareerHistoryDict {
    teamOrder: number[],
    [team_id: number]: number[]
}

export interface CareerHistoryItemProps {
    team_id: number,
    years: number[]
}

// // GAMES

// GAME BOX SCORE
export interface GameBoxScoreState {
    game_id: number,
    game_date: string,
    game_time: string,
    in_season_tournament: boolean,
    postseason: boolean,
    home_team_id: number,
    home_team_full_name: string,
    home_team_abbreviation: string,
    home_team_division: string,
    home_team_score: string,
    home_fgm: string,
    home_fga: string,
    home_fg_percentage: string,
    home_tpm: string,
    home_tpa: string,
    home_tp_percentage: string,
    home_ftm: string,
    home_fta: string,
    home_ft_percentage: string,
    home_reb: string,
    home_orb: string,
    home_drb: string,
    home_ast: string,
    home_stl: string,
    home_blk: string,
    home_turnovers: string,
    home_pf: string,
    home_best_player_id: number,
    home_best_player_name: string,
    home_best_player_photo: string,
    home_best_player_pts: number,
    home_best_player_reb: number,
    home_best_player_ast: number,
    away_team_id: number,
    away_team_full_name: string,
    away_team_abbreviation: string,
    away_team_division: string,
    away_team_score: string,
    away_fgm: string,
    away_fga: string,
    away_fg_percentage: string,
    away_tpm: string,
    away_tpa: string,
    away_tp_percentage: string,
    away_ftm: string,
    away_fta: string,
    away_ft_percentage: string,
    away_reb: string,
    away_orb: string,
    away_drb: string,
    away_ast: string,
    away_stl: string,
    away_blk: string,
    away_turnovers: string,
    away_pf: string,
    away_best_player_id: number,
    away_best_player_name: string,
    away_best_player_photo: string,
    away_best_player_pts: number,
    away_best_player_reb: number,
    away_best_player_ast: number,
}

export interface StandingsDataState {
    home_team_id: number,
    home_team_division: string,
    home_team_wins: string,
    home_team_losses: string,
    home_team_home_wins: string,
    home_team_home_losses: string,
    away_team_id: number,
    away_team_division: string,
    away_team_wins: string,
    away_team_losses: string,
    away_team_away_wins: string,
    away_team_away_losses: string
}

// TEAM STATS VIEW

export interface GameSeriesState {
    game_id: number,
    game_date: string,
    postseason: boolean,
    home_team_id: number,
    home_team_full_name: string,
    home_team_abbreviation: string,
    home_team_division: string,
    home_team_score: string,
    away_team_id: number,
    away_team_full_name: string,
    away_team_abbreviation: string,
    away_team_division: string,
    away_team_score: string
}

export interface StandingsState {
    division: string,
    team_id: number,
    full_name: string,
    abbreviation: string,
    wins: string,
    losses: string,
    pct: string,
    last_10: string
}

export interface GameLeadersState {
    player_team_id: number,
    player_team_abbreviation: string,
    player_team_full_name: string,
    game_location: string,
    pts_leader_id: number,
    pts_leader_name: string,
    pts_leader_photo: string,
    pts_leader_position: string,
    pts_leader_pts: number,
    pts_leader_fgm: number,
    pts_leader_fga: number,
    pts_leader_ftm: number,
    pts_leader_fta: number,
    reb_leader_id: number,
    reb_leader_name: string,
    reb_leader_photo: string,
    reb_leader_position: string,
    reb_leader_reb: number,
    reb_leader_drb: number,
    reb_leader_orb: number,
    ast_leader_id: number,
    ast_leader_name: string,
    ast_leader_photo: string,
    ast_leader_position: string,
    ast_leader_ast: number,
    ast_leader_stl: number,
    ast_leader_turnovers: number
}

export interface GameLeadersProps {
    teamData: GameBoxScoreState,
    players: GameLeadersState[]
}

export interface GameSeriesProps {
    teamData: GameBoxScoreState,
    series: GameSeriesState[]
}


// BOX SCORE VIEW
export interface BoxScoreViewProps {
    teamData: GameBoxScoreState
}

export interface BoxScoreViewState {
    game_id: number,
    player_team_id: number,
    player_id: number,
    player_name: string,
    player_position: string,
    minutes: number,
    pts: number,
    fgm: number,
    fga: number,
    fg_percentage: string,
    tpm: number,
    tpa: number,
    tp_percentage: string,
    ftm: number,
    fta: number,
    ft_percentage: string,
    orb: number,
    drb: number,
    reb: number,
    ast: number,
    stl: number,
    blk: number,
    turnovers: number,
    pf: number
}