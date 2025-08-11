<template>
  <section
    ref="scaleVideoRef"
    class="scale-video-container"
  >
    <div
      ref="videoContainerRef"
      class="scale-video-card-wrapper"
    >
      <div class="scale-video-tv-card">
        <video
          ref="videoRef"
          autoplay
          class="scale-video"
          loop
          muted
          playsinline
        >
          <source
            :src="naturalVideo"
            type="video/mp4"
          >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </section>
</template>

<script
  setup
  lang="ts"
>
  import { onMounted, ref } from 'vue'
  import gsap from 'gsap'
  import ScrollTrigger from 'gsap/ScrollTrigger'
  import naturalVideo from '@/assets/video/natural.mp4'

  gsap.registerPlugin(ScrollTrigger)

  const scaleVideoRef = ref<HTMLElement | null>(null)
  const videoContainerRef = ref<HTMLElement | null>(null)
  const videoRef = ref<HTMLVideoElement | null>(null)

  onMounted(() => {
    setupGsap()
  })

  function setupGsap () {
    if (!scaleVideoRef.value || !videoContainerRef.value || !videoRef.value) return

    gsap.fromTo(
      videoContainerRef.value,
      { scaleX: 1 },
      {
        scaleX: 0.7,
        scrollTrigger: {
          trigger: scaleVideoRef.value,
          start: 'top top',
          end: '+=100%',
          scrub: true,
        },
        ease: 'none',
      }
    )

    gsap.fromTo(
      videoRef.value,
      { borderRadius: '0' },
      {
        borderRadius: '4rem',
        scrollTrigger: {
          trigger: scaleVideoRef.value,
          start: '20% 20%',
          end: '+=1000',
          scrub: true,
        },
        ease: 'none',
      }
    )
  }
</script>

<style scoped>
  .scale-video-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .scale-video-card-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .scale-video-tv-card {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .scale-video {
    width: 100%;
    display: block;
  }
</style>
