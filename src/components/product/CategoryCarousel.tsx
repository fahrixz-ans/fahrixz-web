import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { ProductCard } from './ProductCard'
import type { Product, Category } from '@/types'

interface CategoryCarouselProps {
  category: Category
  products: Product[]
}

export function CategoryCarousel({ category, products }: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  if (products.length === 0) return null

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4 px-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
            style={{ backgroundColor: category.color || '#7c3aed' }}
          >
            <span className="text-lg">{category.icon}</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{category.name}</h2>
            <p className="text-xs text-gray-500">{products.length} produk tersedia</p>
          </div>
        </div>
        <Link
          to={`/products?category=${category.slug}`}
          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-xl transition-colors"
        >
          Lihat Semua
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white dark:bg-gray-800 shadow-lg rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white dark:bg-gray-800 shadow-lg rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
