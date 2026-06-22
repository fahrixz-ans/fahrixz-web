import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle, Package, Home } from 'lucide-react'
import { SEO } from '@/components/shared/SEO'

export function PaymentSuccess() {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('order_id') || ''

  return (
    <>
      <SEO title="Pembayaran Berhasil" />
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Pembayaran Berhasil!
        </h1>
        <p className="text-gray-500 mb-2">
          Terima kasih atas pembelian Anda.
        </p>
        {orderId && (
          <p className="text-sm text-gray-400 mb-6">
            Nomor Pesanan: <span className="font-mono">{orderId}</span>
          </p>
        )}
        <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">
          Pesanan Anda sedang diproses. Detail produk akan dikirimkan ke email Anda.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/orders"
            className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors"
          >
            <Package className="w-4 h-4" />
            Lihat Pesanan
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <Home className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </>
  )
}
