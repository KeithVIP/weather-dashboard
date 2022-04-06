var searchInput = document.getElementById("city")
var apiKey = "049bec33df8fdbc63240a744ec8c1088"
var lon; 
var lat;
var searchHistory = JSON.parse(localStorage.getItem("recentCities")) || []
// push the city searched into searchHistory, then put Search History back in localstorage with localStorage.setItem("RecentCities", searchHistory)
function fetchCoords(search) {
  var apiUrl1 = "http://api.openweathermap.org/geo/1.0/direct?q=Dallas&appid=" + apiKey
  fetch(apiUrl1)
  .then(function (response) {
    return response.json()
  }).then(function(data) {
    lat = data[0].lat
    lon = data[0].lon
    getWeather()
  })
}
fetchCoords("Dallas")

function getWeather() {
  var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon="+ lon + "&exclude={part}&appid=" + apiKey
  fetch(apiUrl)
  .then(function(response) {
   return response.json()
  }).then(function(data) {
    console.log(data)
  })
}

