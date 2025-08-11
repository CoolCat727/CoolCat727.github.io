<template>
  <div
    ref="container"
    class="web-view border d-flex flex-column  border-secondary border-opacity-100"
  >
    <iframe
      v-if="shouldLoad && isEmbeddable"
      class="flex-grow-1 fill-width"
      frameborder="0"
      :src="url"
      @error="handleError"
    />

    <div
      v-else-if="shouldLoad === false"
      class="fallback"
    >
      <p>尚未載入 iframe</p>
    </div>

    <div
      v-else-if="!isEmbeddable"
      class="fallback"
    >
      <p>無法載入 <strong>{{ url }}</strong></p>
      <a
        :href="url"
        rel="noopener"
        target="_blank"
      >點此開啟</a>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
  import { ref, onMounted, onBeforeUnmount } from 'vue'

  const props = defineProps({
    url: {
      type: String,
      required: true,
    },
  })

  const container = ref<HTMLElement | null>(null)
  const isEmbeddable = ref(true)
  const shouldLoad = ref(false)

  function handleError () {
    isEmbeddable.value = false
  }

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!container.value) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          shouldLoad.value = true
          observer?.disconnect()
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    )

    observer.observe(container.value)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })
</script>

<style scoped>
  .web-view {
    border-radius: 6px;
    overflow: hidden;
    min-height: 450px;
  }

  .fallback {
    padding: 1em;
    background: #f8f8f8;
    text-align: center;
  }
</style>
