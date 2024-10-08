import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

// context import
import { AuthContext } from "../context/auth-context";

// ui imports
import { Dialog, DialogTrigger } from "../components/ui/dialog"

// icon imports
import { SearchIcon } from "lucide-react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { BasketballIcon, ScheduleIcon, StandingsIcon, TeamIcon, PlayerIcon } from "../Icons/Icons";

// component imports
import AuthPopup from "../components/Desktop/Auth/AuthPopup";
import SearchPopup from "../components/Desktop/Search/SearchPopup";

const DesktopNav = () => {

    const auth = useContext(AuthContext)

    const [openAuth, setOpenAuth] = useState(false)
    const [openSearch, setOpenSearch] = useState(false)

    const changeAuthDialogStateHandler = () => {
        setOpenAuth(!openAuth)
    }

    const changeSearchDialogStateHandler = () => {
        setOpenSearch(!openSearch)
    }


    return (

        <nav className="text-white sticky top-0 w-full bg-black z-50">
            <ul className="flex justify-between items-center max-w-screen-2xl w-4/5 m-auto px-4 ">
                {/* regular nav options */}
                <div className="flex items-center space-x-6">
                    <li className="hover:text-[#ffa023] py-4 text-xl">
                        <NavLink to="/" className="flex items-center gap-x-2">
                            <BasketballIcon />
                            <p>LeagueTrendz</p>
                        </NavLink>
                    </li>
                </div>

                <div className="flex items-center space-x-6">
                    <li className="hover:text-[#ffa023] ">
                        <NavLink to="/nba/schedule" className="flex items-center gap-x-1.5">
                            <CalendarIcon className="size-5" />
                            <p>Schedule</p>
                        </NavLink>
                    </li>

                    <li className="hover:text-[#ffa023] ">
                        <NavLink to="/nba/standings" className="flex items-center gap-x-1.5">
                            <StandingsIcon />
                            <p>Standings</p>
                        </NavLink>
                    </li>

                    <li className="hover:text-[#ffa023]">
                        <NavLink to="/nba/teams" className="flex items-center gap-x-1.5">
                            <TeamIcon />
                            <p>Teams</p>
                        </NavLink>
                    </li>

                    <li className="hover:text-[#ffa023] ">
                        <NavLink to="/nba/players?view=leaders" className="flex items-center gap-x-1.5">
                            <PlayerIcon />
                            <p>Players</p>
                        </NavLink>
                    </li>
                    <li className="hover:cursor-pointer hover:text-[#ffa023] ">
                        <Dialog open={openSearch} onOpenChange={setOpenSearch}>
                            <DialogTrigger asChild>
                                <SearchIcon />
                            </DialogTrigger>
                            <SearchPopup changeDialogSetting={changeSearchDialogStateHandler} />
                        </Dialog>
                    </li>

                    {/* NOT SIGNED IN
                    {!auth.isLoggedIn &&
                        <li className="hover:text-[#ffa023]">
                            <Dialog open={openAuth} onOpenChange={setOpenAuth}>
                                <DialogTrigger>
                                    <div className="flex items-center">
                                        <p className="mr-2">I</p>
                                        <p>Sign Up/Login</p>
                                    </div>
                                </DialogTrigger >
                                <AuthPopup changeDialogSetting={changeAuthDialogStateHandler} />
                            </Dialog>
                        </li>
                    }

                    {/* SIGNED IN */}
                    {/* {auth.isLoggedIn &&
                        <>
                            <li className="hover:text-[#ffa023]">
                                <NavLink to="/" className="flex items-center">
                                    <p className="mr-2">I</p>
                                    <p>Notifications</p>
                                </NavLink>
                            </li>
                            <li className="hover:text-[#ffa023]">
                                <NavLink to="/user" className="flex items-center">
                                    <p className="mr-2">I</p>
                                    <p>Profile</p>
                                </NavLink>
                            </li>
                        </>
                    } */}
                </div>
            </ul>
        </nav>
    )
}

export default DesktopNav