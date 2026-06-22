import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { ProductGrid } from '@/components/product/ProductGrid'
import { ProductSkeleton } from '@/components/product/ProductSkeleton'
import { SEO } from '@/components/shared/SEO'
import { useProductStore } from '@/stores/useProductStore'
import { cn } from '@/lib/utils'

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [sortBy, setSortBy] = useState('newest')
  const { products, categories, loading, fetchProducts, fetchCategories } = useProductStore()
  const [filteredProducts, setFilteredProducts] = useState(products)

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  useEffect(() => {
    let result = [...products]

    if (selectedCategory) {
      const cat = categories.find((c) => c.slug === selectedCategory)
      if (cat) {
        result = result.filter((p) => p.categoryId === cat.id)
      }
    }

    if (searchQuery) {
      const term = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
      )
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'popular':
        result.sort((a, b) => b.soldCount - a.soldCount)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    }

    setFilteredProducts(result)
  }, [products, selectedCategory, searchQuery, sortBy, categories])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery) {
      setSearchParams({ search: searchQuery })
    } else {
      setSearchParams({})
    }
  }

  return (
    <>
      <SEO
        title="Produk"
        description="Jelajahi semua produk digital kami - VPS, Panel, License, dan File Digital."
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Semua Produk</h1>
          <p className="text-sm text-gray-500">{filteredProducts.length} produk tersedia</p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produk..."
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
              />
            </div>
          </form>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
            >
              <option value="newest">Terbaru</option>
              <option value="price-low">Harga: Rendah - Tinggi</option>
              <option value="price-high">Harga: Tinggi - Rendah</option>
              <option value="popular">Terpopuler</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          <button
            onClick={() => setSelectedCategory('')}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors',
              !selectedCategory
                ? 'bg-violet-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors',
                selectedCategory === cat.slug
                  ? 'bg-violet-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products */}
        {loading ? (
          <ProductSkeleton count={12} />
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </div>
    </>
  )
}
