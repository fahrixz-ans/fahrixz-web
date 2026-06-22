import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search, ShoppingCart, Bell, User,
  MessageCircle, Heart, LogOut, Settings, Package,
  Wallet,
} from 'lucide-react'
import { useAuthStore } from '@/stores/useAuthStore'
import { useCartStore } from '@/stores/useCartStore'
import { useNotificationStore } from '@/stores/useNotificationStore'
import { useThemeStore } from '@/stores/useThemeStore'
import { Sun, Moon } from 'lucide-react'

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [avatarOpen, setAvatarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const { isLoggedIn, user, logout } = useAuthStore()
  const { getTotalItems } = useCartStore()
  const { unreadCount } = useNotificationStore()
  const { darkMode, toggleDarkMode } = useThemeStore()

  const cartCount = getTotalItems()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo - Left */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img 
            src="/logo.png" 
            alt="Fahri Xz Store" 
            className="w-9 h-9 rounded-lg object-cover"
          />
          <span className="font-semibold text-gray-900 dark:text-white text-sm hidden sm:block">
            Fahri Xz Store
          </span>
        </Link>

        {/* Search - Center */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari produk..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
            />
          </div>
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
          >
            <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Help Chat */}
          <Link
            to="/support/chat"
            className="hidden md:flex items-center gap-2 px-3 py-2 text-sm font-medium text-violet-600 bg-violet-50 dark:bg-violet-900/20 hover:bg-violet-100 rounded-xl transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Bantuan</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          </Link>

          {isLoggedIn && (
            <Link to="/notifications" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>
          )}

          <Link to="/cart" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
            <ShoppingCart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-violet-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setAvatarOpen(!avatarOpen)}
                className="w-9 h-9 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center hover:ring-2 hover:ring-violet-500 transition-all"
              >
                <span className="text-violet-600 dark:text-violet-400 font-bold text-sm">
                  {user?.fullName?.charAt(0) || 'U'}
                </span>
              </button>

              {avatarOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setAvatarOpen(false)} />
                  <div className="absolute right-0 top-12 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 z-50 py-2">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                      <p className="font-semibold text-gray-900 dark:text-white">{user?.fullName}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <div className="p-2 space-y-1">
                      <Link to="/dashboard" onClick={() => setAvatarOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm">
                        <User className="w-4 h-4 text-gray-500" /> Dashboard
                      </Link>
                      <Link to="/orders" onClick={() => setAvatarOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm">
                        <Package className="w-4 h-4 text-gray-500" /> Pesanan Saya
                      </Link>
                      <Link to="/wallet" onClick={() => setAvatarOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm">
                        <Wallet className="w-4 h-4 text-gray-500" /> Wallet
                      </Link>
                      <Link to="/wishlist" onClick={() => setAvatarOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm">
                        <Heart className="w-4 h-4 text-gray-500" /> Wishlist
                      </Link>
                      <Link to="/settings" onClick={() => setAvatarOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm">
                        <Settings className="w-4 h-4 text-gray-500" /> Pengaturan
                      </Link>
                    </div>
                    <div className="p-2 border-t border-gray-100 dark:border-gray-800">
                      <button onClick={() => { logout(); setAvatarOpen(false); }} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 text-sm w-full">
                        <LogOut className="w-4 h-4" /> Keluar
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Masuk</span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produk..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
                autoFocus
              />
            </div>
          </form>
        </div>
      )}
    </header>
  )
}