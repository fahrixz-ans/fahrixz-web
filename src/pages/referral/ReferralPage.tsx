import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Copy, Check, Users, Gift, Share2 } from 'lucide-react'
import { useAuthStore } from '@/stores/useAuthStore'
import { SEO } from '@/components/shared/SEO'
import toast from 'react-hot-toast'

export function ReferralPage() {
  const { isLoggedIn, user } = useAuthStore()
  const [copied, setCopied] = useState(false)
  const referralLink = `${window.location.origin}/register?ref=${user?.referralCode || ''}`

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    toast.success('Link referral disalin')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Gabung Fahri Xz Store',
          text: 'Daftar di Fahri Xz Store dan dapatkan bonus!',
          url: referralLink,
        })
      } catch (error) {
        // User cancelled
      }
    } else {
      handleCopy()
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <SEO title="Referral" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Silakan Login Terlebih Dahulu
        </h2>
        <p className="text-gray-500 mb-6">Login untuk mengakses program referral.</p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors"
        >
          Login
        </Link>
      </div>
    )
  }

  return (
    <>
      <SEO title="Referral" />
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-violet-600 rounded-2xl p-6 mb-6 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Program Referral</h1>
          <p className="text-violet-200 max-w-md mx-auto">
            Ajak teman bergabung dan dapatkan bonus koin untuk setiap teman yang mendaftar!
          </p>
        </div>

        {/* How it works */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center">
            <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Share2 className="w-5 h-5 text-violet-600" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">1. Bagikan Link</h3>
            <p className="text-xs text-gray-500">Bagikan link referral ke teman Anda</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">2. Teman Mendaftar</h3>
            <p className="text-xs text-gray-500">Teman mendaftar menggunakan link Anda</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Gift className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">3. Dapatkan Bonus</h3>
            <p className="text-xs text-gray-500">Anda dan teman mendapatkan bonus koin</p>
          </div>
        </div>

        {/* Referral Link */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Link Referral Anda</h3>
          <div className="flex gap-2">
            <div className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm text-gray-600 dark:text-gray-400 truncate">
              {referralLink}
            </div>
            <button
              onClick={handleCopy}
              className="px-4 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
            <button
              onClick={handleShare}
              className="px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Kode Referral: <span className="font-mono font-medium">{user?.referralCode}</span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
            <p className="text-xs text-gray-500">Klik</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
            <p className="text-xs text-gray-500">Pendaftar</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
            <p className="text-xs text-gray-500">Bonus Diterima</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
            <p className="text-xs text-gray-500">Total Bonus</p>
          </div>
        </div>
      </div>
    </>
  )
}
