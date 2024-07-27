import { useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY, RapidAPI_KEY_SIGNAL } from "./api";
import './App.css'

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY.value}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY.value}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        if (response[0].ok && response[1].ok) {
          const weatherResponse = await response[0].json();
          const forecastResponse = await response[1].json();

          setCurrentWeather({ city: searchData.label, ...weatherResponse });
          setForecast({ city: searchData.label, ...forecastResponse });
          setErrorMessage('');
        } else {
          setErrorMessage('Error: Unable to fetch data. Please check your API key.');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setErrorMessage('Error: Unable to fetch data. Please try again later.');
      });
  };

  function setRapidAPIHeaders(e) {
    RapidAPI_KEY_SIGNAL.value = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": e.target.value,
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    };
  }

  return (
    <div className="container">
      <div className="inputLabel">
        <label htmlFor="WEATHER_API_KEY">WEATHER_API_KEY:</label>
        <input type="text" id="WEATHER_API_KEY" placeholder="Enter the Weather Key" onChange={(e) => WEATHER_API_KEY.value = e.target.value} />
        <br/>
        
        <label htmlFor="RapidAPI-Key">RapidAPI-Key:</label>
        <input type="text" id="RapidAPI-Key" placeholder="Enter the Rapid API Key" onChange={setRapidAPIHeaders} />
      </div>
      <Search className="search" onSearchChange={handleOnSearchChange} setErrorMessage={setErrorMessage} />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;

