<template>
  <AppHeader />

  <v-main>
    <router-view v-slot="{ Component }">
      <transition
        mode="out-in"
        name="fade"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </v-main>

  <AppFooter />
</template>

<style scoped>

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
