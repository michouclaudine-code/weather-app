let apiKey = "c819171fe0abdc14039af4ef5dda283b";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

function formatDate(timestamp) {
  // calculate the date
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return ` ${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  let temperatureElement = document.querySelector(".currentTemp");
  let temp = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${temp}`;

  let humidityElement = document.querySelector(".humidity");
  let humidity = Math.round(response.data.main.humidity);
  humidityElement.innerHTML = `Humidity: ${humidity}%`;

  let windElement = document.querySelector(".wind");
  let wind = Math.round(response.data.wind.speed);
  windElement.innerHTML = `Wind: ${wind} km/h`;

  let weatherElement = document.querySelector(".weatherDescription");
  let weather = response.data.weather[0].description;
  weatherElement.innerHTML = `${weather}`;

  let dateElement = document.querySelector(".date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

function search(event) {
  event.preventDefault();
  const searchInput = document.getElementById("input-search");
  const inputValue = searchInput.value;

  let cityElement = document.querySelector(".city h1");
  cityElement.innerHTML = `${inputValue}`;

  axios
    .get(`${apiUrl}${inputValue}&appid=${apiKey}&units=metric`)
    .then(showTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

// Change Celcius/Fahrenheit - currently not working will continue next week

function displayCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".currentTemp");
  let celcius = parseInt(document.querySelector(".currentTemp").value);
  temperatureElement.innerHTML = `${celcius}`;
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".currentTemp");
  let fahrenheit = (celcius * 9) / 5 + 32;
  temperatureElement.innerHTML = `${fahrenheit}`;
}

let celciusLink = document.querySelector("#celcius");
let fahrenheitLink = document.querySelector("#fahrenheit");

celciusLink.addEventListener("click", displayCelcius);
fahrenheitLink.addEventListener("click", displayFahrenheit);
