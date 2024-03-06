// auth popup
interface SignUpForm {
    username: string,
    email: string,
    password: string
}

interface LoginForm {
    username?: string,
    email?: string,
    password: string
}

export { SignUpForm, LoginForm }