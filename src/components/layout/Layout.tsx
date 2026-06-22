import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileNav } from './MobileNav'
import { ChatBubble } from './ChatBubble'
import { Sidebar } from './Sidebar'
import { useThemeStore } from '@/stores/useThemeStore'
import { Toaster } from 'react-hot-toast'

export function Layout() {
  const location = useLocation()
  const { darkMode } = useThemeStore()

  const noChatPages = ['/support/chat', '/admin']
  const showChat = !noChatPages.some((path) => location.pathname.startsWith(path))
  const isAuthPage = ['/login', '/register', '/forgot-password'].some((path) =>
    location.pathname.startsWith(path)
  )

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 ${darkMode ? 'dark' : ''}`}>
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'dark:bg-gray-800 dark:text-white',
        }}
      />
      {!isAuthPage && <Sidebar />}
      <div className={`flex-1 flex flex-col ${!isAuthPage ? 'lg:ml-64' : ''}`}>
        <Navbar />
        <main className="flex-1 pb-20 lg:pb-0">
          <Outlet />
        </main>
        <Footer />
      </div>
      <MobileNav />
      {showChat && <ChatBubble />}
    </div>
  )
}
