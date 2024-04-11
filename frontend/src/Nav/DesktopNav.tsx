import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

// context import
import { AuthContext } from "../context/auth-context";

// ui imports
import { Dialog, DialogTrigger } from "../components/ui/dialog"
import AuthPopup from "../components/Desktop/Auth/AuthPopup";

const DesktopNav = () => {

    const auth = useContext(AuthContext)

    const [open, setOpen] = useState(false)

    const changeDialogStateHandler = () => {
        setOpen(!open)
    }


    return (
        <nav className="text-white fixed h-full w-[20%] max-w-xs bg-black">
            <ul className="flex flex-col justify-between py-8 items-center h-full text-lg">

                {/* regular nav options */}
                <div className="h-1/3 flex flex-col gap-y-10">
                    <li className="hover:text-[#ffa023]">
                        <NavLink to="/" className="flex">
                            {/* icon placeholder */}
                            <p className="mr-2">I</p>
                            <p>LeagueTrendz</p>
                        </NavLink>
                    </li>

                    
                    <li>
                        <NavLink to="/" className="flex">
                            <p className="mr-2">I</p>
                            <p>Metrics</p>
                        </NavLink>
                    </li>

                    <li className="hover:text-[#ffa023]">
                        <NavLink to="/nba/scores" className="flex">
                            {/* icon placeholder */}
                            <p className="mr-2">I</p>
                            <p>Scores</p>
                        </NavLink>
                    </li>

                    <li className="hover:text-[#ffa023]">
                        <NavLink to="/nba/schedule" className="flex">
                            {/* icon placeholder */}
                            <p className="mr-2">I</p>
                            <p>Schedule</p>
                        </NavLink>
                    </li>

                    <li className="hover:text-[#ffa023]">
                        <NavLink to="/nba/standings" className="flex">
                            {/* icon placeholder */}
                            <p className="mr-2">I</p>
                            <p>Standings</p>
                        </NavLink>
                    </li>

                    <li className="hover:text-[#ffa023]">
                        <NavLink to="/nba/teams" className="flex">
                            {/* icon placeholder */}
                            <p className="mr-2">I</p>
                            <p>Teams</p>
                        </NavLink>
                    </li>

                    <li className="hover:text-[#ffa023]">
                        <NavLink to="/nba/players" className="flex">
                            {/* icon placeholder */}
                            <p className="mr-2">I</p>
                            <p>Players</p>
                        </NavLink>
                    </li>

                </div>

                {/* user nav options profile/favorites/notifications */}
                <div className="gap-y-10 flex flex-col">

                    {/* NOT SIGNED IN */}
                    {!auth.isLoggedIn &&
                        <li className="hover:text-[#ffa023]">
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger>
                                    <div className="flex">
                                        {/* icon placeholder */}
                                        <p className="mr-2">I</p>
                                        <p>Sign Up/Login</p>
                                    </div>
                                </DialogTrigger >
                                <AuthPopup changeDialogSetting={changeDialogStateHandler} />
                            </Dialog>
                        </li>
                    }


                    {/* SIGNED IN */}
                    {auth.isLoggedIn &&
                        <li className="hover:text-[#ffa023]">
                            <NavLink to="/" className="flex">
                                {/* icon placeholder */}
                                <p className="mr-2">I</p>
                                <p>Notifications</p>
                            </NavLink>
                        </li>
                    }

                    {auth.isLoggedIn &&
                        <li className="hover:text-[#ffa023]">
                            <NavLink to="/user" className="flex">
                                {/* icon placeholder */}
                                <p className="mr-2">I</p>
                                <p>Profile</p>
                            </NavLink>
                        </li>
                    }

                </div>

            </ul>
        </nav>
    )
}

export default DesktopNav