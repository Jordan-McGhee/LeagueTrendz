import React from 'react';
import { Route, Routes } from "react-router-dom"

// context import
import { AuthContext } from './context/auth-context';

// hook import
import { useAuth } from "./Hooks/useAuth"

// NAV IMPORT
import DesktopNav from './Nav/DesktopNav';

// PAGE IMPORTS
import AllPlayersPage from "./pages/Data-Pages/AllPlayers/AllPlayersPage"
import AllTeamsPage from './pages/AllTeamsPage';
import HomePage from './pages/HomePage';
import PlayerPage from './pages/Data-Pages/Player/PlayerPage';
import GameBoxScorePage from './pages/Data-Pages/Game/GameBoxScorePage';
import SchedulePage from './pages/SchedulePage';
import SingleTeamPage from './pages/Data-Pages/Team/SingleTeamPage';
import ScoresPage from './pages/ScoresPage';
import StandingsPage from './pages/StandingsPage';
import UserPage from './pages/UserPage';

function App() {

  const { user_id, token, login, logout } = useAuth()

  let routes = (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* teams */}
      <Route path="/nba/teams" element={<AllTeamsPage />} />
      <Route path="/nba/teams/:abbreviation" element={<SingleTeamPage />} />

      {/* players */}
      <Route path='/nba/players' element={<AllPlayersPage />} />
      <Route path="/nba/players/id/:player_id/:player_name" element={<PlayerPage />} />

      {/* games */}
      {/* <Route path='/nba/games/:date' /> */}
      <Route path='/nba/games/game_id/:game_id' element={<GameBoxScorePage />} />

      {/* general pages */}
      <Route path='/nba/scores' element={<ScoresPage />} />
      <Route path="/nba/schedule" element={<SchedulePage />} />
      <Route path='/nba/standings' element={<StandingsPage />} />

      {/* user */}
      <Route path='/user' element={<UserPage />} />
    </Routes>
  )


  return (
    // APP CONTAINER
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        user_id: user_id,
        token: token,
        login: login,
        logout: logout
      }}>
      <div className="bg-[#e2dfe2] overflow-y-scroll">

        <div className=' max-w-screen-2xl h-lvh flex flex-col m-auto'>
          <DesktopNav />

          {/* content div */}
          <div className='m-auto w-4/5 h-fit min-h-full bg-[#e2dfe2] p-4'>
            {routes}
          </div>
        </div>


      </div>
    </AuthContext.Provider>
  );
}

export default App;
