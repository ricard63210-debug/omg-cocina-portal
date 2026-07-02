import { useState, useEffect } from 'react'
import PageLayout from '../components/PageLayout'
import { supabase } from '../lib/supabase'
import { Eye, EyeOff, Search, Trash2, Calendar, User, Hash, Phone, Clock } from 'lucide-react'

interface OrderItem {
  name: string
  quantity: number
  price: number
  options?: string | null
}

interface Order {
  id: string
  created_at: string
  table_number: string
  items: OrderItem[]
  subtotal: number
  status: 'pending' | 'preparing' | 'ready' | 'completed'
  customer_note?: string | null
  order_type?: 'dine_in' | 'take_out' | null
  stand_number?: string | null
  customer_name?: string | null
  customer_phone?: string | null
}

function playNotificationSound() {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
    
    // Play first tone (higher pitch)
    const osc1 = audioCtx.createOscillator()
    const gain1 = audioCtx.createGain()
    osc1.connect(gain1)
    gain1.connect(audioCtx.destination)
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(880, audioCtx.currentTime) // A5
    gain1.gain.setValueAtTime(0.15, audioCtx.currentTime)
    gain1.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3)
    osc1.start(audioCtx.currentTime)
    osc1.stop(audioCtx.currentTime + 0.3)
    
    // Play second tone (lower pitch) after a short delay
    const osc2 = audioCtx.createOscillator()
    const gain2 = audioCtx.createGain()
    osc2.connect(gain2)
    gain2.connect(audioCtx.destination)
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(587.33, audioCtx.currentTime + 0.15) // D5
    gain2.gain.setValueAtTime(0.15, audioCtx.currentTime + 0.15)
    gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.45)
    osc2.start(audioCtx.currentTime + 0.15)
    osc2.stop(audioCtx.currentTime + 0.45)
  } catch (err) {
    console.error('Audio synthesis failed:', err)
  }
}

interface FeedbackRow {
  id: number
  created_at?: string
  name: string | null
  rating: number
  category: string | null
  message: string
}

interface ParsedFeedback {
  id: number
  created_at: string
  name: string
  rating: number
  category: string
  phone: string
  server: string
  table: string
  date: string
  time: string
  comments: string
  rawMessage: string
}

