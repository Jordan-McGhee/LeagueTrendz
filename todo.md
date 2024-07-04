<!-- BACKEND -->
- USER AUTH
    <!-- DONE - Verify email address is real or remove email check entirely -->
    - Add protected routes and pass token through to backend from frontend forms

- Teams
    - Add team colors to db
    - routes/controllers for single team page
        <!-- - get roster DONE -->
        - get stats

    - view for season standings
    <!-- - Add Coach field DONE -->

- SAVING PLAYERS
    - UPDATETEAM IDs IN DRAFT/TRANSACTION OBJECTS!!!!
    - get age correct

- VIEWS
    <!-- TEAM -->
    - STANDINGS (LEAGUE/DIVISION/CONFERENCE)
    - TEAM STATS

    <!-- PLAYER -->
    - PLAYER SEASON AVERAGES
    - PLAYER CAREER TOTALS/AVERAGES
    - PLAYER SPLITS



<!-- FRONTEND -->
- 404 not found page
- Error Modal

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
    - Add Link to View Game
    - Fix window size on each view
        - currently scrolls too far down without content being there
            - this is an issue with switch player component having its own height
    - Career Highlights:
        <!-- - case if player has no awards DONE -->
        <!-- - fix length issue in career highlights DONE -->

- TEAM PAGE
    - History:
        - make table of history static height and scrollable
        - make jersey numbers and names a grid to be even

- LONG PLAYER NAMES
    - Add styling for players like Shai Gilgeous-Alexander

- GAMEBOXSCORE PAGE
    <!-- - Add query to grab all details about team record from expanded standings view DONE -->
    - make sure date/time is always centered
    - !! BUG FOR game_id 2 - TROUBLESHOOT !!


- FINISHING APP
    - SCHEDULE PAGE
    - USER PAGE
        - FAVORITES (PLAYERS, TEAMS, GAMES)
        - DELETE ACCOUNT OPTION
    PLAYERS PAGE
        - TABLE OF ALL PLAYERS WITH PAGINATION