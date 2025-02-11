const apiKey = 9dffe1ac0986db82f5cdef02fc759d7e; // Replace with your API key

// Get user location
navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;
  fetchWeather(latitude, longitude);
}, (error) => {
  console.error('Error fetching location:', error);
  document.getElementById('location').textContent = 'Location access denied';
});

// Fetch weather data
function fetchWeather(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      updateUI(data);
    })
    .catch((error) => {
      console.error('Error fetching weather:', error);
    });
}

// Update UI with weather data
function updateUI(data) {
  document.getElementById('location').textContent = data.name;
  document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
  document.getElementById('weather-description').textContent = data.weather[0].description;
  document.getElementById('humidity').textContent = `${data.main.humidity}%`;
  document.getElementById('wind').textContent = `${data.wind.speed} m/s`;
  document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;

  // Update weather indicator bar
  const weatherIndicator = document.getElementById('weather-indicator');
  const temp = data.main.temp;
  if (temp < 10) {
    weatherIndicator.style.backgroundColor = 'blue';
    weatherIndicator.style.width = '30%';
  } else if (temp >= 10 && temp < 25) {
    weatherIndicator.style.backgroundColor = 'green';
    weatherIndicator.style.width = '60%';
  } else {
    weatherIndicator.style.backgroundColor = 'red';
    weatherIndicator.style.width = '90%';
  }
}
