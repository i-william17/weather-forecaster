interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
  dt: number; 
}

interface WeatherCardProps {
  data: WeatherData;
}

export default function WeatherCard({ data }: WeatherCardProps) {
  if (!data || !data.main || !data.weather) {
    return (
      <div className="p-4 bg-red-100 text-red-800 rounded">
        Weather data not available.
      </div>
    );
  }
  // Determine temperature color
  const tempColor = 
    data.main.temp > 30 ? 'text-red-600' :
    data.main.temp > 20 ? 'text-orange-500' :
    data.main.temp > 10 ? 'text-yellow-500' :
    data.main.temp > 0 ? 'text-blue-500' : 'text-indigo-300';

  // Weather icon animation based on conditions
  const getIconAnimation = () => {
    const weatherMain = data.weather[0].main.toLowerCase();
    if (weatherMain.includes('rain')) return 'animate-bounce';
    if (weatherMain.includes('snow')) return 'animate-pulse';
    if (weatherMain.includes('wind') || weatherMain.includes('cloud')) return 'animate-spin';
    if (weatherMain.includes('clear')) return 'animate-pulse';
    return '';
  };

  // Format timestamp to time string
  const lastUpdated = new Date(data.dt * 1000).toLocaleTimeString();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white bg-opacity-20 backdrop-blur-lg shadow-2xl p-6 text-center transform transition-all duration-500 hover:scale-[1.02]">
      {/* Floating background elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 rounded-full opacity-20"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-200 rounded-full opacity-20"></div>
      
      {/* Main content */}
      <h2 className="text-3xl font-bold text-gray-800 mb-1">{data.name}</h2>
      <p className="text-gray-600 capitalize mb-4">{data.weather[0].description}</p>
      
      <div className={`flex justify-center items-center my-4 ${getIconAnimation()}`}>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt={data.weather[0].description}
          className="w-32 h-32 drop-shadow-lg"
        />
      </div>
      
      <div className="flex justify-center items-baseline gap-2 mb-6">
        <span className={`text-6xl font-extrabold ${tempColor}`}>{Math.round(data.main.temp)}</span>
        <span className="text-3xl text-gray-600">°C</span>
      </div>
      
      {/* Feels like */}
      <div className="text-gray-600 mb-2">
        Feels like: <span className="font-medium">{Math.round(data.main.feels_like)}°C</span>
      </div>
      
      {/* Weather details grid */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-white bg-opacity-30 rounded-xl p-3 shadow-sm">
          <div className="flex justify-center items-center gap-2 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
            <span>Wind</span>
          </div>
          <div className="font-bold text-lg mt-1">{data.wind.speed} m/s</div>
        </div>
        
        <div className="bg-white bg-opacity-30 rounded-xl p-3 shadow-sm">
          <div className="flex justify-center items-center gap-2 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            <span>Humidity</span>
          </div>
          <div className="font-bold text-lg mt-1">{data.main.humidity}%</div>
        </div>
        
        <div className="bg-white bg-opacity-30 rounded-xl p-3 shadow-sm">
          <div className="flex justify-center items-center gap-2 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span>Pressure</span>
          </div>
          <div className="font-bold text-lg mt-1">{data.main.pressure} hPa</div>
        </div>
        
        <div className="bg-white bg-opacity-30 rounded-xl p-3 shadow-sm">
          <div className="flex justify-center items-center gap-2 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Updated</span>
          </div>
          <div className="font-bold text-lg mt-1">{lastUpdated}</div>
        </div>
      </div>
    </div>
  );
}