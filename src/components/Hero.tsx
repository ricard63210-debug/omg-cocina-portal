import { MapPin, ExternalLink } from 'lucide-react'
import { RoseWatermark } from './RoseDecor'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(233,30,140,0.12) 0%, #0A0A0A 70%)' }}
    >
      {/* Ambient glows */}
      <div className="hero-glow-1" />
      <div className="hero-glow-2" />

      {/* Decorative rose watermarks */}
      <RoseWatermark className="absolute top-10 right-10 opacity-100 pointer-events-none select-none" />
      <RoseWatermark className="absolute bottom-10 left-10 opacity-100 pointer-events-none select-none rotate-180" />

      {/* Grid overlay */}
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

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ animation: 'slideUp 0.8s ease-out' }}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
          style={{ background: 'rgba(233,30,140,0.12)', border: '1px solid rgba(233,30,140,0.3)', color: '#FF6BB5' }}>
          🌹 Sacramento, CA · Family Owned
        </div>

        {/* Restaurant Name */}
        <h1
          className="font-display mb-3 leading-none"
          style={{
            fontSize: 'clamp(3.5rem, 12vw, 8rem)',
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

        {/* Tagline */}
        <p
          className="font-display italic mb-8"
          style={{
            fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
            color: '#D4AF37',
            letterSpacing: '0.05em',
          }}
        >
          Fresh Mexican Flavors | Sacramento, CA
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <a href="#menu" className="btn-pink text-base px-8 py-3.5">
            🍽️ Ver Menú
          </a>
          <a
            href="https://www.ubereats.com/store/omg-cocina-mexican-restaurant/SR-uZ74BQ7qPa6TXCnftEQ"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold text-base px-8 py-3.5"
          >
            <ExternalLink size={16} />
            Ordenar en Uber Eats
          </a>
        </div>

        {/* Address */}
        <div className="flex items-center justify-center gap-2 text-sm"
          style={{ color: 'rgba(245,245,245,0.5)' }}>
          <MapPin size={14} style={{ color: '#E91E8C' }} />
          <a
            href="https://maps.google.com/?q=1500+7th+St+1F+Sacramento+CA+95814"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            1500 7th St #1F, Sacramento, CA 95814
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ animation: 'float 2s ease-in-out infinite' }}>
        <div className="w-px h-12 rounded-full"
          style={{ background: 'linear-gradient(to bottom, rgba(233,30,140,0.6), transparent)' }} />
        <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(233,30,140,0.5)' }}>
          Scroll
        </span>
      </div>
    </section>
  )
}
