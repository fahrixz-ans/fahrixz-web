import { Link, useLocation } from 'react-router-dom'
import { Home, ShoppingBag, Gift, Wallet, User, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/useAuthStore'
import { useCartStore } from '@/stores/useCartStore'

export function MobileNav() {
  const location = useLocation()
  const { isLoggedIn } = useAuthStore()
  const { getTotalItems } = useCartStore()
  const cartCount = getTotalItems()

  const navItems = [
    { icon: Home, label: 'Beranda', href: '/' },
    { icon: ShoppingBag, label: 'Produk', href: '/products' },
    { icon: Gift, label: 'Quest', href: '/cashquest' },
    { icon: MessageCircle, label: 'Bantuan', href: '/support/chat', badge: true },
    { icon: isLoggedIn ? User : Wallet, label: isLoggedIn ? 'Akun' : 'Wallet', href: isLoggedIn ? '/dashboard' : '/wallet' },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50 pb-safe">
      <div className="flex items-center justify-around px-1 py-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors relative min-w-[64px]',
                isActive
                  ? 'text-violet-600 bg-violet-50 dark:bg-violet-900/20'
                  : 'text-gray-500 dark:text-gray-400'
              )}
            >
              <div className="relative">
                <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                {item.label === 'Produk' && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-violet-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
                {item.badge && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
