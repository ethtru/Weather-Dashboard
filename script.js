const currrentCity = document.getElementsByClassName("current-city-container");
const searchInput = document.querySelector("#search-input");
const searchForm = document.querySelector("#search-form");
const apiKey = "21e64e7850abdbea34893ea72bdbaf94";
const currentWeatherContainer = document.querySelector("#current-city-content");
const forecastWeatherContainer = document.querySelector(
  "#forecast-city-content"
);
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const today = new Date();
const nextDay = new Date(today);
nextDay.setDate(today.getDate() + 1);

function searchCurrentWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  )
    .then(function (res) {
      console.log(res);
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      const cityHeader = document.createElement("h1");
      cityHeader.textContent = city;
      const cityIcon = document.createElement("img");
      cityIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      cityHeader.appendChild(cityIcon);
      currentWeatherContainer.appendChild(cityHeader);
      const cityTemp = document.createElement("p");
      cityTemp.textContent = `temperature: ${data.main.temp}`;
      currentWeatherContainer.appendChild(cityTemp);
      const cityHumidity = document.createElement("p");
      cityHumidity.textContent = `humidity: ${data.main.humidity}`;
      currentWeatherContainer.appendChild(cityHumidity);
      const cityWind = document.createElement("p");
      cityWind.textContent = `wind speed: ${data.wind.speed}`;
      currentWeatherContainer.appendChild(cityWind);
      getFiveDayForecast(city);
    });
}

function getFiveDayForecast(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      console.log(res);
      //in the for loop, create a div element. add a class (element.classList.add("mystyle"); would do this five tiems for each div

      for (let i = 0; i < res.list.length; i += 8) {
        const data = res.list[i];
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day-forecast");
        const cityHeader = document.createElement("h1");
        cityHeader.textContent = city;
        const timestamp = data.dt * 1000;
        const date = new Date(timestamp);
        const dayIndex = (date.getDay() + 6) % 7;
        const displayDate = i === 0 ? nextDay : date;
        const dayOfWeek = document.createElement("h4");
        dayOfWeek.textContent = dayNames[displayDate.getDay()];
        dayDiv.appendChild(dayOfWeek);
        const cityIcon = document.createElement("img");
        cityIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        cityHeader.appendChild(cityIcon);
        dayDiv.appendChild(cityHeader);
        const cityTemp = document.createElement("p");
        cityTemp.textContent = `temperature: ${data.main.temp}`;
        dayDiv.appendChild(cityTemp);
        const cityHumidity = document.createElement("p");
        cityHumidity.textContent = `humidity: ${data.main.humidity}`;
        dayDiv.appendChild(cityHumidity);
        const cityWind = document.createElement("p");
        cityWind.textContent = `wind speed: ${data.wind.speed}`;
        dayDiv.appendChild(cityWind);
        forecastWeatherContainer.appendChild(dayDiv);
      }
    });
}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(searchInput.value);
  searchCurrentWeather(searchInput.value);
});
