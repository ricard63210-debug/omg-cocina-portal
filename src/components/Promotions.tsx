import { SectionDivider } from './RoseDecor'
import { CalendarDays, Music } from 'lucide-react'

interface Promo {
  id: string
  emoji: string
  title: string
  subtitle: string
  description: string
  badge: string
  badgeColor: string
  comingSoon: boolean
}

const PROMOTIONS: Promo[] = [
  {
    id: 'taco-tuesday',
    emoji: '🌮',
    title: 'Taco Tuesday',
    subtitle: 'Every Tuesday',
    description: 'Coming Soon — Special prices on tacos every Tuesday. Stay tuned!',
    badge: 'Coming Soon',
    badgeColor: '#E91E8C',
    comingSoon: true,
  },
  {
    id: 'happy-hour',
    emoji: '🍹',
    title: 'Happy Hour',
    subtitle: 'Coming soon',
    description: 'Coming Soon — Special discounts on drinks and appetizers. Don\'t miss out!',
    badge: 'Coming Soon',
    badgeColor: '#D4AF37',
    comingSoon: true,
  },
]

export default function Promotions() {
  return (
    <section
      id="promotions"
      style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, rgba(233,30,140,0.04) 50%, #0A0A0A 100%)' }}
    >
      <div className="section-wrapper">
        <SectionDivider title="Promotions & Events" />

        <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          {PROMOTIONS.map(promo => (
            <div key={promo.id} className="promo-card relative overflow-hidden">
              {/* Background watermark emoji */}
              <div
                className="absolute -top-2 -right-2 text-7xl pointer-events-none select-none"
                style={{ opacity: 0.08 }}
              >
                {promo.emoji}
              </div>

              {/* Badge */}
              <span
                className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
                style={{
                  background: `${promo.badgeColor}20`,
                  border: `1px solid ${promo.badgeColor}50`,
                  color: promo.badgeColor,
                }}
              >
                {promo.badge}
              </span>

              {/* Icon + title */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{promo.emoji}</span>
                <div>
                  <h3
                    className="font-display font-bold text-xl"
                    style={{ color: '#F5F5F5' }}
                  >
                    {promo.title}
                  </h3>
                  <p className="text-xs flex items-center gap-1" style={{ color: '#D4AF37' }}>
                    {promo.id === 'happy-hour' ? (
                      <Music size={11} />
                    ) : (
                      <CalendarDays size={11} />
                    )}
                    {promo.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-sm" style={{ color: 'rgba(245,245,245,0.55)' }}>
                {promo.description}
              </p>

              {promo.comingSoon && (
                <div
                  className="mt-4 text-center py-2 rounded-lg text-xs font-semibold tracking-wider uppercase"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px dashed rgba(255,255,255,0.1)',
                    color: 'rgba(245,245,245,0.3)',
                  }}
                >
                  Available soon — Follow us for updates!
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Social CTA */}
        <div className="text-center mt-10">
          <p className="text-sm mb-4 font-medium" style={{ color: 'rgba(245,245,245,0.45)' }}>
            Follow us on Instagram for the latest promotions and events!
          </p>
          <div className="flex justify-center">
            <a
              href="https://www.instagram.com/omg.cocina/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pink flex items-center justify-center rounded-full hover:scale-105"
              style={{ width: '50px', height: '50px', minWidth: '50px', display: 'flex', padding: 0 }}
              aria-label="Instagram Link"
            >
              {/* Official Instagram Logo without letters */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{ width: '24px', height: '24px', display: 'block', minWidth: '24px', minHeight: '24px' }}
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
