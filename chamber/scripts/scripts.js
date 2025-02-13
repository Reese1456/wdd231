// scripts.js

/* ==============================
   1. Common Functions
   ============================== */

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
            card.classList.add('business-card', 'grid-view');

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
        const apiKey = 'e7e673091f093fac720d02e9cad521bd'; 
        const location = 'St. Gallen'; 

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
        const apiKey = 'e7e673091f093fac720d02e9cad521bd'; 
        const location = 'St. Gallen'; 

        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const forecastData = await response.json();

        const dailyForecasts = {};
        const forecastList = forecastData.list;

        forecastList.forEach((forecast) => {
            const date = forecast.dt_txt.split(" ")[0]; 
            const time = forecast.dt_txt.split(" ")[1]; 

            if (!dailyForecasts[date] || time === "12:00:00") {
                dailyForecasts[date] = forecast.main.temp;
            }
        });

        const forecastEntries = Object.entries(dailyForecasts).slice(0, 3);

        const forecastContainer = document.querySelector('#weather-forecast');

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

if (document.querySelector('#weather-forecast')) {
    fetchWeatherForecast();
}

/* ==============================
   Join Page
   ============================== */

   document.addEventListener('DOMContentLoaded', function() {
    // Open modal when "More Info" is clicked
    const modalLinks = document.querySelectorAll('.open-modal');
    modalLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        // Get the modal id from the parent card's data attribute
        const modalId = this.parentElement.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.style.display = 'flex'; // Show modal using Flexbox centering
        }
      });
    });
  
    // Close modal when close button (×) is clicked
    const closeButtons = document.querySelectorAll('.modal .close');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        this.closest('.modal').style.display = 'none';
      });
    });
  
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(e) {
      if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
      }
    });
  });

  // Time stamp
  document.addEventListener('DOMContentLoaded', function() {
    // Find the hidden timestamp field by its ID
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
      // Set its value to the current date and time in ISO format (YYYY-MM-DDTHH:MM:SS.sssZ)
      timestampField.value = new Date().toISOString();
    }
  });


  