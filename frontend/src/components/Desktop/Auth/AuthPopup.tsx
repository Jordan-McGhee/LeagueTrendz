import React, { useState } from "react";

// ui imports
import { DialogContent, DialogTitle, DialogHeader, DialogDescription, DialogFooter } from "../../ui/dialog"

// type imports
import { AuthPopupProps } from "../../../types";


// component imports
import AuthForm from "../Auth/AuthForm"

const AuthPopup: React.FC<AuthPopupProps> = ({ changeDialogSetting }) => {

    // states
    const [showLogin, setShowLogin] = useState(false)

    const errorDialogHeader = (
        <div></div>
    )

    const errorDialogFooter = (
        <div></div>
    )

    return (
        <DialogContent className="sm:max-w-[400px]">
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
            <AuthForm isLoggingIn={showLogin} changeDialogSetting={changeDialogSetting} />
            <DialogFooter className="text-center">
                <div onClick={() => setShowLogin(!showLogin)}>
                    {showLogin ?
                        <p>Need an account? <span className="underline hover:cursor-pointer">Switch to sign up!</span></p>
                        :
                        <p>Have an account? <span className="underline hover:cursor-pointer">Switch to login!</span></p>
                    }
                </div>
            </DialogFooter>
        </DialogContent>
    )
}

export default AuthPopup