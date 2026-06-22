import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft, Wallet, QrCode, Building2,
  Smartphone, CheckCircle
} from 'lucide-react'
import { useCartStore } from '@/stores/useCartStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { useOrderStore } from '@/stores/useOrderStore'
import { formatCurrency, generateOrderId } from '@/lib/utils'
import { SEO } from '@/components/shared/SEO'
import toast from 'react-hot-toast'

const PAYMENT_METHODS = [
  { id: 'qris', name: 'QRIS', icon: QrCode, desc: 'Scan QR code' },
  { id: 'va_bca', name: 'BCA Virtual Account', icon: Building2, desc: 'Transfer BCA' },
  { id: 'va_bni', name: 'BNI Virtual Account', icon: Building2, desc: 'Transfer BNI' },
  { id: 'va_mandiri', name: 'Mandiri Virtual Account', icon: Building2, desc: 'Transfer Mandiri' },
  { id: 'va_bri', name: 'BRI Virtual Account', icon: Building2, desc: 'Transfer BRI' },
  { id: 'gopay', name: 'GoPay', icon: Wallet, desc: 'E-Wallet' },
  { id: 'ovo', name: 'OVO', icon: Wallet, desc: 'E-Wallet' },
  { id: 'dana', name: 'DANA', icon: Smartphone, desc: 'E-Wallet' },
  { id: 'shopeepay', name: 'ShopeePay', icon: Smartphone, desc: 'E-Wallet' },
]

export function Checkout() {
  const navigate = useNavigate()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { isLoggedIn, user } = useAuthStore()
  const { createOrder } = useOrderStore()
  const [paymentMethod, setPaymentMethod] = useState('')
  const [loading, setLoading] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState('')

  const subtotal = getTotalPrice()
  const fee = 0
  const total = subtotal + fee

  if (!isLoggedIn) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <SEO title="Checkout" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Silakan Login Terlebih Dahulu
        </h2>
        <p className="text-gray-500 mb-6">Anda harus login untuk melanjutkan checkout.</p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors"
        >
          Login
        </Link>
      </div>
    )
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <SEO title="Checkout" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Keranjang Kosong
        </h2>
        <Link
          to="/products"
          className="text-violet-600 hover:text-violet-700 font-medium"
        >
          Lihat Produk
        </Link>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <SEO title="Pembayaran Berhasil" />
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Pesanan Berhasil Dibuat!
        </h2>
        <p className="text-gray-500 mb-2">Nomor Pesanan: {orderId}</p>
        <p className="text-gray-500 mb-6">
          Silakan lakukan pembayaran sesuai instruksi yang dikirim ke email Anda.
        </p>
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors"
        >
          Lihat Pesanan Saya
        </Link>
      </div>
    )
  }

  const handleCheckout = async () => {
    if (!paymentMethod) {
      toast.error('Pilih metode pembayaran')
      return
    }
    setLoading(true)
    try {
      const newOrderId = generateOrderId()
      const orderData = {
        orderId: newOrderId,
        sn: newOrderId,
        userId: user?.uid || '',
        userEmail: user?.email || '',
        userName: user?.fullName || '',
        userPhone: user?.phone || '',
        items: items.map((item) => ({
          productId: item.productId,
          name: item.name,
          variant: item.variant,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal,
        discount: 0,
        fee,
        total,
        status: 'pending' as const,
        paymentStatus: 'unpaid' as const,
        paymentMethod,
      }

      await createOrder(orderData)
      clearCart()
      setOrderId(newOrderId)
      setOrderComplete(true)
      toast.success('Pesanan berhasil dibuat!')
    } catch (error: any) {
      toast.error(error.message || 'Checkout gagal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO title="Checkout" />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Payment Method */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Info */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Info Pembeli</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Nama</label>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.fullName}</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Email</label>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Metode Pembayaran</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {PAYMENT_METHODS.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                      paymentMethod === method.id
                        ? 'border-violet-600 bg-violet-50 dark:bg-violet-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <method.icon className={`w-5 h-5 ${
                      paymentMethod === method.id ? 'text-violet-600' : 'text-gray-400'
                    }`} />
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{method.name}</p>
                      <p className="text-xs text-gray-500">{method.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Ringkasan Pesanan</h3>

              <div className="space-y-3">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.variant}`} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.variant} x{item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-violet-600">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Biaya Admin</span>
                  <span className="font-medium text-green-600">Gratis</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-violet-600">{formatCurrency(total)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading || !paymentMethod}
                className="w-full py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Memproses...' : `Bayar ${formatCurrency(total)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
