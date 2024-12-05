import React, { useState, useCallback } from 'react';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import ForecastWeather from './ForecastWeather';
import { fetchCurrentWeather, fetchForecast } from '../utils/api';
import LoadingSpinner from './LoadingSpinner';

const WeatherDashboard = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastSearched, setLastSearched] = useState('');

  const handleSearch = useCallback(async (city) => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city)
      ]);

      if (weatherData.cod !== 200) {
        throw new Error(weatherData.message);
      }

      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setLastSearched(city);
      localStorage.setItem('lastSearchedCity', city);
    } catch (err) {
      setError(err.message === 'city not found' 
        ? 'City not found. Please check the spelling and try again.' 
        : 'Unable to fetch weather data. Please try again later.');
      setCurrentWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load last searched city on component mount
  React.useEffect(() => {
    const lastCity = localStorage.getItem('lastSearchedCity');
    if (lastCity) {
      handleSearch(lastCity);
    }
  }, [handleSearch]);

  return (
    <div className="weather-dashboard">
      <h1>Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} disabled={loading} />
      
      {error && (
        <div className="error-message" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <CurrentWeather data={currentWeather} />
          <ForecastWeather forecast={forecast} />
        </>
      )}
    </div>
  );
};

export default WeatherDashboard; 