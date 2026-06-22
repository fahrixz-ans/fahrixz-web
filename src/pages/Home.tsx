import { useEffect } from 'react'
import { HeroSection } from '@/components/home/HeroSection'
import { CategorySection } from '@/components/home/CategorySection'
import { FlashSaleSection } from '@/components/home/FlashSaleSection'
import { CashQuestBanner } from '@/components/home/CashQuestBanner'
import { StatsBar } from '@/components/home/StatsBar'
import { CategoryCarousel } from '@/components/product/CategoryCarousel'
import { ProductSkeleton } from '@/components/product/ProductSkeleton'
import { SEO } from '@/components/shared/SEO'
import { useProductStore } from '@/stores/useProductStore'
import { useAuthStore } from '@/stores/useAuthStore'

export function Home() {
  const { categories, products, loading, fetchProducts, fetchCategories } = useProductStore()
  const { isLoggedIn } = useAuthStore()

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [])

  const productsByCategory = categories
    .map((cat) => ({
      category: cat,
      products: products.filter((p) => p.categoryId === cat.id && p.status === 'active').slice(0, 10),
    }))
    .filter((group) => group.products.length > 0)

  return (
    <>
      <SEO
        title="Fahri Xz Store - Platform Digital Terpercaya"
        description="VPS, Panel, License, dan File Digital — Instant & Aman. Dukungan 24/7."
        keywords="vps, panel hosting, license software, file digital, vpn, proxy"
        url="https://fahrixz-store.vercel.app"
      />

      <div className="space-y-2">
        {/* Hero Banner */}
        <HeroSection />

        {/* Stats Bar */}
        <StatsBar />

        {/* Category Chips */}
        <CategorySection />

        {/* Flash Sale */}
        <FlashSaleSection />

        {/* Cash Quest Banner */}
        {isLoggedIn && <CashQuestBanner />}

        {/* Product Carousels per Category */}
        <div className="space-y-2">
          {loading ? (
            <div className="px-4 py-6">
              <ProductSkeleton count={7} />
            </div>
          ) : (
            productsByCategory.map(({ category, products }) => (
              <CategoryCarousel key={category.id} category={category} products={products} />
            ))
          )}
        </div>

        {/* Empty state when no products */}
        {!loading && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">📦</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Belum Ada Produk
            </h3>
            <p className="text-sm text-gray-500 text-center max-w-md">
              Produk akan segera ditambahkan. Silakan kembali lagi nanti atau hubungi admin untuk informasi lebih lanjut.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
