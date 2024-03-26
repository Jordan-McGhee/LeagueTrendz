import React, { useState, useEffect } from "react";

// hook import
import { useFetch } from "../Hooks/useFetch";

// type imports
import { UserPageProps } from "../types"

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card"

const UserPage: React.FC<UserPageProps> = ({ user_id }) => {

    // useFetch to fetch user info
    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // state to hold user info
    const [ user, setUser ] = useState({})

    // useEffect to fetch user on page load
    useEffect(() => {
        
    }, [])



    return (
        <div className="min-h-svh">
            <Card>
                <CardHeader>

                </CardHeader>
            </Card>
        </div>
    )
}

export default UserPage