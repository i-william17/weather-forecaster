export async function getWeatherByCity(city: string) {
    const res = await fetch(`http://127.0.0.1:8000/api/weather?city=${encodeURIComponent(city)}`);
    if (!res.ok) {
      throw new Error('Failed to fetch weather');
    }
    return res.json();
  }
  