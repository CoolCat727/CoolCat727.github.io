<template>
  <v-container class="fill-height d-flex items-center justify-center">
    <v-row>
      <v-col class="d-flex items-center justify-center">
        <img :src="loadingGifUrl">
        <img :src="loadingGifUrl">
        <img :src="loadingGifUrl">
      </v-col>
    </v-row>
  </v-container>
</template>

<script
  setup
  lang="ts"
>
  const loadingGifUrl = new URL('@/assets/img/loading.webp', import.meta.url).href
</script>
