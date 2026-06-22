import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ArrowRight } from 'lucide-react'
import { useAuthStore } from '@/stores/useAuthStore'
import { useProductStore } from '@/stores/useProductStore'
import { useWishlistStore } from '@/stores/useWishlistStore'
import { ProductCard } from '@/components/product/ProductCard'
import { SEO } from '@/components/shared/SEO'

export function Wishlist() {
  const { isLoggedIn } = useAuthStore()
  const { products, fetchProducts } = useProductStore()
  const { items: wishlistItems } = useWishlistStore()
  const [wishlistProducts, setWishlistProducts] = useState(products.filter((p) => wishlistItems.includes(p.id)))

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts()
    }
  }, [])

  useEffect(() => {
    setWishlistProducts(products.filter((p) => wishlistItems.includes(p.id)))
  }, [products, wishlistItems])

  if (!isLoggedIn) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <SEO title="Wishlist" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Silakan Login Terlebih Dahulu
        </h2>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors"
        >
          Login
        </Link>
      </div>
    )
  }

  return (
    <>
      <SEO title="Wishlist" />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Wishlist ({wishlistProducts.length})
        </h1>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Wishlist Kosong
            </h2>
            <p className="text-sm text-gray-500 mb-4">Simpan produk favorit Anda di sini!</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors"
            >
              Lihat Produk
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
