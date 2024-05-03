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

// // TEAM PAGE PROPS
export interface TeamPageProps {
    team: Team
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
    player_id: number,
    name: string,
    team_id: number,
    full_name: string,
    abbreviation: string,
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