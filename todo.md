<!-- BACKEND -->
- USER AUTH
    <!-- DONE - Verify email address is real or remove email check entirely -->
    - Add protected routes and pass token through to backend from frontend forms


<!-- FRONTEND -->
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