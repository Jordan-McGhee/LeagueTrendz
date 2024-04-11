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
    - Query parameters to go automatically to stats/schedule/roster view?
    
    !!ROSTER!!
    - change icons to not be ugly

- PLAYER PAGE
    - LOOP OVER TRANSACTIONS & PLAYER AWARDS
    - Styling for player status