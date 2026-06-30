import { useNavigate } from 'react-router-dom'
import HoursBar from '../components/HoursBar'
import { RoseWatermark } from '../components/RoseDecor'
import { MapPin, Share2 } from 'lucide-react'
import logo from '../assets/logo.png'

interface NavTile {
  id: string
  emoji?: string
  icon?: React.ReactNode
  label: string
  sublabel: string
  to?: string
  action?: string
  gradient: string
  border: string
}

function ColoredGoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mb-1">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}


const NAV_TILES: NavTile[] = [
  {
    id: 'menu',
    emoji: '🍽️',
    label: 'Digital Menu',
    sublabel: 'Explore our dishes',
    to: '/menu',
    gradient: 'linear-gradient(135deg, rgba(233,30,140,0.18) 0%, rgba(233,30,140,0.06) 100%)',
    border: 'rgba(233,30,140,0.35)',
  },
  {
    id: 'reviews',
    icon: <ColoredGoogleIcon />,
    label: 'Reviews',
    sublabel: 'What our customers say',
    to: '/reviews',
    gradient: 'linear-gradient(135deg, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.06) 100%)',
    border: 'rgba(212,175,55,0.35)',
  },
  {
    id: 'eventos',
    emoji: '📅',
    label: 'Events',
    sublabel: 'Special promotions',
    to: '/eventos',
    gradient: 'linear-gradient(135deg, rgba(233,30,140,0.18) 0%, rgba(212,175,55,0.06) 100%)',
    border: 'rgba(233,30,140,0.25)',
  },
  {
    id: 'contact',
    emoji: '📞',
    label: 'Contact Us',
    sublabel: 'Call, Text & Email',
    to: '/contact',
    gradient: 'linear-gradient(135deg, rgba(233,30,140,0.15) 0%, rgba(233,30,140,0.06) 100%)',
    border: 'rgba(233,30,140,0.25)',
  },
  {
    id: 'tiktok',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
      </svg>
    ),
    label: 'TikTok',
    sublabel: 'Watch our videos',
    to: 'https://www.tiktok.com/t/ZP8GjwTpd/',
    gradient: 'linear-gradient(135deg, rgba(0,242,234,0.12) 0%, rgba(254,44,85,0.08) 100%)',
    border: 'rgba(254,44,85,0.25)',
  },
  {
    id: 'instagram',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-light">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    ),
    label: 'Instagram',
    sublabel: 'Follow our updates',
    to: 'https://www.instagram.com/omg.cocina/',
    gradient: 'linear-gradient(135deg, rgba(225,48,108,0.15) 0%, rgba(193,53,132,0.08) 100%)',
    border: 'rgba(225,48,108,0.25)',
  },
]

interface HomeProps {
  onOpenChat: () => void
}

