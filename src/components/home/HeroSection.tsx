import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Clock, Zap } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-violet-600 dark:bg-violet-700">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-white text-xs font-medium">
              <Zap className="w-3 h-3" />
              Platform Digital Terpercaya
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Penyedia Layanan &<br /> Produk Digital
            </h1>
            <p className="text-violet-100 text-sm md:text-base max-w-md">
              Layanan digital berkualitas dengan harga terjangkau. Proses instan, aman, dan terpercaya.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-violet-600 rounded-xl font-medium text-sm hover:bg-gray-100 transition-colors"
              >
                Lihat Produk
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/cashquest"
                className="inline-flex items-center gap-2 px-6 py-3 bg-violet-500 text-white rounded-xl font-medium text-sm hover:bg-violet-400 transition-colors border border-white/20"
              >
                Cash Quest
              </Link>
            </div>
          </div>
          <div className="hidden md:grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
              <Shield className="w-8 h-8 text-white mb-3" />
              <p className="text-white font-medium text-sm">Aman & Terpercaya</p>
              <p className="text-violet-200 text-xs mt-1">100% garansi uang kembali</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
              <Clock className="w-8 h-8 text-white mb-3" />
              <p className="text-white font-medium text-sm">Proses Instan</p>
              <p className="text-violet-200 text-xs mt-1">Delivery otomatis 24/7</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
              <Zap className="w-8 h-8 text-white mb-3" />
              <p className="text-white font-medium text-sm">Harga Terbaik</p>
              <p className="text-violet-200 text-xs mt-1">Kompetitif & transparan</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
              <Shield className="w-8 h-8 text-white mb-3" />
              <p className="text-white font-medium text-sm">Support 24/7</p>
              <p className="text-violet-200 text-xs mt-1">Chat Frandsa siap bantu</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
