const apiKey = "7a2a3a0add709750dc4121d2e47d487b"; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherContainer = document.getElementById("weather-container");
const errorMessage = document.getElementById("error-message");
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const weatherDescription = document.getElementById("weather-description");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const toggleTempBtn = document.getElementById("toggle-temp");

let isCelsius = true;

// Function to fetch weather data
async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();

        if (data.cod === "404") {
            throw new Error("City not found.");
        }

        displayWeather(data);
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove("hidden");
        weatherContainer.classList.add("hidden");
    }
}

// Function to display weather data
function displayWeather(data) {
    errorMessage.classList.add("hidden");
    weatherContainer.classList.remove("hidden");

    cityName.textContent = data.name;
    weatherDescription.textContent = data.weather[0].description;
    temperature.textContent = `${data.main.temp.toFixed(1)}°C`;
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = (data.wind.speed * 3.6).toFixed(1); // Convert m/s to km/h
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    updateBackground(data.weather[0].main);
}

// Function to toggle temperature unit
toggleTempBtn.addEventListener("click", () => {
    let currentTemp = parseFloat(temperature.textContent);
    if (isCelsius) {
        temperature.textContent = `${(currentTemp * 9/5 + 32).toFixed(1)}°F`;
        toggleTempBtn.textContent = "°F";
    } else {
        temperature.textContent = `${((currentTemp - 32) * 5/9).toFixed(1)}°C`;
        toggleTempBtn.textContent = "°C";
    }
    isCelsius = !isCelsius;
});

// Function to update background based on weather
function updateBackground(weather) {
    let bgImage;
    switch (weather.toLowerCase()) {
        case "clear":
            bgImage = "url('https://wallpapercave.com/wp/wp6680336.jpg')";
            break;
        case "smoky/clouds":
            bgImage = "url('https://img.freepik.com/premium-photo/beautiful-sunset-cloudy-sky_181624-61471.jpg')";
            break;
        case "rain":
            bgImage = "url('https://wallpapercave.com/wp/wp3238708.jpg')";
            break;
        case "snow":
            bgImage = "url('https://wallpapercave.com/wp/EKmC6Pk.jpg')";
            break;
        case "mist":
            bgImage = "url('https://img.freepik.com/premium-photo/mountain-tropical-forest_9563-4201.jpg')"
        default:
            bgImage = "url('https://img.freepik.com/premium-photo/beautiful-sunset-cloudy-sky_181624-61471.jpg')";
    }
    document.body.style.backgroundImage = bgImage;
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

// Event listener for "Enter" key press
cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});
