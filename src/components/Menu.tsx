import { useState } from 'react'
import { MENU_CATEGORIES, MEAT_OPTIONS } from './menuData'
import { SectionDivider } from './RoseDecor'
import { AlertCircle, ChevronDown } from 'lucide-react'

export default function Menu() {
  const [activeTab, setActiveTab] = useState('appetizers')

  const activeCategory = MENU_CATEGORIES.find(c => c.id === activeTab)

  return (
    <section id="menu" className="py-0">
      <div
        className="section-wrapper"
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 1.5rem 3rem' }}
      >
        <SectionDivider title="Menú Digital" />

        {/* Tab navigation */}
        <div
          className="flex flex-wrap gap-2 justify-center mb-8"
          role="tablist"
          aria-label="Menu categories"
        >
          {MENU_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              id={`tab-${cat.id}`}
              role="tab"
              aria-selected={activeTab === cat.id}
              aria-controls={`panel-${cat.id}`}
              className={`menu-tab ${activeTab === cat.id ? 'active' : ''}`}
              onClick={() => setActiveTab(cat.id)}
            >
              <span className="mr-1">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Category note for fajitas */}
        {activeTab === 'fajitas' && (
          <p className="text-center text-sm mb-6" style={{ color: '#D4AF37' }}>
            🔥 Served with rice, beans, lettuce, pico de gallo, sour cream and choice of tortillas
          </p>
        )}

        {/* Menu items grid */}
        {activeCategory && (
          <div
            id={`panel-${activeCategory.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeCategory.id}`}
            className="grid gap-4"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
              animation: 'fadeIn 0.3s ease-out',
            }}
          >
            {activeCategory.items.map((item, idx) => (
              <div key={idx} className="menu-item-card">
                {/* Header row */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3
                    className="font-display font-semibold text-base leading-snug"
                    style={{ color: '#F5F5F5' }}
                  >
                    {item.name}
                  </h3>
                  <span
                    className="font-bold text-sm shrink-0 ml-2"
                    style={{ color: '#D4AF37' }}
                  >
                    {item.price}
                  </span>
                </div>

                {/* Description */}
                {item.description && (
                  <p className="text-xs leading-relaxed mb-2" style={{ color: 'rgba(245,245,245,0.55)' }}>
                    {item.description}
                  </p>
                )}

                {/* Note / allergy badge */}
                {item.note && (
                  <div
                    className="flex items-center gap-1.5 text-xs py-1 px-2 rounded-md mb-2"
                    style={{
                      background: 'rgba(233,30,140,0.1)',
                      border: '1px solid rgba(233,30,140,0.2)',
                      color: '#FF6BB5',
                    }}
                  >
                    <AlertCircle size={11} />
                    {item.note}
                  </div>
                )}

                {/* Meat choice dropdown (informational) */}
                {item.meatChoice && (
                  <MeatSelector />
                )}

                {/* Addons */}
                {item.addons && item.addons.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.addons.map((addon, ai) => (
                      <span
                        key={ai}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: 'rgba(212,175,55,0.08)',
                          border: '1px solid rgba(212,175,55,0.2)',
                          color: '#D4AF37',
                        }}
                      >
                        {addon}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Allergen note */}
        <p className="text-center text-xs mt-6" style={{ color: 'rgba(245,245,245,0.3)' }}>
          * Items marked with * may contain raw ingredients. ⚠️ Items may contain nuts/peanuts.
          Please inform your server of any allergies.
        </p>
      </div>
    </section>
  )
}

function MeatSelector() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string>('Seleccionar carne')

  return (
    <div className="relative mt-2">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between w-full text-xs px-3 py-1.5 rounded-lg transition-colors"
        style={{
          background: 'rgba(233,30,140,0.08)',
          border: '1px solid rgba(233,30,140,0.2)',
          color: '#FF6BB5',
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>🥩 {selected}</span>
        <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute z-20 mt-1 w-full rounded-lg overflow-hidden shadow-xl"
          style={{ background: '#1A1A1A', border: '1px solid rgba(233,30,140,0.25)' }}
        >
          {MEAT_OPTIONS.map(opt => (
            <li
              key={opt.id}
              role="option"
              aria-selected={selected === opt.label}
              className="px-3 py-2 text-xs cursor-pointer transition-colors"
              style={{ color: 'rgba(245,245,245,0.8)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(233,30,140,0.12)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              onClick={() => { setSelected(opt.label); setOpen(false) }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
