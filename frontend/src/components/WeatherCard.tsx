interface WeatherCardProps {
    data: {
      city: string;
      temperature: number;
      description: string;
      icon: string;
    };
  }
  
  export default function WeatherCard({ data }: WeatherCardProps) {
    return (
      <div className="card bg-base-100 shadow-xl p-4 text-center">
        <h2 className="text-2xl font-bold mb-2">{data.city}</h2>
        <img
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt={data.description}
          className="mx-auto"
        />
        <p className="text-xl">{data.temperature}°C</p>
        <p className="capitalize text-gray-500">{data.description}</p>
      </div>
    );
  }