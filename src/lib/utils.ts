import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

export function calculateDiscount(price: number, originalPrice?: number): number {
  if (!originalPrice || originalPrice <= price) return 0
  return Math.round(((originalPrice - price) / originalPrice) * 100)
}

export function generateOrderId(): string {
  return 'ORD-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 5).toUpperCase()
}

export function generateReferralCode(): string {
  return 'FXZ' + Math.random().toString(36).substring(2, 7).toUpperCase()
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function timeAgo(date: Date | string): string {
  const now = new Date()
  const d = typeof date === 'string' ? new Date(date) : date
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000)

  if (seconds < 60) return 'Baru saja'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} menit lalu`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} jam lalu`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} hari lalu`
  return formatDate(date)
}

export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let timeoutId: ReturnType<typeof setTimeout>
  return ((...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }) as T
}

export function getMembershipColor(membership: string): string {
  const colors: Record<string, string> = {
    bronze: 'text-amber-700 bg-amber-100',
    silver: 'text-gray-600 bg-gray-200',
    gold: 'text-yellow-700 bg-yellow-100',
    platinum: 'text-violet-700 bg-violet-100',
  }
  return colors[membership] || colors.bronze
}

export function getMembershipProgress(totalSpent: number): { current: string; next: string; progress: number } {
  if (totalSpent >= 5000000) return { current: 'platinum', next: 'max', progress: 100 }
  if (totalSpent >= 2000000) return { current: 'gold', next: 'platinum', progress: ((totalSpent - 2000000) / 3000000) * 100 }
  if (totalSpent >= 500000) return { current: 'silver', next: 'gold', progress: ((totalSpent - 500000) / 1500000) * 100 }
  return { current: 'bronze', next: 'silver', progress: (totalSpent / 500000) * 100 }
}
