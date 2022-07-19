let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];

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

function formatAMPM(date) {
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

let month = months[currentTime.getMonth()];
let dayNumber = currentTime.getDate();
let h2 = document.querySelector("#day-month");
h2.innerHTML = `${day}<br>${month} ${dayNumber}, ${formatAMPM()}`;

function showCity(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let chosenLoc = response.data.name;
  let windSpeed = Math.round(response.data.wind.speed);
  let humidityPercent = response.data.main.humidity;
  let h1 = document.querySelector("h1");
  h1.innerHTML = chosenLoc;
  let tempInLoc = document.querySelector("#temperature-number");
  tempInLoc.innerHTML = currentTemp;
  let fTemp = document.querySelector("#fahrenheit-link");
  fTemp.addEventListener("click", function () {
    let tempF = Math.round(currentTemp * 1.8 + 32);
    tempInLoc.innerHTML = tempF;
  });
  let cTemp = document.querySelector("#celsius-link");
  cTemp.addEventListener("click", function () {
    let tempC = Math.round(((currentTemp * 1.8 + 32 - 32) * 5) / 9);
    tempInLoc.innerHTML = tempC;
  });
  document.querySelector("#wind-id").innerHTML = windSpeed;
  document.querySelector("#humidity-id").innerHTML = humidityPercent;
}

function citySubmit(city) {
  let apiKey = "7a38fc66bb31c1d00033fd20539d4e29";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showCity);
}
function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  citySubmit(city);
}

let searchCity = document.querySelector("#search-field");
searchCity.addEventListener("submit", citySearch);

function getCurrentLoc(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "7a38fc66bb31c1d00033fd20539d4e29";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showCity);
}

function clickUseCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLoc);
}
let useCurrent = document.querySelector("#current-location-button");
useCurrent.addEventListener("click", clickUseCurrent);

citySubmit("Kyiv");
