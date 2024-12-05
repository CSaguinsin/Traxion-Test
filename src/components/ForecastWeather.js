import React from 'react';

const ForecastWeather = ({ forecast }) => {
  if (!forecast) return null;

  const dailyForecast = Object.values(forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
    if (!acc[date] && Object.keys(acc).length < 5) {
      acc[date] = item;
    }
    return acc;
  }, {}));

  return (
    <div className="forecast-weather">
      <h3>5-Day Forecast</h3>
      <div className="forecast-container">
        {dailyForecast.map((item) => (
          <div key={item.dt} className="forecast-item">
            <p className="forecast-date">
              {new Date(item.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </p>
            <img 
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
            />
            <p className="forecast-temp">{Math.round(item.main.temp)}°C</p>
            <p className="forecast-desc">{item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastWeather; 