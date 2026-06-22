import { Link, useLocation } from 'react-router-dom'
import {
  Home, ShoppingBag, Gift, Wallet, User,
  HelpCircle, MessageCircle, LogOut, Menu, X,
  Trophy, Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/useAuthStore'
import { useState } from 'react'

const mainNavItems = [
  { icon: Home, label: 'Beranda', href: '/' },
  { icon: ShoppingBag, label: 'Produk', href: '/products' },
  { icon: Gift, label: 'Cash Quest', href: '/cashquest' },
  { icon: Trophy, label: 'Referral', href: '/referral' },
]

const userNavItems = [
  { icon: Wallet, label: 'Wallet', href: '/wallet' },
  { icon: User, label: 'Profil', href: '/dashboard' },
  { icon: Sparkles, label: 'Voucher', href: '/vouchers' },
]

const supportNavItems = [
  { icon: MessageCircle, label: 'Chat Frandsa', href: '/support/chat' },
  { icon: HelpCircle, label: 'Bantuan', href: '/support' },
]

export function Sidebar() {
  const location = useLocation()
  const { isLoggedIn, user, logout } = useAuthStore()
  const [collapsed, setCollapsed] = useState(false)

  const NavItem = ({ icon: Icon, label, href }: { icon: any; label: string; href: string }) => {
    const isActive = location.pathname === href
    return (
      <Link
        to={href}
        className={cn(
          'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
          isActive
            ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/25'
            : 'text-gray-600 dark:text-gray-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:text-violet-600'
        )}
      >
        <Icon className={cn('w-5 h-5 shrink-0', isActive && 'text-white')} />
        {!collapsed && <span className="font-medium text-sm">{label}</span>}
      </Link>
    )
  }

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40 hidden lg:flex flex-col transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="p-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-violet-600 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">FX</span>
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-semibold text-gray-900 dark:text-white leading-tight text-sm">Fahri Xz</h1>
              <p className="text-[10px] text-gray-500">Store</p>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          {collapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <div className="pb-2">
          {!collapsed && (
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Menu
            </p>
          )}
          {mainNavItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </div>

        {isLoggedIn && (
          <div className="py-2 border-t border-gray-100 dark:border-gray-800">
            {!collapsed && (
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Akun
              </p>
            )}
            {userNavItems.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </div>
        )}

        <div className="py-2 border-t border-gray-100 dark:border-gray-800">
          {!collapsed && (
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Bantuan
            </p>
          )}
          {supportNavItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </div>
      </nav>

      <div className="p-3 border-t border-gray-100 dark:border-gray-800">
        {isLoggedIn ? (
          <div className={cn('flex items-center gap-3 px-3 py-2', collapsed && 'justify-center')}>
            <div className="w-9 h-9 bg-violet-100 rounded-full flex items-center justify-center shrink-0">
              <span className="text-violet-600 font-bold text-sm">
                {user?.fullName?.charAt(0) || 'U'}
              </span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.fullName}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            )}
            {!collapsed && (
              <button onClick={logout} className="p-2 hover:bg-red-50 text-red-500 rounded-lg">
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors"
          >
            <User className="w-4 h-4" />
            {!collapsed && 'Masuk'}
          </Link>
        )}
      </div>
    </aside>
  )
}
