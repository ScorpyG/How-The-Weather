// API info & access key
const weather_URL = "https://api.openweathermap.org/data/2.5/";
var key = config.API_KEY;

// Fetching data function from the API
function getResults(query) {
    fetch(`${weather_URL}weather?q=${query}&units=${toggleUnits()}&APPID=${key}`)
        .then(weather => {
            // return and display the results
            return weather.json(); 
        }).then(displayResults);
    console.log(query)
}

// Event function for search request
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

// Initiate results data after search function is requested
function setQuery (event) {
    if (event.keyCode == 13) {
        getResults(searchbox.value)
    }
}

// Toggle between °C / °F measurements
function toggleUnits() {
    let checkBox = document.getElementById('unit-cb');
    if (checkBox.checked == true) {
        return result = "imperial";
    }
    else {
        return result = "metric";
    }
} 

// Toggle symbol between °C / °F
function toggleSym() {
    let checkBox = document.getElementById('unit-cb');
    if (checkBox.checked == true) {
        return symbol = "°F";
    }
    else {
        return symbol = "°C";
    }
} 

// Display the requested results in HTML page
function displayResults(weather) {
    // Requested data for searched location
    let city = document.querySelector('.location .city');
    try {
        city.innerText = `${weather.name}, ${weather.sys.country}`;
    } catch {
        alert ("Your city name is unavaliable. Please check your spelling!");
    }

    // Set current temp
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}${toggleSym()}`;
    
    // Set current weather
    let weather_el=document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    // Set high and low temp
    let hilow = document.querySelector('.hi-low')
    hilow.innerText = `${Math.round(weather.main.temp_min)}${toggleSym()} / ${Math.round(weather.main.temp_max)}${toggleSym()}`
}

// Building date function with months and days array
function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
    //return the date for the program
    return `${day}, ${month} ${date}, ${year}`
}

// Set local date/time
let now = new Date();
let date = document.querySelector('#date');
let time = document.querySelector('#clock');
time.innerText = startClock(now);
date.innerHTML = dateBuilder(now); 

// Create current time info
function startClock() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.querySelector('#clock').innerHTML = h + ":" + m + ":" + s;
    var t = setTimeout(startClock, 500);
}

// Zero at the end of each clock rotation
function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    };  // add zero in front of numbers < 10
    return i;
} 