<template>
  <section
    ref="backendTechSection"
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
            Backend Tech Overview
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
      name: 'Java',
      description: 'Robust, object-oriented programming language',
      image: new URL('../../../assets/img/tech-icons/java.png', import.meta.url).href,
      link: 'https://www.java.com/',
    },
    {
      name: 'Spring Boot',
      description: 'Framework for building microservices with Java',
      image: new URL('../../../assets/img/tech-icons/springboot.png', import.meta.url).href,
      link: 'https://spring.io/projects/spring-boot',
    },
    {
      name: 'Hibernate',
      description: 'ORM framework for Java and relational databases',
      image: new URL('../../../assets/img/tech-icons/hibernate.png', import.meta.url).href,
      link: 'https://hibernate.org/',
    },
    {
      name: 'Node.js',
      description: 'JavaScript runtime built on Chrome\'s V8 engine',
      image: new URL('../../../assets/img/tech-icons/nodejs.png', import.meta.url).href,
      link: 'https://nodejs.org/',
    },
    {
      name: 'NestJS',
      description: 'Progressive Node.js framework for building efficient server-side applications',
      image: new URL('../../../assets/img/tech-icons/nestjs.svg', import.meta.url).href,
      link: 'https://nestjs.com/',
    },
    {
      name: 'TypeORM',
      description: 'ORM for TypeScript and JavaScript (Node.js)',
      image: new URL('../../../assets/img/tech-icons/typeorm.png', import.meta.url).href,
      link: 'https://typeorm.io/',
    },
    {
      name: 'PostgreSQL',
      description: 'Powerful, open-source object-relational database system',
      image: new URL('../../../assets/img/tech-icons/postgresql.png', import.meta.url).href,
      link: 'https://www.postgresql.org/',
    },
    {
      name: 'Docker',
      description: 'Platform for containerizing applications, enabling consistent deployment across environments',
      image: new URL('../../../assets/img/tech-icons/docker.png', import.meta.url).href,
      link: 'https://www.docker.com/',
    },
  ];

  const backendTechSection = ref<Element | ComponentPublicInstance | null>(null);
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
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );
    });
  });
</script>

<style
  scoped
  lang="scss"
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
