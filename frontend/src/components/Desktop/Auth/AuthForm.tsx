import react, { useState } from "react"

// ui imports
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

// type imports
import { AuthFormProps } from "../../../types";

// component imports
import AuthInput from "./AuthInput";

const AuthForm: React.FC<AuthFormProps> = ({ isLoggingIn }) => {

    const [ formHasErrors, setFormHasErrors ] = useState(false)

    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        console.log(event.target)
    }


    const signUpForm = (
        <div className="flex flex-col gap-y-2">

            {/* username */}
            <AuthInput
                inputFor="username"
                placeholder="BallDontLie"
                errorBottomText="Username must be at least 6 characters!"
            />

            {/* email */}
            <AuthInput
                inputFor="email"
                placeholder="ball@dontlie.com"
                errorBottomText="Please enter a valid email!"
            />

            {/* password */}
            <AuthInput
                inputFor="password"
                placeholder="********"
                isPassword
                bottomText="Password must be 8-20 characters long, include at least 1 number, and include at least 1 of the following symbols: !@#$%^(){}"
                errorBottomText="Please enter a valid password!"
            />


            {/* confirm password */}
            <AuthInput
                inputFor="confirm_password"
                placeholder="********"
                isPassword
                errorBottomText="Passwords don't match!"
            />

            <Button className="" type="submit">Sign Up</Button>
        </div>
    )

    const loginForm = (
        <div className="flex flex-col gap-y-4">

            {/* username */}
            <AuthInput
                inputFor="username"
                placeholder="BallDontLie"
                errorBottomText="Username must be at least 6 characters!"
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
                inputFor="password"
                placeholder="********"
                isPassword
            />
                <p className="text-xs italic font-light w-fit hover:underline hover:cursor-pointer">Forgot Password?</p>
            </div>

            

            <Button className="" type="submit">Log In</Button>
        </div>
    )

    return (
        <form onSubmit={formSubmitHandler}>
            {isLoggingIn ? loginForm : signUpForm}
        </form>
    )
}

export default AuthForm