interface HourEntry {
  day: string
  hours: string
}

const HOURS: HourEntry[] = [
  { day: 'Lun', hours: '9am–7pm' },
  { day: 'Mar–Jue', hours: '9am–8pm' },
  { day: 'Vie', hours: '9am–7pm' },
  { day: 'Sáb', hours: '10am–3pm' },
  { day: 'Dom', hours: 'Cerrado' },
]

export default function HoursBar() {
  return (
    <div className="hours-bar">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5">
          <span
            className="text-xs font-bold tracking-widest uppercase mr-2 hidden sm:inline"
            style={{ color: '#E91E8C' }}
          >
            🕐 Horarios
          </span>
          {HOURS.map((entry, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="text-xs font-semibold" style={{ color: '#D4AF37' }}>
                {entry.day}
              </span>
              <span
                className="text-xs"
                style={{ color: entry.hours === 'Cerrado' ? 'rgba(245,245,245,0.3)' : 'rgba(245,245,245,0.7)' }}
              >
                {entry.hours}
              </span>
              {i < HOURS.length - 1 && (
                <span className="text-xs ml-1.5 hidden sm:inline" style={{ color: 'rgba(212,175,55,0.3)' }}>
                  ·
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
