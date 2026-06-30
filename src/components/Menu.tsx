import { useState } from 'react'
import { MENU_CATEGORIES, MEAT_OPTIONS } from './menuData'
import type { MenuItem } from './menuData'
import { SectionDivider } from './RoseDecor'
import { AlertCircle, ChevronDown, X } from 'lucide-react'

export default function Menu() {
  const [activeTab, setActiveTab] = useState('appetizers')
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  const activeCategory = MENU_CATEGORIES.find(c => c.id === activeTab)

  return (
    <section id="menu" className="py-0">
      <div
        className="section-wrapper"
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 1.5rem 3rem' }}
      >
        <SectionDivider title="Digital Menu" />

        {/* Tab navigation - horizontal scroll slide bar */}
        <div
          className="flex gap-2 overflow-x-auto pb-4 mb-8 scroll-smooth no-scrollbar select-none justify-start md:justify-center px-1"
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
                {/* Image */}
                {item.image && (
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="w-full h-44 overflow-hidden rounded-lg mb-3 block relative group/img focus:outline-none"
                    style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
                    aria-label={`View ingredients and details of ${item.name}`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                      loading="lazy"
                    />
                    {/* Hover Overlay */}
                    <div 
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"
                    >
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-[#D4AF37] text-[#D4AF37] bg-[#121212]/90 shadow-md">
                        🔍 View Ingredients
                      </span>
                    </div>
                  </button>
                )}

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

        {/* Selected Item Details Modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
            style={{ 
              background: 'rgba(0,0,0,0.85)', 
              backdropFilter: 'blur(8px)', 
              WebkitBackdropFilter: 'blur(8px)',
              animation: 'fadeIn 0.2s ease-out'
            }}
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl transition-all transform duration-300 border scale-100 max-h-[90vh] flex flex-col"
              style={{ 
                background: '#121212', 
                borderColor: 'rgba(233,30,140,0.25)',
                animation: 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 z-30 p-2 rounded-full transition-colors hover:bg-white/10"
                style={{ color: '#F5F5F5', background: 'rgba(0,0,0,0.6)' }}
                aria-label="Close details"
              >
                <X size={18} />
              </button>

              {/* Scrollable Container */}
              <div className="overflow-y-auto w-full no-scrollbar">
                {/* Large Image */}
                {selectedItem.image && (
                  <div className="w-full h-56 md:h-64 overflow-hidden relative shrink-0">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/30 pointer-events-none" />
                  </div>
                )}

                {/* Content Area */}
                <div className="p-5 md:p-6">
                  {/* Title & Price */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display font-bold text-xl" style={{ color: '#F5F5F5' }}>
                      {selectedItem.name}
                    </h3>
                    <span className="font-bold text-lg" style={{ color: '#D4AF37' }}>
                      {selectedItem.price}
                    </span>
                  </div>

                  {/* Description */}
                  {selectedItem.description && (
                    <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(245,245,245,0.6)' }}>
                      {selectedItem.description}
                    </p>
                  )}

                  {/* Chef/Prep Note Badge */}
                  {selectedItem.note && (
                    <div
                      className="flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-lg mb-4"
                      style={{
                        background: 'rgba(233,30,140,0.08)',
                        border: '1px solid rgba(233,30,140,0.18)',
                        color: '#FF6BB5',
                      }}
                    >
                      <AlertCircle size={13} />
                      <span className="font-medium">{selectedItem.note}</span>
                    </div>
                  )}

                  {/* Ingredients List */}
                  {selectedItem.ingredients && selectedItem.ingredients.length > 0 ? (
                    <div className="mb-5">
                      <h4 className="text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: '#D4AF37' }}>
                        Ingredients
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-xs" style={{ color: 'rgba(245,245,245,0.85)' }}>
                        {selectedItem.ingredients.map((ing, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#E91E8C' }} />
                            <span>{ing}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="mb-5">
                      <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#D4AF37' }}>
                        Details
                      </h4>
                      <p className="text-xs italic" style={{ color: 'rgba(245,245,245,0.45)' }}>
                        Contact our waitstaff for the full ingredients list.
                      </p>
                    </div>
                  )}

                  {/* Allergen and Spicy alert blocks */}
                  <div className="flex flex-col gap-2.5 mt-2">
                    {/* Spicy Indicator */}
                    {selectedItem.spicy !== undefined && (
                      <div
                        className="flex items-center gap-3 p-3 rounded-xl text-xs font-medium border"
                        style={{
                          background: selectedItem.spicy ? 'rgba(239, 68, 68, 0.08)' : 'rgba(245,245,245,0.04)',
                          borderColor: selectedItem.spicy ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245,245,245,0.1)',
                          color: selectedItem.spicy ? '#F87171' : 'rgba(245,245,245,0.6)',
                        }}
                      >
                        <span className="text-lg leading-none">{selectedItem.spicy ? '🌶️' : '🔔'}</span>
                        <div>
                          <p className="font-bold">{selectedItem.spicy ? 'Spicy' : 'Not Spicy'}</p>
                          <p className="text-[10px] opacity-75 mt-0.5">
                            {selectedItem.spicy 
                              ? 'Contains hot chili peppers or spicy house sauces.' 
                              : 'Mild, family-friendly preparation.'}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Gluten Indicator */}
                    {selectedItem.glutenFree !== undefined && (
                      <div
                        className="flex items-center gap-3 p-3 rounded-xl text-xs font-medium border"
                        style={{
                          background: selectedItem.glutenFree ? 'rgba(34, 197, 94, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                          borderColor: selectedItem.glutenFree ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                          color: selectedItem.glutenFree ? '#4ADE80' : '#FBBF24',
                        }}
                      >
                        <span className="text-lg leading-none">{selectedItem.glutenFree ? '🌾' : '⚠️'}</span>
                        <div>
                          <p className="font-bold">
                            {selectedItem.glutenFree ? 'Gluten-Free' : 'Contains Gluten'}
                          </p>
                          <p className="text-[10px] opacity-75 mt-0.5">
                            {selectedItem.glutenFree 
                              ? 'Safe for guests with gluten sensitivity or Celiac disease.' 
                              : 'Prepared with flour tortillas or sauces containing wheat.'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function MeatSelector() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string>('Select meat option')

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
