import { create } from 'zustand'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Product, Category } from '@/types'

interface ProductState {
  products: Product[]
  categories: Category[]
  loading: boolean
  error: string | null
  selectedProduct: Product | null
  fetchProducts: () => Promise<void>
  fetchCategories: () => Promise<void>
  fetchProductBySlug: (slug: string) => Promise<void>
  searchProducts: (searchTerm: string) => Promise<Product[]>
  getProductsByCategory: (categoryId: string) => Product[]
  getFlashSaleProducts: () => Product[]
  getBestSellers: () => Product[]
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  categories: [],
  loading: false,
  error: null,
  selectedProduct: null,

  fetchProducts: async () => {
    set({ loading: true, error: null })
    try {
      const q = query(
        collection(db, 'products'),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      )
      const snapshot = await getDocs(q)
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Product[]
      set({ products, loading: false })
    } catch (error) {
      set({ error: 'Gagal memuat produk', loading: false })
    }
  },

  fetchCategories: async () => {
    set({ loading: true, error: null })
    try {
      const q = query(collection(db, 'categories'), orderBy('order', 'asc'))
      const snapshot = await getDocs(q)
      const categories = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Category[]
      set({ categories, loading: false })
    } catch (error) {
      set({ error: 'Gagal memuat kategori', loading: false })
    }
  },

  fetchProductBySlug: async (slug: string) => {
    set({ loading: true, error: null })
    try {
      const q = query(collection(db, 'products'), where('slug', '==', slug))
      const snapshot = await getDocs(q)
      if (snapshot.empty) {
        set({ selectedProduct: null, loading: false })
        return
      }
      const doc = snapshot.docs[0]
      const product = {
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      } as Product
      set({ selectedProduct: product, loading: false })
    } catch (error) {
      set({ error: 'Gagal memuat produk', loading: false })
    }
  },

  searchProducts: async (searchTerm: string) => {
    const { products } = get()
    const term = searchTerm.toLowerCase()
    return products.filter(
      p =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    )
  },

  getProductsByCategory: (categoryId: string) => {
    const { products } = get()
    return products.filter(p => p.categoryId === categoryId)
  },

  getFlashSaleProducts: () => {
    const { products } = get()
    return products.filter(p => p.isFlashSale && p.discountPrice > 0)
  },

  getBestSellers: () => {
    const { products } = get()
    return [...products].sort((a, b) => b.soldCount - a.soldCount).slice(0, 10)
  },
}))