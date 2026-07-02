import { useState } from 'react'
import { MENU_CATEGORIES, MEAT_OPTIONS } from './menuData'
import type { MenuItem } from './menuData'
import { SectionDivider } from './RoseDecor'
import { AlertCircle, ChevronDown, X } from 'lucide-react'
import { supabase } from '../lib/supabase'

export interface CartItem {
  name: string
  price: number
  priceString: string
  quantity: number
  option?: string
  image?: string
}

// Utility to parse prices from strings (e.g. "$15.00" -> 15.0)
const parsePrice = (priceStr: string): number => {
  return parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState('appetizers')
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [openDropdownIdx, setOpenDropdownIdx] = useState<number | null>(null)

  // Meat selector options tracking
  const [selectedMeats, setSelectedMeats] = useState<Record<number, string>>({})

  // Cart and checkout states
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState<'type_selection' | 'details_form' | 'closed'>('closed')
  const [orderType, setOrderType] = useState<'dine_in' | 'take_out' | null>(null)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [standNumber, setStandNumber] = useState('')
  const [confirmationMessage, setConfirmationMessage] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [orderNotes, setOrderNotes] = useState('')
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false)

  const handleAddToCart = (item: MenuItem, idx: number) => {
    if (item.meatChoice && (!selectedMeats[idx] || selectedMeats[idx] === 'Select meat option')) {
      alert('Please select a meat option first! 🥩')
      setOpenDropdownIdx(idx)
      return
    }

    const selectedOption = item.meatChoice ? selectedMeats[idx] : undefined
    const priceNum = parsePrice(item.price)

    setCart(prevCart => {
      const existingIdx = prevCart.findIndex(
        ci => ci.name === item.name && ci.option === selectedOption
      )

      if (existingIdx > -1) {
        const newCart = [...prevCart]
        newCart[existingIdx].quantity += 1
        return newCart
      } else {
        return [
          ...prevCart,
          {
            name: item.name,
            price: priceNum,
            priceString: item.price,
            quantity: 1,
            option: selectedOption,
            image: item.image,
          },
        ]
      }
    })

    // Reset meat selector after adding
    if (item.meatChoice) {
      setSelectedMeats(prev => {
        const next = { ...prev }
        delete next[idx]
        return next
      })
    }
  }

  const updateQuantity = (index: number, delta: number) => {
    setCart(prevCart => {
      const newCart = [...prevCart]
      newCart[index].quantity += delta
      if (newCart[index].quantity <= 0) {
        newCart.splice(index, 1)
      }
      return newCart
    })
  }

  const handlePlaceOrder = async () => {
    if (!orderType) return
    if (orderType === 'dine_in' && (!standNumber.trim() || !customerName.trim())) return
    if (orderType === 'take_out' && !customerName.trim()) return

    setIsSubmittingOrder(true)
    try {
      const orderItems = cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        options: item.option || null
      }))

      // Stand number is set to "1" for Take Out counter
      const finalStandNumber = orderType === 'dine_in' ? standNumber.trim() : '1'

      const { error } = await supabase.from('omg_orders').insert({
        table_number: orderType === 'dine_in' ? `Stand ${standNumber.trim()}` : 'Take Out', // backwards compatibility fallback
        items: orderItems,
        subtotal: cartSubtotal,
        status: 'pending',
        customer_note: orderNotes.trim() || null,
        order_type: orderType,
        stand_number: finalStandNumber,
        customer_name: customerName.trim(),
        customer_phone: orderType === 'take_out' && customerPhone.trim() ? customerPhone.trim() : null
      })

      if (error) throw error

      // Design custom confirmation messages
      if (orderType === 'dine_in') {
        setConfirmationMessage(`Your order is on its way to Stand ${standNumber.trim()}! 🌸 Estimated time: 15-20 min`)
      } else {
        setConfirmationMessage(`Order received, ${customerName.trim()}! 🌸 We'll have it ready soon.`)
      }

      setCheckoutStep('closed')
      setShowConfirmation(true)
    } catch (err: any) {
      console.error('Error placing order:', err)
      alert(`Failed to place order: ${err.message || 'Connection error'}`)
    } finally {
      setIsSubmittingOrder(false)
    }
  }

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

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
          className="sticky top-[57px] z-40 flex gap-2 overflow-x-auto py-3 mb-8 scroll-smooth no-scrollbar select-none justify-start md:justify-center px-1"
          style={{
            background: 'rgba(10,10,10,0.95)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(233,30,140,0.1)',
            marginRight: '-1.5rem',
            marginLeft: '-1.5rem',
            paddingRight: '1.5rem',
            paddingLeft: '1.5rem',
          }}
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
              onClick={() => {
                setActiveTab(cat.id)
                setOpenDropdownIdx(null)
              }}
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
            {activeCategory.items.map((item, idx) => {
              const isDropdownOpen = openDropdownIdx === idx
              return (
                <div
                  key={idx}
                  className={`menu-item-card transition-all duration-300 ${isDropdownOpen ? 'relative z-30 ring-1 ring-[#FF6BB5]/30' : ''}`}
                >
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
                <div 
                  onClick={() => setSelectedItem(item)}
                  className="flex items-start justify-between gap-2 mb-1.5 cursor-pointer group/title"
                >
                  <h3
                    className="font-display font-semibold text-base leading-snug group-hover/title:text-[#FF6BB5] transition-colors"
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
                  <p 
                    onClick={() => setSelectedItem(item)}
                    className="text-xs leading-relaxed mb-2 cursor-pointer hover:text-white/80 transition-colors"
                    style={{ color: 'rgba(245,245,245,0.55)' }}
                  >
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
                  <MeatSelector
                    isOpen={isDropdownOpen}
                    onToggle={() => setOpenDropdownIdx(isDropdownOpen ? null : idx)}
                    selected={selectedMeats[idx] || 'Select meat option'}
                    onSelect={(meat) => setSelectedMeats(prev => ({ ...prev, [idx]: meat }))}
                  />
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

                {/* Add to Cart Button */}
                <button
                  onClick={() => setSelectedItem(item)}
                  className="w-full mt-4 py-2.5 rounded-xl text-xs font-bold btn-pink flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  🛒 Add to Cart
                </button>
              </div>
            )})}
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
                    {/* Meat Selector inside modal if needed */}
                    {selectedItem.meatChoice && (() => {
                      const itemIndex = activeCategory?.items.findIndex(it => it.name === selectedItem.name) ?? -1
                      if (itemIndex === -1) return null
                      return (
                        <div className="mt-4">
                          <label className="text-[10px] uppercase font-bold text-white/40 tracking-wider block mb-1">
                            Choose your Meat Option
                          </label>
                          <MeatSelector
                            isOpen={openDropdownIdx === 9999}
                            onToggle={() => setOpenDropdownIdx(openDropdownIdx === 9999 ? null : 9999)}
                            selected={selectedMeats[itemIndex] || 'Select meat option'}
                            onSelect={(meat) => setSelectedMeats(prev => ({ ...prev, [itemIndex]: meat }))}
                          />
                        </div>
                      )
                    })()}

                    {/* Add to Cart button inside modal */}
                    <button
                      onClick={() => {
                        const itemIndex = activeCategory?.items.findIndex(it => it.name === selectedItem.name) ?? -1
                        if (itemIndex > -1) {
                          handleAddToCart(selectedItem, itemIndex)
                          // Only close if validation passed
                          if (!selectedItem.meatChoice || (selectedMeats[itemIndex] && selectedMeats[itemIndex] !== 'Select meat option')) {
                            setSelectedItem(null)
                          }
                        }
                      }}
                      className="w-full mt-6 py-3 rounded-xl text-xs font-bold btn-pink flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      🛒 Add to Cart — {selectedItem.price}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Floating Cart Button */}
        {cartItemCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 right-6 z-40 bg-[#E91E8C] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform border border-white/20 animate-scale-up"
            style={{ boxShadow: '0 8px 30px rgba(233,30,140,0.4)' }}
            aria-label="Open Shopping Cart"
          >
            <div className="relative">
              <span className="text-xl">🛒</span>
              <span className="absolute -top-3.5 -right-3.5 bg-[#D4AF37] text-[#0A0A0A] font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#E91E8C]">
                {cartItemCount}
              </span>
            </div>
          </button>
        )}

        {/* Cart Drawer */}
        {isCartOpen && (
          <div
            className="fixed inset-0 z-50 flex justify-end"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={() => setIsCartOpen(false)}
          >
            <div
              className="w-full max-w-md h-full flex flex-col shadow-2xl relative"
              style={{
                background: '#121212',
                borderLeft: '1px solid rgba(233,30,140,0.15)',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Drawer Header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🛒</span>
                  <h3 className="font-display font-bold text-base text-white">Your Cart</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/60">
                    {cartItemCount} items
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Content / Items list */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                {cart.length === 0 ? (
                  <div className="text-center py-20 text-white/40">
                    <p className="text-4xl mb-3">📭</p>
                    <p className="text-sm font-semibold">Your cart is empty</p>
                    <p className="text-xs mt-1">Add some delicious items from our menu!</p>
                  </div>
                ) : (
                  cart.map((item, cidx) => (
                    <div
                      key={cidx}
                      className="flex items-center gap-3 p-3 rounded-xl border"
                      style={{ background: '#161616', borderColor: 'rgba(255,255,255,0.04)' }}
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-xs text-white truncate">{item.name}</h4>
                        {item.option && (
                          <p className="text-[10px] text-[#FF6BB5] font-medium mt-0.5">
                            🥩 {item.option}
                          </p>
                        )}
                        <p className="text-xs text-[#D4AF37] font-bold mt-1">
                          {item.priceString}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(cidx, -1)}
                          className="w-6 h-6 rounded-md bg-white/5 hover:bg-white/10 text-white flex items-center justify-center text-xs transition-colors"
                        >
                          -
                        </button>
                        <span className="text-xs font-semibold w-4 text-center text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(cidx, 1)}
                          className="w-6 h-6 rounded-md bg-white/5 hover:bg-white/10 text-white flex items-center justify-center text-xs transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {cart.length > 0 && (
                <div className="p-4 border-t border-white/5 bg-[#141414] space-y-4">
                  {/* Notes Input */}
                  <div>
                    <label className="text-[10px] uppercase font-bold text-white/40 tracking-wider block mb-1">
                      Add notes / Special requests
                    </label>
                    <textarea
                      placeholder="E.g. No onions, sauce on the side..."
                      value={orderNotes}
                      onChange={e => setOrderNotes(e.target.value)}
                      className="form-input w-full text-xs py-2 px-3 h-14 resize-none"
                      style={{ background: '#0A0A0A' }}
                    />
                  </div>

                  {/* Subtotal */}
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-white/60">Subtotal</span>
                    <span className="text-base text-[#D4AF37]">${cartSubtotal.toFixed(2)}</span>
                  </div>

                  {/* Place Order Button */}
                  <button
                    onClick={() => {
                      setOrderType(null)
                      setCheckoutStep('type_selection')
                    }}
                    className="w-full py-3 rounded-xl text-sm font-bold btn-pink flex items-center justify-center gap-2 shadow-lg"
                  >
                    🚀 Place Order
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 1: Order Type Selection Modal */}
        {checkoutStep === 'type_selection' && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur-6px' }}
          >
            <div
              className="w-full max-w-sm p-6 rounded-2xl border text-center relative animate-scale-up"
              style={{
                background: '#121212',
                borderColor: 'rgba(233,30,140,0.25)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              }}
            >
              <button
                onClick={() => setCheckoutStep('closed')}
                className="absolute top-3 right-3 text-white/50 hover:text-white"
              >
                <X size={18} />
              </button>
              <h3 className="font-display font-bold text-lg text-white mb-1">Select Order Type</h3>
              <p className="text-xs text-white/50 mb-6">How would you like to receive your order?</p>

              <div className="grid grid-cols-2 gap-4">
                {/* Dine In Button */}
                <button
                  onClick={() => {
                    setOrderType('dine_in')
                    setCheckoutStep('details_form')
                  }}
                  className="flex flex-col items-center justify-center p-5 rounded-xl border border-white/10 bg-[#161616] hover:border-[#E91E8C] transition-all hover:scale-[1.03] active:scale-[0.98] group"
                >
                  <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">🍽️</span>
                  <span className="text-xs font-bold text-white group-hover:text-[#FF6BB5] transition-colors">Dine In</span>
                </button>

                {/* Take Out Button */}
                <button
                  onClick={() => {
                    setOrderType('take_out')
                    setStandNumber('1') // Set stand number automatically to "1"
                    setCheckoutStep('details_form')
                  }}
                  className="flex flex-col items-center justify-center p-5 rounded-xl border border-white/10 bg-[#161616] hover:border-[#E91E8C] transition-all hover:scale-[1.03] active:scale-[0.98] group"
                >
                  <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">🥡</span>
                  <span className="text-xs font-bold text-white group-hover:text-[#FF6BB5] transition-colors">Take Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Checkout Details Form Modal */}
        {checkoutStep === 'details_form' && orderType && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur-6px' }}
          >
            <div
              className="w-full max-w-sm p-6 rounded-2xl border text-center relative animate-scale-up"
              style={{
                background: '#121212',
                borderColor: 'rgba(233,30,140,0.25)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              }}
            >
              <h3 className="font-display font-bold text-lg text-white mb-1">
                {orderType === 'dine_in' ? '🍽️ Dine In Details' : '🥡 Take Out Details'}
              </h3>
              <p className="text-xs text-white/50 mb-4">Please fill in the information below.</p>

              <div className="space-y-4 text-left">
                {orderType === 'dine_in' ? (
                  <>
                    {/* Stand Number Input */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-white/40 tracking-wider block mb-1">
                        Enter the number on your stand (Required)
                      </label>
                      <input
                        type="number"
                        placeholder="E.g. 5, 12..."
                        value={standNumber}
                        onChange={e => setStandNumber(e.target.value)}
                        className="form-input w-full text-sm py-2 px-3 focus:ring-1 focus:ring-[#E91E8C]"
                        required
                        min="1"
                      />
                    </div>

                    {/* Customer Name Input */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-white/40 tracking-wider block mb-1">
                        Your Name (Required)
                      </label>
                      <input
                        type="text"
                        placeholder="E.g. Ricardo..."
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        className="form-input w-full text-sm py-2 px-3 focus:ring-1 focus:ring-[#E91E8C]"
                        required
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Customer Name Input */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-white/40 tracking-wider block mb-1">
                        Your Name (Required)
                      </label>
                      <input
                        type="text"
                        placeholder="E.g. Maria..."
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        className="form-input w-full text-sm py-2 px-3 focus:ring-1 focus:ring-[#E91E8C]"
                        required
                      />
                    </div>

                    {/* Customer Phone Input */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-white/40 tracking-wider block mb-1">
                        We'll text you when ready (optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="E.g. 555-0199..."
                        value={customerPhone}
                        onChange={e => setCustomerPhone(e.target.value)}
                        className="form-input w-full text-sm py-2 px-3 focus:ring-1 focus:ring-[#E91E8C]"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Modal Buttons */}
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setCheckoutStep('type_selection')}
                  className="flex-1 py-2.5 rounded-xl border text-xs font-semibold text-white/70 hover:bg-white/5 transition-all"
                  style={{ borderColor: 'rgba(255,255,255,0.15)' }}
                >
                  Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={
                    isSubmittingOrder ||
                    !customerName.trim() ||
                    (orderType === 'dine_in' && !standNumber.trim())
                  }
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold btn-pink disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmittingOrder ? 'Submitting...' : 'Confirm Order'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur-6px' }}
          >
            <div
              className="w-full max-w-sm p-8 rounded-2xl border text-center animate-scale-up"
              style={{
                background: '#121212',
                borderColor: 'rgba(233,30,140,0.3)',
                boxShadow: '0 15px 40px rgba(233,30,140,0.15)',
              }}
            >
              <span className="text-5xl block mb-4 animate-bounce">🌸</span>
              <h3 className="font-display font-bold text-xl text-[#FF6BB5] mb-2">Order Received!</h3>
              <p className="text-sm text-white/80 leading-relaxed mb-6">
                {confirmationMessage}
              </p>
              <button
                onClick={() => {
                  setShowConfirmation(false)
                  setCart([])
                  setCustomerName('')
                  setCustomerPhone('')
                  setStandNumber('')
                  setOrderType(null)
                  setOrderNotes('')
                  setIsCartOpen(false)
                }}
                className="w-full py-3 rounded-xl text-xs font-bold btn-pink"
              >
                Enjoy your meal!
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function MeatSelector({ 
  isOpen, 
  onToggle, 
  selected, 
  onSelect 
}: { 
  isOpen: boolean; 
  onToggle: () => void; 
  selected: string; 
  onSelect: (meat: string) => void;
}) {
  return (
    <div className="relative mt-2">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-xs px-3 py-1.5 rounded-lg transition-colors"
        style={{
          background: 'rgba(233,30,140,0.08)',
          border: '1px solid rgba(233,30,140,0.2)',
          color: '#FF6BB5',
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>🥩 {selected}</span>
        <ChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
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
              onClick={() => { onSelect(opt.label); onToggle() }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
