import setupApp from '@/helpers/actions/app/setup'
import {
  createApp
} from 'vue'
import App from '@/components/App.vue'
import router from '@/plugins/router'
import pinia from '@/plugins/pinia'
import i18n from '@/plugins/i18n'

setupApp()

createApp(
  App
).use(
  router
).use(
  pinia
).use(
  i18n
).mount(
  '#app'
)
