var searchInput = document.getElementById("city")
var apiKey = "049bec33df8fdbc63240a744ec8c1088"
var lon; 
var lat;
var searchHistory = JSON.parse(localStorage.getItem("recentCities")) || []
var weatherContainerEl = document.querySelector("#weather-contrainer")

// push the city searched into searchHistory, then put Search History back in localstorage with localStorage.setItem("RecentCities", searchHistory)
function fetchCoords(search) {
  var apiUrl1 = "http://api.openweathermap.org/geo/1.0/direct?q=" + search + "&appid=" + apiKey
  fetch(apiUrl1)
  .then(function (response) {
    return response.json()
  }).then(function(data) {
    console.log(data)
    lat = data[0].lat
    lon = data[0].lon
    getWeather()
  })
}

function getWeather() {
  var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon="+ lon +  "&units=imperial&appid=" + apiKey
  fetch(apiUrl)
  .then(function(response) {
   return response.json()
  }).then(function(data) {
//document.getElementById("city").textContent="" + [0].name;
document.getElementById("date").textContent="Date: " + new Date(data.current.dt);
document.getElementById("temp").textContent="Temperature: " + data.current.temp + " °F";
document.getElementById("wind").textContent="Wind Speed: " + data.current.wind_speed + " MPH";
document.getElementById("humidity").textContent="Humidity: " + data.current.humidity + " %";
document.getElementById("UV-Index").textContent="UV-Index: " + data.current.uvi;

  })
}

document.getElementById("searchButton").addEventListener("click", function(event) {
    event.preventDefault();
    fetchCoords(searchInput.value)
});