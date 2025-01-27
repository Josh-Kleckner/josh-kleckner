# Sprint 8 Project

Josh Kleckner
Sprint 8 Project

Project Description: The goal of this project was to write automated tests to check the functionality of the UrbanRoutes app.

Technology Used:
    Git Bash
    VS Code
    WebDriverIO
    Mocha
    Node.js 

Techniques Used:
    Network Request Interceptor
    Page Object Model - used to capture and assign selectors
    Element visibility tests - i.e. .waitForDisplayed();
    Browser Pauses
    Element Interaction - clicking and adding text inputs
    Randomzied data generation - phone number creation
    Module Exports/Imports 


Running Tests:
    1. Clone the repository: open your terminal and create a directory for the repo
        run the command git clone <repository-url>
    2. Navigate to the project directory
        cd ./hm08-qa-us
    3. Using Node.js, install WebDriverIO & Mocha
        npm install webdriverio --save-dev
        npm install mocha --save-dev 
    4. Use a current server URL from TripleTen and replace as the baseURL in the wdio.config.js file
    5. Open the terminal and run the tests 
        npm run wdio
