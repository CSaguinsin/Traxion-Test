const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch data');
  }
  return response.json();
};

const createApiUrl = (endpoint, city) => {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.append('q', city);
  url.searchParams.append('appid', API_KEY);
  url.searchParams.append('units', 'metric');
  return url;
};

export const fetchCurrentWeather = async (city) => {
  try {
    const response = await fetch(createApiUrl('weather', city));
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const fetchForecast = async (city) => {
  try {
    const response = await fetch(createApiUrl('forecast', city));
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
}; 