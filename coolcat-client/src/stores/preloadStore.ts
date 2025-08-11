import { defineStore } from 'pinia'
import { ref } from 'vue'
import { preloadAssets } from '@/utils/preloadAssets'

import naturalVideo from '@/assets/video/natural.mp4'
import blackholeVideo from '@/assets/video/blackhole.mp4'
import blackhole2 from '../assets/video/blackhole2.mp4'

export const usePreloadStore = defineStore('preload', () => {
  const loading = ref(false)
  const isPreloaded = ref(false)

  async function startPreload () {
    if (isPreloaded.value) return

    loading.value = true

    try {
      await preloadAssets([
        naturalVideo,
        blackholeVideo,
        blackhole2,
      ])

      isPreloaded.value = true
    } catch (e) {
      console.error('Preload failed:', e)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    startPreload,
    checkIsPreloaded: () => isPreloaded.value,
  }
})
