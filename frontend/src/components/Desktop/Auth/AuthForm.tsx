import react, { useEffect, useState } from "react"

// ui imports
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

// type imports
import { AuthFormProps, LoginForm, SignUpForm } from "../../../types";

// component imports
import AuthInput from "./AuthInput";

const AuthForm: React.FC<AuthFormProps> = ({ isLoggingIn }) => {

    const [formErrors, setFormErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: ''
    })
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

    // handler function to update errors in form through input component and disable submit button if necessary
    const changeFormErrorsHandler = (input: string, remove: boolean, newError?: string) => {

        if (remove) {
            // If remove is true, set errors at that input equal to empty string
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                [input]: ''
            }));
        } else {
            // else set errors at that input equal to new error
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                [input]: newError
            }))
        }
    }

    // iterates over all values in formErrors. If every error === an empty string, form is able to be submitted
    const allValuesEmpty = Object.values(formErrors).every(error => error === '');

    // reset functions
    const resetFormErrors = () => {
        setFormErrors({
            username: '',
            email: '',
            password: '',
            confirm_password: ''
        })
    }

    const resetFormValues = () => {
        setFormValues({
            username: "",
            email: "",
            password: "",
            confirm_password: ""
        })
    }

    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (formErrors) {
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

        // reset form values
    }


    const signUpForm = (
        <div className="flex flex-col gap-y-2">

            {/* username */}
            <AuthInput
                name="username"
                placeholder="BallDontLie"
                errorBottomText={formErrors["username"] ? formErrors["username"] : undefined}
                onChange={inputChangeHandler}
                value={formValues.username}
                changeFormErrors={changeFormErrorsHandler}
            />

            {/* email */}
            <AuthInput
                name="email"
                placeholder="ball@dontlie.com"
                errorBottomText={formErrors["email"] ? formErrors["email"] : undefined}
                onChange={inputChangeHandler}
                value={formValues.email}
                changeFormErrors={changeFormErrorsHandler}
            />

            {/* password */}
            <AuthInput
                name="password"
                placeholder="********"
                isPassword
                bottomText="Password must be 8-20 characters long, include at least 1 number, and include at least 1 of the following symbols: !@#$%^(){}"
                errorBottomText={formErrors["password"] ? formErrors["password"] : undefined}
                onChange={inputChangeHandler}
                value={formValues.password}
                changeFormErrors={changeFormErrorsHandler}
            />


            {/* confirm password */}
            <AuthInput
                name="confirm_password"
                placeholder="********"
                isPassword
                entered_password={formValues.password}
                errorBottomText={formErrors["confirm_password"] ? formErrors["confirm_password"] : undefined}
                onChange={inputChangeHandler}
                value={formValues.confirm_password}
                changeFormErrors={changeFormErrorsHandler}
            />

            <Button className="" type="submit" disabled={!allValuesEmpty}>Sign Up</Button>
        </div>
    )

    const loginForm = (
        <div className="flex flex-col gap-y-4">

            {/* username */}
            <AuthInput
                name="username"
                placeholder="BallDontLie"
                errorBottomText={formErrors["username"] ? formErrors["username"] : ""}
                onChange={inputChangeHandler}
                value={formValues.username}
                changeFormErrors={changeFormErrorsHandler}
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
                    bottomText="Password must be 8-20 characters long, include at least 1 number, and include at least 1 of the following symbols: !@#$%^(){}"
                    errorBottomText={formErrors["password"] ? formErrors["password"] : undefined}
                    changeFormErrors={changeFormErrorsHandler}
                />
                <p className="text-xs italic font-light w-fit hover:underline hover:cursor-pointer">Forgot Password?</p>
            </div>



            <Button className="" type="submit" disabled={!allValuesEmpty}>Log In</Button>
        </div>
    )

    return (
        <form onSubmit={formSubmitHandler}>
            {isLoggingIn ? loginForm : signUpForm}
        </form>
    )
}

export default AuthForm