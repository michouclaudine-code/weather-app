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

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${weather}`);

  celciusTemperature = Math.round(response.data.main.temp);
  displayForecast();
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

let celciusTemperature = null;

let form = document.querySelector("form");
form.addEventListener("submit", search);

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector(".currentTemp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  celciuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
}

function displayCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".currentTemp");
  temperatureElement.innerHTML = celciusTemperature;

  fahrenheitlink.classList.remove("active");
  celciuslink.classList.add("active");
}

let fahrenheitlink = document.querySelector("#fahrenheit");
fahrenheitlink.addEventListener("click", displayFahrenheit);

let celciuslink = document.querySelector("#celcius");
celciuslink.addEventListener("click", displayCelcius);

function displayForecast() {
  let forecastElement = document.querySelector(".forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon", "Tue", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
            <strong>${day}</strong><br />
            <img
              class="weather"
              src="http://openweathermap.org/img/wn/04d@2x.png"
              width="40px"
            /><br />
            <div class="forecast-temp"><strong>7°</strong> / 1°</div>
            <br />
          </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
