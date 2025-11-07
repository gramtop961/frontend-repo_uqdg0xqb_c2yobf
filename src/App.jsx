import { useMemo, useState } from 'react'
import CitySearch from './components/CitySearch'
import MoodInput from './components/MoodInput'
import WeatherCard from './components/WeatherCard'
import VibePanel from './components/VibePanel'

const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL && import.meta.env.VITE_BACKEND_URL.trim())
  ? import.meta.env.VITE_BACKEND_URL.trim()
  : `${window.location.protocol}//${window.location.hostname}:8000`

function computeTheme(sentimentLabel, weatherMain) {
  const label = (sentimentLabel || 'NEUTRAL').toUpperCase()
  const wm = (weatherMain || '').toLowerCase()
  if ((label === 'NEGATIVE' || label === 'SAD') && (wm.includes('rain') || wm.includes('drizzle') || wm.includes('cloud'))) {
    return 'from-blue-200 via-indigo-200 to-blue-100'
  }
  if (label === 'POSITIVE' && (wm.includes('clear') || wm.includes('sun'))) {
    return 'from-yellow-200 via-amber-200 to-orange-100'
  }
  if (wm.includes('snow')) {
    return 'from-slate-100 via-sky-100 to-white'
  }
  return 'from-violet-100 via-fuchsia-100 to-rose-100'
}

export default function App() {
  const [weather, setWeather] = useState(null)
  const [sentiment, setSentiment] = useState(null)
  const [note, setNote] = useState('')
  const [loadingWeather, setLoadingWeather] = useState(false)
  const [loadingSentiment, setLoadingSentiment] = useState(false)
  const [error, setError] = useState('')

  const bg = useMemo(() => computeTheme(sentiment?.label, weather?.weather_main), [sentiment, weather])

  const fetchWeather = async (city) => {
    setError('')
    setLoadingWeather(true)
    setWeather(null)
    try {
      const resp = await fetch(`${BACKEND_URL}/api/weather?city=${encodeURIComponent(city)}`)
      if (!resp.ok) {
        const msg = await resp.text()
        throw new Error(msg || 'Weather fetch failed')
      }
      const data = await resp.json()
      setWeather(data)
      if (sentiment) await generateVibeNote(sentiment, data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoadingWeather(false)
    }
  }

  const analyzeMood = async (text) => {
    setError('')
    setLoadingSentiment(true)
    try {
      const resp = await fetch(`${BACKEND_URL}/api/sentiment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      if (!resp.ok) throw new Error('Sentiment failed')
      const data = await resp.json()
      setSentiment(data)
      if (weather) await generateVibeNote(data, weather)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoadingSentiment(false)
    }
  }

  const generateVibeNote = async (sent, w) => {
    try {
      const resp = await fetch(`${BACKEND_URL}/api/vibe-note`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mood: sent?.label || 'NEUTRAL',
          weather_main: w?.weather_main,
          weather_desc: w?.weather_desc
        })
      })
      if (!resp.ok) return
      const data = await resp.json()
      setNote(data.note)
    } catch {
      // ignore
    }
  }

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${bg} transition-colors` }>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">Vibe Weather</h1>
          <p className="text-slate-600 mt-2">Real-time weather that adapts to your mood.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <CitySearch onSearch={fetchWeather} defaultCity="San Francisco" />
          <MoodInput onAnalyze={analyzeMood} />
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-100 text-red-800">{error}</div>
        )}

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <WeatherCard data={weather} />
          <VibePanel sentiment={sentiment} weather={weather} note={note} />
        </div>

        <div className="mt-8 text-xs text-slate-600 text-center">
          Tip: add your OpenWeather API key to the server environment as OPENWEATHER_API_KEY, or supply it via ?api_key= on the backend endpoint.
        </div>
      </div>
    </div>
  )
}
