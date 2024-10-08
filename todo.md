<!-- BACKEND -->
- USER AUTH
    <!-- DONE - Verify email address is real or remove email check entirely -->
    - Add protected routes and pass token through to backend from frontend forms

- Teams
    <!-- - Add team colors to db DONE -->
    - routes/controllers for single team page
        <!-- - get roster DONE -->
        <!-- - get stats DONE -->

    - view for season standings
    <!-- - Add Coach field DONE -->

- SAVING PLAYERS
    <!-- - UPDATETEAM IDs IN DRAFT/TRANSACTION OBJECTS!!!! DONE -->
    - get age correct

- VIEWS
    <!-- TEAM -->
    <!-- - STANDINGS (LEAGUE/DIVISION/CONFERENCE) DONE  -->
    <!-- - TEAM STATS DONE -->

    <!-- PLAYER -->
    <!-- - PLAYER SEASON AVERAGES DONE -->
    <!-- - PLAYER CAREER TOTALS/AVERAGES DONE -->
    <!-- - PLAYER SPLITS DONE  -->



<!-- FRONTEND -->
- 404 not found page
<!-- - Error Modal DONE  -->

- USER AUTH
    <!-- - password & Confirm password: pass entered password into confirm password input and verify they match DONE -->
    - Add ability to show passwords entered
    <!-- - fix confirm_password DONE -->
    <!-- - Get login/signup working with backend DONE -->
    <!-- - Make dialog close with successful login DONE -->
    <!-- - Proper loading and error states on login/signup DONE -->
    - fetch on entered username and email to see if it's available already or not in database
    <!-- - Different pop up content depending on form state [ error, successful, default ] DONE -->
    <!-- - make sure user_id is passed to login when logging in DONE -->




- useAuth hook
    <!-- - finish setting up DONE -->
    <!-- - move context login/logout out of app.tsx DONE -->

- TOKEN
    - on requests that need token, add following header to the request
    Authorization: `Bearer ${auth.token}`

- USER PAGE
    - Add favorites to user page and watch list
    - update types accordingly 
    - Make User Page inaccessible without context
    - page for if no user found

- ALLTEAMS PAGE
    <!-- - Query parameters to go automatically to stats/schedule/roster view? DONE -->
    
    !!ROSTER!!
    <!-- - change icons to not be ugly DONE -->

- PLAYER PAGE
    <!-- - LOOP OVER TRANSACTIONS & PLAYER AWARDS DONE -->
    <!-- - Styling for player status DONE -->
    <!-- - Player Game Logs DONE -->
    - Fix last game styling
        - date and outcome should always be in direct center. Use grid?
    <!-- - Add Link to View Game DONE -->
    - Fix window size on each view
        - currently scrolls too far down without content being there
            - this is an issue with switch player component having its own height
    - Career Highlights:
        <!-- - case if player has no awards DONE -->
        <!-- - fix length issue in career highlights DONE -->

- TEAM PAGE
    - History:
        <!-- - make table of history static height and scrollable DONE -->
        <!-- - make jersey numbers and names a grid to be even DONE -->

- LONG PLAYER NAMES
    <!-- - Add styling for players like Shai Gilgeous-Alexander DONE -->

- GAMEBOXSCORE PAGE
    <!-- - Add query to grab all details about team record from expanded standings view DONE -->
    <!-- - make sure date/time is always centered DONE -->
    <!-- - !! BUG FOR game_id 2 - TROUBLESHOOT !! DONE -->

- FINISHING APP
    - USER PAGE
        - FAVORITES (PLAYERS, TEAMS, GAMES)
        - DELETE ACCOUNT OPTION


!!NEW DATA!!
<!-- - Add playoff data to database DONE -->
<!-- - NEED TO ADD PLAYOFF QUERYING FOR PLAYERS PAGE (ALL VIEWS) DONE -->
- UPDATE SEASON REWARDS AND NBA CHAMPION
- ALL PLAYERS PAGE
    - NOTES FOR RANKING PLAYER STATS: MORE THAN 50 GP
        - FG% RANKING: MORE THAN 200 MADE FG
        - 3P% RANKING: MORE THAN 70
        - FT% RANKING: MORE THAN 100 FTM 

- Team Schedule and Player Gamelog:
    <!-- - differentiate between playoff series and add series outcome? DONE -->

- DB VIEWS TO MAKE:
    - SINGLE TEAM PAGE:
        <!-- - team playoff totals and averages DONE -->
        <!-- - player playoff totals and averages DONE -->
        <!-- - playoff team stat leaders DONE -->
        <!-- - Playoff schedule (in team-controllers) DONE -->
    - ALL PLAYERS PAGE:
        <!-- - playoff game highs and points leaders DONE -->

<!-- BUG WITH WAIVED PLAYERS (SEARCH AUSTIN RIVERS) DONE -->
<!-- HAVE SEARCH CLOSE/RESET WHEN SELECTING AN OPTION DONE -->


BELLS & WHISTLES
- ROTATING HEADER ON HOME PAGE SHOWCASING 2024 CHAMPS, NBA TEAMS