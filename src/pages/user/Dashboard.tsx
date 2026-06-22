import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Wallet, Gift, Star, Package,
  ChevronRight, User, Settings
} from 'lucide-react'
import { useAuthStore } from '@/stores/useAuthStore'
import { useOrderStore } from '@/stores/useOrderStore'
import { useWalletStore } from '@/stores/useWalletStore'
import { SEO } from '@/components/shared/SEO'
import { formatCurrency, getMembershipColor, getMembershipProgress } from '@/lib/utils'

export function Dashboard() {
  const { user } = useAuthStore()
  const { orders, fetchUserOrders } = useOrderStore()
  const { wallet, fetchWallet } = useWalletStore()

  useEffect(() => {
    if (user?.uid) {
      fetchUserOrders(user.uid)
      fetchWallet(user.uid)
    }
  }, [user?.uid])

  const recentOrders = orders.slice(0, 5)
  const membershipProgress = getMembershipProgress(user?.totalSpent || 0)

  const menuItems = [
    { icon: Package, label: 'Pesanan Saya', desc: `${orders.length} pesanan`, href: '/orders', color: 'text-blue-600 bg-blue-100' },
    { icon: Wallet, label: 'Wallet', desc: wallet ? formatCurrency(wallet.balance) : 'Rp 0', href: '/wallet', color: 'text-green-600 bg-green-100' },
    { icon: Gift, label: 'Voucher', desc: 'Lihat voucher', href: '/vouchers', color: 'text-violet-600 bg-violet-100' },
    { icon: Star, label: 'Wishlist', desc: 'Produk favorit', href: '/wishlist', color: 'text-pink-600 bg-pink-100' },
    { icon: User, label: 'Profil', desc: 'Edit profil', href: '/profile', color: 'text-amber-600 bg-amber-100' },
    { icon: Settings, label: 'Pengaturan', desc: 'Akun & privasi', href: '/settings', color: 'text-gray-600 bg-gray-100' },
  ]

  return (
    <>
      <SEO title="Dashboard" />
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Profile Card */}
        <div className="bg-violet-600 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">{user?.fullName?.charAt(0) || 'U'}</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">{user?.fullName}</h1>
              <p className="text-violet-200 text-sm">{user?.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getMembershipColor(user?.membership || 'bronze')}`}>
                  {user?.membership?.toUpperCase() || 'BRONZE'}
                </span>
              </div>
            </div>
          </div>

          {/* Membership Progress */}
          {membershipProgress.next !== 'max' && (
            <div>
              <div className="flex justify-between text-xs text-violet-200 mb-1">
                <span>{membershipProgress.current.toUpperCase()}</span>
                <span>{membershipProgress.next.toUpperCase()}</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${membershipProgress.progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/20">
            <div className="text-center">
              <p className="text-2xl font-bold">{user?.coins || 0}</p>
              <p className="text-xs text-violet-200">Koin</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{orders.length}</p>
              <p className="text-xs text-violet-200">Pesanan</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{formatCurrency(user?.totalSpent || 0)}</p>
              <p className="text-xs text-violet-200">Total Belanja</p>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-violet-300 dark:hover:border-violet-700 transition-colors"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Pesanan Terbaru</h3>
            <Link to="/orders" className="text-sm text-violet-600 hover:text-violet-700">
              Lihat Semua
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">Belum ada pesanan</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {order.orderId}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.items.length} item • {formatCurrency(order.total)}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    order.status === 'completed' ? 'bg-green-100 text-green-600' :
                    order.status === 'processing' ? 'bg-blue-100 text-blue-600' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {order.status === 'pending' ? 'Menunggu' :
                     order.status === 'processing' ? 'Diproses' :
                     order.status === 'completed' ? 'Selesai' :
                     'Dibatalkan'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
