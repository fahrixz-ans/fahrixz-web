import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Product, Category } from '@/types'

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const q = query(collection(db, 'products'), where('status', '==', 'active'), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Product[]
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    const q = query(collection(db, 'products'), where('slug', '==', slug))
    const snapshot = await getDocs(q)
    if (snapshot.empty) return null
    const doc = snapshot.docs[0]
    return {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    } as Product
  },

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    const q = query(
      collection(db, 'products'),
      where('categoryId', '==', categoryId),
      where('status', '==', 'active')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Product[]
  },

  async getCategories(): Promise<Category[]> {
    const q = query(collection(db, 'categories'), orderBy('name'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Category[]
  },

  async searchProducts(searchTerm: string): Promise<Product[]> {
    const products = await this.getAllProducts()
    const term = searchTerm.toLowerCase()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    )
  },
}
