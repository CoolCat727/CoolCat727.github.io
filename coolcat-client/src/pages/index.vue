<template>
  <v-container
    class="fill-height d-flex align-center justify-center text-center position-relative"
    fluid
  >
    <ElectricBackground />
    <v-row
      class="fill-height fill-width"
      justify="space-between"
      no-gutters
    >
      <!-- 左側內容區 -->
      <v-col
        class="d-flex align-center justify-center fill-height"
        cols="12"
        md="6"
      >
        <v-card
          border="lg onPrimary opacity-50"
          class="pa-8 fill-height d-flex flex-column align-start justify-center w-100"
          color="background"
          variant="flat"
        >
          <span class="text-h2 text-xs-h1 text-lg-h1 gradient-text">CoolCat</span>
          <span
            class="text-h3 text-xs-h2 text-lg-h1 text-onPrimary title-fade"
            :class="{ visible: showTitle }"
          >
            is the
          </span>
          <span
            class="text-h3 text-xs-h2 text-lg-h1 text-onPrimary title-fade"
            :class="{ visible: showTitle }"
          >
            coolest cat
          </span>
          <span
            class="text-body-2 text-body-lg-1 subtitle-fade text-onPrimary text-start mt-4"
            :class="{ visible: showSubtitle }"
          >
            I've actually seen this situation before.
          </span>
          <span
            class="text-body-2 text-body-lg-1 subtitle-fade text-onPrimary text-start"
            :class="{ visible: showSubtitle }"
          >
            Here's what we'll do:
          </span>
          <span
            class="text-body-2 text-body-lg-1 subtitle-fade text-onPrimary text-start"
            :class="{ visible: showSubtitle }"
          >
            First, search for 'Senren * Banka' on Steam,
          </span>
          <span
            class="text-body-2 text-body-lg-1 subtitle-fade mb-4 text-onPrimary text-start"
            :class="{ visible: showSubtitle }"
          >
            click to purchase, install it, and run it immediately.
          </span>

          <v-btn
            class="btn-fade mt-4"
            :class="{ visible: showButton }"
            color="primary"
            variant="elevated"
            @click="onStart"
          >
            Get Started
          </v-btn>
          <div
            class="blackhole-container blackhole-fade"
            :class="{ visible: showBlackhole }"
          >
            <video
              autoplay
              class="blackhole-video"
              loop
              muted
              playsinline
            >
              <source
                :src="blackhole2"
                type="video/mp4"
              >
            </video>
          </div>
        </v-card>
      </v-col>

      <!-- 右側空白區 -->
      <v-col
        class="d-flex justify-center"
        cols="12"
        md="6"
      >
        {{ }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script
  lang="ts"
  setup
>
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import blackhole2 from '../assets/video/blackhole2.mp4'

  const router = useRouter()

  const showTitle = ref(false)
  const showSubtitle = ref(false)
  const showButton = ref(false)
  const showBlackhole = ref(false)

  const onStart = () => {
    router.push('/home')
  }

  onMounted(async () => {
    showTitle.value = true
    showSubtitle.value = true
    showButton.value = true
    showBlackhole.value = true
  })
</script>

<style scoped>

  .logo-fade,
  .title-fade,
  .subtitle-fade,
  .btn-fade {
    animation: fadeInUp 1.2s ease-out forwards;
    opacity: 0;
    visibility: hidden;
  }

  .logo-fade {
    animation-delay: 0.3s;
  }

  .title-fade {
    animation-delay: 0.9s;
  }

  .subtitle-fade {
    animation-delay: 1.5s;
  }

  .btn-fade {
    animation-delay: 2.1s;
  }

  .blackhole-fade {
    animation: flashIn 5s ease-in-out;
  }

  .visible {
    visibility: visible;
  }

  .gradient-text {
    background: linear-gradient(to right,
        rgb(var(--v-theme-primary)),
        rgb(var(--v-theme-secondary)));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }

  .blackhole-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    overflow: hidden;
  }

  .blackhole-video {
    width: 100%;
    height: 160%;
    object-fit: cover;
    transform: translateY();
  }

  .blackhole-container::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(13, 13, 13, 0.5);
    pointer-events: none;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(24px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes flashIn {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 0.4;
    }

    100% {
      opacity: 1;
    }
  }

</style>
