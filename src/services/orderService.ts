import { collection, query, where, getDocs, orderBy, addDoc, updateDoc, doc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Order } from '@/types'

export const orderService = {
  async getUserOrders(userId: string): Promise<Order[]> {
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      paidAt: doc.data().paidAt?.toDate() || undefined,
      processedAt: doc.data().processedAt?.toDate() || undefined,
      completedAt: doc.data().completedAt?.toDate() || undefined,
    })) as Order[]
  },

  async getOrderById(orderId: string): Promise<Order | null> {
    const docSnap = await getDoc(doc(db, 'orders', orderId))
    if (!docSnap.exists()) return null
    const data = docSnap.data()
    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      paidAt: data.paidAt?.toDate() || undefined,
      processedAt: data.processedAt?.toDate() || undefined,
      completedAt: data.completedAt?.toDate() || undefined,
    } as Order
  },

  async createOrder(order: Omit<Order, 'id' | 'createdAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...order,
      createdAt: serverTimestamp(),
    })
    return docRef.id
  },

  async updateOrderStatus(orderId: string, status: string): Promise<void> {
    await updateDoc(doc(db, 'orders', orderId), {
      status,
      updatedAt: serverTimestamp(),
    })
  },

  async cancelOrder(orderId: string): Promise<void> {
    await updateDoc(doc(db, 'orders', orderId), {
      status: 'cancelled',
      updatedAt: serverTimestamp(),
    })
  },
}
