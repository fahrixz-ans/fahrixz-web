import { Link } from 'react-router-dom'
import { Zap, Timer } from 'lucide-react'
import { useProductStore } from '@/stores/useProductStore'
import { ProductCard } from '@/components/product/ProductCard'

export function FlashSaleSection() {
  const { products } = useProductStore()
  const flashProducts = products.filter((p) => p.badge === 'flash' && p.status === 'active').slice(0, 6)

  if (flashProducts.length === 0) return null

  return (
    <section className="py-6 bg-red-50 dark:bg-red-900/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white rounded-lg">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-bold">Flash Sale</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <Timer className="w-4 h-4" />
              <span>Berlangsung</span>
            </div>
          </div>
          <Link to="/products?badge=flash" className="text-sm text-red-600 hover:text-red-700 font-medium">
            Lihat Semua
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {flashProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
