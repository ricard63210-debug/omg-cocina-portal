import { useState, useEffect } from 'react'
import PageLayout from '../components/PageLayout'
import { supabase } from '../lib/supabase'
import { Eye, EyeOff, Search, Trash2, Calendar, User, Hash, Phone, Clock } from 'lucide-react'

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
    <PageLayout title="Complaints Dashboard" emoji="📊">
      <div className="section-wrapper" style={{ maxWidth: '1200px', padding: '2rem 1.5rem 4rem' }}>
        
        {/* Header Action Row */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display font-bold text-lg text-white">Management Console</h2>
            <p className="text-xs text-white/50">View, search, and manage customer feedback logs.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={fetchFeedbacks}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all text-white hover:bg-white/5"
              style={{ borderColor: 'rgba(255,255,255,0.15)', background: 'transparent' }}
            >
              🔄 Refresh
            </button>
            <button
              onClick={handleLogout}
              className="btn-pink py-1.5 px-3 rounded-lg text-xs font-semibold"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
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
          <div className="p-4 rounded-xl mb-6 border text-xs bg-red-950/20 border-red-900 text-red-300">
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
                className="rounded-2xl p-5 md:p-6 transition-all duration-200"
                style={{ 
                  background: '#161616', 
                  border: '1px solid rgba(255,255,255,0.06)'
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
    </PageLayout>
  )
}
