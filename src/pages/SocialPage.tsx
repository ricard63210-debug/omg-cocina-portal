import PageLayout from '../components/PageLayout'
import { Phone, MapPin, ExternalLink } from 'lucide-react'

interface SocialLink {
  id: string
  icon: React.ReactNode
  label: string
  sublabel: string
  href: string
  target?: string
  gradient: string
  border: string
  textColor: string
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'instagram',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    ),
    label: 'Instagram',
    sublabel: '@omg.cocina',
    href: 'https://www.instagram.com/omg.cocina/',
    target: '_blank',
    gradient: 'linear-gradient(135deg, rgba(225,48,108,0.18) 0%, rgba(193,53,132,0.1) 100%)',
    border: 'rgba(225,48,108,0.35)',
    textColor: '#FF6BB5',
  },
  {
    id: 'ubereats',
    icon: <span style={{ fontSize: '1.75rem' }}>🛵</span>,
    label: 'Uber Eats',
    sublabel: 'Ordenar en línea',
    href: 'https://www.ubereats.com/store/omg-cocina-mexican-restaurant/SR-uZ74BQ7qPa6TXCnftEQ',
    target: '_blank',
    gradient: 'linear-gradient(135deg, rgba(6,180,89,0.15) 0%, rgba(6,180,89,0.06) 100%)',
    border: 'rgba(6,180,89,0.3)',
    textColor: '#4ADE80',
  },
  {
    id: 'whatsapp',
    icon: <span style={{ fontSize: '1.75rem' }}>💬</span>,
    label: 'WhatsApp',
    sublabel: 'Enviar mensaje',
    href: 'https://wa.me/19165537072',
    target: '_blank',
    gradient: 'linear-gradient(135deg, rgba(37,211,102,0.15) 0%, rgba(37,211,102,0.06) 100%)',
    border: 'rgba(37,211,102,0.3)',
    textColor: '#25D366',
  },
  {
    id: 'phone',
    icon: <Phone size={28} />,
    label: 'Llamar',
    sublabel: '(916) 553-7072',
    href: 'tel:+19165537072',
    gradient: 'linear-gradient(135deg, rgba(233,30,140,0.15) 0%, rgba(233,30,140,0.06) 100%)',
    border: 'rgba(233,30,140,0.3)',
    textColor: '#E91E8C',
  },
  {
    id: 'maps',
    icon: <MapPin size={28} />,
    label: 'Google Maps',
    sublabel: '1500 7th St #1F, Sacramento',
    href: 'https://maps.google.com/?q=1500+7th+St+1F+Sacramento+CA+95814',
    target: '_blank',
    gradient: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.06) 100%)',
    border: 'rgba(212,175,55,0.3)',
    textColor: '#D4AF37',
  },
  {
    id: 'facebook',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
    label: 'Facebook',
    sublabel: 'Próximamente',
    href: '#',
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)',
    border: 'rgba(255,255,255,0.08)',
    textColor: 'rgba(245,245,245,0.3)',
  },
]

export default function SocialPage() {
  return (
    <PageLayout title="Redes Sociales" emoji="📱">
      <div className="section-wrapper" style={{ maxWidth: '600px' }}>
        {/* Info card */}
        <div
          className="rounded-2xl p-5 mb-8 text-center"
          style={{
            background: 'rgba(233,30,140,0.06)',
            border: '1px solid rgba(233,30,140,0.15)',
          }}
        >
          <p className="font-display text-lg font-semibold mb-1" style={{ color: '#F5F5F5' }}>
            OMG Cocina
          </p>
          <p className="text-sm mb-1" style={{ color: 'rgba(245,245,245,0.5)' }}>
            1500 7th St #1F, Sacramento, CA 95814
          </p>
          <p className="text-sm font-semibold" style={{ color: '#D4AF37' }}>
            (916) 553-7072
          </p>
        </div>

        {/* Social links grid */}
        <div className="grid grid-cols-1 gap-3">
          {SOCIAL_LINKS.map(link => {
            const isDisabled = link.href === '#'
            const Tag = isDisabled ? 'div' : 'a'
            const tagProps = isDisabled
              ? {}
              : { href: link.href, target: link.target || '_self', rel: 'noopener noreferrer' }

            return (
              <Tag
                key={link.id}
                id={`social-${link.id}`}
                {...(tagProps as any)}
                className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200"
                style={{
                  background: link.gradient,
                  border: `1px solid ${link.border}`,
                  color: link.textColor,
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  textDecoration: 'none',
                  opacity: isDisabled ? 0.5 : 1,
                }}
                onMouseEnter={e => {
                  if (!isDisabled) {
                    (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)'
                  }
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateX(0)'
                }}
              >
                <div className="shrink-0">{link.icon}</div>
                <div className="flex-1">
                  <p className="font-semibold text-base leading-tight" style={{ color: '#F5F5F5' }}>
                    {link.label}
                  </p>
                  <p className="text-sm" style={{ color: link.textColor }}>
                    {link.sublabel}
                  </p>
                </div>
                {!isDisabled && (
                  <ExternalLink size={16} style={{ color: 'rgba(245,245,245,0.3)', flexShrink: 0 }} />
                )}
                {isDisabled && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full shrink-0"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      color: 'rgba(245,245,245,0.3)',
                    }}
                  >
                    Pronto
                  </span>
                )}
              </Tag>
            )
          })}
        </div>

        {/* Hours reminder */}
        <div
          className="mt-8 rounded-2xl p-5"
          style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.15)' }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3 text-center"
            style={{ color: '#D4AF37' }}
          >
            🕐 Horarios
          </p>
          <div className="grid grid-cols-2 gap-1.5 text-sm">
            {[
              ['Lunes', '9am–7pm'],
              ['Mar–Jue', '9am–8pm'],
              ['Viernes', '9am–7pm'],
              ['Sábado', '10am–3pm'],
              ['Domingo', 'Cerrado'],
            ].map(([day, time]) => (
              <div key={day} className="flex justify-between">
                <span style={{ color: 'rgba(245,245,245,0.5)' }}>{day}</span>
                <span
                  className="font-medium"
                  style={{ color: time === 'Cerrado' ? 'rgba(245,245,245,0.2)' : '#F5F5F5' }}
                >
                  {time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
