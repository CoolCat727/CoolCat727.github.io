<template>
  <v-app-bar
    app
    class="app-bar-blur"
    height="50"
    scroll-behavior="elevate"
    scroll-threshold="0"
  >
    <v-container class="pa-0">
      <v-row no-gutters>
        <v-col
          class="d-flex align-center"
          cols="6"
        >
          <v-btn
            class="hidden-sm-and-down"
            @click="go('/')"
          >
            CoolCat
            <span>Cool Cool Cat</span>
          </v-btn>

          <v-btn
            class="hidden-md-and-up"
            color="primary"
            icon
            @click="go('/')"
          >
            <v-icon>mdi-cat</v-icon>
          </v-btn>
        </v-col>

        <v-col
          class="d-flex justify-end align-center"
          cols="6"
        >
          <!-- <toggle-theme-btn /> -->
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script
  lang="ts"
  setup
>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  function go (path: string) {
    router.push(path)
  }
</script>

<style scoped>
  .app-bar-blur {
    opacity: 0.9;
  }
</style>