function parseFeedbackMessage(row: FeedbackRow): ParsedFeedback {
  const msg = row.message || ''
  const result = {
    id: row.id,
    created_at: row.created_at ? new Date(row.created_at).toLocaleString() : 'N/A',
    name: row.name || 'Anonymous',
    rating: row.rating,
    category: row.category || 'Other',
    phone: 'N/A',
    server: 'N/A',
    table: 'N/A',
    date: 'N/A',
    time: 'N/A',
    comments: msg,
    rawMessage: msg
  }

  // Extract Phone Number
  const phoneMatch = msg.match(/- Phone Number:\s*([^\n]+)/)
  if (phoneMatch) result.phone = phoneMatch[1].trim()

  // Extract Server
  const serverMatch = msg.match(/- Server Name\/Number:\s*([^\n]+)/)
  if (serverMatch) result.server = serverMatch[1].trim()

  // Extract Table
  const tableMatch = msg.match(/- Table Number:\s*([^\n]+)/)
  if (tableMatch) result.table = tableMatch[1].trim()

  // Extract Date
  const dateMatch = msg.match(/- Date of Visit:\s*([^\n]+)/)
  if (dateMatch) result.date = dateMatch[1].trim()

  // Extract Time
  const timeMatch = msg.match(/- Time of Visit:\s*([^\n]+)/)
  if (timeMatch) result.time = timeMatch[1].trim()

  // Extract Comments
  const commentsIndex = msg.indexOf('[Comments]:')
  if (commentsIndex !== -1) {
    result.comments = msg.substring(commentsIndex + '[Comments]:'.length).trim()
  }

  return result
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')

  const [feedbacks, setFeedbacks] = useState<ParsedFeedback[]>([])
  const [loading, setLoading] = useState(false)
  const [dbError, setDbError] = useState('')
  const [activeAdminTab, setActiveAdminTab] = useState<'Orders' | 'Feedback' | 'Analytics'>('Orders')
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [ordersError, setOrdersError] = useState('')
  const [showCompletedOrders, setShowCompletedOrders] = useState(false)

  // Filters & Search
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [ratingFilter, setRatingFilter] = useState('All')

  // Password defined here
  const ADMIN_PASSWORD = 'omgadmin2026'

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('omg_admin_authenticated')
    if (sessionAuth === 'true') {
      setIsAuthenticated(true)
      fetchFeedbacks()
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setLoginError('')
      sessionStorage.setItem('omg_admin_authenticated', 'true')
      fetchFeedbacks()
    } else {
      setLoginError('Incorrect password. Please try again.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword('')
    sessionStorage.removeItem('omg_admin_authenticated')
  }

  const fetchFeedbacks = async () => {
    setLoading(true)
    setDbError('')
    try {
      const { data, error } = await supabase
        .from('omg_feedback')
        .select('*')
        .order('id', { ascending: false })

      if (error) throw error

      if (data) {
        const parsed = (data as FeedbackRow[]).map(row => parseFeedbackMessage(row))
        setFeedbacks(parsed)
      }
    } catch (err: any) {
      console.error('Error fetching feedbacks:', err)
      setDbError(err.message || 'Failed to connect to Database.')
    } finally {
      setLoading(false)
    }
  }

  const fetchOrders = async () => {
    setOrdersLoading(true)
    setOrdersError('')
    try {
      const { data, error } = await supabase
        .from('omg_orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      if (data) {
        setOrders(data as Order[])
      }
    } catch (err: any) {
      console.error('Error fetching orders:', err)
      setOrdersError(err.message || 'Failed to fetch orders.')
    } finally {
      setOrdersLoading(false)
    }
  }

  const cycleOrderStatus = async (orderId: string, currentStatus: string) => {
    let nextStatus: 'pending' | 'preparing' | 'ready' | 'completed' = 'pending'
    if (currentStatus === 'pending') {
      nextStatus = 'preparing'
    } else if (currentStatus === 'preparing') {
      nextStatus = 'ready'
    } else if (currentStatus === 'ready') {
      nextStatus = 'completed'
    } else {
      nextStatus = 'pending'
    }

    try {
      const { error } = await supabase
        .from('omg_orders')
        .update({ status: nextStatus })
        .eq('id', orderId)

      if (error) throw error

      setOrders(prev =>
        prev.map(o => (o.id === orderId ? { ...o, status: nextStatus } : o))
      )
    } catch (err: any) {
      console.error('Error cycling status:', err)
      alert(`Status update failed: ${err.message}`)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders()

      const channel = supabase
        .channel('realtime-orders')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'omg_orders' },
          (payload) => {
            console.log('Realtime Order Insert:', payload.new)
            const newOrder = payload.new as Order
            setOrders(prev => [newOrder, ...prev])
            playNotificationSound()
          }
        )
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'omg_orders' },
          (payload) => {
            console.log('Realtime Order Update:', payload.new)
            const updated = payload.new as Order
            setOrders(prev => prev.map(o => (o.id === updated.id ? updated : o)))
          }
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [isAuthenticated])

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this complaint? This action cannot be undone.')) {
      return
    }

    try {
      const { error } = await supabase.from('omg_feedback').delete().eq('id', id)
      if (error) throw error
      // Remove from state
      setFeedbacks(prev => prev.filter(item => item.id !== id))
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`)
    }
  }

  // Filtered List
  const filteredFeedbacks = feedbacks.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.comments.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.toLowerCase().includes(search.toLowerCase()) ||
      item.server.toLowerCase().includes(search.toLowerCase())

    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter
    const matchesRating = ratingFilter === 'All' || item.rating.toString() === ratingFilter

    return matchesSearch && matchesCategory && matchesRating
  })

  // Metrics
  const totalCount = feedbacks.length
  const averageRating = totalCount > 0 
    ? (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / totalCount).toFixed(1)
    : '0.0'

  if (!isAuthenticated) {
    return (
      <PageLayout title="Admin Portal" emoji="🔐">
        <div className="section-wrapper flex items-center justify-center" style={{ minHeight: '60vh', padding: '2rem 1.5rem' }}>
          <div 
            className="w-full max-w-sm p-8 rounded-2xl shadow-2xl text-center"
            style={{ 
              background: '#1A1A1A', 
              border: '1px solid rgba(233,30,140,0.25)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
          >
            <span className="text-4xl block mb-3 animate-pulse">🔒</span>
            <h2 className="font-display font-bold text-xl mb-1 text-white">Restricted Access</h2>
            <p className="text-xs mb-6 text-white/50">Enter password to view feedback and complaints.</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input w-full pr-10 text-center"
                  placeholder="Enter password..."
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-white/40 hover:text-white/70"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {loginError && (
                <p className="text-xs text-red-400 font-medium">{loginError}</p>
              )}

              <button
                type="submit"
                className="btn-pink w-full justify-center py-3 text-sm font-semibold"
                style={{ borderRadius: '50px' }}
              >
                Unlock Dashboard
              </button>
            </form>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout title="Admin Panel" emoji="⚙️">
      <div className="section-wrapper" style={{ maxWidth: '1200px', padding: '2rem 1.5rem 4rem' }}>
        
        {/* Header Action Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display font-bold text-lg text-white">Management Console</h2>
            <p className="text-xs text-white/50">Manage operations, customer logs, and website analytics.</p>
          </div>
          <div className="flex gap-2">
            {activeAdminTab === 'Feedback' && (
              <button
                onClick={fetchFeedbacks}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all text-white hover:bg-white/5"
                style={{ borderColor: 'rgba(255,255,255,0.15)', background: 'transparent' }}
              >
                🔄 Refresh
              </button>
            )}
            <button
              onClick={handleLogout}
              className="btn-pink py-1.5 px-3 rounded-lg text-xs font-semibold"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Admin Tabs */}
        <div className="flex gap-2 border-b border-white/10 pb-px mb-8 overflow-x-auto no-scrollbar">
          {(['Orders', 'Feedback', 'Analytics'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveAdminTab(tab)}
              className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeAdminTab === tab
                  ? 'border-[#E91E8C] text-[#E91E8C]'
                  : 'border-transparent text-white/50 hover:text-white/80'
              }`}
            >
              {tab === 'Orders' ? '📋 ' : tab === 'Feedback' ? '💬 ' : '📈 '}
              {tab}
            </button>
          ))}
        </div>

        {/* TAB Content: Orders */}
        {activeAdminTab === 'Orders' && (
          <div className="space-y-6">
            {/* Realtime Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#141414] p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  id="showCompleted"
                  checked={showCompletedOrders}
                  onChange={e => setShowCompletedOrders(e.target.checked)}
                  className="rounded border-white/20 text-[#E91E8C] focus:ring-0 focus:ring-offset-0 bg-[#0A0A0A] w-4 h-4 cursor-pointer"
                />
                <label htmlFor="showCompleted" className="text-xs text-white/70 select-none cursor-pointer">
                  Show Completed Orders ({orders.filter(o => o.status === 'completed').length})
                </label>
              </div>

              <div className="text-xs text-white/40 flex items-center gap-1.5 font-medium">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Real-time dashboard active
              </div>
            </div>

            {/* Error state */}
            {ordersError && (
              <div className="p-4 rounded-xl border text-xs bg-red-950/20 border-red-900 text-red-300">
                ⚠️ Connection issue: {ordersError}
              </div>
            )}

            {/* Loading / Empty State / Orders List */}
            {ordersLoading && orders.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-block w-8 h-8 rounded-full border-2 border-t-pink animate-spin" />
                <p className="text-xs text-white/40 mt-3">Connecting to database...</p>
              </div>
            ) : orders.filter(o => showCompletedOrders ? true : o.status !== 'completed').length === 0 ? (
              <div 
                className="text-center py-12 px-4 rounded-2xl border border-dashed"
                style={{ background: '#141414', borderColor: 'rgba(233,30,140,0.15)' }}
              >
                <p className="text-3xl mb-3">📭</p>
                <h3 className="font-semibold text-sm text-white">No active orders</h3>
                <p className="text-xs text-white/40 mt-1 max-w-sm mx-auto">
                  No orders yet. Orders will appear here in real time once the cart and payment system is connected.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {orders
                  .filter(o => showCompletedOrders ? true : o.status !== 'completed')
                  .map(order => {
                    let badgeClass = ''
                    let statusLabel = ''
                    if (order.status === 'pending') {
                      badgeClass = 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500'
                      statusLabel = 'Pending'
                    } else if (order.status === 'preparing') {
                      badgeClass = 'bg-[#E91E8C]/10 border-[#E91E8C]/30 text-[#FF6BB5]'
                      statusLabel = 'Preparing'
                    } else if (order.status === 'ready') {
                      badgeClass = 'bg-green-500/10 border-green-500/30 text-green-400'
                      statusLabel = 'Ready'
                    } else {
                      badgeClass = 'bg-white/5 border-white/10 text-white/40'
                      statusLabel = 'Completed'
                    }

                    const formattedTime = (() => {
                      try {
                        return new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      } catch {
                        return 'N/A'
                      }
                    })()

                    return (
                      <div 
                        key={order.id}
                        className="rounded-2xl p-5 border transition-all duration-300 hover:border-[#E91E8C]/20 flex flex-col justify-between"
                        style={{ background: '#161616', borderColor: 'rgba(255,255,255,0.06)' }}
                      >
                        <div>
                          {/* Card Header */}
                          <div className="flex justify-between items-start gap-3 pb-3 mb-3 border-b border-white/5">
                            <div>
                              <h4 className="font-display font-bold text-sm text-white flex flex-col gap-0.5">
                                {order.order_type === 'take_out' ? (
                                  <span>🥡 Take Out</span>
                                ) : (
                                  <span>🪑 Stand {order.stand_number || '1'}</span>
                                )}
                                <span className="text-[11px] font-medium text-[#D4AF37]">
                                  {order.customer_name || 'Guest'}
                                </span>
                                {order.order_type === 'take_out' && order.customer_phone && (
                                  <span className="text-[9px] text-white/50 font-normal">
                                    📞 {order.customer_phone}
                                  </span>
                                )}
                              </h4>
                              <p className="text-[10px] text-white/40 mt-0.5">
                                {formattedTime}
                              </p>
                            </div>
                            <button
                              onClick={() => cycleOrderStatus(order.id, order.status)}
                              className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all cursor-pointer select-none active:scale-95 ${badgeClass}`}
                              title="Click to cycle status"
                            >
                              ● {statusLabel}
                            </button>
                          </div>
                          
                          {/* Order Items */}
                          <div className="space-y-2 mb-4 text-xs text-white/90">
                            {order.items?.map((oitem, oidx) => (
                              <div key={oidx} className="flex justify-between items-start gap-2">
                                <div>
                                  <span>{oitem.quantity}x {oitem.name}</span>
                                  {oitem.options && (
                                    <p className="text-[9px] text-[#FF6BB5] font-medium mt-0.5">
                                      🥩 {oitem.options}
                                    </p>
                                  )}
                                </div>
                                <span className="text-white/40 shrink-0">
                                  ${(oitem.price * oitem.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Customer note */}
                          {order.customer_note && (
                            <div className="mb-4 p-2.5 rounded-lg bg-black/35 border border-white/5 text-[10px] text-white/60 leading-relaxed">
                              <span className="font-bold text-white/80 block mb-0.5">Note:</span>
                              {order.customer_note}
                            </div>
                          )}
                        </div>

                        {/* Total price */}
                        <div className="flex justify-between items-center pt-3 border-t border-white/5 mt-auto">
                          <span className="text-[10px] uppercase font-bold text-white/40">Total</span>
                          <span className="text-sm font-bold text-[#D4AF37]">
                            ${Number(order.subtotal).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    )
                  })}
              </div>
            )}
          </div>
        )}

        {/* TAB Content: Feedback */}
        {activeAdminTab === 'Feedback' && (
          <div className="space-y-6 animate-fade-in">
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl text-center" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-[10px] uppercase font-bold text-white/40 tracking-wider mb-1">Total Submissions</p>
                <p className="text-2xl font-bold text-white">{totalCount}</p>
              </div>
              <div className="p-4 rounded-xl text-center" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-[10px] uppercase font-bold text-white/40 tracking-wider mb-1">Average Rating</p>
                <p className="text-2xl font-bold" style={{ color: '#D4AF37' }}>★ {averageRating}</p>
              </div>
              <div className="p-4 rounded-xl text-center" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-[10px] uppercase font-bold text-white/40 tracking-wider mb-1">Spicy Alert items</p>
                <p className="text-2xl font-bold text-[#E91E8C]">{feedbacks.filter(f => f.rawMessage.includes('🌶️') || f.rawMessage.toLowerCase().includes('picoso')).length}</p>
              </div>
              <div className="p-4 rounded-xl text-center" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-[10px] uppercase font-bold text-white/40 tracking-wider mb-1">Follow-up Needed</p>
                <p className="text-2xl font-bold text-green-400">{feedbacks.filter(f => f.phone !== 'N/A').length}</p>
              </div>
            </div>

            {/* Filter Controls Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Search bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search comments, customer name, phone..."
                  className="form-input w-full pl-9"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <Search size={14} className="absolute left-3 top-3.5 text-white/30" />
              </div>

              {/* Category Filter */}
              <div>
                <select
                  className="form-input w-full"
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Food">Food</option>
                  <option value="Service">Service</option>
                  <option value="Atmosphere">Atmosphere</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <select
                  className="form-input w-full"
                  value={ratingFilter}
                  onChange={e => setRatingFilter(e.target.value)}
                >
                  <option value="All">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
            </div>

            {/* Database Status Alert */}
            {dbError && (
              <div className="p-4 rounded-xl border text-xs bg-red-950/20 border-red-900 text-red-300">
                ⚠️ Database connection issue: {dbError}
              </div>
            )}

            {/* Loader */}
            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block w-8 h-8 rounded-full border-2 border-t-pink animate-spin" />
                <p className="text-xs text-white/40 mt-3">Fetching complaints...</p>
              </div>
            ) : filteredFeedbacks.length === 0 ? (
              <div className="text-center py-16 rounded-2xl" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.04)' }}>
                <p className="text-2xl mb-2">📭</p>
                <p className="font-semibold text-sm text-white">No complaints found</p>
                <p className="text-xs text-white/40 mt-1">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              /* Complaints List */
              <div className="space-y-4">
                {filteredFeedbacks.map(item => (
                  <div 
                    key={item.id}
                    className="rounded-2xl p-5 md:p-6 transition-all duration-200 border"
                    style={{ 
                      background: '#161616', 
                      borderColor: 'rgba(255,255,255,0.06)'
                    }}
                  >
                    {/* Upper Metadata Row */}
                    <div className="flex flex-wrap items-start justify-between gap-3 pb-4 mb-4 border-b border-white/5">
                      <div className="flex items-center gap-3">
                        <span 
                          className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                          style={{ 
                            background: 'rgba(233,30,140,0.1)', 
                            border: '1px solid rgba(233,30,140,0.2)',
                            color: '#E91E8C'
                          }}
                        >
                          {item.category}
                        </span>
                        <span className="font-display font-bold text-sm text-white">
                          {item.name}
                        </span>
                        <span className="text-xs text-yellow-500 font-bold">
                          {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs text-white/40">
                        <span>{item.created_at}</span>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1 text-white/30 hover:text-red-400 rounded transition-colors"
                          title="Delete log"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    {/* Grid details (Phone, Server, Table, Date, Time) */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4 bg-black/25 p-3.5 rounded-xl border border-white/5">
                      {/* Phone */}
                      <div className="flex items-start gap-2">
                        <Phone size={13} className="text-[#D4AF37] mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] text-white/40 uppercase font-semibold">Phone</p>
                          <p className="text-xs font-medium text-white">{item.phone}</p>
                        </div>
                      </div>
                      
                      {/* Server */}
                      <div className="flex items-start gap-2">
                        <User size={13} className="text-[#D4AF37] mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] text-white/40 uppercase font-semibold">Server Info</p>
                          <p className="text-xs font-medium text-white">{item.server}</p>
                        </div>
                      </div>

                      {/* Table */}
                      <div className="flex items-start gap-2">
                        <Hash size={13} className="text-[#D4AF37] mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] text-white/40 uppercase font-semibold">Table #</p>
                          <p className="text-xs font-medium text-white">{item.table}</p>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="flex items-start gap-2">
                        <Calendar size={13} className="text-[#D4AF37] mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] text-white/40 uppercase font-semibold">Visit Date</p>
                          <p className="text-xs font-medium text-white">{item.date}</p>
                        </div>
                      </div>

                      {/* Time */}
                      <div className="flex items-start gap-2 col-span-2 sm:col-span-1">
                        <Clock size={13} className="text-[#D4AF37] mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] text-white/40 uppercase font-semibold">Visit Time</p>
                          <p className="text-xs font-medium text-white">{item.time}</p>
                        </div>
                      </div>
                    </div>

                    {/* Complaint Comments */}
                    <div>
                      <p className="text-[10px] text-white/40 uppercase font-semibold mb-1">Customer Comments</p>
                      <p className="text-sm leading-relaxed text-white/95 whitespace-pre-wrap">
                        {item.comments}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB Content: Analytics */}
        {activeAdminTab === 'Analytics' && (
          <div className="space-y-6 animate-fade-in">
            {/* Empty State */}
            <div 
              className="text-center py-12 px-4 rounded-2xl border border-dashed"
              style={{ background: '#141414', borderColor: 'rgba(233,30,140,0.15)' }}
            >
              <p className="text-3xl mb-3">📊</p>
              <h3 className="font-semibold text-sm text-white">Analytics coming soon</h3>
              <p className="text-xs text-white/40 mt-1 max-w-sm mx-auto">
                Analytics coming soon. Click data will appear here once tracking is enabled.
              </p>
            </div>

            {/* Placeholders for Tracked Channels */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-4">
                Tracked Channels Preview
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Menu Views */}
                <div 
                  className="p-5 rounded-2xl border" 
                  style={{ background: '#161616', borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-white/60">Menu Views</span>
                    <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">+18%</span>
                  </div>
                  <p className="text-2xl font-bold text-white">1,420</p>
                  <p className="text-[10px] text-white/40 mt-1">Total page load events</p>
                </div>

                {/* Uber Eats Clicks */}
                <div 
                  className="p-5 rounded-2xl border" 
                  style={{ background: '#161616', borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-white/60">Uber Eats Clicks</span>
                    <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">+5%</span>
                  </div>
                  <p className="text-2xl font-bold text-white">284</p>
                  <p className="text-[10px] text-white/40 mt-1">Clicks on Uber Eats links</p>
                </div>

                {/* WhatsApp Clicks */}
                <div 
                  className="p-5 rounded-2xl border" 
                  style={{ background: '#161616', borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-white/60">WhatsApp Clicks</span>
                    <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">+24%</span>
                  </div>
                  <p className="text-2xl font-bold text-white">412</p>
                  <p className="text-[10px] text-white/40 mt-1">Clicks on order/chat links</p>
                </div>

                {/* Instagram Clicks */}
                <div 
                  className="p-5 rounded-2xl border" 
                  style={{ background: '#161616', borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-white/60">Instagram Clicks</span>
                    <span className="text-xs font-medium text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full">+12%</span>
                  </div>
                  <p className="text-2xl font-bold text-white">678</p>
                  <p className="text-[10px] text-white/40 mt-1">Clicks to official profile</p>
                </div>

                {/* Google Reviews Clicks */}
                <div 
                  className="p-5 rounded-2xl border" 
                  style={{ background: '#161616', borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-white/60">Google Reviews Clicks</span>
                    <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">+35%</span>
                  </div>
                  <p className="text-2xl font-bold text-white">345</p>
                  <p className="text-[10px] text-white/40 mt-1">Clicks on write-review button</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </PageLayout>
  )
}
