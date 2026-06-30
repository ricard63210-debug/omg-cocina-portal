import { useState } from 'react'
import { Star, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { SectionDivider } from './RoseDecor'
import { supabase } from '../lib/supabase'

type Category = 'Food' | 'Service' | 'Atmosphere' | 'Other'
const CATEGORIES: Category[] = ['Food', 'Service', 'Atmosphere', 'Other']

interface FormState {
  name: string
  phone: string
  rating: number
  category: Category | ''
  serverInfo: string
  tableNumber: string
  visitDate: string
  visitTime: string
  message: string
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

export default function Feedback() {
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    rating: 0,
    category: '',
    serverInfo: '',
    tableNumber: '',
    visitDate: '',
    visitTime: '',
    message: '',
  })
  const [hoverRating, setHoverRating] = useState(0)
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.rating === 0) {
      setErrorMsg('Please select a rating.')
      return
    }
    if (!form.message.trim()) {
      setErrorMsg('Please write a comment.')
      return
    }
    setErrorMsg('')
    setStatus('loading')

    // Create a structured message containing all tracking details for complaints/follow-ups
    const structuredMessage = `
[Feedback Detail Summary]
- Rating: ${form.rating} Stars
- Category: ${form.category || 'N/A'}
- Phone Number: ${form.phone.trim() || 'N/A'}
- Server Name/Number: ${form.serverInfo.trim() || 'N/A'}
- Table Number: ${form.tableNumber.trim() || 'N/A'}
- Date of Visit: ${form.visitDate || 'N/A'}
- Time of Visit: ${form.visitTime || 'N/A'}

[Comments]:
${form.message.trim()}
`.trim()

    try {
      const { error } = await supabase.from('omg_feedback').insert({
        name: form.name.trim() || null,
        rating: form.rating,
        category: form.category || null,
        message: structuredMessage,
      })

      if (error) throw error
      setStatus('success')
    } catch (err) {
      console.error('Feedback error:', err)
      setStatus('error')
      setErrorMsg('An error occurred. Please try again.')
    }
  }

  return (
    <section
      id="feedback"
      style={{
        background: 'linear-gradient(180deg, #0A0A0A 0%, rgba(233,30,140,0.03) 50%, #0A0A0A 100%)',
      }}
    >
      <div className="section-wrapper animate-fade-in">
        <SectionDivider title="Your Feedback Matters 💬" />

        <div
          className="max-w-xl mx-auto rounded-2xl p-8"
          style={{ background: '#1A1A1A', border: '1px solid rgba(233,30,140,0.15)' }}
        >
          {status === 'success' ? (
            /* Thank you message */
            <div className="text-center py-8" style={{ animation: 'slideUp 0.4s ease-out' }}>
              <CheckCircle
                size={56}
                className="mx-auto mb-4"
                style={{ color: '#E91E8C' }}
              />
              <p
                className="font-display text-xl font-semibold mb-2"
                style={{ color: '#E91E8C' }}
              >
                Thank you for your feedback!
              </p>
              <p className="text-sm" style={{ color: 'rgba(245,245,245,0.6)' }}>
                We will review it soon. 🌸
              </p>
              <button
                className="btn-pink mt-6"
                onClick={() => {
                  setForm({
                    name: '',
                    phone: '',
                    rating: 0,
                    category: '',
                    serverInfo: '',
                    tableNumber: '',
                    visitDate: '',
                    visitTime: '',
                    message: '',
                  })
                  setStatus('idle')
                }}
              >
                Submit another comment
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="feedback-name"
                  className="block text-xs font-semibold mb-1.5 uppercase tracking-wider"
                  style={{ color: 'rgba(245,245,245,0.6)' }}
                >
                  Name <span style={{ color: 'rgba(245,245,245,0.3)' }}>(optional)</span>
                </label>
                <input
                  id="feedback-name"
                  type="text"
                  className="form-input"
                  placeholder="Your name..."
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="feedback-phone"
                  className="block text-xs font-semibold mb-1.5 uppercase tracking-wider"
                  style={{ color: 'rgba(245,245,245,0.6)' }}
                >
                  Phone Number <span style={{ color: 'rgba(245,245,245,0.3)' }}>(optional, for follow-up)</span>
                </label>
                <input
                  id="feedback-phone"
                  type="tel"
                  className="form-input"
                  placeholder="Your phone number..."
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                />
              </div>

              {/* Star rating */}
              <div>
                <p
                  className="text-xs font-semibold mb-2 uppercase tracking-wider"
                  style={{ color: 'rgba(245,245,245,0.6)' }}
                >
                  Rating <span style={{ color: '#E91E8C' }}>*</span>
                </p>
                <div className="flex gap-2" role="group" aria-label="Rating from 1 to 5 stars">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      id={`star-${star}`}
                      aria-label={`${star} star${star > 1 ? 's' : ''}`}
                      aria-pressed={form.rating >= star}
                      className="star transition-transform"
                      style={{ color: (hoverRating || form.rating) >= star ? '#D4AF37' : '#333' }}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setForm(f => ({ ...f, rating: star }))}
                    >
                      <Star
                        size={28}
                        fill={(hoverRating || form.rating) >= star ? '#D4AF37' : 'none'}
                        stroke={(hoverRating || form.rating) >= star ? '#D4AF37' : '#444'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="feedback-category"
                  className="block text-xs font-semibold mb-1.5 uppercase tracking-wider"
                  style={{ color: 'rgba(245,245,245,0.6)' }}
                >
                  Category
                </label>
                <select
                  id="feedback-category"
                  className="form-input"
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value as Category | '' }))}
                >
                  <option value="">Select category...</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Restructured Follow-up Details Grid */}
              <div className="border-t border-b border-black-border py-4 my-2 space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#D4AF37' }}>
                  📋 Visit Details (For Follow-Up)
                </p>
                
                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label
                      htmlFor="feedback-server"
                      className="block text-xxs font-semibold mb-1.5 uppercase tracking-wider text-white/50"
                    >
                      Server Name / #
                    </label>
                    <input
                      id="feedback-server"
                      type="text"
                      className="form-input text-sm"
                      placeholder="e.g. Maria / 12"
                      value={form.serverInfo}
                      onChange={e => setForm(f => ({ ...f, serverInfo: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="feedback-table"
                      className="block text-xxs font-semibold mb-1.5 uppercase tracking-wider text-white/50"
                    >
                      Table Number
                    </label>
                    <input
                      id="feedback-table"
                      type="text"
                      className="form-input text-sm"
                      placeholder="e.g. 5"
                      value={form.tableNumber}
                      onChange={e => setForm(f => ({ ...f, tableNumber: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label
                      htmlFor="feedback-date"
                      className="block text-xxs font-semibold mb-1.5 uppercase tracking-wider text-white/50"
                    >
                      Date of Visit
                    </label>
                    <input
                      id="feedback-date"
                      type="date"
                      className="form-input text-sm"
                      value={form.visitDate}
                      onChange={e => setForm(f => ({ ...f, visitDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="feedback-time"
                      className="block text-xxs font-semibold mb-1.5 uppercase tracking-wider text-white/50"
                    >
                      Time of Visit
                    </label>
                    <input
                      id="feedback-time"
                      type="time"
                      className="form-input text-sm"
                      value={form.visitTime}
                      onChange={e => setForm(f => ({ ...f, visitTime: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="feedback-message"
                  className="block text-xs font-semibold mb-1.5 uppercase tracking-wider"
                  style={{ color: 'rgba(245,245,245,0.6)' }}
                >
                  Message / Comments <span style={{ color: '#E91E8C' }}>*</span>
                </label>
                <textarea
                  id="feedback-message"
                  className="form-input resize-none"
                  rows={4}
                  placeholder="Share details of your experience to help us improve..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                />
              </div>

              {/* Error */}
              {errorMsg && (
                <div
                  className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg"
                  style={{ background: 'rgba(233,30,140,0.1)', color: '#FF6BB5', border: '1px solid rgba(233,30,140,0.2)' }}
                >
                  <AlertCircle size={14} />
                  {errorMsg}
                </div>
              )}

              {/* Submit */}
              <button
                id="feedback-submit"
                type="submit"
                disabled={status === 'loading'}
                className="btn-pink w-full justify-center py-3.5 text-base"
                style={{ borderRadius: '50px' }}
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <>
                    <Send size={16} />
                    Submit Feedback
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
