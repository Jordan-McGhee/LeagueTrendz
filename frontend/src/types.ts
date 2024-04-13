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

export interface RosterProps {
    team: Team
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
    currentTeam: Team
}

export interface PlayerStatsTableAveragesProps {
    title: string,
    // fix later
    data: StatObject[] | undefined,
}