import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

// context import
import { AuthContext } from "../context/auth-context";

// ui imports
import { Dialog, DialogTrigger } from "../components/ui/dialog"

// icon imports
import { SearchIcon, Menu, X } from "lucide-react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { BasketballIcon, ScheduleIcon, StandingsIcon, TeamIcon, PlayerIcon } from "../Icons/Icons";

// component imports
import AuthPopup from "../components/Desktop/Auth/AuthPopup";
import SearchPopup from "../components/Desktop/Search/SearchPopup";

const DesktopNav = () => {

    const auth = useContext(AuthContext)

    const [openAuth, setOpenAuth] = useState(false)
    const [openSearch, setOpenSearch] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const changeAuthDialogStateHandler = () => {
        setOpenAuth(!openAuth)
    }

    const changeSearchDialogStateHandler = () => {
        setOpenSearch(!openSearch)
    }

    const toggleMobileMenuHandler = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }


    return (

        <nav className="text-white sticky top-0 w-full bg-black z-50">

            <div className="">

                {/* desktop nav */}
                <ul className="hidden md:flex max-w-screen-2xl px-4 w-4/5 m-auto justify-between items-center">
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
                                <CalendarIcon className="size-5 hidden lg:block" />
                                <p>Schedule</p>
                            </NavLink>
                        </li>

                        <li className="hover:text-[#ffa023] ">
                            <NavLink to="/nba/standings" className="flex items-center gap-x-1.5">
                                <StandingsIcon iconClass="hidden lg:block size-6" />
                                <p>Standings</p>
                            </NavLink>
                        </li>

                        <li className="hover:text-[#ffa023]">
                            <NavLink to="/nba/teams" className="flex items-center gap-x-1.5">
                                <TeamIcon iconClass="hidden lg:block size-5" />
                                <p>Teams</p>
                            </NavLink>
                        </li>

                        <li className="hover:text-[#ffa023] ">
                            <NavLink to="/nba/players?view=leaders" className="flex items-center gap-x-1.5">
                                <PlayerIcon iconClass="hidden lg:block size-5" />
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

                {/* mobile nav */}
                <>
                    {/* Animated Mobile Menu */}
                    <div className={`fixed inset-0 bg-black bg-opacity-95 z-50 transition-transform duration-300 ease-in-out transform ${mobileMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                        <div className="absolute inset-x-0 bottom-0 pb-12">
                            <ul className="flex flex-col px-6 gap-y-8 max-w-xs text-white text-xl mb-8">
                                <li className="hover:cursor-pointer hover:text-[#ffa023 flex items-center gap-x-4 w-full">
                                    <CalendarIcon className="size-6" />
                                    <NavLink onClick={() => setMobileMenuOpen(false)} to="/nba/schedule" className="hover:text-[#ffa023] w-full">
                                        <p>Schedule</p>
                                    </NavLink>
                                </li>

                                <li className="hover:cursor-pointer hover:text-[#ffa023] flex items-center gap-x-4 w-full">
                                    <StandingsIcon iconClass="size-6" />
                                    <NavLink onClick={() => setMobileMenuOpen(false)} to="/nba/standings" className="hover:text-[#ffa023] w-full">
                                        <p>Standings</p>
                                    </NavLink>
                                </li>

                                <li className="hover:cursor-pointer hover:text-[#ffa023] flex items-center gap-x-4 w-full">
                                    <TeamIcon iconClass="size-6" />
                                    <NavLink onClick={() => setMobileMenuOpen(false)} to="/nba/teams" className="hover:text-[#ffa023] w-full">
                                        <p>Teams</p>
                                    </NavLink>
                                </li>

                                <li className="hover:cursor-pointer hover:text-[#ffa023] flex items-center gap-x-4 w-full">
                                    <PlayerIcon iconClass="size-6" />
                                    <NavLink onClick={() => setMobileMenuOpen(false)} to="/nba/players?view=leaders" className="hover:text-[#ffa023] w-full">
                                        <p>Players</p>
                                    </NavLink>
                                </li>

                                <Dialog open={openSearch} onOpenChange={setOpenSearch}>
                                    <DialogTrigger asChild>
                                        <div className="flex items-center gap-x-4 hover:text-[#ffa023] hover:cursor-pointer w-full">
                                            <SearchIcon className="size-5" />
                                            <p className="">Search</p>
                                        </div>
                                    </DialogTrigger>
                                    <SearchPopup changeDialogSetting={changeSearchDialogStateHandler} />
                                </Dialog>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Navigation Bar */}
                    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black text-white z-50">
                        <div className="flex items-center justify-between px-6 py-6">
                            <button onClick={toggleMobileMenuHandler} className="text-white">
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                            <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-x-2 text-xl">
                                <BasketballIcon />
                                <p>LeagueTrendz</p>
                            </NavLink>
                        </div>
                    </nav>
                </>
            </div>
        </nav>
    )
}

export default DesktopNav