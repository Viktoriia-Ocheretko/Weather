let now = new Date();

let datePlaceholder = document.querySelector("#data-now");
console.log(datePlaceholder);

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

datePlaceholder.innerHTML = `${hours}:${minutes} ${day}, ${month} ${date}, ${year}`;

//showing conditions
function displayWeatherCondition(response) {
  document.querySelector("#city-of-choise").innerHTML = response.data.name;
  document.querySelector("#temperature-data").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

//url
function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//city-input
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

//location
function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

//current location
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//listen to the city
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//listen to current location
let currentLocationButton = document.querySelector("#second-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Krakow");

//function search(event) {
//  event.preventDefault();
// let cityLine = document.querySelector("#cityOfChoise");
// let cityInput = document.querySelector("#city-input");
// cityLine.innerHTML = cityInput.value.bold();
//}

//let searchCityForm = document.querySelector("#search-form");
//searchCityForm.addEventListener("submit", search);

//function convertFah(event) {
// event.preventDefault();

//  let tempCel = document.querySelector("#temperature-data");
//  let currentTemp = 23;
// let tempFah = Math.round(currentTemp * 1.8 + 32);
//  tempCel.innerHTML = tempFah;
//}

//function convertCel(event) {
// event.preventDefault();

// let tempCel = document.querySelector("#temperature-data");
// let currentTemp = 23;
// tempCel.innerHTML = currentTemp;
//}

//let tempFah = document.querySelector("#fahrenheit");
//tempFah.addEventListener("click", convertFah);
//let tempCel = document.querySelector("#celsius");
//tempCel.addEventListener("click", convertCel);
