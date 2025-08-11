<template>
  <section
    ref="frontTechSection"
    class="py-16"
  >
    <v-container
      class="py-0"
      fluid
      max-width="1600"
    >
      <v-row
        class="mb-10"
        justify="center"
      >
        <v-col cols="12">
          <h2 class="text-h4 font-weight-bold text-center text-primary">
            Frontend Tech Overview
          </h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          v-for="(tech, index) in techList"
          :key="index"
          cols="12"
          md="6"
        >
          <v-card
            :ref="el => setRefs(el, index)"
            class="pa-6 rounded-xl d-flex align-center overflow-hidden"
          >
            <div class="img-contain">
              <v-img
                :alt="tech.name"
                cover
                max-height="64"
                max-width="64"
                rounded
                :src="tech.image"
              />
            </div>
            <div class="flex-grow-1 card-contain">
              <div
                :ref="el => titleRefs[index] = el"
                class="text-h6 font-weight-medium text-primary"
              >
                <a
                  class="text-primary no-underline hover:underline"
                  :href="tech.link"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {{ tech.name }}
                </a>
              </div>
              <div
                :ref="el => descRefs[index] = el"
                class="mt-2 text-body-2 text-onPrimary"
              >
                {{ tech.description }}
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script
  setup
  lang="ts"
>
  import { type ComponentPublicInstance, onMounted, ref } from 'vue';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  interface TechItem {
    name: string;
    description: string;
    image: string;
    link: string;
  }

  const techList: TechItem[] = [
    {
      name: 'Vue 3',
      description: 'Modern reactive framework',
      image: new URL('../../../assets/img/tech-icons/vue.png', import.meta.url).href,
      link: 'https://vuejs.org/',
    },
    {
      name: 'Vuetify',
      description: 'Material Design component framework',
      image: new URL('../../../assets/img/tech-icons/vuetify.png', import.meta.url).href,
      link: 'https://vuetifyjs.com/',
    },
    {
      name: 'TypeScript',
      description: 'Typed JavaScript',
      image: new URL('../../../assets/img/tech-icons/typescript.png', import.meta.url).href,
      link: 'https://www.typescriptlang.org/',
    },
    {
      name: 'Tailwind CSS',
      description: 'Utility-first CSS framework',
      image: new URL('../../../assets/img/tech-icons/tailwindcss.svg', import.meta.url).href,
      link: 'https://tailwindcss.com/',
    },
    {
      name: 'GSAP',
      description: 'High-performance animation',
      image: new URL('../../../assets/img/tech-icons/gsap.webp', import.meta.url).href,
      link: 'https://greensock.com/gsap/',
    },
    {
      name: 'Three.js',
      description: 'WebGL 3D rendering library',
      image: new URL('../../../assets/img/tech-icons/threejs.png', import.meta.url).href,
      link: 'https://threejs.org/',
    },
  ];

  const frontTechSection = ref<Element | ComponentPublicInstance | null>(null);
  const titleRefs: (Element | ComponentPublicInstance | null)[] = [];
  const descRefs: (Element | ComponentPublicInstance | null)[] = [];


  const setRefs = (el: Element | ComponentPublicInstance | null, index: number) => {
    if (el instanceof HTMLElement && !titleRefs[index]) {
      titleRefs[index] = el.querySelector('div:nth-child(2) > div:nth-child(1)') as HTMLElement;
      descRefs[index] = el.querySelector('div:nth-child(2) > div:nth-child(2)') as HTMLElement;
    }
  };

  onMounted(() => {
    titleRefs.forEach((title, index) => {
      const desc = descRefs[index];
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: (title instanceof HTMLElement ? title : undefined),
          start: 'top 95%',
          toggleActions: 'play none none reset',
        },
      });

      tl.fromTo(
        title,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', delay: 0.1 }
      ).fromTo(
        desc,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', delay: 0.1 },
        '-=0.4'
      );
    });
  });
</script>

<style
  lang="scss"
  scoped
>
  .card-contain {
    min-height: 64px;
  }

  .img-contain {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    min-height: 64px;
    min-width: 64px;
  }
</style>
