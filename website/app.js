

/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=448fd7334b774e4834e7d84a4ac3be97';
const units = '&units=metric';
/*
Temperature is available in Fahrenheit, Celsius and Kelvin units.
For temperature in Fahrenheit use units=imperial
For temperature in Celsius use units=metric
Temperature in Kelvin is used by default, no need to use units parameter in API call
*/
//this variable will hold the exact time at which the weather data fetched
let current_time;
// Create a new date instance dynamically with JS
//this function returns Current Time Formatting //BEGIN
const getCurrentTime = () => {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sun", "Mon", "Tues", "Wedn", "Thur", "Fri", "Sat"];
    //https://stackoverflow.com/questions/14638018/current-time-formatting-with-javascript
    let d = new Date();
    let day = days[d.getDay()];
    let hr = d.getHours();
    let min = d.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    let ampm = "am";
    if (hr > 12) {
        hr -= 12;
        ampm = "pm";
    }
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear() % 100;
    let currentTime = /*day+ " " + */ hr + ":" + min + ampm + " " + date + "-" + month + "-" + year;
    return currentTime;
}
//Function ////////////////////////////////END

//function to fetch data from 'openweathermap' API
const getWeatherData = async (url) => {
    try {
        const res = await fetch(url);

        // Transform into JSON
        const data = await res.json();
        if (data.cod == "404") {
            console.log(data);
            throw 'City name is invalid!';
        }
        console.log(data);
        current_time = getCurrentTime();
        return data;



    } catch (error) {
        // handle the error here
        /*console.log("ERROR:", error);
        return error;*/

        //throw it to tje calling function
        throw error;

    }
}


//async function to make a POST request that has two arguments: 
//  a url to make the POST request to,  and data 
const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',   // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

//function to fetch data from our server and then update the UI
const updateUI = async () => {
    const request = await fetch('/allProjectData');
    try {
        const allData = await request.json();

        let cityDiv = document.getElementById('cityName').innerHTML;
        let tempDiv = document.getElementById('temp').innerHTML;
        let dateDive = document.getElementById('date').innerHTML;
        let contentDiv = document.getElementById('content').innerHTML;
        document.getElementById('cityName').innerHTML = "<span>" + allData[allData.length - 1].city + "</span>" + "<hr>" + cityDiv;
        document.getElementById('temp').innerHTML = "<span>" + allData[allData.length - 1].temperature + "</span>" + "<hr>" + tempDiv;
        document.getElementById('date').innerHTML = "<span>" + allData[allData.length - 1].date + "</span>" + "<hr>" + dateDive;
        document.getElementById('content').innerHTML = "<span>" + allData[allData.length - 1].userResponse + "</span>" + "<hr>" + contentDiv;


    } catch (error) {
        console.log("error", error);
    }
}

//function to check user input for city name
function validateCity(cityName) {
    if ((cityName == "") || (!cityName)) {
        return false; //return false if it's empty 
    }

    else {
        return true; //return true if it is not empty
    }

}
let actualURL; /*= 'http://api.openweathermap.org/data/2.5/weather?q=cairo&appid=448fd7334b774e4834e7d84a4ac3be97&units=metric';*/
let cityName;
let userFeel;
let errorSpan = document.getElementById("error");
//Add 'click' listener to 'generate' btn
document.querySelector('#generate').addEventListener('click', performAction);
//callback function to 'click' event of the button
function performAction(e) {
    cityName = document.querySelector("#city").value;
    if (!validateCity(cityName)) {
        //alert('The City Name must be filled out correctly');

        // Changing content and color of content 
        errorSpan.textContent = "City name cannot be empty, please enter it";
        errorSpan.style.color = "red";

        return;
    }
    else {
        errorSpan.textContent = ""
        userFeel = document.querySelector("#feelings").value;
        actualURL = baseURL + cityName + apiKey + units;
        if (!userFeel) //if userFeel is empty
            userFeel = "No Feelings Entered"; //fill it with this string
        //first, Call to Weather API
        getWeatherData(actualURL)
            .then(
                (data) => {
                    if (!data) { //if data is not truthy value (it's fasly value)
                        console.log('Data inside if');
                        console.log(data);
                        throw "ERROR!";
                    }
                    else
                        return data;
                }

            )
            .then(
                //then, post Data to our sever
                (data) => {
                    postData('/addDataEntry',
                        {
                            city: cityName,
                            temperature: data.main.temp,
                            date: current_time,
                            userResponse: userFeel
                        }
                    );
                }
            )
            .then(
                //and finally fetch all data from our sever and update UI
                () => updateUI()
            )
            .catch(
                (error) => {
                    console.log('ERROR:', error);
                    //display error message on UI
                    errorSpan.textContent = "Please enter a valid city name";
                    errorSpan.style.color = "red";
                }
            );
    }


}