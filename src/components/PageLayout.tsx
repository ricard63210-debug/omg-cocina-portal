import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import logo from '../assets/logo.png'

interface PageLayoutProps {
  title: string
  emoji: string
  children: React.ReactNode
}

export default function PageLayout({ title, emoji, children }: PageLayoutProps) {
  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 flex items-center gap-3 px-4 py-3.5"
        style={{
          background: 'rgba(10,10,10,0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(233,30,140,0.15)',
        }}
      >
        <Link
          to="/"
          className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full transition-all"
          style={{
            color: '#E91E8C',
            background: 'rgba(233,30,140,0.08)',
            border: '1px solid rgba(233,30,140,0.2)',
          }}
          aria-label="Back to home"
        >
          <ArrowLeft size={14} />
          Home
        </Link>

        <div className="flex items-center gap-2 ml-auto">
          <img src={logo} alt="Logo" className="w-5 h-5 object-contain" />
          <h1
            className="font-display font-bold text-base"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #E91E8C 60%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {emoji} {title}
          </h1>
        </div>
      </header>

      {/* Page content */}
      <main style={{ animation: 'fadeIn 0.3s ease-out' }}>
        {children}
      </main>
    </div>
  )
}
