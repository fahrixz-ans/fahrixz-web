import { Users, Package, ShoppingCart, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { formatNumber } from '@/lib/utils'

export function StatsBar() {
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0 })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersSnap, productsSnap, ordersSnap] = await Promise.all([
          getDocs(collection(db, 'users')),
          getDocs(collection(db, 'products')),
          getDocs(collection(db, 'orders')),
        ])
        setStats({
          users: usersSnap.size,
          products: productsSnap.size,
          orders: ordersSnap.size,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }
    fetchStats()
  }, [])

  const items = [
    { icon: Users, label: 'Pengguna', value: stats.users },
    { icon: Package, label: 'Produk', value: stats.products },
    { icon: ShoppingCart, label: 'Transaksi', value: stats.orders },
    { icon: Star, label: 'Rating', value: '4.9' },
  ]

  return (
    <section className="py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-3 justify-center">
              <div className="w-10 h-10 bg-violet-50 dark:bg-violet-900/20 rounded-xl flex items-center justify-center">
                <item.icon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div className="hidden sm:block">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {typeof item.value === 'number' ? formatNumber(item.value) : item.value}
                </p>
                <p className="text-xs text-gray-500">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
