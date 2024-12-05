import React from 'react';

const CurrentWeather = ({ data }) => {
  if (!data) return null;

  const celsiusTemp = Math.round(data.main.temp);
  const fahrenheitTemp = Math.round((data.main.temp * 9/5) + 32);
  const feelsLike = Math.round(data.main.feels_like);

  return (
    <div className="current-weather">
      <h2 className="city-name">{data.name}, {data.sys.country}</h2>
      <div className="weather-icon">
        <img 
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt={data.weather[0].description}
        />
      </div>
      <div className="temperature">
        {celsiusTemp}°
      </div>
      <div className="fahrenheit-temp">
        {fahrenheitTemp}°F
      </div>
      <p className="weather-description">
        {data.weather[0].description.charAt(0).toUpperCase() + 
         data.weather[0].description.slice(1)}
      </p>
      <div className="weather-info">
        <div className="weather-info-item">
          <span>Wind Speed</span>
          <strong>{data.wind.speed} m/s</strong>
        </div>
        <div className="weather-info-item">
          <span>Humidity</span>
          <strong>{data.main.humidity}%</strong>
        </div>
        <div className="weather-info-item">
          <span>Feels Like</span>
          <strong>{feelsLike}°</strong>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather; 