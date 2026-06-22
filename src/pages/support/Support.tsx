import { Link } from 'react-router-dom'
import { MessageCircle, Phone, Mail, HelpCircle, BookOpen, FileText, Shield } from 'lucide-react'
import { SEO } from '@/components/shared/SEO'

const quickLinks = [
  { icon: MessageCircle, label: 'Chat Frandsa', desc: 'AI Customer Service 24/7', href: '/support/chat', color: 'text-violet-600 bg-violet-100' },
  { icon: Phone, label: 'WhatsApp', desc: '0856-0994-9819', href: 'https://wa.me/6285609949819', color: 'text-green-600 bg-green-100', external: true },
  { icon: Mail, label: 'Email', desc: 'fahrixzstore@gmail.com', href: 'mailto:fahrixzstore@gmail.com', color: 'text-blue-600 bg-blue-100', external: true },
]

const helpTopics = [
  { icon: BookOpen, title: 'Cara Beli', desc: 'Panduan pembelian produk' },
  { icon: FileText, title: 'Cara Bayar', desc: 'Metode pembayaran yang tersedia' },
  { icon: Shield, title: 'Keamanan', desc: 'Informasi keamanan akun' },
  { icon: HelpCircle, title: 'FAQ', desc: 'Pertanyaan yang sering diajukan' },
]

export function Support() {
  return (
    <>
      <SEO title="Pusat Bantuan" />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Pusat Bantuan</h1>

        {/* Quick Contact */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-violet-300 dark:hover:border-violet-700 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${link.color}`}>
                <link.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{link.label}</p>
                <p className="text-xs text-gray-500">{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Help Topics */}
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Topik Bantuan</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {helpTopics.map((topic) => (
            <div
              key={topic.title}
              className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800"
            >
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                <topic.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{topic.title}</p>
                <p className="text-xs text-gray-500">{topic.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="bg-violet-50 dark:bg-violet-900/10 rounded-2xl p-6">
          <h3 className="font-semibold text-violet-900 dark:text-violet-300 mb-2">
            Butuh Bantuan Lebih?
          </h3>
          <p className="text-sm text-violet-700 dark:text-violet-400 mb-4">
            Tim support kami siap membantu Anda. Hubungi kami melalui chat Frandsa (AI) atau WhatsApp.
          </p>
          <Link
            to="/support/chat"
            className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium text-sm hover:bg-violet-700 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Chat dengan Frandsa
          </Link>
        </div>
      </div>
    </>
  )
}
