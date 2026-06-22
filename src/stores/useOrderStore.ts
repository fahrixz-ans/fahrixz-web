import { create } from 'zustand'
import { collection, query, where, orderBy, getDocs, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Order } from '@/types'

interface OrderState {
  orders: Order[]
  loading: boolean
  fetchUserOrders: (userId: string) => Promise<void>
  createOrder: (order: Omit<Order, 'id' | 'createdAt'>) => Promise<string>
  cancelOrder: (orderId: string) => Promise<void>
  getOrderById: (orderId: string) => Order | undefined
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  loading: false,

  fetchUserOrders: async (userId: string) => {
    set({ loading: true })
    try {
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      )
      const snapshot = await getDocs(q)
      const orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        paidAt: doc.data().paidAt?.toDate() || undefined,
        processedAt: doc.data().processedAt?.toDate() || undefined,
        completedAt: doc.data().completedAt?.toDate() || undefined,
      })) as Order[]
      set({ orders, loading: false })
    } catch (error) {
      set({ loading: false })
    }
  },

  createOrder: async (order) => {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...order,
      createdAt: serverTimestamp(),
    })
    return docRef.id
  },

  cancelOrder: async (orderId: string) => {
    await updateDoc(doc(db, 'orders', orderId), {
      status: 'cancelled',
      updatedAt: serverTimestamp(),
    })
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, status: 'cancelled' as const } : o
      ),
    }))
  },

  getOrderById: (orderId: string) => {
    return get().orders.find((o) => o.id === orderId)
  },
}))
