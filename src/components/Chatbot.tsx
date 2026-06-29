import { useState, useRef, useEffect } from 'react'
import { X, Send } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SYSTEM_PROMPT = `You are OMG Bot, the friendly AI assistant for OMG Cocina, a family-owned Mexican restaurant at 1500 7th St #1F, Sacramento, CA 95814. Phone: (916) 553-7072. Hours: Mon 9am-7pm, Tue-Thu 9am-8pm, Fri 9am-7pm, Sat 10am-3pm, Sun closed. You help customers with menu questions, hours, location, and reservations. You speak in a warm, friendly tone and can respond in English or Spanish. Keep answers concise and helpful. Always encourage customers to visit or order on Uber Eats.`

const QUICK_PROMPTS = [
  '¿Cuál es el horario?',
  '¿Tienen opciones vegetarianas?',
  '¿Dónde están ubicados?',
  '¿Cómo puedo ordenar?',
]

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '¡Hola! Soy OMG Bot 🌸 ¿En qué te puedo ayudar hoy? Puedo responder preguntas sobre el menú, horarios, ubicación y más. ¡Pregúntame en español o inglés!',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY as string

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-allow-browser': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: 512,
          system: SYSTEM_PROMPT,
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: text },
          ],
        }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.error?.message || `HTTP ${response.status}`)
      }

      const data = await response.json()
      const botReply = data.content?.[0]?.text || 'Lo siento, no pude responder. Por favor llámanos al (916) 553-7072.'

      setMessages(prev => [...prev, { role: 'assistant', content: botReply }])
    } catch (err) {
      console.error('Chat error:', err)
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: '¡Ups! Hubo un problema con la conexión. Puedes llamarnos directamente al (916) 553-7072 o visitarnos en 1500 7th St #1F, Sacramento. 🌸',
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
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Cerrar chat' : 'Abrir chat con OMG Bot'}
        aria-expanded={open}
      >
        {open ? (
          <X size={24} color="white" />
        ) : (
          <span className="text-2xl">🌸</span>
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
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0"
              style={{ background: 'rgba(0,0,0,0.2)' }}
            >
              🌸
            </div>
            <div>
              <p className="font-bold text-sm text-white leading-tight">OMG Bot</p>
              <p className="text-xs text-white/70">Asistente de OMG Cocina</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-white/70">En línea</span>
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
              placeholder="Escribe tu pregunta..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Mensaje para OMG Bot"
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
              aria-label="Enviar mensaje"
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
