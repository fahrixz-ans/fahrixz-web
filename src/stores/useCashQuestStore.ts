import { create } from 'zustand'
import { collection, query, where, getDocs, orderBy, addDoc, serverTimestamp, updateDoc, doc, increment } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { CashQuest, UserQuest } from '@/types'

interface CashQuestState {
  quests: CashQuest[]
  userQuests: UserQuest[]
  loading: boolean
  fetchQuests: () => Promise<void>
  fetchUserQuests: (userId: string) => Promise<void>
  startQuest: (questId: string, userId: string) => Promise<void>
  submitQuest: (questId: string, userId: string, proofImages: string[], note?: string) => Promise<void>
  getActiveQuests: () => CashQuest[]
  getUserQuestStatus: (questId: string, userId: string) => UserQuest | undefined
}

export const useCashQuestStore = create<CashQuestState>((set, get) => ({
  quests: [],
  userQuests: [],
  loading: false,

  fetchQuests: async () => {
    set({ loading: true })
    try {
      const q = query(
        collection(db, 'cashQuests'),
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc')
      )
      const snapshot = await getDocs(q)
      const quests = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        deadline: doc.data().deadline?.toDate() || new Date(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as CashQuest[]
      set({ quests, loading: false })
    } catch (error) {
      set({ loading: false })
    }
  },

  fetchUserQuests: async (userId: string) => {
    try {
      const q = query(
        collection(db, 'userQuests'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      )
      const snapshot = await getDocs(q)
      const userQuests = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        startedAt: doc.data().startedAt?.toDate() || undefined,
        submittedAt: doc.data().submittedAt?.toDate() || undefined,
        reviewedAt: doc.data().reviewedAt?.toDate() || undefined,
      })) as unknown as UserQuest[]
      set({ userQuests })
    } catch (error) {
      console.error('Error fetching user quests:', error)
    }
  },

  startQuest: async (questId, userId) => {
    await addDoc(collection(db, 'userQuests'), {
      questId,
      userId,
      status: 'in_progress',
      progress: 0,
      target: 1,
      coinsEarned: 0,
      startedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    })
    await updateDoc(doc(db, 'cashQuests', questId), {
      participantCount: increment(1),
    })
  },

  submitQuest: async (questId, userId, proofImages, note) => {
    const q = query(
      collection(db, 'userQuests'),
      where('questId', '==', questId),
      where('userId', '==', userId)
    )
    const snapshot = await getDocs(q)
    if (!snapshot.empty) {
      const docRef = snapshot.docs[0].ref
      await updateDoc(docRef, {
        status: 'submitted',
        progress: 1,
        proofImages,
        note: note || '',
        submittedAt: serverTimestamp(),
      })
    }
  },

  getActiveQuests: () => {
    const now = new Date()
    return get().quests.filter(
      (q) => q.status === 'active' && q.deadline > now && q.participantCount < q.maxParticipants
    )
  },

  getUserQuestStatus: (questId, userId) => {
    return get().userQuests.find((uq) => uq.questId === questId && uq.userId === userId)
  },
}))
