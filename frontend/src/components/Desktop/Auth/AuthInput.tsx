import { ChangeEvent, useState } from "react";

// ui imports
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

// type imports
import { AuthInputProps } from "../../../types";

const AuthInput: React.FC<AuthInputProps> = ({ inputFor, isPassword, placeholder, bottomText, errorBottomText }) => {

    // states
    const [inputValue, setInputValue] = useState("")
    const [inputTouched, setInputTouched] = useState(false)
    const [hasError, setHasError] = useState(false)

    // handler fucntions

    // updates inputs value on change
    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
        setInputTouched(true)
    }

    // validation function
    // checks to ensure input value is valid before allowing form to be submitted
    const validateInput = (inputType: string, value: string) => {

        if (!inputTouched) {
            return
        }

        // username validation, has to be longer than 6 characters
        if (inputType === "username") {
            if (value.length < 6) {
                setHasError(true)

                return
            }

            setHasError(false)
        }

        // email validation
        if (inputType === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(value)) {
                setHasError(true);
                return;
            }

            setHasError(false);
        }

        // password validation
        if (inputType === "password") {
            const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^(){}]).{8,20}$/;

            if (!passwordRegex.test(value)) {
                setHasError(true);
                return;
            }

            setHasError(false);
        }
    }

    return (
        <div className="flex flex-col">
            <Label htmlFor={inputFor} className="capitalize">{inputFor === "confirm_password" ? "confirm password" : inputFor}</Label>
            <Input
                id={inputFor}
                placeholder={placeholder}
                value={inputValue}
                onChange={changeHandler}
                onBlur={() => validateInput(inputFor, inputValue)}
                className="my-2"
                type={ isPassword ? "password" : undefined}
            />
            {bottomText && !hasError && <p className="text-xs italic font-light">{bottomText}</p>}
            {hasError ?
                <p className="text-xs italic font-light text-red-500">{errorBottomText}</p>
                :
                <p className="text-xs italic font-light text-red-500 invisible">{errorBottomText}</p>
            }
        </div>
    )
}

export default AuthInput