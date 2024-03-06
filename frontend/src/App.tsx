import React from 'react';
import { Route, Routes } from "react-router-dom"

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
    <div className="bg-black overflow-y-scroll">

      <div className='w-4/5 m-auto h-lvh flex'>
        <DesktopNav />

        {/* content div */}
        <div className='w-full h-fit bg-[#e2dfe2] p-4'>
          {routes}
        </div>
      </div>


    </div>
  );
}

export default App;
