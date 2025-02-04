// scripts.js

/* ==============================
   1. Common Functions
   ============================== */

// Dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const rootElement = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    rootElement.setAttribute('data-color-mode', savedTheme);
}

darkModeToggle.addEventListener('click', () => {
    const isDarkMode = rootElement.getAttribute('data-color-mode') === 'dark';
    rootElement.setAttribute('data-color-mode', isDarkMode ? 'light' : 'dark');
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
});

// Update footer copyright year
document.getElementById('copyright-year').textContent = new Date().getFullYear();

/* ==============================
   2. Navigation Menu (Hamburger Toggle)
   ============================== */
const hamburgerBtn = document.getElementById('hamburger-btn');
const pageNav = document.querySelector('#page-nav ul');

hamburgerBtn.addEventListener('click', () => {
    pageNav.classList.toggle('active');
});

/* ==============================
   3. Business Directory (Directory Page)
   ============================== */
async function renderBusinessCards(jsonPath, containerSelector) {
    try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const businesses = await response.json();
        const container = document.querySelector(containerSelector);
        if (!container) {
            console.error('Container element not found');
            return;
        }

        container.classList.add('business-container');

        businesses.forEach((business) => {
            const card = document.createElement('div');
            card.classList.add('business-card', 'grid-view'); // Default view is grid

            if (business.membership === 3) card.classList.add('gold');
            else if (business.membership === 2) card.classList.add('silver');
            else card.classList.add('bronze');

            card.innerHTML = `
                <img src="${business.image}" alt="${business.name}">
                <h3>${business.name}</h3>
                <p>${business.address}</p>
                <p>${business.phone}</p>
                <a href="${business.website}" target="_blank">${business.website}</a>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching business cards:", error);
    }
}

if (document.querySelector('.business-container')) {
    renderBusinessCards('./data/members.json', '.business-container');
}

/* ==============================
   4. Home Page (Random Businesses)
   ============================== */
async function displayRandomBusinessCards() {
    try {
        const response = await fetch('./data/members.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const businesses = await response.json();
        const randomBusinesses = businesses.sort(() => 0.5 - Math.random()).slice(0, 3);
        const container = document.querySelector('.business-card-container');

        container.innerHTML = randomBusinesses
            .map((business) => `
                <div class="business-card grid-view">
                    <img src="${business.image}" alt="${business.name}">
                    <h3>${business.name}</h3>
                    <p>${business.address}</p>
                    <p>${business.phone}</p>
                    <a href="${business.website}" target="_blank">${business.website}</a>
                </div>
            `)
            .join('');
    } catch (error) {
        console.error("Error loading random business cards:", error);
    }
}

if (document.querySelector('.business-card-container')) {
    displayRandomBusinessCards();
}

/* ==============================
   5. Weather API (Home Page)
   ============================== */
async function fetchCurrentWeather() {
    try {
        const apiKey = 'e7e673091f093fac720d02e9cad521bd'; // Replace with actual API key
        const location = 'St. Gallen'; // Replace with actual city

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const weatherData = await response.json();
        const currentWeatherContainer = document.querySelector('#current-weather');

        currentWeatherContainer.innerHTML = `
            <h3>Current Weather in ${location}</h3>
            <p>Temperature: ${weatherData.main.temp} °C</p>
            <p>Condition: ${weatherData.weather[0].description}</p>
        `;
    } catch (error) {
        console.error("Error fetching current weather:", error);
    }
}

if (document.querySelector('#current-weather')) {
    fetchCurrentWeather();
}

/* ==============================
   6. Weather Forecast (Home Page)
   ============================== */
   async function fetchWeatherForecast() {
    try {
        const apiKey = 'e7e673091f093fac720d02e9cad521bd'; // Replace with your API key.
        const location = 'St. Gallen';  // Replace with your desired location.

        // Fetch the 5-day forecast data
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const forecastData = await response.json();

        // Extract temperatures for the next 3 days
        const dailyForecasts = {};
        const forecastList = forecastData.list;

        forecastList.forEach((forecast) => {
            const date = forecast.dt_txt.split(" ")[0]; // Get the YYYY-MM-DD part of the timestamp
            const time = forecast.dt_txt.split(" ")[1]; // Get the HH:MM:SS part

            // Select one forecast per day (preferring the one at 12:00 PM)
            if (!dailyForecasts[date] || time === "12:00:00") {
                dailyForecasts[date] = forecast.main.temp;
            }
        });

        // Convert the daily forecast object into an array and take the first 3 days
        const forecastEntries = Object.entries(dailyForecasts).slice(0, 3);

        // Select the forecast display container
        const forecastContainer = document.querySelector('#weather-forecast');

        // Generate the forecast HTML
        forecastContainer.innerHTML = `
            <h3>Weather Forecast for ${location}</h3>
            ${forecastEntries
                .map(([date, temp]) => `
                    <div class="forecast-item">
                        <p><strong>${new Date(date).toDateString()}</strong></p>
                        <p>Temp: ${temp} °C</p>
                    </div>
                `)
                .join('')}
        `;
    } catch (error) {
        console.error("Error fetching weather forecast:", error);
    }
}

// Call the function to display the 3-day forecast if the element exists on the page
if (document.querySelector('#weather-forecast')) {
    fetchWeatherForecast();
}

