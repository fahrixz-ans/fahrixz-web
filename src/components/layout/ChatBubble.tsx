import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, X, Headphones, Sparkles, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHasNewMessage(true), 8000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <button
        onClick={() => { setIsOpen(!isOpen); setHasNewMessage(false) }}
        className={cn(
          'fixed bottom-24 lg:bottom-8 right-4 lg:right-8 z-50',
          'w-14 h-14 rounded-full shadow-2xl flex items-center justify-center',
          'transition-all duration-300 hover:scale-110',
          isOpen ? 'bg-gray-800 text-white' : 'bg-violet-600 text-white hover:bg-violet-700'
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            {hasNewMessage && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}
          </div>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 md:hidden" onClick={() => setIsOpen(false)} />
          <div
            className={cn(
              'fixed z-50 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800',
              'w-[calc(100%-2rem)] md:w-80',
              'bottom-40 md:bottom-24 right-4 md:right-8',
              'animate-in slide-in-from-bottom-5 fade-in duration-200'
            )}
          >
            <div className="p-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white">Butuh Bantuan?</h3>
              <p className="text-xs text-gray-500 mt-0.5">Pilih cara menghubungi kami</p>
            </div>

            <div className="p-3 space-y-2">
              <Link
                to="/support/chat"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl bg-violet-50 dark:bg-violet-900/20 hover:bg-violet-100 transition-colors"
              >
                <div className="w-10 h-10 bg-violet-100 dark:bg-violet-800 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-violet-600 dark:text-violet-300" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900 dark:text-white">Chat Frandsa</p>
                  <p className="text-xs text-gray-500">Jawaban instan 24/7</p>
                </div>
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              </Link>

              <Link
                to="/support/chat?handoff=true"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <Headphones className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900 dark:text-white">Chat Admin</p>
                  <p className="text-xs text-gray-500">Respons 2-5 menit</p>
                </div>
              </Link>

              <a
                href="https://wa.me/6285609949819"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900 dark:text-white">WhatsApp</p>
                  <p className="text-xs text-gray-500">0856-0994-9819</p>
                </div>
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}
