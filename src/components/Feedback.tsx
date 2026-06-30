import { useState } from 'react'
import { Star, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { SectionDivider } from './RoseDecor'
import { supabase } from '../lib/supabase'

type Category = 'Food' | 'Service' | 'Atmosphere' | 'Other'
const CATEGORIES: Category[] = ['Food', 'Service', 'Atmosphere', 'Other']

interface FormState {
  name: string
  rating: number
  category: Category | ''
  message: string
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

export default function Feedback() {
  const [form, setForm] = useState<FormState>({
    name: '',
    rating: 0,
    category: '',
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

    try {
      const { error } = await supabase.from('omg_feedback').insert({
        name: form.name.trim() || null,
        rating: form.rating,
        category: form.category || null,
        message: form.message.trim(),
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
      <div className="section-wrapper">
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
                  setForm({ name: '', rating: 0, category: '', message: '' })
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

              {/* Message */}
              <div>
                <label
                  htmlFor="feedback-message"
                  className="block text-xs font-semibold mb-1.5 uppercase tracking-wider"
                  style={{ color: 'rgba(245,245,245,0.6)' }}
                >
                  Message <span style={{ color: '#E91E8C' }}>*</span>
                </label>
                <textarea
                  id="feedback-message"
                  className="form-input resize-none"
                  rows={4}
                  placeholder="Tell us about your experience..."
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
                className="btn-pink w-full justify-center"
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
