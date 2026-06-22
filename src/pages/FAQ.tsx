import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { SEO } from '@/components/shared/SEO'
import { cn } from '@/lib/utils'

const faqs = [
  {
    q: 'Bagaimana cara membeli produk?',
    a: 'Pilih produk yang Anda inginkan, klik "Tambah Keranjang" atau "Beli Sekarang", lalu ikuti proses checkout. Pastikan Anda sudah login terlebih dahulu.',
  },
  {
    q: 'Metode pembayaran apa saja yang tersedia?',
    a: 'Kami menerima pembayaran via QRIS, Virtual Account (BCA, BNI, Mandiri, BRI), dan E-Wallet (GoPay, OVO, DANA, ShopeePay).',
  },
  {
    q: 'Berapa lama proses delivery?',
    a: 'Semua produk kami menggunakan sistem delivery otomatis yang berlangsung instan setelah pembayaran terkonfirmasi.',
  },
  {
    q: 'Apakah ada garansi?',
    a: 'Ya, semua produk kami bergaransi. Jika ada masalah, silakan hubungi support kami melalui chat Frandsa atau WhatsApp.',
  },
  {
    q: 'Bagaimana cara menggunakan voucher?',
    a: 'Masukkan kode voucher pada saat checkout sebelum melakukan pembayaran. Diskon akan otomatis diterapkan.',
  },
  {
    q: 'Apa itu Cash Quest?',
    a: 'Cash Quest adalah program misi di mana Anda dapat menyelesaikan berbagai tugas untuk mendapatkan koin. Koin tersebut dapat ditukar dengan voucher atau di-withdraw.',
  },
  {
    q: 'Bagaimana cara withdraw saldo?',
    a: 'Anda dapat melakukan withdraw dari halaman Wallet. Pilih metode Bank Transfer atau E-Wallet, isi data rekening, dan ajukan permintaan withdraw.',
  },
  {
    q: 'Berapa lama proses withdraw?',
    a: 'Proses withdraw biasanya memakan waktu 1-3 hari kerja setelah disetujui oleh admin.',
  },
  {
    q: 'Apakah saya perlu login untuk berbelanja?',
    a: 'Ya, Anda harus login untuk melakukan pembelian dan mengakses fitur seperti keranjang, wishlist, dan riwayat pesanan.',
  },
  {
    q: 'Bagaimana jika saya lupa password?',
    a: 'Klik "Lupa Password" di halaman login, masukkan email Anda, dan kami akan mengirimkan link reset password.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <>
      <SEO title="FAQ" />
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Pertanyaan Umum
          </h1>
          <p className="text-gray-500">Temukan jawaban untuk pertanyaan yang sering diajukan</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex items-center justify-between w-full px-6 py-4 text-left"
              >
                <span className="font-medium text-gray-900 dark:text-white flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-violet-600 shrink-0" />
                  {faq.q}
                </span>
                <ChevronDown className={cn(
                  'w-5 h-5 text-gray-400 transition-transform',
                  openIndex === i && 'rotate-180'
                )} />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 pl-8">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
