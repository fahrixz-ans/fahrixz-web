import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Package, ArrowRight } from 'lucide-react'
import { useAuthStore } from '@/stores/useAuthStore'
import { useOrderStore } from '@/stores/useOrderStore'
import { SEO } from '@/components/shared/SEO'
import { formatCurrency, formatDate } from '@/lib/utils'

export function Orders() {
  const { user } = useAuthStore()
  const { orders, loading, fetchUserOrders } = useOrderStore()

  useEffect(() => {
    if (user?.uid) {
      fetchUserOrders(user.uid)
    }
  }, [user?.uid])

  return (
    <>
      <SEO title="Pesanan Saya" />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Pesanan Saya</h1>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-3" />
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Belum Ada Pesanan
            </h2>
            <p className="text-sm text-gray-500 mb-4">Yuk, mulai berbelanja!</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors"
            >
              Lihat Produk
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {order.orderId}
                    </p>
                    <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
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

                <div className="space-y-2 mb-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 dark:text-white truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.variant} x{item.quantity}</p>
                      </div>
                      <p className="text-sm text-violet-600">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div>
                    <p className="text-xs text-gray-500">Total</p>
                    <p className="text-lg font-bold text-violet-600">{formatCurrency(order.total)}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {order.paymentMethod?.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
