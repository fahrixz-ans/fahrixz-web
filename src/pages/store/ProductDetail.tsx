import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ShoppingCart, Heart, Share2, Star, ArrowLeft,
  Truck, Shield, Clock, Zap
} from 'lucide-react'
import { useProductStore } from '@/stores/useProductStore'
import { useCartStore } from '@/stores/useCartStore'
import { useWishlistStore } from '@/stores/useWishlistStore'
import { SEO } from '@/components/shared/SEO'
import { formatCurrency, calculateDiscount } from '@/lib/utils'
import toast from 'react-hot-toast'

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { selectedProduct, fetchProductBySlug, loading } = useProductStore()
  const { addItem } = useCartStore()
  const { toggleItem, isWishlisted } = useWishlistStore()
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    if (slug) {
      fetchProductBySlug(slug)
    }
  }, [slug])

  const product = selectedProduct

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-2xl" />
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Produk tidak ditemukan</h2>
        <Link to="/products" className="text-violet-600 hover:text-violet-700 font-medium">
          Kembali ke daftar produk
        </Link>
      </div>
    )
  }

  const discount = calculateDiscount(product.price, product.originalPrice)
  const wishlisted = isWishlisted(product.id)

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      variant: product.variants?.[selectedVariant]?.name || 'Default',
      image: product.images[0],
      price: product.variants?.[selectedVariant]?.price || product.price,
      quantity,
      stock: product.stock,
      category: product.category,
    })
    toast.success('Produk ditambahkan ke keranjang!')
  }

  const handleBuyNow = () => {
    handleAddToCart()
    navigate('/cart')
  }

  return (
    <>
      <SEO
        title={product.name}
        description={product.shortDescription || product.description}
        image={product.images[0]}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/e5e7eb/9ca3af?text=No+Image'
                }}
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                      activeImage === i ? 'border-violet-600' : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-violet-100 dark:bg-violet-900/20 text-violet-600 text-xs font-medium rounded">
                  {product.category}
                </span>
                {product.stock < 10 && (
                  <span className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 text-xs font-medium rounded">
                    Stok: {product.stock}
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-gray-500">
                  {product.soldCount >= 1000 ? `${(product.soldCount / 1000).toFixed(1)}rb` : product.soldCount} terjual
                </span>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-gray-500">{product.reviewCount} ulasan</span>
              </div>
            </div>

            {/* Price */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              {product.originalPrice && discount > 0 && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg text-gray-400 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                  <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/20 text-red-600 text-xs font-medium rounded">
                    -{discount}%
                  </span>
                </div>
              )}
              <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">
                {formatCurrency(product.variants?.[selectedVariant]?.price || product.price)}
              </p>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Varian
                </h3>
                <div className="flex gap-2">
                  {product.variants.map((variant, i) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(i)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                        selectedVariant === i
                          ? 'border-violet-600 bg-violet-50 dark:bg-violet-900/20 text-violet-600'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Jumlah
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  -
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Tambah Keranjang
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Beli Sekarang
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  toggleItem(product.id)
                  toast.success(wishlisted ? 'Dihapus dari wishlist' : 'Ditambahkan ke wishlist')
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                <span className="text-sm">Wishlist</span>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  toast.success('Link disalin')
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Bagikan</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Truck className="w-4 h-4 text-green-600" />
                Delivery Instan
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Shield className="w-4 h-4 text-blue-600" />
                Bergaransi
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4 text-amber-600" />
                Support 24/7
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Zap className="w-4 h-4 text-violet-600" />
                Otomatis
              </div>
            </div>

            {/* Description */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Deskripsi Produk
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
