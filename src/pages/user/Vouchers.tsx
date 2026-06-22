import { useState } from 'react'
import { Ticket, Copy, Check, Gift } from 'lucide-react'
import { SEO } from '@/components/shared/SEO'
import toast from 'react-hot-toast'

const VOUCHERS = [
  { code: 'WELCOME10', type: 'percentage', value: 10, minOrder: 50000, desc: 'Diskon 10% untuk pembelian pertama', validUntil: '2025-12-31' },
  { code: 'FLASH25', type: 'percentage', value: 25, minOrder: 100000, desc: 'Diskon 25% Flash Sale', validUntil: '2025-06-30' },
  { code: 'CASH50K', type: 'fixed', value: 50000, minOrder: 200000, desc: 'Potongan Rp50.000', validUntil: '2025-08-31' },
]

export function Vouchers() {
  const [copied, setCopied] = useState('')

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(code)
    toast.success('Kode voucher disalin')
    setTimeout(() => setCopied(''), 2000)
  }

  return (
    <>
      <SEO title="Voucher" />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Voucher</h1>

        {/* Redeem */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/20 rounded-xl flex items-center justify-center">
              <Gift className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Tukar Koin</h3>
              <p className="text-xs text-gray-500">Tukar koin Cash Quest menjadi voucher</p>
            </div>
          </div>
          <button
            onClick={() => toast.success('Fitur tukar koin segera hadir!')}
            className="w-full py-2.5 bg-violet-600 text-white rounded-xl font-medium text-sm hover:bg-violet-700 transition-colors"
          >
            Tukar Koin
          </button>
        </div>

        {/* Voucher List */}
        <div className="space-y-4">
          {VOUCHERS.map((voucher) => (
            <div
              key={voucher.code}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/20 rounded-xl flex items-center justify-center">
                    <Ticket className="w-6 h-6 text-violet-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {voucher.type === 'percentage' ? `${voucher.value}% OFF` : `Rp${voucher.value.toLocaleString()} OFF`}
                    </p>
                    <p className="text-sm text-gray-500">{voucher.desc}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Min. order Rp{voucher.minOrder.toLocaleString()} • Berlaku s/d {voucher.validUntil}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(voucher.code)}
                  className="flex items-center gap-1 px-3 py-2 bg-violet-50 dark:bg-violet-900/20 text-violet-600 rounded-lg hover:bg-violet-100 transition-colors"
                >
                  {copied === voucher.code ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span className="text-xs font-medium">{voucher.code}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <p className="text-sm text-gray-500">
            Dapatkan voucher eksklusif melalui saluran WhatsApp kami atau tukar koin Cash Quest Anda.
          </p>
        </div>
      </div>
    </>
  )
}
