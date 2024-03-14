import { ChangeEvent, useEffect, useState } from "react";

// ui imports
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

// type imports
import { AuthInputProps } from "../../../types";

const AuthInput: React.FC<AuthInputProps> = ({ name, isPassword, value, placeholder, entered_password, bottomText, errorBottomText, onChange, changeFormErrors }) => {

    // useEffect(() => {
    //     if (value === "" || undefined) {
    //         setHasError(false)
    //     }

    // }, [value])

    // states
    const [hasError, setHasError] = useState(false)

    // validation function
    // checks to ensure input value is valid before allowing form to be submitted
    const validateInput = (inputType: string, value: string) => {

        // username validation, has to be longer than 6 characters
        if (inputType === "username") {

            // initial check to make sure the input isn't empty
            if (value === "") {
                setHasError(true)
                changeFormErrors(inputType, false, "This can't be empty!")
                return
            }

            if (value.length < 6) {
                setHasError(true)
                changeFormErrors(inputType, false, 'Username must be at least 6 characters!')
                return
            }

            setHasError(false)
            changeFormErrors(inputType, true)
        }

        // email validation
        if (inputType === "email") {

            // initial check to make sure the input isn't empty
            if (value === "") {
                setHasError(true)
                changeFormErrors(inputType, false, "This can't be empty!")
                return
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(value)) {
                setHasError(true);
                changeFormErrors(inputType, false, 'Please enter a valid email!')
                return;
            }

            setHasError(false);
            changeFormErrors(inputType, true)
        }

        // password validation
        if (inputType === "password") {
            const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^(){}]).{8,20}$/;

            if (!passwordRegex.test(value)) {
                setHasError(true);
                changeFormErrors(inputType, false, 'Password must be 8-20 characters long, include at least 1 number, and include at least 1 of the following symbols: !@#$%^(){}')
                return;
            }

            setHasError(false);
            changeFormErrors(inputType, true)
        }

        // confirm password validation
        if (inputType === "confirm_password") {

            // initial check to make sure the input isn't empty
            if (value === "") {
                setHasError(true)
                changeFormErrors(inputType, false, "This can't be empty!")
                return
            }

            if (value !== entered_password) {
                setHasError(true)
                changeFormErrors(inputType, false, "Passwords don't match!")
                return
            }

            setHasError(false)
            changeFormErrors(inputType, true)
        }
    }

    let inputBottomText

    if (name === "password") {
        inputBottomText =
            <div>
                {hasError ?
                    <p className="text-xs italic font-light text-red-500">{errorBottomText}</p>
                    :
                    <p className="text-xs italic font-light">{bottomText}</p>
                }
            </div>
    } else {
        inputBottomText =
        <div>
            {hasError ?
                <p className="text-xs italic font-light text-red-500">{errorBottomText}</p>
                :
                <p className="text-xs italic font-light text-red-500 invisible">" "</p>
            }
        </div>
    }

    return (
        <div className="flex flex-col">
            <Label htmlFor={name} className="capitalize">{name === "confirm_password" ? "confirm password" : name}</Label>
            <Input
                id={name}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={() => validateInput(name, value)}
                className="my-2"
                type={isPassword ? "password" : undefined}
            />
            { inputBottomText }
        </div>
    )
}

export default AuthInput