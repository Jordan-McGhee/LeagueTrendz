import react, { useState, useContext, useEffect } from "react"

// ui imports
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import LoadingButton from "../../ui/loadingButton"

// type imports
import { AuthFormProps, LoginForm, SignUpForm } from "../../../types";

// component imports
import AuthInput from "./AuthInput";

// hook imports
import { useFetch } from "../../../Hooks/useFetch";

// context imports
import { AuthContext } from "../../../context/auth-context"

const AuthForm: React.FC<AuthFormProps> = ({ isLoggingIn, changeDialogSetting, passErrorUp }) => {

    const auth = useContext(AuthContext)
    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()


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
    // updates state values of formValues on each change
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
    // every check for login/signup depending on stat
    let notEmptyCheck = isLoggingIn ? formValues['username'] !== '' && formValues['password'] !== '' : Object.values(formValues).every(value => value !== '')

    // quick boolean for disabling form submission and button if values aren't valid 
    const allValuesOK = Object.values(formErrors).every(error => error === '') && notEmptyCheck

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

    // error useEffect to pass error up to dialog. Changes when hasError changes
    useEffect(() => {
        if (hasError) {
            console.log(`Entered hasError useEffect. Error Message: ${errorMessage}`)
            passErrorUp(errorMessage)
        } else {
            passErrorUp(undefined)
        }
    }, [hasError])

    const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        // clears error to reset error in parent component
        clearError()

        // quick boolean check to exit function immediately
        if (!allValuesOK) {
            return
        }

        // url to send request to - changes if logging in or signing up
        let url: string, formData: SignUpForm | LoginForm


        if (isLoggingIn) {
            url = `${process.env.REACT_APP_BACKEND_URL}/user/login`
            formData = {
                username: formValues.username,
                password: formValues.password
            }
        } else {
            url = `${process.env.REACT_APP_BACKEND_URL}/user/signUp`
            console.log(`URL: ${url}`)
            formData = {
                username: formValues.username,
                email: formValues.email,
                password: formValues.password
            }
        }

        // send data to back end
        let responseData

        try {
            responseData = await sendRequest(
                // url
                url,
                // method
                "POST",
                // headers
                {
                    "Content-Type": 'application/json'
                },
                // body
                JSON.stringify(formData)
            )

            console.log(responseData)
        } catch (error) {

        }

        // if we get data back, use it to log user in
        if (responseData) {
            const user_id = responseData.user_id
            const token = responseData.token

            // login and close form and dialog
            changeDialogSetting()
            auth.login(user_id, token)
        }
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

            {
                isLoading ?
                    <LoadingButton />
                    :
                    <Button className="" type="submit" disabled={!allValuesOK}>Sign Up</Button>
            }
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



            {
                isLoading ?
                    <LoadingButton />
                    :
                    <Button className="" type="submit" disabled={!allValuesOK}>Log In</Button>
            }
        </div>
    )

    return (
        <div>
            <form onSubmit={formSubmitHandler}>
                {isLoggingIn && !isLoading ? loginForm : signUpForm}
            </form>
        </div>
    )
}

export default AuthForm