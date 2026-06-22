import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface WishlistState {
  items: string[] // product IDs
  toggleItem: (productId: string) => void
  isWishlisted: (productId: string) => boolean
  syncWithFirebase: (userId: string) => Promise<void>
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      toggleItem: (productId: string) => {
        set((state) => {
          const exists = state.items.includes(productId)
          if (exists) {
            return { items: state.items.filter((id) => id !== productId) }
          }
          return { items: [...state.items, productId] }
        })
      },

      isWishlisted: (productId: string) => {
        return get().items.includes(productId)
      },

      syncWithFirebase: async (userId: string) => {
        const { items } = get()
        if (userId) {
          await setDoc(doc(db, 'wishlists', userId), { items, updatedAt: new Date() })
        }
      },
    }),
    {
      name: 'wishlist-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
)
