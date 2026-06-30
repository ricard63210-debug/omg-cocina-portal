import { useNavigate } from 'react-router-dom'
import HoursBar from '../components/HoursBar'
import { RoseWatermark } from '../components/RoseDecor'
import { MapPin } from 'lucide-react'
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
    emoji: '⭐',
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
    id: 'feedback',
    emoji: '💬',
    label: 'Feedback',
    sublabel: 'We value your opinion',
    to: '/feedback',
    gradient: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(233,30,140,0.08) 100%)',
    border: 'rgba(212,175,55,0.25)',
  },
  {
    id: 'contact',
    emoji: '📞',
    label: 'Contact Us',
    sublabel: 'Call, Text, WhatsApp & Email',
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

        {/* Uber Eats quick link */}
        <a
          href="https://www.ubereats.com/store/omg-cocina-mexican-restaurant/SR-uZ74BQ7qPa6TXCnftEQ"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-pink w-full justify-center mt-5 text-sm"
          style={{ display: 'flex' }}
        >
          🛵 Order on Uber Eats
        </a>
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
