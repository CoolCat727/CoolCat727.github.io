<template>
  <v-container
    class="pa-0 d-flex align-center justify-center text-center"
    fluid
    height="100vh"
  >
    <div>
      <h1
        class="text-h4 text-xs-h3 text-sm-h2 text-md-h1 font-weight-bold mb-8 fade-in"
        style="animation-delay: 0s;"
      >
        {{ title }}
      </h1>
      <Vue3Marquee
        v-for="(delayOffset, i) in [0.6, 0.8, 1]"
        :key="i"
        :direction="i === 1 ? 'reverse' : 'normal'"
        :duration="60"
        :pause-on-hover="true"
      >
        <v-card
          v-for="(step, index) in steps"
          :key="index"
          class="fade-in pa-3 ma-2"
          :style="{ animationDelay: `${index * 0.2 + delayOffset}s` }"
          variant="outlined"
        >
          <p
            class="text-subtitle-1 text-md-h6 mx-auto"
            style="max-width: 800px;"
          >
            {{ step }}
          </p>
        </v-card>
      </Vue3Marquee>

      <p
        class="text-subtitle-1 text-md-h6 mx-auto mt-10 fade-in"
        style="animation-delay: 2s; max-width: 800px;"
      >
        这样你就能进入丛雨线了。
      </p>
    </div>
  </v-container>
</template>


<script
  setup
  lang="ts"
>
  import { Vue3Marquee } from 'vue3-marquee'

  const title = 'Ciallo～(∠・ω< )⌒☆'

  const steps = [
    '第一个选项：敷衍过去。',
    '第二个选项：不好说。',
    '第三个选项：单独行动。',
    '第四个选项：看着不奇怪。',
    '第五个选项：摸头。',
    '第六个选项：有点担心。',
    '第七个选项：少说两句。',
  ]
</script>

<style scoped>
  .fade-in {
    opacity: 0;
    animation: fadeIn 1.2s ease-out forwards;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

</style>
