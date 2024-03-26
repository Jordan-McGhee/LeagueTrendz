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