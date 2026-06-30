import PageLayout from '../components/PageLayout'
import { Phone, MessageSquare, Send, Mail } from 'lucide-react'

interface ContactMethod {
  id: string
  icon: React.ReactNode
  label: string
  sublabel: string
  href: string
  gradient: string
  border: string
  textColor: string
}

const CONTACT_METHODS: ContactMethod[] = [
  {
    id: 'text',
    icon: <MessageSquare size={28} />,
    label: 'Send a Text',
    sublabel: 'Text us at (916) 553-7072',
    href: 'sms:+19165537072',
    gradient: 'linear-gradient(135deg, rgba(6,180,89,0.15) 0%, rgba(6,180,89,0.06) 100%)',
    border: 'rgba(6,180,89,0.3)',
    textColor: '#4ADE80',
  },
  {
    id: 'call',
    icon: <Phone size={28} />,
    label: 'Call Us',
    sublabel: 'Call (916) 553-7072',
    href: 'tel:+19165537072',
    gradient: 'linear-gradient(135deg, rgba(233,30,140,0.15) 0%, rgba(233,30,140,0.06) 100%)',
    border: 'rgba(233,30,140,0.3)',
    textColor: '#E91E8C',
  },
  {
    id: 'whatsapp',
    icon: <span style={{ fontSize: '1.75rem' }}>💬</span>,
    label: 'WhatsApp',
    sublabel: 'Chat on WhatsApp',
    href: 'https://wa.me/19165537072',
    gradient: 'linear-gradient(135deg, rgba(37,211,102,0.15) 0%, rgba(37,211,102,0.06) 100%)',
    border: 'rgba(37,211,102,0.3)',
    textColor: '#25D366',
  },
  {
    id: 'email',
    icon: <Mail size={28} />,
    label: 'Email Us',
    sublabel: 'info@omgcocina.com',
    href: 'mailto:info@omgcocina.com',
    gradient: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.06) 100%)',
    border: 'rgba(212,175,55,0.3)',
    textColor: '#D4AF37',
  },
]

export default function ContactPage() {
  return (
    <PageLayout title="Contact Us" emoji="📞">
      <div className="section-wrapper" style={{ maxWidth: '600px', padding: '3.5rem 1.5rem' }}>
        {/* Info card */}
        <div
          className="rounded-2xl p-6 mb-8 text-center"
          style={{
            background: 'rgba(233,30,140,0.06)',
            border: '1px solid rgba(233,30,140,0.15)',
          }}
        >
          <p className="font-display text-xl font-bold mb-1" style={{ color: '#F5F5F5' }}>
            OMG Cocina
          </p>
          <p className="text-sm mb-1" style={{ color: 'rgba(245,245,245,0.5)' }}>
            1500 7th St #1F, Sacramento, CA 95814
          </p>
          <p className="text-sm font-semibold" style={{ color: '#D4AF37' }}>
            Phone: (916) 553-7072
          </p>
        </div>

        {/* Contact buttons */}
        <div className="grid grid-cols-1 gap-3.5">
          {CONTACT_METHODS.map(method => (
            <a
              key={method.id}
              id={`contact-${method.id}`}
              href={method.href}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200"
              style={{
                background: method.gradient,
                border: `1px solid ${method.border}`,
                color: method.textColor,
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateX(0)'
              }}
            >
              <div className="shrink-0">{method.icon}</div>
              <div className="flex-1">
                <p className="font-semibold text-base leading-tight" style={{ color: '#F5F5F5' }}>
                  {method.label}
                </p>
                <p className="text-xs" style={{ color: 'rgba(245,245,245,0.4)' }}>
                  {method.sublabel}
                </p>
              </div>
              <Send size={16} style={{ color: 'rgba(245,245,245,0.25)', flexShrink: 0 }} />
            </a>
          ))}
        </div>

        {/* Business hours summary */}
        <div
          className="mt-8 rounded-2xl p-5"
          style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.15)' }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3 text-center"
            style={{ color: '#D4AF37' }}
          >
            🕐 Opening Hours
          </p>
          <div className="grid grid-cols-2 gap-1.5 text-sm">
            {[
              ['Monday', '9am–7pm'],
              ['Tue–Thu', '9am–8pm'],
              ['Friday', '9am–7pm'],
              ['Saturday', '10am–3pm'],
              ['Sunday', 'Closed'],
            ].map(([day, time]) => (
              <div key={day} className="flex justify-between">
                <span style={{ color: 'rgba(245,245,245,0.5)' }}>{day}</span>
                <span
                  className="font-medium"
                  style={{ color: time === 'Closed' ? 'rgba(245,245,245,0.2)' : '#F5F5F5' }}
                >
                  {time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
