<template>
  <div class="page-container">
    <!-- 進度條 -->
    <div
      class="progress-bar"
      :style="{ width: progress + '%' }"
    ></div>

    <!-- 每個頁面 -->
    <section
      ref="sectionEl1"
      class="section"
    >
      <slot name="page1" />
    </section>

    <section
      ref="sectionEl2"
      class="section"
    >
      <slot name="page2" />
    </section>

    <section
      ref="sectionEl3"
      class="section"
    >
      <slot name="page3" />
    </section>

    <section
      ref="sectionEl4"
      class="section"
    >
      <slot name="page4" />
    </section>

    <section
      ref="sectionEl5"
      class="section"
    >
      <slot name="page5" />
    </section>
  </div>
</template>

<script
  setup
  lang="ts"
>
  import { onMounted, ref, watch } from 'vue'
  import gsap from 'gsap'
  import ScrollTrigger from 'gsap/ScrollTrigger'

  gsap.registerPlugin(ScrollTrigger)

  // 進度條
  const progress = ref(0)

  // 5個section的ref
  const sectionEl1 = ref<HTMLElement | null>(null)
  const sectionEl2 = ref<HTMLElement | null>(null)
  const sectionEl3 = ref<HTMLElement | null>(null)
  const sectionEl4 = ref<HTMLElement | null>(null)
  const sectionEl5 = ref<HTMLElement | null>(null)

  // 更新進度條
  const updateProgress = () => {
    const scrollPosition = window.scrollY
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight
    progress.value = (scrollPosition / totalHeight) * 100
  }

  onMounted(() => {
    // 註冊每個section的動畫
    const sections = [sectionEl1, sectionEl2, sectionEl3, sectionEl4, sectionEl5]

    sections.forEach((section, index) => {
      if (section.value) {
        gsap.fromTo(section.value,
          { opacity: 0, y: 100 },  // 入場動畫
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section.value,
              start: 'top 80%', // 當元素的頂部進入視窗 80% 位置時觸發
              end: 'bottom 200%', // 當元素的底部達到視窗 200% 高度位置時結束
              toggleActions: 'play reverse play reverse',
              markers: true,
              onEnter: () => gsap.to(section.value, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }),
              onLeave: () => gsap.to(section.value, { opacity: 0, y: 100, duration: 1, ease: 'power2.in' }),
              onEnterBack: () => gsap.to(section.value, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }),
              onLeaveBack: () => gsap.to(section.value, { opacity: 0, y: 100, duration: 1, ease: 'power2.in' })
            }
          })
      }
    })

    // 監聽滾動事件以更新進度條
    window.addEventListener('scroll', updateProgress)
  })

  // 清理滾動事件
  watch(progress, (newProgress) => {
    if (newProgress === 100) {
      window.removeEventListener('scroll', updateProgress)
    }
  })
</script>

<style scoped>
  .page-container {
    position: relative;
  }

  .progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background-color: #4caf50;
    z-index: 999;
  }

  .section {
    min-height: 200vh;
    display: flex;
    opacity: 0;
  }

</style>
