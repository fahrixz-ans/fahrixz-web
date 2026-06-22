import { create } from 'zustand'
import { doc, getDoc, collection, query, where, orderBy, getDocs, addDoc, serverTimestamp, updateDoc, increment } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Wallet, Transaction, WithdrawRequest } from '@/types'

interface WalletState {
  wallet: Wallet | null
  transactions: Transaction[]
  withdrawRequests: WithdrawRequest[]
  loading: boolean
  fetchWallet: (userId: string) => Promise<void>
  fetchTransactions: (userId: string) => Promise<void>
  fetchWithdrawRequests: (userId: string) => Promise<void>
  createWithdrawRequest: (request: Omit<WithdrawRequest, 'id' | 'status' | 'adminNote' | 'processedAt' | 'createdAt'>) => Promise<void>
  exchangeCoins: (userId: string, coins: number, amount: number) => Promise<void>
  addCoins: (userId: string, coins: number, description: string) => Promise<void>
}

export const useWalletStore = create<WalletState>((set) => ({
  wallet: null,
  transactions: [],
  withdrawRequests: [],
  loading: false,

  fetchWallet: async (userId: string) => {
    const docSnap = await getDoc(doc(db, 'wallets', userId))
    if (docSnap.exists()) {
      const data = docSnap.data()
      set({
        wallet: {
          userId: data.userId,
          balance: data.balance || 0,
          coins: data.coins || 0,
          totalEarned: data.totalEarned || 0,
          totalWithdrawn: data.totalWithdrawn || 0,
          updatedAt: data.updatedAt?.toDate() || new Date(),
        },
      })
    }
  },

  fetchTransactions: async (userId: string) => {
    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    const transactions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as Transaction[]
    set({ transactions })
  },

  fetchWithdrawRequests: async (userId: string) => {
    const q = query(
      collection(db, 'withdrawRequests'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    const withdrawRequests = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      processedAt: doc.data().processedAt?.toDate() || undefined,
    })) as WithdrawRequest[]
    set({ withdrawRequests })
  },

  createWithdrawRequest: async (request) => {
    await addDoc(collection(db, 'withdrawRequests'), {
      ...request,
      status: 'pending',
      createdAt: serverTimestamp(),
    })
    // Deduct balance
    await updateDoc(doc(db, 'wallets', request.userId), {
      balance: increment(-request.amount),
      totalWithdrawn: increment(request.amount),
      updatedAt: serverTimestamp(),
    })
    // Add transaction record
    await addDoc(collection(db, 'transactions'), {
      userId: request.userId,
      type: 'withdraw',
      amount: -request.amount,
      description: `Withdraw ${request.method === 'bank_transfer' ? 'Bank Transfer' : 'E-Wallet'} - ${request.accountName}`,
      status: 'pending',
      createdAt: serverTimestamp(),
    })
  },

  exchangeCoins: async (userId, coins, amount) => {
    await updateDoc(doc(db, 'wallets', userId), {
      coins: increment(-coins),
      balance: increment(amount),
      updatedAt: serverTimestamp(),
    })
    await addDoc(collection(db, 'transactions'), {
      userId,
      type: 'coin_exchange',
      amount,
      coinAmount: coins,
      description: `Tukar ${coins} koin ke saldo`,
      status: 'success',
      createdAt: serverTimestamp(),
    })
  },

  addCoins: async (userId, coins, description) => {
    await updateDoc(doc(db, 'wallets', userId), {
      coins: increment(coins),
      totalEarned: increment(coins),
      updatedAt: serverTimestamp(),
    })
    await addDoc(collection(db, 'transactions'), {
      userId,
      type: 'reward',
      coinAmount: coins,
      amount: 0,
      description,
      status: 'success',
      createdAt: serverTimestamp(),
    })
  },
}))
