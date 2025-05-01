'use client';

import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import { getWeatherByCity } from '../services/api';

export default function Home() {
  const [weather, setWeather] = useState<any | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (city: string) => {
    setError('');
    setIsLoading(true);
    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      setError('City not found or backend error.');
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamic background based on weather conditions
  const getBackgroundClass = () => {
    if (!weather) return 'bg-gradient-to-br from-blue-50 to-indigo-100';
    
    const mainWeather = weather.weather[0].main.toLowerCase();
    
    if (mainWeather.includes('rain')) return 'bg-gradient-to-br from-gray-400 to-blue-900';
    if (mainWeather.includes('cloud')) return 'bg-gradient-to-br from-gray-200 to-gray-400';
    if (mainWeather.includes('clear')) return 'bg-gradient-to-br from-blue-400 to-cyan-100';
    if (mainWeather.includes('snow')) return 'bg-gradient-to-br from-blue-100 to-white';
    
    return 'bg-gradient-to-br from-blue-50 to-indigo-100';
  };

  return (
    <div className={`min-h-screen py-12 px-4 transition-all duration-500 ${getBackgroundClass()}`}>
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Weather Forecaster</h1>
          <p className="text-gray-600">Search for a city to get current weather information</p>
        </div>
        
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow-md">
            <p>{error}</p>
          </div>
        )}
        
        {weather && (
          <div className="transform transition-all duration-300 hover:scale-105">
            <WeatherCard data={weather} />
          </div>
        )}
        
        {!weather && !isLoading && !error && (
          <div className="bg-white bg-opacity-80 rounded-xl p-8 text-center shadow-lg">
            <div className="text-gray-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No Weather Data</h3>
            <p className="text-gray-500">Enter a city name to see the current weather conditions</p>
          </div>
        )}
      </div>
      
      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} Weather App. All rights reserved.</p>
      </footer>
    </div>
  );
}