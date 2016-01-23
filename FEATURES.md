Reference pointers - Build Progressive web apps
-----------------------------------------------
1. Ampersand and React UI - need for framework which is not framework, rely on Browser and JavaScript features
2. https://www.youtube.com/watch?list=PLNYkxOF6rcICcHeQY02XLvoGL34rZFWZn&v=m2a9hlUFRhg
 - mobile web is growing with respect to apps
 - All great apps need to be on web especially mobile web, mobile first can not be native only
 - Don't assume a consistent network condition (service worker)
 - User responsivess RAIL(Recation 100ms, Animation-60fps, Idle < 50ms,Loading<1s)
 - Not now (ampproject.org, polymer, udacity web nanodegree)
 - Engagement (adehere to guidelines for homescreen add), Push screen notification
 
3. 


Release 0.1 (App Shell, http://learn.humanjavascript.com/react-ampersand/introduction)
-----------

# Basic App Shell
1. Have a colloqi app like UI - Sliding Menu (use React and https://github.com/callemall/material-ui)

#Login
1. Login if not already logged in and keep logged in
2. Provide sign-up option (only client side)
3. Provide forgot-password option (only client side)

#Profile page
1. Option to logout, change password
2. Show thumbnail and option to change


Release 0.2 (Service Worker, sw-precache & sw-toolbox, https://www.youtube.com/watch?v=jCKZDTtUA2A, )
-----------

#add offline support
1. observe http messages and store not sent messages locally 
2. update states
3. library to communicate with REST (like lb-services.js)
4. use service-workers approach
 
Release 0.3
-----------

#add RTM support
1.socket.io or euqivalent library 

