import { Sun, CloudRain, Cloud, Snowflake, Wind } from 'lucide-react'

function WeatherIcon({ code, main }) {
  const m = (main || '').toLowerCase()
  if (m.includes('rain') || m.includes('drizzle')) return <CloudRain className="text-blue-500" size={28} />
  if (m.includes('snow')) return <Snowflake className="text-sky-400" size={28} />
  if (m.includes('cloud')) return <Cloud className="text-gray-500" size={28} />
  return <Sun className="text-yellow-500" size={28} />
}

export default function WeatherCard({ data }) {
  if (!data) return null
  return (
    <div className="rounded-2xl p-5 bg-white/70 backdrop-blur border border-white/40 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold">{data.city}, {data.country}</div>
          <div className="text-sm text-gray-500 capitalize">{data.weather_desc}</div>
        </div>
        <WeatherIcon code={data.icon} main={data.weather_main} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-4xl font-bold">{Math.round(data.temp)}°</div>
          <div className="text-xs text-gray-500">Feels {Math.round(data.feels_like)}°</div>
        </div>
        <div>
          <div className="text-lg font-semibold">{data.humidity}%</div>
          <div className="text-xs text-gray-500">Humidity</div>
        </div>
        <div>
          <div className="text-lg font-semibold">{Math.round(data.wind)} m/s</div>
          <div className="text-xs text-gray-500">Wind</div>
        </div>
      </div>
    </div>
  )
}
