var searchInput = document.getElementById("city")
var apiKey = "049bec33df8fdbc63240a744ec8c1088"
var lon; 
var lat;
var searchHistory = JSON.parse(localStorage.getItem("recentCities")) || []
var weatherContainerEl = document.querySelector("#weather-contrainer")


function fetchCoords(search) {
  var apiUrl1 = "http://api.openweathermap.org/geo/1.0/direct?q=" + search + "&appid=" + apiKey
  fetch(apiUrl1)
  .then(function (response) {
    return response.json()
  }).then(function(data) {
    document.getElementById("location").textContent="Location: " + data[0].name;
    console.log(data)
    lat = data[0].lat
    lon = data[0].lon
    getWeather()
    getMonday()
  })
}

function getWeather() {
  var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon="+ lon +  "&units=imperial&appid=" + apiKey
  fetch(apiUrl)
  .then(function(response) {
   return response.json()
  }).then(function(data) {
document.getElementById("date").textContent="Date: " + new Date(data.current.dt);
document.getElementById("temp").textContent="Temperature: " + data.current.temp + " °F";
document.getElementById("wind").textContent="Wind Speed: " + data.current.wind_speed + " MPH";
document.getElementById("humidity").textContent="Humidity: " + data.current.humidity + " %";
document.getElementById("UV-Index").textContent="UV-Index: " + data.current.uvi;

  })
}

function getMonday() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon="+ lon +  "&units=imperial&appid=" + apiKey
    fetch(apiUrl)
    .then(function(response) {
     return response.json()
    }).then(function(data) {
  document.getElementById("monday-date").textContent="Date: " + new Date(data.daily[1].dt);
  document.getElementById("monday-temp").textContent="Temperature: " + data.daily[1].temp.day + " °F";
  document.getElementById("monday-wind").textContent="Wind Speed: " + data.daily[1].wind_speed + " MPH";
  document.getElementById("monday-humidity").textContent="Humidity: " + data.daily[1].humidity + " %";
  
    })
  }

  function getTuesday() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon="+ lon +  "&units=imperial&appid=" + apiKey
    fetch(apiUrl)
    .then(function(response) {
     return response.json()
    }).then(function(data) {
    console.log(data)
  document.getElementById("tuesday-date").textContent="Date: " + new Date(data.daily[2].dt);
  document.getElementById("tuesday-temp").textContent="Temperature: " + data.daily[2].temp.day + " °F";
  document.getElementById("tuesday-wind").textContent="Wind Speed: " + data.daily[2].wind_speed + " MPH";
  document.getElementById("tuesay-humidity").textContent="Humidity: " + data.daily[2].humidity + " %";
  
    })
  }


document.getElementById("searchButton").addEventListener("click", function(event) {
    event.preventDefault();
    fetchCoords(searchInput.value)
});