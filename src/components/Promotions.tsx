import { SectionDivider } from './RoseDecor'
import { CalendarDays, Music } from 'lucide-react'

// =====================================================
// UPDATE PROMOTIONS HERE — easy to edit!
// =====================================================
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
    subtitle: 'Cada martes',
    description: 'Próximamente — Precios especiales en tacos todos los martes. ¡Mantente al tanto!',
    badge: 'Próximamente',
    badgeColor: '#E91E8C',
    comingSoon: true,
  },
  {
    id: 'happy-hour',
    emoji: '🍹',
    title: 'Happy Hour',
    subtitle: 'Próximas fechas',
    description: 'Próximamente — Descuentos especiales en bebidas y aperitivos. ¡No te lo pierdas!',
    badge: 'Próximamente',
    badgeColor: '#D4AF37',
    comingSoon: true,
  },
  // To add new promos, duplicate an entry above this comment
]

export default function Promotions() {
  return (
    <section
      id="promotions"
      style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, rgba(233,30,140,0.04) 50%, #0A0A0A 100%)' }}
    >
      <div className="section-wrapper">
        <SectionDivider title="Promociones & Eventos" />

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
                  Disponible pronto — ¡Síguenos para más info!
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Social CTA */}
        <div className="text-center mt-10">
          <p className="text-sm mb-4" style={{ color: 'rgba(245,245,245,0.45)' }}>
            ¡Síguenos en Instagram para las últimas promociones y eventos!
          </p>
          <a
            href="https://www.instagram.com/omg.cocina/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pink"
          >
            📸 @omg.cocina
          </a>
        </div>
      </div>
    </section>
  )
}
