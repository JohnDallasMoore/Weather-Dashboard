var searchInput = document.querySelector("#search-input");
var searchButton = document.querySelector("#search-button");
var previousSearched = document.querySelector("#previous-searched");
var currentCity = document.querySelector("#current-city");
var fiveDayForecast = document.querySelector("#five-day-forecast");



// search button on-click functionality
searchButton.addEventListener('click', searchWeather)



// dynamically create previously searched buttons add and remove from local storage

// pull from input city in API to current city container

// pull from input city's 5-day forecast in API to 5-day forecast container

// fetch api
function searchWeather(){
   
    var searchedCity = searchInput.value.trim()
    var apiKey = "1f729b3e3654c16d2b6560bf21b678ad";
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchedCity + "&appid=" + apiKey

    fetch(apiUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
        })

}