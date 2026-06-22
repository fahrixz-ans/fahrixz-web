import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone,
  Chrome, Facebook, Apple, Github,
} from 'lucide-react'
import { useAuthStore } from '@/stores/useAuthStore'
import toast from 'react-hot-toast'

export function Register() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { register, loginWithGoogle, loginWithFacebook, loginWithApple, loginWithGithub } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName || !email || !password) {
      toast.error('Semua field wajib diisi')
      return
    }
    if (password !== confirmPassword) {
      toast.error('Password tidak cocok')
      return
    }
    if (password.length < 6) {
      toast.error('Password minimal 6 karakter')
      return
    }
    setLoading(true)
    try {
      await register(email, password, fullName, phone)
      toast.success('Registrasi berhasil! Silakan verifikasi email Anda.')
      navigate('/verify-email')
    } catch (error: any) {
      toast.error(error.message || 'Registrasi gagal')
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = async (provider: string) => {
    setLoading(true)
    try {
      switch (provider) {
        case 'google':
          await loginWithGoogle()
          break
        case 'facebook':
          await loginWithFacebook()
          break
        case 'apple':
          await loginWithApple()
          break
        case 'github':
          await loginWithGithub()
          break
      }
      toast.success('Login berhasil!')
      navigate('/')
    } catch (error: any) {
      toast.error(error.message || 'Login gagal')
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Daftar</h2>
          <p className="text-sm text-gray-500 mb-6">Buat akun baru untuk mulai berbelanja.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
                />
              </div>
            </div>

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

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nomor Telepon <span className="text-gray-400">(opsional)</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08123456789"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Konfirmasi Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi password"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" required className="mt-1 rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                Saya setuju dengan{' '}
                <Link to="/terms" className="text-violet-600 hover:text-violet-700">Syarat & Ketentuan</Link>
                {' '}dan{' '}
                <Link to="/privacy" className="text-violet-600 hover:text-violet-700">Kebijakan Privasi</Link>
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-violet-600 text-white rounded-xl font-medium text-sm hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? 'Memuat...' : 'Daftar'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-900 text-gray-500">atau daftar dengan</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Chrome className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Google</span>
            </button>
            <button
              onClick={() => handleSocialLogin('facebook')}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Facebook className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Facebook</span>
            </button>
            <button
              onClick={() => handleSocialLogin('apple')}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Apple className="w-4 h-4 text-gray-900 dark:text-white" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Apple</span>
            </button>
            <button
              onClick={() => handleSocialLogin('github')}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Github className="w-4 h-4 text-gray-900 dark:text-white" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">GitHub</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-violet-600 hover:text-violet-700 font-medium">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
