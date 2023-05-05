let apiKey = "c819171fe0abdc14039af4ef5dda283b";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

function showTemperature(response) {
  let temperatureElement = document.querySelector(".temp h2");
  let temp = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${temp} °C/°F`;
}

function search(event) {
  event.preventDefault();
  const searchInput = document.getElementById("input-search");
  const inputValue = searchInput.value;

  cityElement = document.querySelector(".city h1");
  cityElement.innerHTML = `${inputValue}`;

  axios
    .get(`${apiUrl}${inputValue}&appid=${apiKey}&units=metric`)
    .then(showTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", search);
