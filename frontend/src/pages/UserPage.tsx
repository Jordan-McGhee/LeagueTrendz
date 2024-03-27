import React, { useState, useEffect, useContext } from "react";

// hook import
import { useFetch } from "../Hooks/useFetch";

// type imports
import { User } from "../types"

// context imports
import { AuthContext } from "../context/auth-context";

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card"

const UserPage= () => {

    const { user_id, token } = useContext(AuthContext)

    console.log(`User ID: ${user_id}, token: ${token}`)

    // useFetch to fetch user info
    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // state to hold user info
    const [ user, setUser ] = useState<User | null>(null)

    // useEffect to fetch user on page load
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/user/${user_id}`

        console.log(url)

        let responseData

        const fetchUser = async () => {
            try {
                responseData = await sendRequest(
                    // URL
                    url,
                    // METHOD
                    "GET",
                    // HEADERS
                    {
                        Authorization: `Bearer ${token}`
                    },
                )
            } catch (error) {
                
            }
        }

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