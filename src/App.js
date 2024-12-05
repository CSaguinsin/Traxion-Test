import React from 'react';
import WeatherDashboard from './components/WeatherDashboard';
import './styles/Weather.css';

function App() {
  return (
    <div className="App">
      <div className="app-header">
        <h1>Weather Dashboard</h1>
        <p>Get real-time weather updates for any city worldwide</p>
      </div>
      <WeatherDashboard />
    </div>
  );
}

export default App;
