import react, { useState } from "react"

// ui imports
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

// type imports
import { AuthFormProps, LoginForm, SignUpForm } from "../../../types";

// component imports
import AuthInput from "./AuthInput";

const AuthForm: React.FC<AuthFormProps> = ({ isLoggingIn }) => {

    const [formErrors, setFormErrors] = useState([])
    const [formValues, setFormValues] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: ""
    })

    // handler function to pass into each input
    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;

        let savedValue = value.trim()

        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: savedValue,
        }));
    };

const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (formErrors.length > 0) {
        return
    }

    console.log(formValues)

    // url to send request to - changes if logging in or signing up
    let url: string, formData: SignUpForm | LoginForm

    
    if (isLoggingIn) {
        url = `${process.env.REACT_APP_BACKEND_URL}`
        formData = {
            username: formValues.username, 
            password: formValues.password
        }
    } else {
        url = `${process.env.REACT_APP_BACKEND_URL}`
        console.log(`URL: ${url}`)
        formData = {
            username: formValues.username,
            email: formValues.email,
            password: formValues.password
        }
    }

    console.log(formData)
}


const signUpForm = (
    <div className="flex flex-col gap-y-2">

        {/* username */}
        <AuthInput
            name="username"
            placeholder="BallDontLie"
            errorBottomText="Username must be at least 6 characters!"
            onChange={inputChangeHandler}
            value={formValues.username}
        />

        {/* email */}
        <AuthInput
            name="email"
            placeholder="ball@dontlie.com"
            errorBottomText="Please enter a valid email!"
            onChange={inputChangeHandler}
            value={formValues.email}
        />

        {/* password */}
        <AuthInput
            name="password"
            placeholder="********"
            isPassword
            bottomText="Password must be 8-20 characters long, include at least 1 number, and include at least 1 of the following symbols: !@#$%^(){}"
            errorBottomText="Please enter a valid password!"
            onChange={inputChangeHandler}
            value={formValues.password}
        />


        {/* confirm password */}
        <AuthInput
            name="confirm_password"
            placeholder="********"
            isPassword
            entered_password={formValues.password}
            errorBottomText="Passwords don't match!"
            onChange={inputChangeHandler}
            value={formValues.confirm_password}
        />

        <Button className="" type="submit" disabled = { !formErrors }>Sign Up</Button>
    </div>
)

const loginForm = (
    <div className="flex flex-col gap-y-4">

        {/* username */}
        <AuthInput
            name="username"
            placeholder="BallDontLie"
            errorBottomText="Username must be at least 6 characters!"
            onChange={inputChangeHandler}
            value={formValues.username}
        />

        {/* email */}
        {/* <AuthInput
                inputFor="email"
                placeholder="ball@dontlie.com"
                errorBottomText="Please enter a valid email!"
            /> */}

        {/* password */}
        <div className="flex flex-col gap-y-2">
            <AuthInput
                name="password"
                placeholder="********"
                isPassword
                onChange={inputChangeHandler}
                value={formValues.password}
            />
            <p className="text-xs italic font-light w-fit hover:underline hover:cursor-pointer">Forgot Password?</p>
        </div>



        <Button className="" type="submit" disabled={!formErrors}>Log In</Button>
    </div>
)

return (
    <form onSubmit={formSubmitHandler}>
        {isLoggingIn ? loginForm : signUpForm}
    </form>
)
}

export default AuthForm