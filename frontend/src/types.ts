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
    stadium_location: string
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