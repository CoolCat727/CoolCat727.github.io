<template>
  <v-footer class="custom-footer">
    <v-container>
      <v-row dense>
        <v-col
          cols="12"
          md="6"
        >
          <div class="d-flex align-center justify-center fill-height">
            <a
              v-for="item in items"
              :key="item.title"
              class="d-inline-block mx-2 social-link"
              :href="item.href"
              rel="noopener noreferrer"
              target="_blank"
              :title="item.title"
            >
              <v-icon
                :icon="item.icon"
                :size="24"
              />
            </a>
          </div>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <div class="d-flex align-center justify-center fill-height">
            <div>
              <div class="text-caption text-disabled text-center">
                &copy; 2025-{{ new Date().getFullYear() }}
                <a
                  class="text-caption text-decoration-none on-surface"
                  href="https://github.com/CoolCat5678/"
                  target="_blank"
                >
                  CoolCat5678
                </a>
              </div>
              <div class="text-caption text-disabled text-center">
                Designed and developed with
                <a
                  class="text-decoration-none on-surface"
                  href="https://vuetifyjs.com/about/licensing/"
                  target="_blank"
                >
                  Vuetify
                </a>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script
  setup
  lang="ts"
>
  const items = [
    {
      title: 'CoolCat5678 GitHub',
      icon: `mdi-github`,
      href: 'https://github.com/CoolCat5678',
    },
    {
      title: 'CoolCat5678 GitHub',
      icon: `mdi-linkedin`,
      href: 'https://github.com/CoolCat5678',
    },
    {
      title: 'CoolCat5678 GitHub',
      icon: `mdi-facebook`,
      href: 'https://github.com/CoolCat5678',
    },
    {
      title: 'CoolCat5678 GitHub',
      icon: `mdi-twitter`,
      href: 'https://github.com/CoolCat5678',
    },
    {
      title: 'CoolCat5678 GitHub',
      icon: `mdi-google`,
      href: 'https://github.com/CoolCat5678',
    },
  ]
</script>

<style
  scoped
  lang="scss"
>
  .social-link :deep(.v-icon) {
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity));
    text-decoration: none;
    transition: 0.2s ease-in-out;

    &:hover {
      color: rgba(25, 118, 210, 1);
    }
  }

  .custom-footer {
    max-height: 100px;
    height: 80px;
  }
</style>
