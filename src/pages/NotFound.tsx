import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import { SEO } from '@/components/shared/SEO'

export function NotFound() {
  return (
    <>
      <SEO title="Halaman Tidak Ditemukan" />
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold text-gray-400">404</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            Beranda
          </Link>
        </div>
      </div>
    </>
  )
}
