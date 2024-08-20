import React, { useState } from "react";

// ui imports
import { DialogContent, DialogTitle, DialogHeader, DialogDescription, DialogFooter } from "../../ui/dialog"

// type imports
import { PopupProps } from "../../../types";


// component imports
import AuthForm from "../Auth/AuthForm"

const AuthPopup: React.FC<PopupProps> = ({ changeDialogSetting }) => {

    // states
    const [showLogin, setShowLogin] = useState(true)
    const [errorDescription, setErrorDescription] = useState<string | undefined>(undefined)

    // error description functions
    // updates error description to the error message that is passed back from backend on form submission
    const errorDescriptionHandler = (value?: string) => {
        if (value) {
            setErrorDescription(value)
            return
        }
        setErrorDescription(undefined)
    }

    // resets error description when form type is changed
    const errorSwitchHandler = () => {
        setShowLogin(!showLogin)
        errorDescriptionHandler()
    }

    // error dialog elements
    const errorDialogHeader = (
        <DialogHeader className="text-red-500">
            <DialogTitle>
                {showLogin ? "Error Logging In!" : "Error Signing Up!"}
            </DialogTitle>
            <DialogDescription>{errorDescription}</DialogDescription>
        </DialogHeader>
    )

    const errorDialogFooter = (
        // 
        <div onClick={() => errorSwitchHandler()}>
            {showLogin ?
                <p className="underline hover:cursor-pointer">Sign up instead?</p>
                :
                <p className="underline hover:cursor-pointer">Log in instead?</p>
            }
        </div>
    )

    // normal dialog elements
    const normalDialogHeader = (
        <DialogHeader>
            <DialogTitle>{showLogin ? "Welcome Back!" : "Create an Account!"}</DialogTitle>
            <DialogDescription>
                {showLogin ?
                    "Log back in to access your favorites and check your notifications!"
                    :
                    "Create an account to favorite teams and players and create your own curated watch list!"
                }
            </DialogDescription>
        </DialogHeader>
    )

    const normalDialogFooter = (
        <div onClick={() => setShowLogin(!showLogin)}>
            {showLogin ?
                <p>Need an account? <span className="underline hover:cursor-pointer">Switch to sign up!</span></p>
                :
                <p>Have an account? <span className="underline hover:cursor-pointer">Switch to login!</span></p>
            }
        </div>
    )

    return (
        <DialogContent className="sm:max-w-[400px]">
            {errorDescription ? errorDialogHeader : normalDialogHeader}

            <AuthForm isLoggingIn={showLogin} changeDialogSetting={changeDialogSetting} passErrorUp = {errorDescriptionHandler}/>

            <DialogFooter className="text-center">
                {errorDescription ? errorDialogFooter : normalDialogFooter}
            </DialogFooter>
        </DialogContent>
    )
}

export default AuthPopup