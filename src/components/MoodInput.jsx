import { useState } from 'react'
import { Smile } from 'lucide-react'

export default function MoodInput({ onAnalyze }) {
  const [mood, setMood] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    onAnalyze(mood)
  }
  return (
    <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
      <div className="flex-1 relative">
        <input
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="How are you feeling? Type words or emojis (😊 😢)"
          className="w-full rounded-xl bg-white/70 backdrop-blur border border-white/40 px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-pink-400"
        />
        <Smile className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
      </div>
      <button type="submit" className="rounded-xl px-4 py-3 bg-pink-600 text-white font-medium shadow-sm hover:bg-pink-700 transition">
        Analyze
      </button>
    </form>
  )
}
