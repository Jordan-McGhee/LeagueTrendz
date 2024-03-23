import { createContext } from "react";
import { ContextType } from "../types"

export const AuthContext = createContext<ContextType>({
    isLoggedIn: false,
    user_id: undefined,
    token: undefined,
    login: (user_id, token) => { },
    logout: () => { }
})