import { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SEO } from '@/components/shared/SEO'
import toast from 'react-hot-toast'

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // In production, this would send to backend
    setTimeout(() => {
      toast.success('Pesan terkirim! Kami akan menghubungi Anda segera.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setLoading(false)
    }, 1000)
  }

  return (
    <>
      <SEO title="Kontak Kami" />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Kontak Kami</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Informasi Kontak</h3>
              <div className="space-y-4">
                <a href="mailto:fahrixzstore@gmail.com" className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-violet-600 transition-colors">
                  <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/20 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-xs">fahrixzstore@gmail.com</p>
                  </div>
                </a>
                <a href="tel:085609949819" className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-violet-600 transition-colors">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Telepon</p>
                    <p className="text-xs">0856-0994-9819</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Lokasi</p>
                    <p className="text-xs">Indonesia</p>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/support/chat"
              className="flex items-center justify-center gap-2 w-full py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chat dengan Frandsa
            </Link>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Kirim Pesan</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subjek</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pesan</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {loading ? 'Mengirim...' : 'Kirim Pesan'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
