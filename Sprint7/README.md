# Sprint 7 project

## Josh Kleckner

### Project Description:

The goal of this project was to write tests using GET, POST, PUT, and DELETE requests. The tests for each request type should be for their respective endpoint and cover: 1. response status code, 2. parsing the response and checking that the response body contains expected data. To find endpoints and expected responses, apiDOC should be used for the api documentation. Additional tools are covered below.

### Technology Used:

Git Bash - used to create a directory, clone the project repo, and work on the project by running the tests.
VS Code - used to write the tests, as well as file management for the repository
apiDOC - used to locate endpoints, requestBody, and expected responses (api documentation)
Postman - used to verify expected responses for different response types with each endpoint

### Running Tests:

1. Clone the repository: open your terminal and create a directory for the repo. 
    run the command git clone <repository-url>
2. Navigate to the project directory
    cd ./hm07-qa-us
3. Install jest
    npm install
4. Run each test file
    npx jest tests/deleteHandlers.test.js
   
    npx jest tests/getHandlers.test.js
   
    npx jest tests/postHandlers.test.js
   
    npx jest tests/putHandlers.test.js
   
    OR run all tests at once
    npm test
