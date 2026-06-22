import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import { Mail, CheckCircle, ArrowRight, RefreshCw } from 'lucide-react'
import { sendEmailVerification } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import toast from 'react-hot-toast'

export function VerifyEmail() {
  const [loading, setLoading] = useState(false)
  const [verified, setVerified] = useState(false)
  const [countdown, setCountdown] = useState(60)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleResend = async () => {
    if (countdown > 0) return
    setLoading(true)
    try {
      const user = auth.currentUser
      if (user) {
        await sendEmailVerification(user)
        toast.success('Email verifikasi telah dikirim ulang')
        setCountdown(60)
      }
    } catch (error: any) {
      toast.error(error.message || 'Gagal mengirim ulang')
    } finally {
      setLoading(false)
    }
  }

  const checkVerification = async () => {
    const user = auth.currentUser
    if (user) {
      await user.reload()
      if (user.emailVerified) {
        setVerified(true)
        toast.success('Email berhasil diverifikasi!')
      } else {
        toast.success('Email belum diverifikasi. Silakan cek inbox Anda.')
      }
    }
  }

  if (verified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Verifikasi Berhasil!
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Email Anda telah berhasil diverifikasi. Sekarang Anda dapat mulai berbelanja.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium text-sm hover:bg-violet-700 transition-colors"
          >
            Mulai Berbelanja
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">FX</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Fahri Xz Store</h1>
            <p className="text-xs text-gray-500">Platform Digital Terpercaya</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 text-center">
          <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-violet-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Verifikasi Email
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Kami telah mengirimkan link verifikasi ke email Anda. Silakan cek inbox dan klik link tersebut.
          </p>

          <div className="space-y-3">
            <button
              onClick={checkVerification}
              className="w-full py-2.5 bg-violet-600 text-white rounded-xl font-medium text-sm hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"
            >
              Sudah Verifikasi
              <CheckCircle className="w-4 h-4" />
            </button>

            <button
              onClick={handleResend}
              disabled={countdown > 0 || loading}
              className="w-full py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <RefreshCw className={cn('w-4 h-4', loading && 'animate-spin')} />
              {countdown > 0 ? `Kirim ulang (${countdown}s)` : 'Kirim Ulang Email'}
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
            <Link
              to="/login"
              className="text-sm text-gray-600 hover:text-violet-600 transition-colors"
            >
              Kembali ke login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

