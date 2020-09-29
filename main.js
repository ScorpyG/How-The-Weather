const api = {
    key: "98f5321b281efe78f62746b1d3edc4bb",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery (event) {
    if (event.keyCode == 13) {
        getResults(searchbox.value)
    }
}


function toggleUnits() {
    let checkBox = document.getElementById('unit-cb');
    if (checkBox.checked == true) {
        return result = "imperial";
    }
    else {
        return result = "metric";
    }
} 

function toggleSym() {
    let checkBox = document.getElementById('unit-cb');
    if (checkBox.checked == true) {
        return symbol = "°F";
    }
    else {
        return symbol = "°C";
    }
} 

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=${toggleUnits()}&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
    console.log(query)
    
}


function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${month} ${date}, ${year}`
}

function displayResults(weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}${toggleSym()}`;

    let weather_el=document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low')
    hilow.innerText = `${Math.round(weather.main.temp_min)}${toggleSym()} / ${Math.round(weather.main.temp_max)}${toggleSym()}`
}