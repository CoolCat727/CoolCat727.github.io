<template>
  <v-app>
    <LoadingOverlay v-if="preloadStore.loading" />
    <router-view v-else />
  </v-app>
</template>

<script
  setup
  lang="ts"
>
  import { onMounted } from 'vue'
  import { usePreloadStore } from '@/stores/preloadStore'
  import LoadingOverlay from '@/components/LoadingOverlay.vue'

  const preloadStore = usePreloadStore()

  onMounted(() => {
    const isPreloaded = preloadStore.checkIsPreloaded()
    if (!isPreloaded) {
      preloadStore.startPreload()
    }
  })
</script>
