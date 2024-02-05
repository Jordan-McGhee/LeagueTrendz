import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom"

// NAV IMPORT
import DesktopNav from './Nav/DesktopNav';

// PAGE IMPORTS
import AllTeamsPage from './pages/AllTeamsPage';
import HomePage from './pages/HomePage';
import PlayerPage from './pages/PlayerPage';
import RosterPage from './pages/RosterPage';
import SchedulePage from './pages/SchedulePage';
import SingleTeamPage from './pages/SingleTeamPage';

function App() {

  let routes = (
    <Routes>

      <Route path = "/" element = { <HomePage />} />
      <Route path = "/teams" element = { <AllTeamsPage />} />
      <Route path = "/player" element = { <PlayerPage />} />
      <Route path = "/roster" element = { <RosterPage />} />
      <Route path = "/schedule" element = { <SchedulePage />} />
      <Route path = "/singleTeam" element = { <SingleTeamPage />} />

    </Routes>
  )


  return (
    // APP CONTAINER
    <div className="border border-black bg-gray-500 overflow-hidden">

      <div className='w-3/4 m-auto h-lvh flex'>
        <DesktopNav />

        {/* content div */}
        <div className='w-full border-x-2 border-white h-full'>
          { routes }
        </div>
      </div>


    </div>
  );
}

export default App;
