import { Sparkles } from 'lucide-react'

function themeFromMoodWeather(sentimentLabel, weatherMain) {
  const label = (sentimentLabel || 'NEUTRAL').toUpperCase()
  const wm = (weatherMain || '').toLowerCase()
  if ((label === 'NEGATIVE' || label === 'SAD') && (wm.includes('rain') || wm.includes('drizzle') || wm.includes('cloud'))) {
    return {
      from: 'from-blue-100', to: 'to-indigo-200',
      ring: 'ring-indigo-300',
      text: 'text-indigo-900',
      accent: 'bg-indigo-600',
    }
  }
  if (label === 'POSITIVE' && (wm.includes('clear') || wm.includes('sun'))) {
    return {
      from: 'from-yellow-100', to: 'to-orange-200',
      ring: 'ring-yellow-300',
      text: 'text-amber-900',
      accent: 'bg-amber-600',
    }
  }
  if (wm.includes('snow')) {
    return { from: 'from-slate-100', to: 'to-sky-100', ring: 'ring-sky-300', text: 'text-slate-800', accent: 'bg-sky-600' }
  }
  return { from: 'from-violet-100', to: 'to-fuchsia-100', ring: 'ring-violet-300', text: 'text-slate-800', accent: 'bg-violet-600' }
}

export default function VibePanel({ sentiment, weather, note }) {
  const theme = themeFromMoodWeather(sentiment?.label, weather?.weather_main)
  return (
    <div className={`rounded-2xl p-5 bg-gradient-to-br ${theme.from} ${theme.to} ring-1 ${theme.ring} text-sm`}> 
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="text-current" size={18} />
        <div className="font-semibold">Daily Vibe</div>
      </div>
      <div className={`text-base ${theme.text}`}>
        {note || 'Share your mood and fetch weather to get a personalized vibe.'}
      </div>
      {sentiment && (
        <div className="mt-2 text-xs text-gray-600">
          Sentiment: {sentiment.label} ({sentiment.score})
        </div>
      )}
    </div>
  )
}
