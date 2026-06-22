import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Trash2, Minus, Plus, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/stores/useCartStore'
import { formatCurrency } from '@/lib/utils'
import { SEO } from '@/components/shared/SEO'
import toast from 'react-hot-toast'

export function Cart() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore()
  const navigate = useNavigate()
  const total = getTotalPrice()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <SEO title="Keranjang" />
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCart className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Keranjang Kosong
        </h2>
        <p className="text-gray-500 mb-6">Yuk, tambahkan produk ke keranjang Anda!</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors"
        >
          Lihat Produk
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  return (
    <>
      <SEO title="Keranjang" />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Keranjang ({items.length} item)
        </h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.variant}`}
                className="flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800"
              >
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/e5e7eb/9ca3af?text=No+Image'
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 dark:text-white truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">{item.variant}</p>
                  <p className="text-violet-600 font-bold mt-1">
                    {formatCurrency(item.price)}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.variant, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.variant, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        removeItem(item.productId, item.variant)
                        toast.success('Item dihapus dari keranjang')
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => {
                clearCart()
                toast.success('Keranjang dikosongkan')
              }}
              className="text-sm text-red-500 hover:text-red-600 font-medium"
            >
              Kosongkan Keranjang
            </button>
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Ringkasan</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Biaya Admin</span>
                  <span className="font-medium">Gratis</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-violet-600">{formatCurrency(total)}</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"
              >
                Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/products"
                className="block text-center text-sm text-violet-600 hover:text-violet-700 font-medium"
              >
                Lanjutkan Belanja
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
