<template>
  <v-container
    class="pa-0"
    fluid
  >
    <intro-canvas
      class="fill-height"
      @animation-finished="handleAnimationDone"
    />

    <!-- 首頁 Hero 區塊 -->
    <div
      v-if="introDone"
      class="overflow-x-hidden"
    >
      <PlanetPage />
      <!-- <TreePage /> -->
      <ScaleVideoPage />
      <DescripPage />
      <SolarPage />
      <MaskPage />
      <FrontTechOverView />
      <BackendTechOverView />
    </div>
  </v-container>
</template>

<script
  setup
  lang="ts"
>
  // import TreePage from './components/TreePage.vue';
  import ScaleVideoPage from './components/ScaleVideoPage.vue';
  import SolarPage from './components/SolarPage.vue';
  import PlanetPage from './components/PlanetPage.vue';
  import MaskPage from './components/MaskPage.vue';
  import FrontTechOverView from './components/FrontTechOverView.vue';
  import DescripPage from './components/DescripPage.vue';
  import BackendTechOverView from './components/BackendTechOverView.vue';

  import { ref } from 'vue';

  const introDone = ref(false)

  const handleAnimationDone = () => {
    introDone.value = true
  }
</script>

<style scoped></style>
