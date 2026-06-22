import { Link } from 'react-router-dom'
import { Gift, ArrowRight, Coins } from 'lucide-react'

export function CashQuestBanner() {
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4">
        <Link
          to="/cashquest"
          className="flex items-center justify-between p-4 bg-violet-600 dark:bg-violet-700 rounded-2xl hover:bg-violet-700 dark:hover:bg-violet-600 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Cash Quest</h3>
              <p className="text-violet-200 text-sm">Selesaikan misi, dapatkan koin & tukar hadiah</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full">
              <Coins className="w-4 h-4 text-yellow-300" />
              <span className="text-white text-sm font-medium">Dapatkan Koin</span>
            </div>
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </section>
  )
}
