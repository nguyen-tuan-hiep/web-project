import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { MapContext } from '../../providers/AllProviders.jsx';
import './Weather.css';

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

  if (!latitude || !longitude || !weatherData) {
    return <div></div>;
  }

  const extractDateandTime = (item) => {
    // convert time to date object
    const dateTime = new Date(item);

    // format date as dd/mm
    const date = `${dateTime.getDate()}/${dateTime.getMonth() + 1}`; // month is zero-based

    // format time as hh:mmTT
    let hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const ampm = hours >= 12 ? ' PM' : ' AM';
    hours %= 12;
    hours = hours ? hours : 12;
    const timeStr = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}${ampm}`;
    return [date, timeStr];
  };
  return (
    <>
      <h2 className="text-2xl mt-4">Weather</h2>
      <div className="flex gap-10 overflow-x-auto px-5">
        {weatherData.list.map((item) => {
          return (
            <div
              className="container flex items-center justify-center"
              key={item.dt}
            >
              <div className="card w-full sm:w-48 shadow-3xl">
                <div className="time text-center text-gray-400">
                  {extractDateandTime(item.dt_txt)[0]} -{' '}
                  {extractDateandTime(item.dt_txt)[1]}
                </div>
                <div className=" flex items-center justify-center">
                  <img
                    src={`/icons/${item.weather[0].icon}.png`}
                    alt="icon"
                    className="text-center weather-icon"
                  />
                </div>
                <div className="temperature text-center">
                  {(item.main.temp - 273.15).toFixed(1)}°C
                </div>
                <div className="humidity text-center">
                  <ThermostatIcon className="mb-1" /> {item.main.humidity}%
                </div>
                <div className="weather text-center text-primary">
                  {item.weather[0].description.toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase())}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Weather;
