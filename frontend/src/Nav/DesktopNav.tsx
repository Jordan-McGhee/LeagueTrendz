import React, { useState } from "react";
import { NavLink, Navigate, } from "react-router-dom";

const DesktopNav = () => {


    return (
        <nav className="bg-white border-black border-2 left-0 h-full w-1/5">
            <ul className="flex flex-col justify-between py-8 items-center h-full bg-green-700">

                {/* regular nav options */}
                <div className="h-1/3 flex flex-col gap-y-8">
                    <li>
                        <NavLink to="/" className="flex">
                            {/* icon placeholder */}
                            <p className="mr-2">I</p>
                            <p>LeagueTrendz</p>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/" className="flex">
                            {/* icon placeholder */}
                            <p className="mr-2">I</p>
                            <p>Scores</p>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/schedule" className="flex">
                            {/* icon placeholder */}
                            <p className="mr-2">I</p>
                            <p>Schedule</p>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/" className="flex">
                            {/* icon placeholder */}
                            <p className="mr-2">I</p>
                            <p>Standings</p>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/teams" className="flex">
                            {/* icon placeholder */}
                            <p className="mr-2">I</p>
                            <p>Teams</p>
                        </NavLink>
                    </li>

                </div>

                {/* user nav options profile/favorites/notifications */}
                <div className="h-1/5 gap-y-8 flex flex-col">

                    <li>
                        <NavLink to="/" className="flex">
                            {/* icon placeholder */}
                            <p className="mr-2">I</p>
                            <p>Favorites</p>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/" className="flex">
                            {/* icon placeholder */}
                            <p className="mr-2">I</p>
                            <p>Notifications</p>
                        </NavLink>
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