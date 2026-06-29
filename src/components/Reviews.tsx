import { SectionDivider } from './RoseDecor'
import { ExternalLink, Star } from 'lucide-react'

interface Review {
  id: string
  text: string
  author: string
  source: string
  rating: number
}

const REVIEWS: Review[] = [
  {
    id: 'review-1',
    text: '"What a hidden gem! The mango shrimp tacos were out of this world — fresh ingredients and a perfect balance of sweet and savory. Service was top-tier!"',
    author: 'Cliente Satisfecho',
    source: 'Google Review',
    rating: 5,
  },
  {
    id: 'review-2',
    text: '"Family-run restaurant with amazing food. The carnitas are tender and flavorful, and the staff is always friendly and helpful."',
    author: 'Cliente Satisfecho',
    source: 'Google Review',
    rating: 5,
  },
  {
    id: 'review-3',
    text: '"First time here and I was shocked with how much food came out for $15. The chicken taco plate was absolutely delicious! Will definitely be back."',
    author: 'Cliente Satisfecho',
    source: 'Google Review',
    rating: 5,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          fill={i < rating ? '#D4AF37' : 'none'}
          stroke={i < rating ? '#D4AF37' : '#444'}
        />
      ))}
    </div>
  )
}

export default function Reviews() {
  return (
    <section
      id="reviews"
      style={{ background: '#0A0A0A' }}
    >
      <div className="section-wrapper">
        <SectionDivider title="Lo Que Dicen Nuestros Clientes ⭐" />

        {/* Rating summary */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl"
            style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)' }}
          >
            <span className="font-display font-bold text-4xl" style={{ color: '#D4AF37' }}>5.0</span>
            <div className="text-left">
              <div className="flex gap-0.5 mb-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="#D4AF37" stroke="#D4AF37" />
                ))}
              </div>
              <p className="text-xs" style={{ color: 'rgba(245,245,245,0.5)' }}>
                Reseñas de Google
              </p>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-10">
          {REVIEWS.map(review => (
            <div key={review.id} className="review-card">
              <StarRating rating={review.rating} />
              <blockquote
                className="text-sm leading-relaxed mb-4 font-display italic"
                style={{ color: 'rgba(245,245,245,0.8)' }}
              >
                {review.text}
              </blockquote>
              <footer className="flex items-center justify-between">
                <span className="text-xs font-semibold" style={{ color: '#D4AF37' }}>
                  — {review.author}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(66,133,244,0.12)', color: 'rgba(66,133,244,0.9)' }}
                >
                  {review.source}
                </span>
              </footer>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            id="google-review-btn"
            href="https://search.google.com/local/writereview?placeid=ChIJe3J7e-_NmoAR4RaEpPpYeKU"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-2"
          >
            <ExternalLink size={15} />
            Dejar una Reseña en Google
          </a>
          <p className="text-xs mt-3" style={{ color: 'rgba(245,245,245,0.25)' }}>
            Tu opinión nos ayuda a mejorar y a conectar con más clientes 🌹
          </p>
        </div>
      </div>
    </section>
  )
}
