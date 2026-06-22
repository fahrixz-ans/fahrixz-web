import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import { useAuthStore } from '@/stores/useAuthStore'
import toast from 'react-hot-toast'

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const { forgotPassword } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error('Email wajib diisi')
      return
    }
    setLoading(true)
    try {
      await forgotPassword(email)
      setSent(true)
      toast.success('Link reset password telah dikirim ke email Anda')
    } catch (error: any) {
      toast.error(error.message || 'Gagal mengirim link reset')
    } finally {
      setLoading(false)
    }
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

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
          {!sent ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Lupa Password</h2>
              <p className="text-sm text-gray-500 mb-6">
                Masukkan email Anda dan kami akan mengirimkan link untuk reset password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-violet-600 text-white rounded-xl font-medium text-sm hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? 'Mengirim...' : 'Kirim Link Reset'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Link Terkirim!
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Silakan cek email Anda ({email}) untuk link reset password.
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-sm text-violet-600 hover:text-violet-700 font-medium"
              >
                Kirim ulang
              </button>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-violet-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
