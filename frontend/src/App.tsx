import React, { useState, useCallback } from 'react';
import { Route, Routes } from "react-router-dom"

// context import
import { AuthContext } from './context/auth-context';

// NAV IMPORT
import DesktopNav from './Nav/DesktopNav';

// PAGE IMPORTS
import AllTeamsPage from './pages/AllTeamsPage';
import HomePage from './pages/HomePage';
import PlayerPage from './pages/Data-Pages/Player/PlayerPage';
import RosterPage from './pages/RosterPage';
import SchedulePage from './pages/SchedulePage';
import SingleTeamPage from './pages/Data-Pages/Team/SingleTeamPage';
import ScoresPage from './pages/ScoresPage';
import StandingsPage from './pages/StandingsPage';

function App() {

  const [token, setToken] = useState<undefined | string>(undefined)
  const [userID, setUserID] = useState<undefined | number>(undefined)

  const login = useCallback((user_id: number, token: string) => {
    setToken(token)
    setUserID(user_id)
  }, [])

  const logout = useCallback(() => {
    setToken(undefined)
    setUserID(undefined)
  }, [])

  let routes = (
    <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/teams" element={<AllTeamsPage />} />
      <Route path="/player" element={<PlayerPage />} />
      <Route path="/roster" element={<RosterPage />} />
      <Route path='/scores' element={<ScoresPage />} />
      <Route path="/schedule" element={<SchedulePage />} />
      <Route path="/singleTeam" element={<SingleTeamPage />} />
      <Route path='/standings' element={<StandingsPage />} />

    </Routes>
  )


  return (
    // APP CONTAINER
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        user_id: userID,
        token: token,
        login: login,
        logout: logout
      }}>
      <div className="bg-black overflow-y-scroll">

        <div className='w-4/5 m-auto h-lvh flex'>
          <DesktopNav />

          {/* content div */}
          <div className='w-full h-fit bg-[#e2dfe2] p-4'>
            {routes}
          </div>
        </div>


      </div>
    </AuthContext.Provider>
  );
}

export default App;
