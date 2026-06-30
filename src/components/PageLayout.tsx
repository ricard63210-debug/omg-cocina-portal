import { Link } from 'react-router-dom'
import { ArrowLeft, Share2 } from 'lucide-react'
import logo from '../assets/logo.png'

interface PageLayoutProps {
  title: string
  emoji: string
  children: React.ReactNode
}

export default function PageLayout({ title, emoji, children }: PageLayoutProps) {
  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: `OMG Cocina - ${title}`,
          text: `Check out OMG Cocina's ${title}!`,
          url: url,
        })
      } catch (err) {
        // Ignored or handled silently if cancelled
        console.log('Share dismissed:', err)
      }
    } else {
      try {
        await navigator.clipboard.writeText(url)
        alert('Link copied to clipboard!')
      } catch (err) {
        console.log('Copy failed:', err)
      }
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between gap-3 px-4 py-3.5"
        style={{
          background: 'rgba(10,10,10,0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(233,30,140,0.15)',
        }}
      >
        <div className="flex items-center gap-2">
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

          <button
            onClick={handleShare}
            className="flex items-center justify-center p-2 rounded-full transition-all"
            style={{
              color: '#D4AF37',
              background: 'rgba(212,175,55,0.08)',
              border: '1px solid rgba(212,175,55,0.2)',
            }}
            aria-label="Share page"
          >
            <Share2 size={14} />
          </button>
        </div>

        <div className="flex items-center gap-2">
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
