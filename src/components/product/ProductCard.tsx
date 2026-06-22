import { Link } from 'react-router-dom'
import { ShoppingCart, Star, TrendingUp, Zap, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCurrency, calculateDiscount } from '@/lib/utils'
import type { Product } from '@/types'
import { useCartStore } from '@/stores/useCartStore'

const BADGE_CONFIG = {
  bestseller: { label: 'Terlaris', icon: TrendingUp, color: 'bg-amber-500' },
  flash: { label: 'Flash Sale', icon: Zap, color: 'bg-red-500' },
  new: { label: 'Baru', icon: Sparkles, color: 'bg-green-500' },
  sale: { label: 'Diskon', icon: Zap, color: 'bg-violet-500' },
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore()
  const discount = calculateDiscount(product.price, product.originalPrice)
  const badge = product.badge ? BADGE_CONFIG[product.badge] : null

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      productId: product.id,
      name: product.name,
      variant: product.variants?.[0]?.name || 'Default',
      image: product.images[0],
      price: product.price,
      quantity: 1,
      stock: product.stock,
      category: product.category,
    })
  }

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg hover:border-violet-200 dark:hover:border-violet-800 transition-all duration-300 shrink-0 w-[160px] sm:w-[180px] md:w-[200px]"
    >
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/e5e7eb/9ca3af?text=No+Image'
          }}
        />

        {badge && (
          <div className={cn('absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded text-white text-[10px] font-medium', badge.color)}>
            <badge.icon className="w-3 h-3" />
            {badge.label}
          </div>
        )}

        {product.stock < 10 && (
          <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-red-500/90 text-white text-[10px] rounded">
            Stok: {product.stock}
          </div>
        )}

        <button
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 w-8 h-8 bg-white/90 dark:bg-gray-900/90 rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-violet-600 hover:text-white"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-2.5 space-y-1.5">
        <h3 className="font-medium text-gray-900 dark:text-white text-xs leading-snug line-clamp-2 group-hover:text-violet-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 text-amber-400 fill-current" />
          <span className="text-[10px] text-gray-600 dark:text-gray-400">{product.rating}</span>
          <span className="text-[10px] text-gray-400">
            | {product.soldCount >= 1000 ? `${(product.soldCount / 1000).toFixed(1)}rb` : product.soldCount} terjual
          </span>
        </div>

        <div>
          {product.originalPrice && discount > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-gray-400 line-through">{formatCurrency(product.originalPrice)}</span>
              <span className="text-[9px] px-1 bg-red-100 dark:bg-red-900/30 text-red-600 rounded">-{discount}%</span>
            </div>
          )}
          <p className="text-sm font-bold text-violet-600 dark:text-violet-400">
            {formatCurrency(product.price)}
          </p>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full py-1.5 bg-violet-600 text-white text-[10px] font-medium rounded-lg md:hidden hover:bg-violet-700 transition-colors"
        >
          + Keranjang
        </button>
      </div>
    </Link>
  )
}
