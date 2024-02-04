import React, { useState } from "react";
import { NavLink, Navigate, } from "react-router-dom";

const DesktopNav = () => {


    return (
        <nav className="bg-white border-black border-2 left-0 h-full w-1/6">
            <ul className="flex flex-col justify-between py-4 items-center h-2/3">

                {/* regular nav options */}
                <div className="h-1/2 flex flex-col justify-between">
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
                <div className="h-1/3 flex flex-col justify-between">

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