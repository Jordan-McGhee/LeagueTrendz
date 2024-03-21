import react, { useState, useContext } from "react"

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

const AuthForm: React.FC<AuthFormProps> = ({ isLoggingIn, changeDialogSetting }) => {

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

    const allValuesEmpty = Object.values(formErrors).every(error => error === '') && notEmptyCheck

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

    const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!allValuesEmpty) {
            return
        }

        console.log(formValues)

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

        // console.log(formData)

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

        if (responseData) {
            console.log(`Entered response data check`)

            // reset form values & errors
            resetFormErrors()
            resetFormValues()
    
            // login and close form
            changeDialogSetting()
            auth.login()
        }

        return
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
                    <Button className="" type="submit" disabled={!allValuesEmpty}>Sign Up</Button>
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
                    <Button className="" type="submit" disabled={!allValuesEmpty}>Log In</Button>
            }
        </div>
    )

    return (
        <div>
            {hasError ?
                <div onClick={clearError}>
                    <p>ERROR!!!!!!</p>
                    <p>{errorMessage}</p>
                </div>
                :
                <form onSubmit={formSubmitHandler}>
                    {isLoggingIn && !isLoading ? loginForm : signUpForm}
                </form>
            }

        </div>
    )
}

export default AuthForm