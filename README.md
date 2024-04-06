# CPSC 304 Group 20


## Milestone 4 Updates

Please find the single SQL script to create all tables and data in the database in
`/sql-query-scripts/createAndPopulate.sql`. The PDF file is found at `/C304_Milestone_4.pdf`. Otherwise, no extra information.


-------------------------------------------------

Below is the requirements from Milestone 3,

## Project Summary

The domain of our proposed application is Pokémon management. This domain mainly pertains to main-series Pokémon game playthroughs. Specifically, when a user is playing a Pokémon game, they might desire to track the traits and details of their currently caught Pokémon, as well as search what other Pokémon are available to them based on their current in-game progress. In essence, our application aims to serve as a thorough Pokédex and encyclopedia for a user's playthrough.

## Timeline

Note: by "front-end GUI", we are referring to a webpage front-end built in React. The final project will be a web-based application.

- Week 1: March 11- March 17
    - Fill the database with game information (Matthew)
        - Pokemon Red 
        - Pokemon Emerald 
    - Draft all the queries we will support and write them out  (Valentino)
    - Get the backend to be able to accept dummy requests from frontend GUI (Aman)
      - Bootstrap React App
      - Bootstrap Django App
- Week 2: March 18- March 24 
  - Set up the interface between dummy Django app and DBMS (Matthew)
    - Get the backend to query the database 
  - Serve some query results on the frontend GUI (Valentino)
    - Very basic HTML page with a list of Pokemon
  - Start on front-end GUI development (Aman)
    - Create sign-in page 
    - Create a page for creating a new save file
- Week 3: March 25- March 31
  - Full-on front-end GUI development
    - Create a page for adding Pokemon and badges (Matthew)
    - Create a page for displaying current save files, badges, and Pokemon (Valentino)
    - A search page for finding what Pokemon/locations are currently available to the player (Aman)
  - Ensuring the new features interface properly with the backend/DBMS (All)
  - Create, Update, and Delete pop-up notifications (All)
  - Error handling for any user input components (All)
- Week 4: April 1- April 5
  - Ensure Data Sanitization (All)
  - Any needed touch-ups (All)
  - Finishing any remaining front-end GUI features (All)
  - Milestone 5 Preparations (All)

## Challenges / Things Left to do

- Support each other by consistent communication
  - Ensure that no one gets "stuck" and falls behind on their tasks
- We will use GitHub's project feature
  - We will track user stories this way and it will give us a better idea of what each of us are currently working on.
- Challenge could be supporting many Pokemon games
  - In order to mitigate this risk, we will start with supporting two games for our MVP.
- Presentation for Milestone 5 is something left to do
  - We have dedicated some time in Week 4, but it is hard to predict that far into the future
  - We will mitigate this risk by making incremental progress to the presentation as we complete new tasks and our project evolves
- Challenge could be the complexity of the front-end GUI
  - In order to still meet requirements, a contingency plan would be to remove the pages that show user information, and just retain the Pokemon/location querying features.