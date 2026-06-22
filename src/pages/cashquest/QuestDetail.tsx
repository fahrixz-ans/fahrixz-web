import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Clock, Users, Coins, Calendar,
  Target, CheckCircle, AlertCircle
} from 'lucide-react'
import { useAuthStore } from '@/stores/useAuthStore'
import { useCashQuestStore } from '@/stores/useCashQuestStore'
import { SEO } from '@/components/shared/SEO'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

export function QuestDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isLoggedIn, user } = useAuthStore()
  const { quests, userQuests, fetchQuests, fetchUserQuests, startQuest, submitQuest } = useCashQuestStore()

  useEffect(() => {
    if (quests.length === 0) fetchQuests()
    if (user?.uid) fetchUserQuests(user.uid)
  }, [user?.uid])

  const quest = quests.find((q) => q.id === id)
  const userQuest = userQuests.find((uq) => uq.questId === id)

  if (!quest) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Misi tidak ditemukan
        </h2>
        <button
          onClick={() => navigate('/cashquest')}
          className="text-violet-600 hover:text-violet-700 font-medium"
        >
          Kembali ke Cash Quest
        </button>
      </div>
    )
  }

  const handleStart = async () => {
    if (!isLoggedIn) {
      toast.error('Silakan login terlebih dahulu')
      return
    }
    try {
      await startQuest(quest.id, user?.uid || '')
      toast.success('Misi dimulai!')
    } catch (error: any) {
      toast.error(error.message || 'Gagal memulai misi')
    }
  }

  const handleSubmit = async () => {
    try {
      await submitQuest(quest.id, user?.uid || '', [], 'Bukti telah dikirim')
      toast.success('Bukti berhasil dikirim!')
    } catch (error: any) {
      toast.error(error.message || 'Gagal mengirim bukti')
    }
  }

  const isFull = quest.participantCount >= quest.maxParticipants
  const progress = quest.participantCount / quest.maxParticipants * 100

  return (
    <>
      <SEO title={quest.title} description={quest.description} />
      <div className="max-w-3xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>

        {/* Header */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-violet-100 dark:bg-violet-900/20 rounded-2xl flex items-center justify-center">
              <Target className="w-7 h-7 text-violet-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{quest.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className={cn(
                  'px-2 py-0.5 rounded text-xs font-medium',
                  quest.status === 'active' ? 'bg-green-100 text-green-600' :
                  quest.status === 'expired' ? 'bg-red-100 text-red-600' :
                  'bg-gray-100 text-gray-600'
                )}>
                  {quest.status === 'active' ? 'Aktif' :
                   quest.status === 'expired' ? 'Kadaluarsa' : 'Penuh'}
                </span>
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
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-4">{quest.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <Coins className="w-5 h-5 text-amber-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-900 dark:text-white">{quest.rewardCoins}</p>
              <p className="text-xs text-gray-500">Koin</p>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <Users className="w-5 h-5 text-blue-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {quest.participantCount}/{quest.maxParticipants}
              </p>
              <p className="text-xs text-gray-500">Peserta</p>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <Clock className="w-5 h-5 text-violet-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-900 dark:text-white">{quest.duration}j</p>
              <p className="text-xs text-gray-500">Durasi</p>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progress Peserta</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-600 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Deadline */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Calendar className="w-4 h-4" />
            <span>Berlaku sampai: {new Date(quest.deadline).toLocaleDateString('id-ID')}</span>
          </div>

          {/* Instructions */}
          {quest.instructions.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Instruksi</h3>
              <ol className="space-y-2">
                {quest.instructions.map((instruction, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-6 h-6 bg-violet-100 dark:bg-violet-900/20 rounded-full flex items-center justify-center text-xs font-medium text-violet-600 shrink-0">
                      {i + 1}
                    </span>
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Requirements */}
          {quest.requirements.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Persyaratan</h3>
              <ul className="space-y-2">
                {quest.requirements.map((req, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            {!userQuest ? (
              <button
                onClick={handleStart}
                disabled={isFull || !isLoggedIn}
                className="flex-1 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isFull ? 'Penuh' : 'Mulai Misi'}
              </button>
            ) : userQuest.status === 'in_progress' ? (
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors"
              >
                Submit Bukti
              </button>
            ) : userQuest.status === 'submitted' ? (
              <div className="flex-1 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl font-medium text-center">
                Menunggu Review Admin
              </div>
            ) : userQuest.status === 'approved' ? (
              <div className="flex-1 py-3 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl font-medium text-center flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Misi Selesai (+{userQuest.coinsEarned} koin)
              </div>
            ) : (
              <button
                onClick={handleStart}
                className="flex-1 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors"
              >
                Coba Lagi
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
