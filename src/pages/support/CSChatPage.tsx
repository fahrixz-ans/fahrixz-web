import { useState, useRef, useEffect } from 'react'
import { Send, User, Headphones, Sparkles, ArrowLeft, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/useAuthStore'
import { SEO } from '@/components/shared/SEO'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  sender: 'user' | 'ai' | 'admin'
  text: string
  timestamp: Date
}

export function CSChatPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Halo${user?.fullName ? ' ' + user.fullName : ''}! Saya Frandsa, customer service Fahri Xz Store. Ada yang bisa saya bantu hari ini?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<'ai' | 'human'>('ai')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/frandsa/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
          context: {
            userName: user?.fullName,
            userId: user?.uid,
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.reply,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])

      if (data.needsHandoff) {
        setMode('human')
      }
    } catch (error) {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Maaf, ada gangguan teknis. Silakan coba lagi atau hubungi admin via WhatsApp 0856-0994-9819.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const switchToHuman = async () => {
    setMode('human')
    
    // Kirim handoff ke server
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/frandsa/handoff`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: user?.uid || 'anonymous',
          userId: user?.uid,
          reason: 'User requested admin',
        }),
      })
    } catch (error) {
      console.error('Handoff error:', error)
    }

    const adminMessage: Message = {
      id: Date.now().toString(),
      sender: 'admin',
      text: 'Halo! Anda terhubung dengan admin Fahri Xz Store. Ada yang bisa kami bantu?',
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, adminMessage])
  }

  return (
    <>
      <SEO title="Chat Frandsa" />
      <div className="flex flex-col h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/20 rounded-full flex items-center justify-center">
              {mode === 'ai' ? (
                <Sparkles className="w-5 h-5 text-violet-600" />
              ) : (
                <Headphones className="w-5 h-5 text-green-600" />
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {mode === 'ai' ? 'Frandsa (AI)' : 'Admin'}
              </p>
              <div className="flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs text-green-600">Online</span>
              </div>
            </div>
          </div>
          {mode === 'ai' && (
            <button
              onClick={switchToHuman}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-violet-600 bg-violet-50 dark:bg-violet-900/20 rounded-lg hover:bg-violet-100 transition-colors"
            >
              <Headphones className="w-4 h-4" />
              Hubungi Admin
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50 dark:bg-gray-950">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex gap-3',
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.sender !== 'user' && (
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                  message.sender === 'ai' ? 'bg-violet-100' : 'bg-green-100'
                )}>
                  {message.sender === 'ai' ? (
                    <Sparkles className="w-4 h-4 text-violet-600" />
                  ) : (
                    <Headphones className="w-4 h-4 text-green-600" />
                  )}
                </div>
              )}
              <div
                className={cn(
                  'max-w-[80%] px-4 py-3 rounded-2xl text-sm',
                  message.sender === 'user'
                    ? 'bg-violet-600 text-white rounded-br-none'
                    : message.sender === 'admin'
                    ? 'bg-green-100 dark:bg-green-900/20 text-gray-900 dark:text-white rounded-bl-none'
                    : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-bl-none shadow-sm'
                )}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
                <p className={cn(
                  'text-[10px] mt-1',
                  message.sender === 'user' ? 'text-violet-200' : 'text-gray-400'
                )}>
                  {message.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-violet-600" />
              </div>
              <div className="bg-white dark:bg-gray-900 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                <Loader2 className="w-4 h-4 animate-spin text-violet-600" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik pesan..."
              className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="p-2.5 bg-violet-600 text-white rounded-xl hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}