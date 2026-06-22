import { Link } from 'react-router-dom'
import { MessageCircle, Phone, Mail } from 'lucide-react'

const footerLinks = {
  products: [
    { label: 'VPS Server', href: '/products?category=vps-server' },
    { label: 'Panel Hosting', href: '/products?category=panel-hosting' },
    { label: 'License Software', href: '/products?category=license-software' },
    { label: 'File Digital', href: '/products?category=file-digital' },
    { label: 'VPN & Proxy', href: '/products?category=vpn-proxy' },
  ],
  help: [
    { label: 'Pusat Bantuan', href: '/support' },
    { label: 'Chat Frandsa', href: '/support/chat' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Kontak Kami', href: '/contact' },
    { label: 'Cara Beli', href: '/support' },
  ],
  company: [
    { label: 'Tentang Kami', href: '/about' },
    { label: 'Syarat & Ketentuan', href: '/terms' },
    { label: 'Kebijakan Privasi', href: '/privacy' },
    { label: 'Sosial Media', href: '/social' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-violet-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FX</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Fahri Xz Store</h3>
                <p className="text-xs text-gray-500">Platform Digital Terpercaya</p>
              </div>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              VPS, Panel, License, dan File Digital — Instant & Aman.
              Dengan dukungan customer service 24/7.
            </p>
            <div className="space-y-2">
              <a href="mailto:fahrixzstore@gmail.com" className="flex items-center gap-2 text-sm text-gray-600 hover:text-violet-600 transition-colors">
                <Mail className="w-4 h-4" /> fahrixzstore@gmail.com
              </a>
              <a href="tel:085609949819" className="flex items-center gap-2 text-sm text-gray-600 hover:text-violet-600 transition-colors">
                <Phone className="w-4 h-4" /> 0856-0994-9819
              </a>
              <Link to="/support/chat" className="flex items-center gap-2 text-sm text-violet-600 hover:text-violet-700 transition-colors font-medium">
                <MessageCircle className="w-4 h-4" /> Chat dengan Frandsa
              </Link>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Produk</h4>
            <ul className="space-y-2.5">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-violet-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Bantuan</h4>
            <ul className="space-y-2.5">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-violet-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Perusahaan</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-violet-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Fahri Xz Store. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400">Dibuat dengan oleh Fahri Andrian Saputra</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
