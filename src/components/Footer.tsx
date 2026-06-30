import { MapPin, Phone, ExternalLink } from 'lucide-react'
import logo from '../assets/logo.png'

export default function Footer() {
  return (
    <footer
      id="contact"
      style={{
        background: '#050505',
        borderTop: '1px solid rgba(233,30,140,0.15)',
      }}
    >
      {/* Main footer content */}
      <div className="max-w-5xl mx-auto px-6 py-14">
        {/* Brand */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img src={logo} alt="Logo" className="w-7 h-7 object-contain" />
            <h2
              className="font-display font-bold"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #E91E8C 60%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              OMG Cocina
            </h2>
            <img src={logo} alt="Logo" className="w-7 h-7 object-contain" />
          </div>
          <p className="text-sm font-display italic" style={{ color: '#D4AF37' }}>
            Fresh Mexican Flavors · Sacramento, CA
          </p>
        </div>

        {/* Grid: Contact & Social */}
        <div className="grid gap-8 md:grid-cols-3 mb-10 text-center">
          {/* Contact info */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#E91E8C' }}>
              Contact Us
            </h3>
            <div className="space-y-3">
              <a
                id="footer-phone"
                href="tel:+19165537072"
                className="flex items-center justify-center gap-2 text-sm transition-colors hover:text-white"
                style={{ color: 'rgba(245,245,245,0.6)' }}
              >
                <Phone size={14} style={{ color: '#E91E8C' }} />
                (916) 553-7072
              </a>
              <a
                id="footer-whatsapp"
                href="https://wa.me/19165537072"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-sm transition-colors hover:text-white"
                style={{ color: 'rgba(245,245,245,0.6)' }}
              >
                <span style={{ color: '#25D366', fontSize: '1rem' }}>📱</span>
                WhatsApp
              </a>
              <a
                id="footer-maps"
                href="https://maps.google.com/?q=1500+7th+St+1F+Sacramento+CA+95814"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start justify-center gap-2 text-sm transition-colors hover:text-white"
                style={{ color: 'rgba(245,245,245,0.6)' }}
              >
                <MapPin size={14} style={{ color: '#E91E8C', marginTop: '2px', flexShrink: 0 }} />
                <span>1500 7th St #1F<br />Sacramento, CA 95814</span>
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#E91E8C' }}>
              Hours
            </h3>
            <div className="space-y-1.5 text-sm">
              {[
                ['Monday', '9am–7pm'],
                ['Tue–Thu', '9am–8pm'],
                ['Friday', '9am–7pm'],
                ['Saturday', '10am–3pm'],
                ['Sunday', 'Closed'],
              ].map(([day, time]) => (
                <div key={day} className="flex justify-between gap-4 mx-auto" style={{ maxWidth: '160px' }}>
                  <span style={{ color: 'rgba(245,245,245,0.5)' }}>{day}</span>
                  <span
                    className="font-medium"
                    style={{ color: time === 'Closed' ? 'rgba(245,245,245,0.2)' : '#D4AF37' }}
                  >
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#E91E8C' }}>
              Follow Us
            </h3>
            <div className="flex flex-col items-center gap-3">
              <a
                id="footer-instagram"
                href="https://www.instagram.com/omg.cocina/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-full transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(233,30,140,0.15), rgba(212,175,55,0.1))',
                  border: '1px solid rgba(233,30,140,0.3)',
                  color: '#FF6BB5',
                }}
              >
                {/* Instagram SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                @omg.cocina
              </a>
              <div
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px dashed rgba(255,255,255,0.1)',
                  color: 'rgba(245,245,245,0.3)',
                }}
              >
                {/* Facebook SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                Facebook — Coming Soon
              </div>
            </div>
          </div>
        </div>

        {/* Uber Eats CTA */}
        <div className="text-center mb-10">
          <a
            id="footer-ubereats"
            href="https://www.ubereats.com/store/omg-cocina-mexican-restaurant/SR-uZ74BQ7qPa6TXCnftEQ"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pink text-base px-10 py-4 inline-flex items-center gap-2"
          >
            <ExternalLink size={18} />
            Order on Uber Eats 🛵
          </a>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-6"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(233,30,140,0.3), transparent)' }}
        />

        {/* Copyright */}
        <p className="text-center text-xs" style={{ color: 'rgba(245,245,245,0.2)' }}>
          © 2025 OMG Cocina · Portal by{' '}
          <a
            href="https://conect-r.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
            style={{ color: 'rgba(233,30,140,0.5)' }}
          >
            Conect-R
          </a>
        </p>
      </div>
    </footer>
  )
}
