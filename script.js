const currrentCity = document.getElementsByClassName("current-city-container");
const searchInput = document.querySelector("#search-input");
const searchForm = document.querySelector("#search-form");
const apiKey = "21e64e7850abdbea34893ea72bdbaf94";
const currentWeatherContainer = document.querySelector("#current-city-content");
const forecastWeatherContainer = document.querySelector(
  "#forecast-city-content"
);
function searchCurrentWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  )
    .then(function (res) {
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
      cityTemp.textContent = `temperature:${data.main.temp}`;
      currentWeatherContainer.appendChild(cityTemp);
      const cityHumidity = document.createElement("p");
      cityHumidity.textContent = `humidity:${data.main.humidity}`;
      currentWeatherContainer.appendChild(cityHumidity);
      const cityWind = document.createElement("p");
      cityWind.textContent = `wind speed:${data.wind.speed}`;
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
      for (let i = 0; i < res.list.length; i += 8) {
        const data = res.list[i];
        const cityHeader = document.createElement("h1");
        cityHeader.textContent = city;
        const cityIcon = document.createElement("img");
        cityIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        cityHeader.appendChild(cityIcon);
        forecastWeatherContainer.appendChild(cityHeader);
        const cityTemp = document.createElement("p");
        cityTemp.textContent = `temperature:${data.main.temp}`;
        forecastWeatherContainer.appendChild(cityTemp);
        const cityHumidity = document.createElement("p");
        cityHumidity.textContent = `humidity:${data.main.humidity}`;
        forecastWeatherContainer.appendChild(cityHumidity);
        const cityWind = document.createElement("p");
        cityWind.textContent = `wind speed:${data.wind.speed}`;
        forecastWeatherContainer.appendChild(cityWind);
      }
    });
}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(searchInput.value);
  searchCurrentWeather(searchInput.value);
});
