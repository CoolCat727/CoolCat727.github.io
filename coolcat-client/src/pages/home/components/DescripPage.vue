<template>
  <section ref="descripPageRef">
    <div
      ref="textRef"
      class="mx-auto px-6 py-8 text-center"
    >
      <h2 class="text-h5 text-md-h4 font-weight-bold text-primary mb-4">
        這個春特一定要玩千戀萬花
      </h2>

      <p class="text-body-1 text-md-body-1 text-onPrimary">
        是的同學，要是玩了千戀萬花，保研和獎學金都與你有緣。校園活動會邀請你參加，你的美好大學生活才正式開始。同學會羨慕你，其他 gal 批會嫉妒你，校園裡的貓貓狗狗也會喜歡你。
        <br><br>
        在以後無數個不眠的夜晚，你總會回想起那次玩千戀萬花。你高興於自己的選擇，欣慰與努力得到了回報。你的未來，全都因這一次打開千戀萬花走向輝煌。
        <br><br>
        多年以後，你的兒子兒孫問你：「過去的夢想是什麼？」你思索半天，眼眶中流出熱淚──永遠做柚子廚。
      </p>
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

  gsap.registerPlugin(ScrollTrigger)

  const descripPageRef = ref<HTMLElement | null>(null)
  const textRef = ref<HTMLElement | null>(null)

  onMounted(() => {
    if (!descripPageRef.value || !textRef.value) return

    gsap.fromTo(
      textRef.value,
      { y: 200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: descripPageRef.value,
          start: 'top 70%',
          end: '+=50%',
          scrub: true,
        },
        ease: 'power2.out',
      }
    )
  })
</script>

<style scoped>
  .section-one-text-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
