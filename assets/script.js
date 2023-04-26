var searchInput = document.querySelector("#search-input");
var searchButton = document.querySelector("#search-button");
var previousSearched = document.querySelector("#previous-searched");
var currentCity = document.querySelector("#current-city");
var currentCityIcon = document.querySelector("#current-city-icon");
var currentCityTemp = document.querySelector("#current-city-temp");
var currentCityWind = document.querySelector("#current-city-wind");
var currentCityHumid = document.querySelector("#current-city-humidity");
var fiveDayForecast = document.querySelector("#five-day-forecast");
var forecastBoxContainer = document.querySelector("#forecast-box-container");
var searchedCityContainer = document.querySelector("#searched-city-container");
var searchBox = document.querySelector("#search-box");

loadPreviousSearchButtons();

searchedCityContainer.style.display = 'none';


// search button on-click functionality
searchButton.addEventListener("click", function () {
  var searchedCity = searchInput.value.trim();
  if (searchedCity == '') return;
  searchWeather(searchedCity);
  newPreviousSearchedButton(searchedCity);
  handleSearch();
  searchInput.value = "";
  searchBox.classList.replace('col-12', 'col-4')
  searchedCityContainer.style.display = '';
});

// keypress event for hitting enter rather than clicking button
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    var searchedCity = searchInput.value.trim();
    if (searchedCity == '') return;
    searchWeather(searchedCity);
    newPreviousSearchedButton(searchedCity);
    handleSearch();
    searchInput.value = "";
    searchBox.classList.replace('col-12', 'col-4')
    searchedCityContainer.style.display = '';
  }
});

// dynamically create previously searched buttons add and remove from local storage
function newPreviousSearchedButton(searchedCity) {
  var previousSearchButton = document.createElement("button");
  previousSearchButton.classList.add("w-100", "btn", "btn-outline-dark");
  previousSearchButton.textContent = searchedCity;
  previousSearched.appendChild(previousSearchButton);
  previousSearchButton.addEventListener("click", function () {
    searchWeather(this.textContent);
  });
}

// Local storage function
function handleSearch() {
  var searchedCity = searchInput.value.trim();
  var previousCities = localStorage.getItem("previousCities");
  if (previousCities) {
    previousCities = JSON.parse(previousCities);
  } else {
    previousCities = [];
  }
  previousCities.push(searchedCity);
  localStorage.setItem("previousCities", JSON.stringify(previousCities));
}

//Load previous search button
function loadPreviousSearchButtons() {
  var previousCities = localStorage.getItem("previousCities");
  if (previousCities) {
    previousCities = JSON.parse(previousCities);
    previousSearched.innerHTML = "";
    for (let i = 0; i < previousCities.length; i++) {
      newPreviousSearchedButton(previousCities[i]);
    }
    
  }
}

// fetch api
function searchWeather(city) {
  var apiKey = "1f729b3e3654c16d2b6560bf21b678ad";
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" +
    city +
    "&appid=" +
    apiKey;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      processWeatherData(response);
    });

  //Current city data
  function processWeatherData(response) {
    var cityName = response.city.name;
    var cityIcon = response.list[0].weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + cityIcon + ".png";
    var cityTemp = response.list[0].main.temp;
    var cityWind = response.list[0].wind.speed;
    var cityHumid = response.list[0].main.humidity;
    currentCity.textContent = cityName;
    currentCityIcon.setAttribute("src", iconUrl);
    currentCityTemp.textContent = Math.round(cityTemp) + "°F";
    currentCityWind.textContent = Math.round(cityWind) + " MPH";
    currentCityHumid.textContent = cityHumid + "%";

    // for loop with template literal for  5 day forecast
    var forecastBoxes = "";
    for (let i = 7; i <= 39; i += 8) {
      var newDate = new Date(response.list[i].dt * 1000).toLocaleDateString(
        "en-US"
      );
      forecastBoxes += `<div class="forecast-box">
            <h5>${newDate}</h5>
            <img src="http://openweathermap.org/img/w/${
              response.list[i].weather[0].icon
            }.png"/>
            <p>Temp: ${Math.round(response.list[i].main.temp)}°F</p>
            <p>Wind: ${Math.round(response.list[i].wind.speed)} MPH</p>
            <p>Humidity: ${response.list[i].main.humidity}%</p>
          </div>`;
    }
    forecastBoxContainer.innerHTML = forecastBoxes;
  }
}
