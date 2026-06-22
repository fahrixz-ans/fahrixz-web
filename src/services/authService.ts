import { auth, db } from '@/lib/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  GithubAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import type { User } from '@/types'

const createUserDoc = async (firebaseUser: any, extraData?: Partial<User>) => {
  const referralCode = 'FXZ' + Math.random().toString(36).substring(2, 7).toUpperCase()
  const userData: User = {
    uid: firebaseUser.uid,
    email: firebaseUser.email || '',
    emailVerified: firebaseUser.emailVerified,
    fullName: firebaseUser.displayName || 'User',
    phone: firebaseUser.phoneNumber || '',
    avatar: firebaseUser.photoURL || '',
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
    ...extraData,
  }

  await setDoc(doc(db, 'users', firebaseUser.uid), {
    ...userData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  await setDoc(doc(db, 'wallets', firebaseUser.uid), {
    userId: firebaseUser.uid,
    balance: 0,
    coins: 0,
    totalEarned: 0,
    totalWithdrawn: 0,
    updatedAt: serverTimestamp(),
  })

  return userData
}

export const authService = {
  async register(email: string, password: string, fullName: string, phone?: string) {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(result.user, { displayName: fullName })
    await sendEmailVerification(result.user)
    const userData = await createUserDoc(result.user, { fullName, phone: phone || '' })
    return { user: result.user, userData }
  },

  async login(email: string, password: string) {
    const result = await signInWithEmailAndPassword(auth, email, password)
    const userDoc = await getDoc(doc(db, 'users', result.user.uid))
    if (userDoc.exists()) {
      return { user: result.user, userData: userDoc.data() as User }
    }
    const userData = await createUserDoc(result.user)
    return { user: result.user, userData }
  },

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const userDoc = await getDoc(doc(db, 'users', result.user.uid))
    if (userDoc.exists()) {
      return { user: result.user, userData: userDoc.data() as User }
    }
    const userData = await createUserDoc(result.user)
    return { user: result.user, userData }
  },

  async loginWithFacebook() {
    const provider = new FacebookAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const userDoc = await getDoc(doc(db, 'users', result.user.uid))
    if (userDoc.exists()) {
      return { user: result.user, userData: userDoc.data() as User }
    }
    const userData = await createUserDoc(result.user)
    return { user: result.user, userData }
  },

  async loginWithApple() {
    const provider = new OAuthProvider('apple.com')
    const result = await signInWithPopup(auth, provider)
    const userDoc = await getDoc(doc(db, 'users', result.user.uid))
    if (userDoc.exists()) {
      return { user: result.user, userData: userDoc.data() as User }
    }
    const userData = await createUserDoc(result.user)
    return { user: result.user, userData }
  },

  async loginWithGithub() {
    const provider = new GithubAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const userDoc = await getDoc(doc(db, 'users', result.user.uid))
    if (userDoc.exists()) {
      return { user: result.user, userData: userDoc.data() as User }
    }
    const userData = await createUserDoc(result.user)
    return { user: result.user, userData }
  },

  async logout() {
    await signOut(auth)
  },

  async forgotPassword(email: string) {
    await sendPasswordResetEmail(auth, email)
  },

  async getUserData(uid: string): Promise<User | null> {
    const userDoc = await getDoc(doc(db, 'users', uid))
    if (userDoc.exists()) {
      return userDoc.data() as User
    }
    return null
  },
}
