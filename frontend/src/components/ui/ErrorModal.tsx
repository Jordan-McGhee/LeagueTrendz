import React from "react";
import { useNavigate } from "react-router-dom";

// type import
import { ErrorModalProps } from "../../types";

// ui imports
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./dialog";
import { Button } from "./button"

const ErrorModal: React.FC<ErrorModalProps> = ({ error, errorMessage, onClear }) => {

    const navigate = useNavigate()

    const closeModalHandler = () => {
        onClear()
        navigate(-1)
    }

    return (
        <Dialog open={error} onOpenChange={closeModalHandler}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Something went wrong!</DialogTitle>
                </DialogHeader>

                <p>{errorMessage}</p>

                <DialogFooter>
                    <Button
                    type="button"
                    onClick={closeModalHandler}
                    className="w-full"
                >Go Back</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ErrorModal