import React, { useState, useEffect, useContext } from "react";

// hook import
import { useFetch } from "../Hooks/useFetch";

// type imports
import { User } from "../types"

// context imports
import { AuthContext } from "../context/auth-context";

// ui imports
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card"
import { Menubar, MenubarMenu, MenubarTrigger } from "../components/ui/menubar"

const UserPage = () => {

    // context variables to grab user and fetch with token
    const { user_id, token } = useContext(AuthContext)

    // useFetch to fetch user info
    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // states - mounted is to make sure fetchUser only runs after component has mounted 
    const [mounted, setMounted] = useState<boolean>(false)
    const [user, setUser] = useState<User | null>(null)

    // all months in an array for when we use date api later
    const monthNames: string[] = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    // useEffect to fetch user on page load
    useEffect(() => {
        if (mounted) {
            const url: string = `${process.env.REACT_APP_BACKEND_URL}/user/${user_id}`

            let responseData: any

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

                    setUser(responseData.user)
                } catch (error) {

                }
            }

            fetchUser()
        } else {
            setMounted(true)
        }

    }, [mounted])

    return (
        <div className="min-h-svh">
            {
                user &&
                <Card>
                    <CardHeader>
                        <CardTitle className="text-4xl">{user?.username}</CardTitle>
                        {typeof user.created_at === 'string' && (
                            <CardDescription>
                                Member since {`${monthNames[new Date(user.created_at.split('T')[0]).getMonth()]} ${new Date(user.created_at.split('T')[0]).getFullYear()}`}
                            </CardDescription>
                        )}
                        <Menubar className="w-fit">
                            <MenubarMenu>
                                <MenubarTrigger>
                                    Favorites
                                </MenubarTrigger>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>
                                    Watchlist
                                </MenubarTrigger>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>
                                    Account
                                </MenubarTrigger>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>
                                    Settings
                                </MenubarTrigger>
                            </MenubarMenu>
                        </Menubar>
                    </CardHeader>
                    <CardContent>
                    </CardContent>
                </Card>
            }
        </div>
    )
}

export default UserPage