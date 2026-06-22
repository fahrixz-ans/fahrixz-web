import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, ArrowDownRight, TrendingUp, Coins, Clock } from 'lucide-react'
import { useAuthStore } from '@/stores/useAuthStore'
import { useWalletStore } from '@/stores/useWalletStore'
import { SEO } from '@/components/shared/SEO'
import { formatCurrency, formatDate } from '@/lib/utils'

export function History() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { transactions, fetchTransactions } = useWalletStore()

  useEffect(() => {
    if (user?.uid) {
      fetchTransactions(user.uid)
    }
  }, [user?.uid])

  return (
    <>
      <SEO title="Riwayat Transaksi" />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Riwayat Transaksi</h1>

        {transactions.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Belum Ada Transaksi
            </h2>
            <p className="text-sm text-gray-500">Transaksi Anda akan muncul di sini</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      tx.type === 'reward' ? 'bg-green-100 text-green-600' :
                      tx.type === 'withdraw' ? 'bg-red-100 text-red-600' :
                      tx.type === 'coin_exchange' ? 'bg-amber-100 text-amber-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {tx.type === 'reward' ? <TrendingUp className="w-5 h-5" /> :
                       tx.type === 'withdraw' ? <ArrowUpRight className="w-5 h-5" /> :
                       tx.type === 'coin_exchange' ? <Coins className="w-5 h-5" /> :
                       <ArrowDownRight className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {tx.description}
                      </p>
                      <p className="text-xs text-gray-500">{formatDate(tx.createdAt)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      tx.amount >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {tx.amount >= 0 ? '+' : ''}{tx.coinAmount ? `${tx.coinAmount} koin` : formatCurrency(tx.amount)}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      tx.status === 'success' ? 'bg-green-100 text-green-600' :
                      tx.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {tx.status === 'success' ? 'Berhasil' :
                       tx.status === 'pending' ? 'Pending' : 'Gagal'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
