<template>
  <v-container fluid>
    <div class="d-flex flex-column flex-md-row ga-md-6">
      <div class="w-100 w-md-50 d-flex flex-column justify-center pa-3">
        <div class="text-h1 font-weight-bold text-primary">
          Solar
        </div>
      </div>
    </div>
    <div
      ref="solarPageRef"
      class="d-flex flex-column flex-md-row ga-md-6"
    >
      <div
        ref="webViewRef"
        class="w-100 w-md-50 d-flex flex-column pa-3"
      >

        <v-divider
          class="mb-4"
          color="primary"
          opacity="100"
          thickness="1"
        />
        <v-card variant="text">
          <v-card-text class="mb-16">
            <p class="text-onPrimary text-body-1">
              阳光洒下火车站台，doro将不多的积蓄用来买了心爱的欧润吉，不过这次她并不打算白己吃。
              <br><br>
              doro知道比起欧润吉，更心爱的人即将远走高飞。
              <br>
              doro跌跌荡荡地走向你，并把心爱的欧润吉送给心爱的你。
              <br><br>
              她想告诉你，希望你带上欧润吉，吃了它们，吃了她所有的爱。
              <br><br>
              这样她所予的爱，就能一直留在你身边。
              <br><br>
              但你挥了挥手中的两张车票，一把抱起 doro，走进了车厢，一起離開了这个地方。
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="py-2 px-8"
              color="primary"
              variant="outlined"
              @click="opnePage('https://coolcat727.github.io/coolcat-solar/')"
            >
              Explore
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <div
        ref="webTextRef"
        class="w-100 w-md-50 d-flex flex-column justify-center pa-3"
      >
        <web-view url="https://coolcat727.github.io/coolcat-solar/" />
      </div>
    </div>
  </v-container>
</template>

<script
  setup
  lang="ts"
>
  import { onMounted, ref } from 'vue';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  const solarPageRef = ref<HTMLElement | null>(null);
  const webViewRef = ref<HTMLElement | null>(null);
  const webTextRef = ref<HTMLElement | null>(null);

  const opnePage = (url: string) => {
    window.open(url, '_blank')
  }

  onMounted(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: solarPageRef.value,
        start: 'top 100%',
        toggleActions: 'play none none reset',
      },
    });

    tl.fromTo(
      webViewRef.value,
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
    )
      .fromTo(
        webTextRef.value,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
        '+=0.1'
      );
  });
</script>

<style
  lang="scss"
  scoped
></style>
