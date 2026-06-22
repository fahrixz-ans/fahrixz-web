// ============================================
// PRODUCT TYPES
// ============================================
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription?: string
  price: number
  originalPrice?: number
  category: string
  categoryId: string
  images: string[]
  stock: number
  variants?: ProductVariant[]
  badge?: 'bestseller' | 'flash' | 'new' | 'sale'
  rating: number
  reviewCount: number
  soldCount: number
  status: 'active' | 'inactive'
  metadata?: Record<string, string>
  createdAt: Date
  updatedAt: Date
}

export interface ProductVariant {
  id: string
  name: string
  price: number
  stock: number
  sku: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  description: string
  productCount: number
  image?: string
  color?: string
}

// ============================================
// ORDER TYPES
// ============================================
export interface Order {
  id: string
  orderId: string
  sn: string
  userId: string
  userEmail: string
  userName: string
  userPhone: string
  items: OrderItem[]
  subtotal: number
  discount: number
  fee: number
  total: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  paymentStatus: 'unpaid' | 'paid' | 'failed' | 'refunded'
  paymentMethod?: string
  faspayBillNo?: string
  faspayTrxId?: string
  paidAt?: Date
  processedAt?: Date
  completedAt?: Date
  createdAt: Date
}

export interface OrderItem {
  productId: string
  name: string
  variant: string
  image: string
  price: number
  quantity: number
}

// ============================================
// USER TYPES
// ============================================
export interface User {
  uid: string
  email: string
  emailVerified: boolean
  fullName: string
  phone?: string
  avatar?: string
  bio?: string
  socialLinks?: {
    instagram?: string
    twitter?: string
    github?: string
  }
  isAdmin: boolean
  coins: number
  totalCoinsEarned: number
  streak: number
  longestStreak: number
  lastMissionDate?: Date
  membership: 'bronze' | 'silver' | 'gold' | 'platinum'
  totalOrders: number
  totalSpent: number
  referralCode: string
  referredBy?: string
  createdAt: Date
  updatedAt: Date
  preferences: {
    darkMode: boolean
    notifications: boolean
    newsletter: boolean
  }
}

// ============================================
// CART TYPES
// ============================================
export interface CartItem {
  productId: string
  name: string
  variant: string
  image: string
  price: number
  quantity: number
  stock: number
  category: string
}

// ============================================
// WALLET TYPES
// ============================================
export interface Wallet {
  userId: string
  balance: number
  coins: number
  totalEarned: number
  totalWithdrawn: number
  updatedAt: Date
}

export interface Transaction {
  id: string
  userId: string
  type: 'reward' | 'coin_exchange' | 'withdraw' | 'purchase' | 'refund'
  amount: number
  coinAmount?: number
  description: string
  status: 'success' | 'pending' | 'failed'
  referenceId?: string
  createdAt: Date
}

export interface WithdrawRequest {
  id: string
  userId: string
  amount: number
  method: 'bank_transfer' | 'e_wallet'
  bankName?: string
  eWalletName?: string
  accountNumber: string
  accountName: string
  status: 'pending' | 'approved' | 'rejected'
  adminNote?: string
  processedAt?: Date
  createdAt: Date
}

// ============================================
// CASH QUEST TYPES (Nama baru untuk Missions)
// ============================================
export interface CashQuest {
  id: string
  title: string
  description: string
  instructions: string[]
  type: 'download' | 'share' | 'review' | 'order' | 'invite' | 'flash' | 'daily' | 'chain'
  rewardCoins: number
  rewardVoucher?: string
  maxParticipants: number
  participantCount: number
  deadline: Date
  duration: number // hours
  status: 'active' | 'expired' | 'full'
  requirements: string[]
  thumbnail?: string
  createdAt: Date
}

export interface UserQuest {
  questId: string
  userId: string
  status: 'not_started' | 'in_progress' | 'submitted' | 'approved' | 'rejected'
  progress: number
  target: number
  proofImages?: string[]
  note?: string
  submittedAt?: Date
  reviewedAt?: Date
  reviewNote?: string
  coinsEarned: number
  startedAt?: Date
  createdAt: Date
}

// ============================================
// REFERRAL TYPES
// ============================================
export interface Referral {
  userId: string
  code: string
  clicks: number
  conversions: number
  earnings: number
  referredUsers: ReferredUser[]
  createdAt: Date
}

export interface ReferredUser {
  userId: string
  userName: string
  joinedAt: Date
  firstOrderAmount?: number
  commissionEarned: number
}

// ============================================
// VOUCHER TYPES
// ============================================
export interface Voucher {
  id: string
  code: string
  type: 'percentage' | 'fixed'
  value: number
  minOrder: number
  maxDiscount?: number
  usageLimit: number
  usageCount: number
  validFrom: Date
  validUntil: Date
  status: 'active' | 'expired' | 'disabled'
  applicableTo?: string[]
  description?: string
}

// ============================================
// REVIEW TYPES
// ============================================
export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  productId: string
  orderId: string
  rating: number
  text: string
  images?: string[]
  verified: boolean
  helpful: number
  createdAt: Date
}

// ============================================
// NOTIFICATION TYPES
// ============================================
export interface Notification {
  id: string
  userId: string
  type: 'order' | 'quest' | 'wallet' | 'withdraw' | 'promo' | 'system'
  title: string
  message: string
  data?: Record<string, any>
  read: boolean
  createdAt: Date
}

// ============================================
// CUSTOMER SERVICE TYPES
// ============================================
export interface CSRoom {
  id: string
  userId: string
  userName: string
  userEmail: string
  status: 'ai_active' | 'waiting_admin' | 'human_active' | 'closed'
  mode: 'ai' | 'human'
  adminId?: string
  adminName?: string
  handoffReason?: string
  lastMessage: string
  unreadUser: number
  unreadAdmin: number
  createdAt: Date
  updatedAt: Date
}

export interface CSMessage {
  id: string
  sender: 'user' | 'ai' | 'admin' | 'system'
  senderName: string
  text: string
  type: 'text' | 'image' | 'file' | 'handoff_notice' | 'system'
  createdAt: Date
  read: boolean
}

// ============================================
// SEO TYPES
// ============================================
export interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
}

// ============================================
// FLASH SALE TYPES
// ============================================
export interface FlashSale {
  id: string
  productId: string
  productName: string
  productImage: string
  originalPrice: number
  salePrice: number
  stock: number
  sold: number
  startTime: Date
  endTime: Date
  status: 'active' | 'ended' | 'sold_out'
}

// ============================================
// STATS TYPES
// ============================================
export interface SiteStats {
  totalUsers: number
  totalProducts: number
  totalOrders: number
  totalRevenue: number
}
