import { useState, useRef, useEffect } from 'react'
import { X, Send } from 'lucide-react'
import botAvatar from '../assets/bot-avatar.png'
import { MENU_CATEGORIES } from './menuData'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatbotProps {
  externalOpen?: boolean
  onExternalClose?: () => void
}

function formatMenuForBot(): string {
  let text = 'OMG COCINA DIGITAL MENU:\n'
  MENU_CATEGORIES.forEach(cat => {
    text += `\n[Category: ${cat.label} ${cat.emoji}]\n`
    cat.items.forEach(item => {
      text += `- ${item.name} | Price: ${item.price}`
      if (item.description) text += ` (${item.description})`
      if (item.note) text += ` [Note: ${item.note}]`
      if (item.addons) text += ` [Add-ons: ${item.addons.join(', ')}]`
      text += '\n'
    })
  })
  return text
}

const getSystemPrompt = (): string => {
  const menuText = formatMenuForBot()
  return `You are OMG Bot, the friendly AI assistant for OMG Cocina, a family-owned Mexican restaurant in Sacramento, CA.

Restaurant Information:
- Address: 1500 7th St #1F, Sacramento, CA 95814
- Phone: (916) 553-7072
- Hours:
  * Monday: 9am-7pm
  * Tuesday - Thursday: 9am-8pm
  * Friday: 9am-7pm
  * Saturday: 10am-3pm
  * Sunday: Closed

Socials & Important Links:
- Instagram: https://www.instagram.com/omg.cocina/
- TikTok: https://www.tiktok.com/t/ZP8GjwTpd/
- Uber Eats (Order Online): https://www.ubereats.com/store/omg-cocina-mexican-restaurant/SR-uZ74BQ7qPa6TXCnftEQ

Interaction Guidelines:
- You help customers with menu questions, hours, location, and reservations.
- You speak in a warm, friendly tone and can respond in English or Spanish.
- Keep answers concise and helpful.
- Suggest links naturally when relevant (e.g. if asked about delivery/online ordering, share the Uber Eats link; if asked about visual items/updates/photos, suggest following Instagram or TikTok).

${menuText}
`.trim()
}

const QUICK_PROMPTS = [
  'What are the hours?',
  'Are there vegetarian options?',
  'Where are you located?',
  'How can I order?',
]

export default function Chatbot({ externalOpen, onExternalClose }: ChatbotProps) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I am OMG Bot 🌸 How can I help you today? I can answer questions about our menu, hours, location, and more. Feel free to ask me in English or Spanish!',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Sync external open state (triggered from Home nav tile)
  useEffect(() => {
    if (externalOpen) {
      setOpen(true)
    }
  }, [externalOpen])

  const handleClose = () => {
    setOpen(false)
    onExternalClose?.()
  }

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return

    const userMessage: Message = { role: 'user', content: text }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      const apiEndpoint = isLocal ? 'https://omg-cocina.vercel.app/api/chat' : '/api/chat'

      // Fetch via serverless proxy to bypass browser CORS block and secure the key
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 512,
          system: getSystemPrompt(),
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: text },
          ],
        }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        if (err.error === 'Chat API configuration error') {
          throw new Error('API_KEY_MISSING')
        }
        const status = err.error?.status || response.status
        const type = err.error?.type || 'api_error'
        const msg = err.error?.message || err.error || JSON.stringify(err)
        throw new Error(`[Status ${status} | ${type}] ${msg}`)
      }

      const data = await response.json()
      const botReply = data.content?.[0]?.text || 'Sorry, I couldn\'t respond. Please call us at (916) 553-7072.'

      setMessages(prev => [...prev, { role: 'assistant', content: botReply }])
    } catch (err: any) {
      console.error('Chat error:', err)
      const errorText = err.message === 'API_KEY_MISSING'
        ? 'Oops! The Anthropic API Key is not configured on Vercel yet. Please add ANTHROPIC_API_KEY in your Vercel project settings dashboard. 🌸'
        : `Oops! There was a connection issue. Details: ${err.message || 'Unknown error'}. 🌸`
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: errorText,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        id="chatbot-toggle"
        className="chat-bubble"
        style={{ overflow: 'hidden', padding: 0 }}
        onClick={() => open ? handleClose() : setOpen(true)}
        aria-label={open ? 'Close chat' : 'Open chat with OMG Bot'}
        aria-expanded={open}
      >
        {open ? (
          <X size={24} color="white" />
        ) : (
          <img src={botAvatar} alt="OMG Bot Chef" className="w-full h-full object-cover" />
        )}
      </button>

      {/* Chat modal */}
      {open && (
        <div
          id="chatbot-modal"
          className="fixed bottom-24 right-4 z-50 flex flex-col rounded-2xl overflow-hidden shadow-2xl"
          style={{
            width: 'min(380px, calc(100vw - 2rem))',
            height: '500px',
            background: '#0A0A0A',
            border: '1px solid rgba(233,30,140,0.3)',
            animation: 'slideUp 0.3s ease-out',
          }}
          role="dialog"
          aria-label="OMG Bot chat"
          aria-modal="true"
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3.5 shrink-0"
            style={{
              background: 'linear-gradient(135deg, #E91E8C 0%, #C0166E 100%)',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <img src={botAvatar} alt="OMG Bot Chef" className="w-9 h-9 rounded-full object-cover border border-white/20 shrink-0" />
            <div>
              <p className="font-bold text-sm text-white leading-tight">OMG Bot</p>
              <p className="text-xs text-white/70">OMG Cocina Assistant</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-white/70">Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.role === 'user' ? 'chat-message-user' : 'chat-message-bot'}
                style={{ animation: 'fadeIn 0.2s ease-out' }}
              >
                {msg.content}
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="chat-message-bot flex items-center gap-1.5">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompts */}
          {messages.length === 1 && !loading && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-full transition-colors"
                  style={{
                    background: 'rgba(233,30,140,0.1)',
                    border: '1px solid rgba(233,30,140,0.25)',
                    color: '#FF6BB5',
                  }}
                  onClick={() => sendMessage(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            className="flex items-center gap-2 px-3 py-3 shrink-0"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(26,26,26,0.9)' }}
          >
            <input
              ref={inputRef}
              id="chatbot-input"
              type="text"
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: '#F5F5F5' }}
              placeholder="Type your question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Message for OMG Bot"
            />
            <button
              id="chatbot-send"
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all"
              style={{
                background: input.trim() && !loading
                  ? 'linear-gradient(135deg, #D4AF37, #A88A20)'
                  : 'rgba(212,175,55,0.15)',
                cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
              }}
              aria-label="Send message"
            >
              <Send size={14} color={input.trim() && !loading ? '#0A0A0A' : '#555'} />
            </button>
          </div>

          {/* Footer disclaimer */}
          <div
            className="text-center py-1 text-xs"
            style={{ color: 'rgba(245,245,245,0.2)', background: '#0A0A0A' }}
          >
            Powered by AI · Conect-R
          </div>
        </div>
      )}
    </>
  )
}
