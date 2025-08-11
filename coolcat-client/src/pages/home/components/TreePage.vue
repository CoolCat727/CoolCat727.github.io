<template>
  <div
    ref="treePageRef"
    class="tree-page-container"
  >
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="step-item"
          >
            <div :ref="el => setRefs(el, index)">
              {{ step }}
            </div>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >B</v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script
  setup
  lang="ts"
>
  import { onMounted, ref } from 'vue';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  const treePageRef = ref<HTMLElement | null>(null);
  const stepRefs: (Element | null)[] = [];

  const setRefs = (el: Element | null, index: number) => {
    if (el instanceof HTMLElement && !stepRefs[index]) {
      stepRefs[index] = el;
    }
  };

  onMounted(() => {
    setupGsap();
  });

  function setupGsap () {
    if (!treePageRef.value) {
      return;
    }

    // Pin the entire treePageRef
    gsap.to(treePageRef.value, {
      scrollTrigger: {
        trigger: treePageRef.value,
        start: 'top top', // Start pinning when the top of the treePageRef reaches the top of the viewport
        end: 'bottom+=1400 top', // Pin until the end of the scroll (scrolling 1400px total)
        scrub: true,
        pin: true, // Pin the entire page
        markers: false,
      }
    });

    // Animate each step as we scroll
    stepRefs.forEach((step, index) => {
      if (step) {
        gsap.fromTo(
          step,
          {
            opacity: 0.2,
            scale: 1.2,
            color: 'rgba(255, 255, 255, 0.5)',
          },
          {
            opacity: 1,
            scale: 1,
            color: 'white',
            scrollTrigger: {
              trigger: step,
              start: `top+=${index * 200} top`,
              end: `top+=${(index + 1) * 200} top`,
              scrub: true,
              markers: false,
              onEnter: () => {
                gsap.to(step, {
                  opacity: 1,
                  scale: 1,
                  color: 'white',
                });
              },
              onLeaveBack: () => {
                gsap.to(step, {
                  opacity: 0.2,
                  scale: 1.2,
                  color: 'rgba(255, 255, 255, 0.5)',
                });
              }
            }
          }
        );
      }
    });
  }

  const steps = [
    '第一个选项：敷衍过去。',
    '第二个选项：不好说。',
    '第三个选项：单独行动。',
    '第四个选项：看着不奇怪。',
    '第五个选项：摸头。',
    '第六个选项：有点担心。',
    '第七个选项：少说两句。',
  ];
</script>

<style scoped>
  .tree-page-container {
    height: 100vh;
    width: 100%;
  }

  .steps-view {
    border: pink 1px solid;
    position: absolute;
    top: 50vh;
    left: 50%;
  }
</style>
