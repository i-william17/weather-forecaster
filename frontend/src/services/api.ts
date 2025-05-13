export async function getWeatherByCity(city: string) {
  //fetches api
    const res = await fetch(`http://localhost:5000/api/weather?city=${encodeURIComponent(city)}`);

    if (!res.ok) {
      throw new Error('Failed to fetch weather');
    }
    return res.json();
  }
  