/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        colors: {
          primary: '#7e57c2',
          secondary: '#1ed5f9',
          background: '#fafafa',
          surface: '#f4f4f4ff',
          error: '#c62828',
          onPrimary: '#212121',
          onSecondary: '#212121',
          onBackground: '#212121',
          onSurface: '#212121',
          onError: '#ffffff',
        },
      },
      dark: {
        colors: {
          primary: '#7e57c2',
          secondary: '#1ed5f9',
          background: '#0d0d0d',
          surface: '#434343ff',
          error: '#ef5350',
          onPrimary: '#ffffff',
          onSecondary: '#ffffff',
          onBackground: '#ffffff',
          onSurface: '#ffffff',
          onError: '#000000',
        },
      },
    },
  },
})
