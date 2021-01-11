// API info & access key
const api = {
    key: "98f5321b281efe78f62746b1d3edc4bb",
    base: "https://api.openweathermap.org/data/2.5/"
}

// Event function for search request
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

// Initiate results data after search function is requested
function setQuery (event) {
    if (event.keyCode == 13) {
        getResults(searchbox.value)
    }
    else  {
        alert ("this doesn't work, check your shit!");
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

// Fetching data function from the API
function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=${toggleUnits()}&APPID=${api.key}`)
        .then(weather => {
            // return and display the results
            return weather.json(); 
        }).then(displayResults);
    console.log(query)
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

// Display the requested results in HTML page
function displayResults(weather) {
    // Requested data for searched location
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    // Set current date/time
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

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
