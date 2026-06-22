import { Instagram, Twitter, Github, Globe, MessageCircle, ExternalLink } from 'lucide-react'
import { SEO } from '@/components/shared/SEO'

const socialLinks = [
  {
    icon: Instagram,
    name: 'Instagram',
    handle: '@fahrixzstore',
    url: 'https://instagram.com/fahrixzstore',
    color: 'text-pink-600 bg-pink-100',
  },
  {
    icon: Twitter,
    name: 'Twitter / X',
    handle: '@fahrixzstore',
    url: 'https://twitter.com/fahrixzstore',
    color: 'text-blue-600 bg-blue-100',
  },
  {
    icon: Github,
    name: 'GitHub',
    handle: 'fahrixz-ans',
    url: 'https://github.com/fahrixz-ans',
    color: 'text-gray-800 bg-gray-100 dark:text-white dark:bg-gray-700',
  },
  {
    icon: MessageCircle,
    name: 'WhatsApp Channel',
    handle: 'Fahri Xz Store',
    url: 'https://whatsapp.com/channel/0029VbCHdOx7j6gAsxGkZ80m',
    color: 'text-green-600 bg-green-100',
  },
  {
    icon: Globe,
    name: 'Website',
    handle: 'fahrixzstore-of.vercel.app',
    url: 'https://fahrixzstore-of.vercel.app',
    color: 'text-violet-600 bg-violet-100',
  },
]

export function Social() {
  return (
    <>
      <SEO title="Sosial Media" />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Sosial Media
          </h1>
          <p className="text-gray-500">Ikuti kami di berbagai platform</p>
        </div>

        <div className="space-y-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-violet-300 dark:hover:border-violet-700 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${link.color}`}>
                <link.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{link.name}</p>
                <p className="text-sm text-gray-500">{link.handle}</p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400" />
            </a>
          ))}
        </div>

        <div className="mt-8 p-4 bg-violet-50 dark:bg-violet-900/10 rounded-xl text-center">
          <p className="text-sm text-violet-700 dark:text-violet-300">
            Bergabunglah dengan komunitas kami untuk mendapatkan update terbaru, promo eksklusif, dan konten menarik!
          </p>
        </div>
      </div>
    </>
  )
}
