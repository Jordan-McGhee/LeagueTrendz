// auth popup
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
    isLoggingIn: boolean
}

// auth input
export interface AuthInputProps {
    name: string,
    placeholder: string,
    bottomText?: string,
    errorBottomText?: string,
    isPassword?: boolean,
    value: string,
    entered_password?: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}