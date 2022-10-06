import {
  createApp
} from 'vue'
import '../semantic/dist/semantic.min.js'
import '../semantic/dist/semantic.min.css'
import '@/assets/styles/Main.sass'
import '@/assets/styles/Sources.sass'
import App from './App.vue'
import router from '@/plugins/router'
import store from '@/plugins/store'
import i18n from '@/plugins/i18n'
import setupAxios from '@/plugins/axios'
import setupI18nCountries from '@/plugins/i18nCountries'

const app = createApp(
  App
)

app
  .use(
    router
  )
  .use(
    store
  )
  .use(
    i18n
  )
  .mount(
    '#app'
  )

setupAxios()

setupI18nCountries()
