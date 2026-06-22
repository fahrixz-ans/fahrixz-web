import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  GithubAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
  type User as FirebaseUser,
} from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  firebaseUser: FirebaseUser | null
  isLoggedIn: boolean
  isLoading: boolean
  isAdmin: boolean
  initialized: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, fullName: string, phone?: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  loginWithFacebook: () => Promise<void>
  loginWithApple: () => Promise<void>
  loginWithGithub: () => Promise<void>
  loginWithPhone: (phoneNumber: string, verifier: any) => Promise<void>
  logout: () => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  updateUserProfile: (data: Partial<User>) => Promise<void>
  refreshUser: () => Promise<void>
  setUser: (user: User | null, fbUser: FirebaseUser | null) => void
}

function mapFirebaseUser(fbUser: FirebaseUser): User {
  return {
    uid: fbUser.uid,
    email: fbUser.email || '',
    emailVerified: fbUser.emailVerified,
    fullName: fbUser.displayName || 'User',
    phone: fbUser.phoneNumber || '',
    avatar: fbUser.photoURL || '',
    isAdmin: false,
    coins: 0,
    totalCoinsEarned: 0,
    streak: 0,
    longestStreak: 0,
    membership: 'bronze',
    totalOrders: 0,
    totalSpent: 0,
    referralCode: '',
    preferences: {
      darkMode: false,
      notifications: true,
      newsletter: true,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      firebaseUser: null,
      isLoggedIn: false,
      isLoading: true,
      isAdmin: false,
      initialized: false,

      login: async (email: string, password: string) => {
        const result = await signInWithEmailAndPassword(auth, email, password)
        const userDoc = await getDoc(doc(db, 'users', result.user.uid))
        if (userDoc.exists()) {
          const userData = userDoc.data() as User
          set({ user: userData, firebaseUser: result.user, isLoggedIn: true, isAdmin: userData.isAdmin })
        } else {
          const newUser = mapFirebaseUser(result.user)
          await setDoc(doc(db, 'users', result.user.uid), {
            ...newUser,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          })
          set({ user: newUser, firebaseUser: result.user, isLoggedIn: true, isAdmin: false })
        }
      },

      register: async (email: string, password: string, fullName: string, phone?: string) => {
        const result = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(result.user, { displayName: fullName })
        await sendEmailVerification(result.user)

        const referralCode = 'FXZ' + Math.random().toString(36).substring(2, 7).toUpperCase()
        const newUser: User = {
          uid: result.user.uid,
          email,
          emailVerified: false,
          fullName,
          phone: phone || '',
          avatar: '',
          isAdmin: false,
          coins: 0,
          totalCoinsEarned: 0,
          streak: 0,
          longestStreak: 0,
          membership: 'bronze',
          totalOrders: 0,
          totalSpent: 0,
          referralCode,
          preferences: {
            darkMode: false,
            notifications: true,
            newsletter: true,
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        await setDoc(doc(db, 'users', result.user.uid), {
          ...newUser,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })

        await setDoc(doc(db, 'wallets', result.user.uid), {
          userId: result.user.uid,
          balance: 0,
          coins: 0,
          totalEarned: 0,
          totalWithdrawn: 0,
          updatedAt: serverTimestamp(),
        })

        set({ user: newUser, firebaseUser: result.user, isLoggedIn: true, isAdmin: false })
      },

      loginWithGoogle: async () => {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        const userDoc = await getDoc(doc(db, 'users', result.user.uid))
        if (!userDoc.exists()) {
          const referralCode = 'FXZ' + Math.random().toString(36).substring(2, 7).toUpperCase()
          const newUser = {
            ...mapFirebaseUser(result.user),
            referralCode,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          }
          await setDoc(doc(db, 'users', result.user.uid), newUser)
          await setDoc(doc(db, 'wallets', result.user.uid), {
            userId: result.user.uid,
            balance: 0,
            coins: 0,
            totalEarned: 0,
            totalWithdrawn: 0,
            updatedAt: serverTimestamp(),
          })
          set({ user: { ...newUser, createdAt: new Date(), updatedAt: new Date() }, firebaseUser: result.user, isLoggedIn: true, isAdmin: false })
        } else {
          const userData = userDoc.data() as User
          set({ user: userData, firebaseUser: result.user, isLoggedIn: true, isAdmin: userData.isAdmin })
        }
      },

      loginWithFacebook: async () => {
        const provider = new FacebookAuthProvider()
        const result = await signInWithPopup(auth, provider)
        const userDoc = await getDoc(doc(db, 'users', result.user.uid))
        if (!userDoc.exists()) {
          const referralCode = 'FXZ' + Math.random().toString(36).substring(2, 7).toUpperCase()
          const newUser = {
            ...mapFirebaseUser(result.user),
            referralCode,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          }
          await setDoc(doc(db, 'users', result.user.uid), newUser)
          await setDoc(doc(db, 'wallets', result.user.uid), {
            userId: result.user.uid,
            balance: 0,
            coins: 0,
            totalEarned: 0,
            totalWithdrawn: 0,
            updatedAt: serverTimestamp(),
          })
          set({ user: { ...newUser, createdAt: new Date(), updatedAt: new Date() }, firebaseUser: result.user, isLoggedIn: true, isAdmin: false })
        } else {
          const userData = userDoc.data() as User
          set({ user: userData, firebaseUser: result.user, isLoggedIn: true, isAdmin: userData.isAdmin })
        }
      },

      loginWithApple: async () => {
        const provider = new OAuthProvider('apple.com')
        const result = await signInWithPopup(auth, provider)
        const userDoc = await getDoc(doc(db, 'users', result.user.uid))
        if (!userDoc.exists()) {
          const referralCode = 'FXZ' + Math.random().toString(36).substring(2, 7).toUpperCase()
          const newUser = {
            ...mapFirebaseUser(result.user),
            referralCode,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          }
          await setDoc(doc(db, 'users', result.user.uid), newUser)
          await setDoc(doc(db, 'wallets', result.user.uid), {
            userId: result.user.uid,
            balance: 0,
            coins: 0,
            totalEarned: 0,
            totalWithdrawn: 0,
            updatedAt: serverTimestamp(),
          })
          set({ user: { ...newUser, createdAt: new Date(), updatedAt: new Date() }, firebaseUser: result.user, isLoggedIn: true, isAdmin: false })
        } else {
          const userData = userDoc.data() as User
          set({ user: userData, firebaseUser: result.user, isLoggedIn: true, isAdmin: userData.isAdmin })
        }
      },

      loginWithGithub: async () => {
        const provider = new GithubAuthProvider()
        const result = await signInWithPopup(auth, provider)
        const userDoc = await getDoc(doc(db, 'users', result.user.uid))
        if (!userDoc.exists()) {
          const referralCode = 'FXZ' + Math.random().toString(36).substring(2, 7).toUpperCase()
          const newUser = {
            ...mapFirebaseUser(result.user),
            referralCode,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          }
          await setDoc(doc(db, 'users', result.user.uid), newUser)
          await setDoc(doc(db, 'wallets', result.user.uid), {
            userId: result.user.uid,
            balance: 0,
            coins: 0,
            totalEarned: 0,
            totalWithdrawn: 0,
            updatedAt: serverTimestamp(),
          })
          set({ user: { ...newUser, createdAt: new Date(), updatedAt: new Date() }, firebaseUser: result.user, isLoggedIn: true, isAdmin: false })
        } else {
          const userData = userDoc.data() as User
          set({ user: userData, firebaseUser: result.user, isLoggedIn: true, isAdmin: userData.isAdmin })
        }
      },

      loginWithPhone: async (_phoneNumber: string, _verifier: any) => {
        // Phone auth requires reCAPTCHA verifier - implementation in component
        console.log('Phone auth requires reCAPTCHA verifier setup')
      },

      logout: async () => {
        await signOut(auth)
        set({ user: null, firebaseUser: null, isLoggedIn: false, isAdmin: false })
      },

      forgotPassword: async (email: string) => {
        await sendPasswordResetEmail(auth, email)
      },

      updateUserProfile: async (data: Partial<User>) => {
        const { user, firebaseUser } = get()
        if (!user || !firebaseUser) return
        await updateDoc(doc(db, 'users', user.uid), {
          ...data,
          updatedAt: serverTimestamp(),
        })
        if (data.fullName && firebaseUser) {
          await updateProfile(firebaseUser, { displayName: data.fullName })
        }
        set({ user: { ...user, ...data } })
      },

      refreshUser: async () => {
        const { firebaseUser } = get()
        if (!firebaseUser) return
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
        if (userDoc.exists()) {
          const userData = userDoc.data() as User
          set({ user: userData, isLoggedIn: true, isAdmin: userData.isAdmin })
        }
      },

      setUser: (user, fbUser) => {
        set({ user, firebaseUser: fbUser, isLoggedIn: !!user, isAdmin: user?.isAdmin || false })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isLoggedIn: state.isLoggedIn, isAdmin: state.isAdmin }),
    }
  )
)

// Listen to auth state changes
onAuthStateChanged(auth, async (fbUser) => {
  if (fbUser) {
    const userDoc = await getDoc(doc(db, 'users', fbUser.uid))
    if (userDoc.exists()) {
      const userData = userDoc.data() as User
      useAuthStore.getState().setUser(userData, fbUser)
    } else {
      useAuthStore.getState().setUser(mapFirebaseUser(fbUser), fbUser)
    }
  } else {
    useAuthStore.getState().setUser(null, null)
  }
  useAuthStore.setState({ isLoading: false, initialized: true })
})