export default function Home({ onOpenChat }: HomeProps) {
  const navigate = useNavigate()

  const handleShare = async () => {
    const url = window.location.origin
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'OMG Cocina',
          text: 'Check out OMG Cocina - Fresh Mexican Flavors in Sacramento, CA!',
          url: url,
        })
      } catch (err) {
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

  const handleTileClick = (tile: NavTile) => {
    if (tile.action === 'chatbot') {
      onOpenChat()
    } else if (tile.to) {
      if (tile.to.startsWith('http')) {
        window.open(tile.to, '_blank', 'noopener,noreferrer')
      } else {
        navigate(tile.to)
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0A0A0A' }}>
      {/* ─── HERO ─── */}
      <section
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{
          minHeight: '52vh',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(233,30,140,0.14) 0%, #0A0A0A 70%)',
          padding: '3.5rem 1.5rem 2rem',
        }}
      >
        {/* Floating Share Button on Home page */}
        <button
          onClick={handleShare}
          className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all hover:scale-105 text-xs font-semibold"
          style={{
            color: '#D4AF37',
            background: 'rgba(212,175,55,0.12)',
            border: '1px solid rgba(212,175,55,0.3)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
          }}
          aria-label="Share portal"
        >
          <Share2 size={13} />
          Share
        </button>

        {/* Ambient glows */}
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />

        {/* Decorative rose watermarks */}
        <RoseWatermark className="absolute top-4 right-4 opacity-100 pointer-events-none select-none" />
        <RoseWatermark className="absolute bottom-0 left-4 opacity-100 pointer-events-none select-none rotate-180" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(233,30,140,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(233,30,140,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Animated spinning ring with transparent brand logo */}
        <div className="relative z-10 mb-4">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #E91E8C, #D4AF37, #E91E8C)',
              padding: '2px',
              borderRadius: '50%',
              animation: 'spin 8s linear infinite',
              width: '94px',
              height: '94px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.6,
              filter: 'blur(2px)',
            }}
          />
          <div
            className="relative flex items-center justify-center"
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              background: '#0A0A0A',
              border: '2px solid rgba(233,30,140,0.4)',
              boxShadow: '0 0 30px rgba(233,30,140,0.3)',
              animation: 'glowPulse 3s ease-in-out infinite',
              overflow: 'hidden',
            }}
          >
            <img src={logo} alt="OMG Cocina Logo" className="w-14 h-14 object-contain" />
          </div>
        </div>

        {/* Restaurant name */}
        <div className="relative z-10 text-center" style={{ animation: 'slideUp 0.7s ease-out' }}>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              background: 'rgba(233,30,140,0.12)',
              border: '1px solid rgba(233,30,140,0.3)',
              color: '#FF6BB5',
            }}
          >
            Sacramento, CA · Family Owned
          </div>

          <h1
            className="font-display leading-none mb-2"
            style={{
              fontSize: 'clamp(3rem, 11vw, 6.5rem)',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #FFFFFF 0%, #FF6BB5 40%, #E91E8C 70%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
            }}
          >
            OMG Cocina
          </h1>

          <p
            className="font-display italic"
            style={{
              fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
              color: '#D4AF37',
              letterSpacing: '0.05em',
            }}
          >
            Fresh Mexican Flavors
          </p>

          <a
            href="https://maps.google.com/?q=1500+7th+St+1F+Sacramento+CA+95814"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-xs transition-colors hover:text-white"
            style={{ color: 'rgba(245,245,245,0.4)' }}
          >
            <MapPin size={12} style={{ color: '#E91E8C' }} />
            1500 7th St #1F, Sacramento, CA 95814
          </a>
        </div>
      </section>

      {/* ─── HOURS BAR ─── */}
      <HoursBar />

      {/* ─── NAV GRID ─── */}
      <section className="flex-1 px-4 py-6 max-w-2xl mx-auto w-full">
        <p
          className="text-center text-xs font-semibold uppercase tracking-widest mb-5"
          style={{ color: 'rgba(212,175,55,0.6)' }}
        >
          What would you like to do?
        </p>

        <div
          className="grid grid-cols-2 gap-3"
          style={{ gridAutoRows: '1fr' }}
        >
          {NAV_TILES.map(tile => (
            <button
              key={tile.id}
              id={`nav-tile-${tile.id}`}
              onClick={() => handleTileClick(tile)}
              className="relative overflow-hidden rounded-2xl p-5 text-left transition-all duration-250 group"
              style={{
                background: tile.gradient,
                border: `1px solid ${tile.border}`,
                minHeight: '120px',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = `0 12px 32px rgba(0,0,0,0.5)`
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              {/* Subtle shine on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)',
                }}
              />

              <div className="relative z-10">
                {tile.icon ? (
                  <div className="mb-2 block leading-none">{tile.icon}</div>
                ) : (
                  <span className="text-3xl block mb-2 leading-none">{tile.emoji}</span>
                )}
                <p
                  className="font-display font-bold text-sm leading-tight mb-0.5"
                  style={{ color: '#F5F5F5' }}
                >
                  {tile.label}
                </p>
                <p
                  className="text-xs leading-tight"
                  style={{ color: 'rgba(245,245,245,0.4)' }}
                >
                  {tile.sublabel}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* CTA Buttons Block at the Bottom */}
        <div className="flex flex-col gap-3.5 mt-6 w-full">
          {/* Website button */}
          <a
            id="home-website-btn"
            href="https://omgcocina.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold w-full justify-center text-sm py-4 flex items-center gap-2"
            style={{ borderRadius: '50px' }}
          >
            🌐 Visit Website
          </a>

          {/* Feedback button */}
          <button
            id="home-feedback-btn"
            onClick={() => navigate('/feedback')}
            className="btn-gold w-full justify-center text-sm py-4 flex items-center gap-2"
            style={{ borderRadius: '50px', opacity: 0.85 }}
          >
            💬 Leave Feedback / Report Issues
          </button>

          {/* Uber Eats button */}
          <a
            id="home-ubereats-btn"
            href="https://www.ubereats.com/store/omg-cocina-mexican-restaurant/SR-uZ74BQ7qPa6TXCnftEQ"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pink w-full justify-center text-sm py-4 flex items-center gap-2"
            style={{ borderRadius: '50px' }}
          >
            <span className="font-bold tracking-wide">Order Online</span>
          </a>
        </div>
      </section>

      {/* Footer mini */}
      <div className="text-center py-4">
        <p className="text-xs" style={{ color: 'rgba(245,245,245,0.18)' }}>
          © 2025 OMG Cocina · Portal by{' '}
          <a
            href="https://conect-r.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'rgba(233,30,140,0.4)' }}
            className="hover:text-pink transition-colors"
          >
            Conect-R
          </a>
        </p>
      </div>
    </div>
  )
}
