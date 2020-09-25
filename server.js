//server.js // weather journal app
//Empty JS array to act as endpoint for all routes
//array of objects
const projectData = []; //empty array to hold the received data


// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { request } = require('http');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website')); //'website': the folder that has the index.html and any additional pages.
//This line of code connects our server-side code (the code in the server.js file) to our client-side code


// Setup Server
//creating a local server
const port = 3003;

const server = app.listen(port, listening);
//const server = app.listen(port, ()=> {console.log(`running on localhost port: ${port}`)});
function listening() {
    console.log('Server Running');
    console.log(`running on localhost: ${port}`);
}


//Respond to POSR request which is made to the route '/addDataEntry'
app.post('/addDataEntry', addDataEntry);  //POST Route
function addDataEntry(request, response) {
    //projectData.push(request.body);
    console.log(request.body);
    let newEntry = {
        city: request.body.city,
        temperature: request.body.temperature,
        date: request.body.date,
        userResponse: request.body.userResponse
    };

    projectData.push(newEntry);
    response.send(projectData);
    console.log(projectData);
};

//Respond to GET request which is made to the route '/allProjectData'
app.get('/allProjectData', (request, response) => {
    response.send(projectData); // Respond with 'projectData' array
});