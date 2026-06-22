import { create } from 'zustand'
import { collection, query, where, orderBy, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Notification } from '@/types'

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  loading: boolean
  fetchNotifications: (userId: string) => Promise<void>
  markAsRead: (notificationId: string) => Promise<void>
  markAllAsRead: (userId: string) => Promise<void>
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,

  fetchNotifications: async (userId: string) => {
    try {
      const q = query(
        collection(db, 'notifications'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      )
      const snapshot = await getDocs(q)
      const notifications = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as Notification[]
      const unreadCount = notifications.filter((n) => !n.read).length
      set({ notifications, unreadCount })
    } catch (error) {
      console.error('Error fetching notifications:', error)
    }
  },

  markAsRead: async (notificationId: string) => {
    await updateDoc(doc(db, 'notifications', notificationId), { read: true })
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }))
  },

  markAllAsRead: async (_userId: string) => {
    const { notifications } = get()
    const unread = notifications.filter((n) => !n.read)
    await Promise.all(
      unread.map((n) => updateDoc(doc(db, 'notifications', n.id), { read: true }))
    )
    set({
      notifications: notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })
  },
}))
