import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { CartItem } from '@/types'

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string, variant: string) => void
  updateQuantity: (productId: string, variant: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  syncWithFirebase: (userId: string) => Promise<void>
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item: CartItem) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && i.variant === item.variant
          )
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId && i.variant === item.variant
                  ? { ...i, quantity: Math.min(i.quantity + item.quantity, i.stock) }
                  : i
              ),
            }
          }
          return { items: [...state.items, item] }
        })
      },

      removeItem: (productId: string, variant: string) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.variant === variant)
          ),
        }))
      },

      updateQuantity: (productId: string, variant: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId, variant)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.variant === variant
              ? { ...i, quantity: Math.min(quantity, i.stock) }
              : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      syncWithFirebase: async (userId: string) => {
        const { items } = get()
        if (userId) {
          await setDoc(doc(db, 'carts', userId), { items, updatedAt: new Date() }, { merge: true })
        }
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
)
