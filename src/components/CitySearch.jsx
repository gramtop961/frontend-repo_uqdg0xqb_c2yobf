import { useState } from 'react'
import { Search } from 'lucide-react'

export default function CitySearch({ onSearch, defaultCity = '' }) {
  const [city, setCity] = useState(defaultCity)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!city.trim()) return
    onSearch(city.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
      <div className="flex-1 relative">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city (e.g., London)"
          className="w-full rounded-xl bg-white/70 backdrop-blur border border-white/40 px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
      </div>
      <button
        type="submit"
        className="rounded-xl px-4 py-3 bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700 transition"
      >
        Get Weather
      </button>
    </form>
  )
}
