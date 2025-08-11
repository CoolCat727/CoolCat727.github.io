<template>
  <v-btn
    class="glowing-wrapper-button"
    color="primary"
    variant="plain"
  >
    <slot />
  </v-btn>
</template>

<script
  lang="ts"
  setup
>
</script>

<style scoped>
  .glowing-wrapper-button {
    border: 1px solid rgba(255, 255, 255, .1);
  }

  .glowing-wrapper-button:after {
    transition: 1s all;
  }

  .glowing-wrapper-button:hover:after {
    opacity: 1;
    transition: 0.6s all;
    background: radial-gradient(85% 70% at 50% 120%, currentColor 0%, rgba(255, 255, 255, 0) 100%);
  }
</style>
