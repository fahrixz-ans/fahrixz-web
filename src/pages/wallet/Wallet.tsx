import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Wallet as WalletIcon, Coins, ArrowUpRight, ArrowDownRight,
  TrendingUp, Clock, Gift
} from 'lucide-react'
import { useAuthStore } from '@/stores/useAuthStore'
import { useWalletStore } from '@/stores/useWalletStore'
import { SEO } from '@/components/shared/SEO'
import { formatCurrency } from '@/lib/utils'

export function Wallet() {
  const { user } = useAuthStore()
  const { wallet, transactions, fetchWallet, fetchTransactions } = useWalletStore()

  useEffect(() => {
    if (user?.uid) {
      fetchWallet(user.uid)
      fetchTransactions(user.uid)
    }
  }, [user?.uid])

  const recentTransactions = transactions.slice(0, 5)

  return (
    <>
      <SEO title="Wallet" />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Wallet</h1>

        {/* Balance Cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-violet-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <WalletIcon className="w-5 h-5" />
              <span className="text-violet-200">Saldo</span>
            </div>
            <p className="text-3xl font-bold">{formatCurrency(wallet?.balance || 0)}</p>
            <div className="flex gap-2 mt-4">
              <Link
                to="/wallet/withdraw"
                className="flex items-center gap-1 px-4 py-2 bg-white/20 rounded-xl text-sm font-medium hover:bg-white/30 transition-colors"
              >
                <ArrowUpRight className="w-4 h-4" />
                Withdraw
              </Link>
              <Link
                to="/wallet/history"
                className="flex items-center gap-1 px-4 py-2 bg-white/20 rounded-xl text-sm font-medium hover:bg-white/30 transition-colors"
              >
                <Clock className="w-4 h-4" />
                Riwayat
              </Link>
            </div>
          </div>

          <div className="bg-amber-500 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Coins className="w-5 h-5" />
              <span className="text-amber-100">Koin</span>
            </div>
            <p className="text-3xl font-bold">{wallet?.coins || 0}</p>
            <p className="text-amber-100 text-sm mt-1">
              Total earned: {wallet?.totalEarned || 0}
            </p>
            <Link
              to="/vouchers"
              className="flex items-center gap-1 px-4 py-2 bg-white/20 rounded-xl text-sm font-medium hover:bg-white/30 transition-colors mt-4 w-fit"
            >
              <Gift className="w-4 h-4" />
              Tukar Koin
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(wallet?.totalEarned || 0)}
            </p>
            <p className="text-xs text-gray-500">Total Earned</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(wallet?.totalWithdrawn || 0)}
            </p>
            <p className="text-xs text-gray-500">Total Withdrawn</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {transactions.filter((t) => t.type === 'withdraw').length}
            </p>
            <p className="text-xs text-gray-500">Withdrawals</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {transactions.length}
            </p>
            <p className="text-xs text-gray-500">Transaksi</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Transaksi Terbaru</h3>
            <Link to="/wallet/history" className="text-sm text-violet-600 hover:text-violet-700">
              Lihat Semua
            </Link>
          </div>
          {recentTransactions.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">Belum ada transaksi</p>
          ) : (
            <div className="space-y-3">
              {recentTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
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
                      <p className="text-xs text-gray-500">
                        {new Date(tx.createdAt).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>
                  <p className={`text-sm font-medium ${
                    tx.amount >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {tx.amount >= 0 ? '+' : ''}{tx.coinAmount ? `${tx.coinAmount} koin` : formatCurrency(tx.amount)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
