import { Link, useSearchParams } from 'react-router-dom'
import { XCircle, RefreshCw, HelpCircle } from 'lucide-react'
import { SEO } from '@/components/shared/SEO'

export function PaymentFailed() {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('order_id') || ''

  return (
    <>
      <SEO title="Pembayaran Gagal" />
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Pembayaran Gagal
        </h1>
        <p className="text-gray-500 mb-2">
          Maaf, pembayaran Anda tidak dapat diproses.
        </p>
        {orderId && (
          <p className="text-sm text-gray-400 mb-6">
            Nomor Pesanan: <span className="font-mono">{orderId}</span>
          </p>
        )}
        <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">
          Silakan coba lagi atau hubungi support kami jika masalah berlanjut.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/cart"
            className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Coba Lagi
          </Link>
          <Link
            to="/support/chat"
            className="flex items-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            Hubungi Support
          </Link>
        </div>
      </div>
    </>
  )
}
