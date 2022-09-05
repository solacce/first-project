function info(time) {
  let now = new Date();

  let h2 = document.querySelector("h2");
  let h3 = document.querySelector("h3");

  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let year = now.getFullYear();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  h2.innerHTML = `${month} ${date}, ${year}`;
  h3.innerHTML = `${day}, ${hours}:${minutes}`;
}
info();

function showPosition(position) {
  let ApiKey = "073856d4c00a8e049aa1d750c90eefe5";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let ApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${ApiKey}`;

  axios.get(ApiUrl).then(showWeather);
}
function showWeather(response) {
  let temp = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  temp.innerHTML = `${temperature}`;
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${response.data.name}`;
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayWeatherCondition(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
  celsiusTemperature = response.data.main.temp;
}

function showCity(city) {
  let ApiKey = "073856d4c00a8e049aa1d750c90eefe5";
  let ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`;

  axios.get(ApiUrl).then(displayWeatherCondition);
}
showCity(Lagos);

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  showCity(city);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");

  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");

  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", handleSubmit);
