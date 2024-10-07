import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

// context import
import { AuthContext } from "../context/auth-context";

// ui imports
import { Dialog, DialogTrigger } from "../components/ui/dialog"

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
        // <nav className="text-white fixed h-full w-[20%] max-w-xs bg-black">
        //     <ul className="flex flex-col justify-between py-8 items-center h-full text-lg w-1/2 mx-auto">

        //         {/* regular nav options */}
        //         <div className="flex flex-col gap-y-10 w-full">
        //             <li className="hover:text-[#ffa023]">
        //                 <NavLink to="/" className="flex">
        //                     {/* icon placeholder */}
        //                     <p className="mr-2">I</p>
        //                     <p>LeagueTrendz</p>
        //                 </NavLink>
        //             </li>

        //             <li className="hover:text-[#ffa023]">
        //                 <NavLink to="/nba/schedule" className="flex">
        //                     {/* icon placeholder */}
        //                     <p className="mr-2">I</p>
        //                     <p>Schedule</p>
        //                 </NavLink>
        //             </li>

        //             <li className="hover:text-[#ffa023]">
        //                 <NavLink to="/nba/standings" className="flex">
        //                     {/* icon placeholder */}
        //                     <p className="mr-2">I</p>
        //                     <p>Standings</p>
        //                 </NavLink>
        //             </li>

        //             <li className="hover:text-[#ffa023]">
        //                 <NavLink to="/nba/teams" className="flex">
        //                     {/* icon placeholder */}
        //                     <p className="mr-2">I</p>
        //                     <p>Teams</p>
        //                 </NavLink>
        //             </li>

        //             <li className="hover:text-[#ffa023]">
        //                 <NavLink to="/nba/players?view=leaders" className="flex">
        //                     {/* icon placeholder */}
        //                     <p className="mr-2">I</p>
        //                     <p>Players</p>
        //                 </NavLink>
        //             </li>

        //         </div>

        //         {/* search function */}
        //         <div className="flex flex-col gap-y-8 w-full">

        //             <li className="hover:cursor-pointer hover:text-[#ffa023]">
        //                 <Dialog open={openSearch} onOpenChange={setOpenSearch}>
        //                     <DialogTrigger asChild>
        //                         <div className="flex">
        //                             {/* icon placeholder */}
        //                             <p className="mr-2">I</p>
        //                             <p>Search</p>
        //                         </div>
        //                     </DialogTrigger>
        //                     <SearchPopup changeDialogSetting = {changeSearchDialogStateHandler} />
        //                 </Dialog>
        //             </li>

        //             {/* NOT SIGNED IN */}
        //             {!auth.isLoggedIn &&
        //                 <li className="hover:text-[#ffa023]">
        //                     <Dialog open={openAuth} onOpenChange={setOpenAuth}>
        //                         <DialogTrigger>
        //                             <div className="flex">
        //                                 <p className="mr-2">I</p>
        //                                 <p>Sign Up/Login</p>
        //                             </div>
        //                         </DialogTrigger >
        //                         <AuthPopup changeDialogSetting={changeAuthDialogStateHandler} />
        //                     </Dialog>
        //                 </li>
        //             }


        //             {/* SIGNED IN */}
        //             {auth.isLoggedIn &&
        //                 <li className="hover:text-[#ffa023]">
        //                     <NavLink to="/" className="flex">
        //                         <p className="mr-2">I</p>
        //                         <p>Notifications</p>
        //                     </NavLink>
        //                 </li>
        //             }

        //             {auth.isLoggedIn &&
        //                 <li className="hover:text-[#ffa023]">
        //                     <NavLink to="/user" className="flex">
        //                         <p className="mr-2">I</p>
        //                         <p>Profile</p>
        //                     </NavLink>
        //                 </li>
        //             }

        //         </div>

        //     </ul>
        // </nav>

        <nav className="text-white sticky top-0 w-full bg-black z-50">
            <ul className="flex justify-between items-center max-w-screen-2xl w-4/5 m-auto p-4 text-lg">
                {/* regular nav options */}
                <div className="flex items-center space-x-6">
                    <li className="hover:text-[#ffa023]">
                        <NavLink to="/" className="flex items-center">
                            <p className="mr-2">I</p>
                            <p>LeagueTrendz</p>
                        </NavLink>
                    </li>

                    <li className="hover:text-[#ffa023]">
                        <NavLink to="/nba/schedule" className="flex items-center">
                            <p className="mr-2">I</p>
                            <p>Schedule</p>
                        </NavLink>
                    </li>

                    <li className="hover:text-[#ffa023]">
                        <NavLink to="/nba/standings" className="flex items-center">
                            <p className="mr-2">I</p>
                            <p>Standings</p>
                        </NavLink>
                    </li>

                    <li className="hover:text-[#ffa023]">
                        <NavLink to="/nba/teams" className="flex items-center">
                            <p className="mr-2">I</p>
                            <p>Teams</p>
                        </NavLink>
                    </li>

                    <li className="hover:text-[#ffa023]">
                        <NavLink to="/nba/players?view=leaders" className="flex items-center">
                            <p className="mr-2">I</p>
                            <p>Players</p>
                        </NavLink>
                    </li>
                </div>

                {/* search function and auth */}
                <div className="flex items-center space-x-6">
                    <li className="hover:cursor-pointer hover:text-[#ffa023]">
                        <Dialog open={openSearch} onOpenChange={setOpenSearch}>
                            <DialogTrigger asChild>
                                <div className="flex items-center">
                                    <p className="mr-2">I</p>
                                    <p>Search</p>
                                </div>
                            </DialogTrigger>
                            <SearchPopup changeDialogSetting={changeSearchDialogStateHandler} />
                        </Dialog>
                    </li>

                    {/* NOT SIGNED IN */}
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
                    {auth.isLoggedIn &&
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
                    }
                </div>
            </ul>
        </nav>
    )
}

export default DesktopNav