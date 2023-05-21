import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { MapContext } from '../../providers/AllProviders.jsx';

const Weather = () => {
  const { latitude, longitude } = useContext(MapContext);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `/weather?lat=${latitude}&lon=${longitude}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (latitude && longitude) {
      fetchWeatherData();
    }
  }, [latitude, longitude]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {weatherData.list.map((item) => {
        return (
          <div key={item.dt}>
            <div>Time: {item.dt_txt}</div>
            <div>Temperature: {(item.main.temp - 273.15).toFixed(2)} °C</div>
            <div>Humidity: {item.main.humidity}%</div>
            <div>Weather: {item.weather[0].description}</div>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default Weather;
