<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class WeatherController extends Controller
{
    public function getWeather(Request $request)
    {
        $city = $request->query('city');
        $apiKey = env('OPENWEATHER_API_KEY');

        if (!$city) {
            return response()->json(['error' => 'City is required'], 400);
        }

        try {
            
            $cacheKey = 'weather_' . strtolower($city);
            $data = Cache::remember($cacheKey, now()->addMinutes(10), function () use ($city, $apiKey) {
                $response = Http::get('https://api.openweathermap.org/data/2.5/weather', [
                    'q' => $city,
                    'appid' => $apiKey,
                    'units' => 'metric'
                ]);

                if ($response->failed()) {
                    throw new \Exception('City not found or API error');
                }

                return $response->json();
            });

            return response()->json([
                'city' => $data['name'],
                'temperature' => $data['main']['temp'],
                'description' => $data['weather'][0]['description'],
                'icon' => $data['weather'][0]['icon'],
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
