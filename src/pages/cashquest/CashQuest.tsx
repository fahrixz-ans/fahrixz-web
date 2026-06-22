import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Gift, Clock, Users, Coins,
  Download, Share2, Star, ShoppingBag, UserPlus, Zap, Calendar, Link2
} from 'lucide-react'
import { useAuthStore } from '@/stores/useAuthStore'
import { useCashQuestStore } from '@/stores/useCashQuestStore'
import { SEO } from '@/components/shared/SEO'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

const QUEST_TYPE_ICONS: Record<string, any> = {
  download: Download,
  share: Share2,
  review: Star,
  order: ShoppingBag,
  invite: UserPlus,
  flash: Zap,
  daily: Calendar,
  chain: Link2,
}

const QUEST_TYPE_COLORS: Record<string, string> = {
  download: 'bg-blue-100 text-blue-600',
  share: 'bg-green-100 text-green-600',
  review: 'bg-amber-100 text-amber-600',
  order: 'bg-violet-100 text-violet-600',
  invite: 'bg-pink-100 text-pink-600',
  flash: 'bg-red-100 text-red-600',
  daily: 'bg-cyan-100 text-cyan-600',
  chain: 'bg-indigo-100 text-indigo-600',
}

export function CashQuest() {
  const { isLoggedIn, user } = useAuthStore()
  const { quests, userQuests, loading, fetchQuests, fetchUserQuests, startQuest } = useCashQuestStore()

  useEffect(() => {
    fetchQuests()
    if (user?.uid) {
      fetchUserQuests(user.uid)
    }
  }, [user?.uid])

  const handleStartQuest = async (questId: string) => {
    if (!isLoggedIn) {
      toast.error('Silakan login terlebih dahulu')
      return
    }
    try {
      await startQuest(questId, user?.uid || '')
      toast.success('Misi dimulai!')
    } catch (error: any) {
      toast.error(error.message || 'Gagal memulai misi')
    }
  }

  const getUserQuestStatus = (questId: string) => {
    return userQuests.find((uq) => uq.questId === questId)
  }

  return (
    <>
      <SEO
        title="Cash Quest"
        description="Selesaikan misi, dapatkan koin, dan tukar hadiah menarik!"
      />
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-violet-600 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Cash Quest</h1>
              <p className="text-violet-200">Selesaikan misi & dapatkan koin</p>
            </div>
          </div>
          {isLoggedIn && (
            <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
              <Coins className="w-8 h-8 text-yellow-300" />
              <div>
                <p className="text-2xl font-bold">{user?.coins || 0}</p>
                <p className="text-xs text-violet-200">Koin tersedia</p>
              </div>
              <Link
                to="/vouchers"
                className="ml-auto px-4 py-2 bg-white/20 rounded-xl text-sm font-medium hover:bg-white/30 transition-colors"
              >
                Tukar Koin
              </Link>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{quests.length}</p>
            <p className="text-xs text-gray-500">Misi Aktif</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {userQuests.filter((uq) => uq.status === 'approved').reduce((sum, uq) => sum + uq.coinsEarned, 0)}
            </p>
            <p className="text-xs text-gray-500">Koin D didapat</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {userQuests.length}
            </p>
            <p className="text-xs text-gray-500">Misi Diambil</p>
          </div>
        </div>

        {/* Quests */}
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Misi Tersedia</h2>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-2" />
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : quests.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Belum Ada Misi
            </h3>
            <p className="text-sm text-gray-500">Misi akan segera ditambahkan oleh admin.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {quests.map((quest) => {
              const userQuest = getUserQuestStatus(quest.id)
              const Icon = QUEST_TYPE_ICONS[quest.type] || Gift
              const colorClass = QUEST_TYPE_COLORS[quest.type] || 'bg-gray-100 text-gray-600'
              const isFull = quest.participantCount >= quest.maxParticipants

              return (
                <div
                  key={quest.id}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{quest.title}</h3>
                        {userQuest && (
                          <span className={cn(
                            'px-2 py-0.5 rounded text-xs font-medium',
                            userQuest.status === 'approved' ? 'bg-green-100 text-green-600' :
                            userQuest.status === 'submitted' ? 'bg-blue-100 text-blue-600' :
                            userQuest.status === 'in_progress' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-gray-100 text-gray-600'
                          )}>
                            {userQuest.status === 'not_started' ? 'Belum Mulai' :
                             userQuest.status === 'in_progress' ? 'Berlangsung' :
                             userQuest.status === 'submitted' ? 'Diajukan' :
                             userQuest.status === 'approved' ? 'Selesai' : 'Ditolak'}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{quest.description}</p>

                      <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Coins className="w-3 h-3 text-amber-500" />
                          {quest.rewardCoins} koin
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {quest.participantCount}/{quest.maxParticipants}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {quest.duration} jam
                        </span>
                      </div>

                      {quest.rewardVoucher && (
                        <p className="text-xs text-violet-600 mb-3">
                          + Voucher: {quest.rewardVoucher}
                        </p>
                      )}

                      <div className="flex items-center gap-2">
                        {!userQuest ? (
                          <button
                            onClick={() => handleStartQuest(quest.id)}
                            disabled={isFull || !isLoggedIn}
                            className="px-4 py-2 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isFull ? 'Penuh' : 'Mulai Misi'}
                          </button>
                        ) : userQuest.status === 'in_progress' ? (
                          <button
                            onClick={() => toast.success('Fitur submit bukti segera hadir!')}
                            className="px-4 py-2 bg-amber-500 text-white rounded-xl text-sm font-medium hover:bg-amber-600 transition-colors"
                          >
                            Submit Bukti
                          </button>
                        ) : userQuest.status === 'submitted' ? (
                          <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium">
            Menunggu Review
                          </span>
                        ) : userQuest.status === 'approved' ? (
                          <span className="px-4 py-2 bg-green-50 text-green-600 rounded-xl text-sm font-medium">
            Selesai (+{userQuest.coinsEarned} koin)
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
