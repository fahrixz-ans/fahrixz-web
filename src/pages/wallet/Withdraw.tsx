import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Building2, Wallet } from 'lucide-react'
import { useAuthStore } from '@/stores/useAuthStore'
import { useWalletStore } from '@/stores/useWalletStore'
import { SEO } from '@/components/shared/SEO'
import { formatCurrency } from '@/lib/utils'
import toast from 'react-hot-toast'

export function Withdraw() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { wallet, createWithdrawRequest, fetchWallet } = useWalletStore()
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState<'bank_transfer' | 'e_wallet'>('bank_transfer')
  const [bankName, setBankName] = useState('')
  const [eWalletName, setEWalletName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [accountName, setAccountName] = useState('')
  const [loading, setLoading] = useState(false)

  const balance = wallet?.balance || 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const withdrawAmount = parseFloat(amount)
    if (!withdrawAmount || withdrawAmount <= 0) {
      toast.error('Masukkan jumlah yang valid')
      return
    }
    if (withdrawAmount > balance) {
      toast.error('Saldo tidak mencukupi')
      return
    }
    if (!accountNumber || !accountName) {
      toast.error('Lengkapi data rekening/e-wallet')
      return
    }
    if (method === 'bank_transfer' && !bankName) {
      toast.error('Pilih bank')
      return
    }
    if (method === 'e_wallet' && !eWalletName) {
      toast.error('Pilih e-wallet')
      return
    }

    setLoading(true)
    try {
      await createWithdrawRequest({
        userId: user?.uid || '',
        amount: withdrawAmount,
        method,
        bankName: method === 'bank_transfer' ? bankName : undefined,
        eWalletName: method === 'e_wallet' ? eWalletName : undefined,
        accountNumber,
        accountName,
      })
      toast.success('Permintaan withdraw berhasil diajukan!')
      fetchWallet(user?.uid || '')
      navigate('/wallet/history')
    } catch (error: any) {
      toast.error(error.message || 'Gagal mengajukan withdraw')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO title="Withdraw" />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Withdraw</h1>

        {/* Balance */}
        <div className="bg-violet-600 rounded-2xl p-6 mb-6 text-white">
          <p className="text-violet-200 text-sm">Saldo Tersedia</p>
          <p className="text-3xl font-bold">{formatCurrency(balance)}</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Jumlah Withdraw
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Min. Rp10.000"
                min={10000}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
              />
              <div className="flex gap-2 mt-2">
                {[50000, 100000, 250000, 500000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val.toString())}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-medium hover:bg-violet-100 dark:hover:bg-violet-900/20 hover:text-violet-600 transition-colors"
                  >
                    {formatCurrency(val)}
                  </button>
                ))}
              </div>
            </div>

            {/* Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Metode Withdraw
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMethod('bank_transfer')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-colors ${
                    method === 'bank_transfer'
                      ? 'border-violet-600 bg-violet-50 dark:bg-violet-900/20 text-violet-600'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Bank Transfer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('e_wallet')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-colors ${
                    method === 'e_wallet'
                      ? 'border-violet-600 bg-violet-50 dark:bg-violet-900/20 text-violet-600'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Wallet className="w-4 h-4" />
                  <span className="text-sm font-medium">E-Wallet</span>
                </button>
              </div>
            </div>

            {/* Bank / E-Wallet Selection */}
            {method === 'bank_transfer' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Pilih Bank
                </label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
                >
                  <option value="">Pilih bank</option>
                  <option value="bca">BCA</option>
                  <option value="bni">BNI</option>
                  <option value="mandiri">Mandiri</option>
                  <option value="bri">BRI</option>
                  <option value="bsi">BSI</option>
                  <option value="cimb">CIMB Niaga</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Pilih E-Wallet
                </label>
                <select
                  value={eWalletName}
                  onChange={(e) => setEWalletName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
                >
                  <option value="">Pilih e-wallet</option>
                  <option value="gopay">GoPay</option>
                  <option value="ovo">OVO</option>
                  <option value="dana">DANA</option>
                  <option value="shopeepay">ShopeePay</option>
                  <option value="linkaja">LinkAja</option>
                </select>
              </div>
            )}

            {/* Account Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nomor {method === 'bank_transfer' ? 'Rekening' : 'E-Wallet'}
              </label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder={method === 'bank_transfer' ? '1234567890' : '08123456789'}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
              />
            </div>

            {/* Account Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Atas Nama
              </label>
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Nama pemilik rekening"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <ArrowUpRight className="w-4 h-4" />
              {loading ? 'Memproses...' : 'Ajukan Withdraw'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
