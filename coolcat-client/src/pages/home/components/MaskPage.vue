<template>
  <section
    ref="maskPageRef"
    class="pa-0 bg-container"
  >
    <video
      ref="videoRef"
      autoplay
      class="scale-video"
      loop
      muted
      playsinline
    >
      <source
        :src="blackholeVideo"
        type="video/mp4"
      >
      Your browser does not support the video tag.
    </video>
    <div
      ref="overlayRef"
      class="overlay"
    />
  </section>
</template>

<script
  setup
  lang="ts"
>
  import { onMounted, ref } from 'vue'
  import gsap from 'gsap'
  import ScrollTrigger from 'gsap/ScrollTrigger'
  import blackholeVideo from '@/assets/video/blackhole.mp4'

  gsap.registerPlugin(ScrollTrigger)

  const maskPageRef = ref<HTMLElement | null>(null)
  const overlayRef = ref<HTMLElement | null>(null)
  const videoRef = ref<HTMLVideoElement | null>(null)

  onMounted(() => {
    setupGsap()
  })

  function setupGsap () {
    if (!maskPageRef.value || !overlayRef.value) return

    const startScale = 10
    const endScale = 1

    gsap.set(overlayRef.value, { scale: startScale })

    gsap.fromTo(
      overlayRef.value,
      { scale: startScale, opacity: 0 },
      {
        scale: endScale,
        opacity: 1,
        scrollTrigger: {
          trigger: maskPageRef.value,
          start: 'top top',
          end: '+=3000',
          scrub: true,
          pin: true,
        },
        ease: 'power2.out',
      }
    )
  }
</script>


<style scoped>
  .bg-container {
    position: relative;
    height: 100vh;
    width: 100%;
    overflow: hidden;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: rgb(var(--v-theme-background));

    mask-image: linear-gradient(rgb(var(--v-theme-background)), rgb(var(--v-theme-background))), url('../../../assets/img/bkhole.png');
    mask-repeat: no-repeat, no-repeat;
    mask-position: center, center;
    mask-size: 100% 100%, auto 50%;
    mask-composite: exclude;
  }
</style>
