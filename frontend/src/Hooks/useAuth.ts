import { useState, useCallback, useEffect } from "react"

let logoutTimer: any

export const useAuth = () => {
    // manage whether we are logged in or not app-wide with useState
    const [token, setToken] = useState<string | null>(null)
    const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>(null)
    const [user_id, setUser_id] = useState<number | null>(null)

    const login = useCallback((id: number, userToken: string, givenExpirationDate?: Date) => {

        setUser_id(id)
        setToken(userToken)

        // expiration date for token
        // either grabs date from parameters or generates new date object of the current date/time + an hour if there wasn't one passed to the function
        const expirationDate = givenExpirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)

        // update state for use in logout useEffect
        setTokenExpirationDate(expirationDate)

        // saving userData to local storage so refreshing the page doesn't reload the app
        localStorage.setItem('userData', JSON.stringify({
            user_id: id,
            token: userToken,
            expirationDate: expirationDate.toISOString()
        }))

    }, [])

    const logout = useCallback(() => {
        setUser_id(null)
        setToken(null)
        setTokenExpirationDate(null)

        // remove data from localStorage upon logout
        localStorage.removeItem('userData')
    }, [])

    // useEffect to automatically log the user out if their token lasts longer than an hour
    useEffect(() => {

        if (token && tokenExpirationDate) {

            // get the difference between the expiration date and current time in milliseconds to pass to setTimeout
            const remainingTime:number = tokenExpirationDate.getTime() - new Date().getTime()
            // console.log(remainingTime)

            logoutTimer = setTimeout(logout, remainingTime)
        } else {
            // clear all timers if we reach else block
            clearTimeout(logoutTimer)
        }
    }, [token, logout, tokenExpirationDate])


    // useEffect to check localStorage for a token. No dependencies means it will only run when App.js mounts, after the render cycle
    useEffect(() => {

        let userData = localStorage.getItem('userData')
        let storedData


        if (userData) {
            storedData = JSON.parse(userData)
        }


        if (
            storedData &&
            storedData.token &&
            // check to make sure the token's expiration date is greater than the current time. If so, login the user in automatically and keep the token's date
            new Date(storedData.expirationDate) > new Date()
        ) {
            login(storedData.userID, storedData.token, new Date(storedData.expirationDate))
        }

    }, [login])

    return { token, user_id, login, logout }
}