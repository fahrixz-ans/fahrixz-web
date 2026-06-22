import { useState } from 'react'
import { Moon, Bell, Mail, Shield, LogOut } from 'lucide-react'
import { useAuthStore } from '@/stores/useAuthStore'
import { useThemeStore } from '@/stores/useThemeStore'
import { SEO } from '@/components/shared/SEO'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export function Settings() {
  const { user, logout } = useAuthStore()
  const { darkMode, toggleDarkMode } = useThemeStore()
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(user?.preferences?.notifications ?? true)
  const [newsletter, setNewsletter] = useState(user?.preferences?.newsletter ?? true)

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Berhasil keluar')
      navigate('/')
    } catch (error) {
      toast.error('Gagal keluar')
    }
  }

  return (
    <>
      <SEO title="Pengaturan" />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Pengaturan</h1>

        <div className="space-y-4">
          {/* Appearance */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Tampilan</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/20 rounded-xl flex items-center justify-center">
                  <Moon className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                  <p className="text-xs text-gray-500">Ubah tema tampilan</p>
                </div>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  darkMode ? 'bg-violet-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                    darkMode ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Notifikasi</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                    <Bell className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Notifikasi</p>
                    <p className="text-xs text-gray-500">Terima notifikasi pesanan & promo</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    notifications ? 'bg-violet-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                      notifications ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Newsletter</p>
                    <p className="text-xs text-gray-500">Terima update & penawaran menarik</p>
                  </div>
                </div>
                <button
                  onClick={() => setNewsletter(!newsletter)}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    newsletter ? 'bg-violet-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                      newsletter ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Keamanan</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/20 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Verifikasi Email</p>
                <p className="text-xs text-gray-500">
                  {user?.emailVerified ? 'Terverifikasi' : 'Belum terverifikasi'}
                </p>
              </div>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Keluar Akun
          </button>
        </div>
      </div>
    </>
  )
}
