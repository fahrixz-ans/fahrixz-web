import { SEO } from '@/components/shared/SEO'

export function Privacy() {
  return (
    <>
      <SEO title="Kebijakan Privasi" />
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Kebijakan Privasi
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">1. Informasi yang Kami Kumpulkan</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Kami mengumpulkan informasi yang Anda berikan secara langsung saat mendaftar,
              seperti nama, alamat email, nomor telepon, dan informasi pembayaran.
              Kami juga mengumpulkan data tentang penggunaan layanan kami untuk meningkatkan pengalaman Anda.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">2. Penggunaan Informasi</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Informasi Anda digunakan untuk: memproses transaksi, mengirim notifikasi pesanan,
              memberikan dukungan pelanggan, dan meningkatkan layanan kami.
              Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">3. Keamanan Data</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Kami menggunakan teknologi enkripsi SSL dan langkah-langkah keamanan lainnya
              untuk melindungi informasi pribadi Anda dari akses tidak sah, perubahan, atau pengungkapan.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">4. Cookies</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Kami menggunakan cookies untuk meningkatkan pengalaman pengguna, menganalisis trafik,
              dan personalisasi konten. Anda dapat mengatur browser untuk menolak cookies,
              namun beberapa fitur mungkin tidak berfungsi dengan baik.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">5. Pihak Ketiga</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Kami menggunakan layanan pihak ketiga seperti Firebase untuk autentikasi dan database,
              serta payment gateway untuk pemrosesan pembayaran. Pihak ketiga ini memiliki kebijakan privasi sendiri.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">6. Hak Pengguna</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Anda berhak untuk mengakses, memperbarui, atau menghapus informasi pribadi Anda.
              Anda juga dapat meminta salinan data yang kami miliki tentang Anda.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">7. Perubahan Kebijakan</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu.
              Perubahan akan diposting di halaman ini dengan tanggal revisi yang diperbarui.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">8. Kontak</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami di
              fahrixzstore@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
