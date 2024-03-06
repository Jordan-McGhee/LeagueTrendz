import React, { useState } from "react";
import { NavLink, Navigate, } from "react-router-dom";

// ui imports
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import AuthPopup from "../components/Desktop/Auth/AuthPopup";

const DesktopNav = () => {


    return (
        <nav className="text-white left-0 h-full w-1/5">
            <ul className="flex flex-col justify-between py-8 items-center h-full bg-black">

                {/* regular nav options */}
                <div className="h-1/3 flex flex-col gap-y-8">
                    <li>
                        <NavLink to="/" className="flex text-[#ffa023]">
                            {/* icon placeholder */}
                            <p className="mr-2">I</p>
                            <p>LeagueTrendz</p>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/" className="flex">
                            {/* icon placeholder */}
                            <p className="mr-2">I</p>
                            <p>News</p>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/scores" className="flex text-[#ffa023]">
                            {/* icon placeholder */}
                            <p className="mr-2">I</p>
                            <p>Scores</p>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/schedule" className="flex text-[#ffa023]">
                            {/* icon placeholder */}
                            <p className="mr-2">I</p>
                            <p>Schedule</p>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/standings" className="flex text-[#ffa023]">
                            {/* icon placeholder */}
                            <p className="mr-2">I</p>
                            <p>Standings</p>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/teams" className="flex text-[#ffa023]">
                            {/* icon placeholder */}
                            <p className="mr-2">I</p>
                            <p>Teams</p>
                        </NavLink>
                    </li>

                </div>

                {/* user nav options profile/favorites/notifications */}
                <div className="gap-y-8 flex flex-col">

                    <li>
                        <Dialog>
                            <DialogTrigger>
                                <div className="flex">
                                    {/* icon placeholder */}
                                    <p className="mr-2">I</p>
                                    <p>Sign Up/Login</p>
                                </div>
                            </DialogTrigger>
                            <AuthPopup />
                        </Dialog>
                    </li>

                    <li>
                        <NavLink to="/" className="flex">
                            {/* icon placeholder */}
                            <p className="mr-2">I</p>
                            <p>Profile</p>
                        </NavLink>
                    </li>

                </div>

            </ul>
        </nav>
    )
}

export default DesktopNav