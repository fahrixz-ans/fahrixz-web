import { Shield, Clock, Zap, Headphones, Star, Users } from 'lucide-react'
import { SEO } from '@/components/shared/SEO'

const features = [
  { icon: Shield, title: 'Aman & Terpercaya', desc: 'Transaksi aman dengan enkripsi SSL dan garansi uang kembali.' },
  { icon: Clock, title: 'Proses Instan', desc: 'Delivery otomatis 24/7 tanpa menunggu lama.' },
  { icon: Zap, title: 'Harga Kompetitif', desc: 'Harga terbaik dengan kualitas premium.' },
  { icon: Headphones, title: 'Support 24/7', desc: 'Tim support siap membantu kapan saja.' },
  { icon: Star, title: 'Kualitas Premium', desc: 'Produk berkualitas dengan garansi.' },
  { icon: Users, title: 'Komunitas Besar', desc: 'Ribuan pengguna aktif mempercayai kami.' },
]

export function About() {
  return (
    <>
      <SEO title="Tentang Kami" />
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Tentang Fahri Xz Store
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Platform digital terpercaya yang menyediakan berbagai layanan berkualitas dengan harga terjangkau.
            Kami berkomitmen untuk memberikan pengalaman terbaik bagi setiap pelanggan.
          </p>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center"
            >
              <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Cerita Kami</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Fahri Xz Store didirikan dengan visi untuk menyediakan layanan digital berkualitas tinggi
            dengan harga yang terjangkau. Kami memahami bahwa kebutuhan akan infrastruktur digital
            semakin meningkat, dan kami berkomitmen untuk menjadi solusi terpercaya.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Dengan pengalaman bertahun-tahun di industri ini, kami telah melayani ribuan pelanggan
            dari berbagai kalangan, mulai dari individu hingga perusahaan. Kami terus berinovasi
            untuk memberikan layanan terbaik dan terus meningkatkan kualitas produk kami.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Terima kasih telah mempercayai Fahri Xz Store sebagai mitra digital Anda.
            Kami berharap dapat terus melayani Anda dengan lebih baik di masa depan.
          </p>
        </div>
      </div>
    </>
  )
}
