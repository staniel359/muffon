import {
  createApp
} from 'vue'
import axios from 'axios'
import '../semantic/dist/semantic.min.js'
import '../semantic/dist/semantic.min.css'
import '@/assets/styles/Main.sass'
import '@/assets/styles/Sources.sass'
import App from './App.vue'
import router from '@/plugins/router'
import store from '@/plugins/store'
import i18n from '@/plugins/i18n'
import setupI18nCountries from '@/plugins/i18nCountries'

const isDevelopment =
  process.env.NODE_ENV === 'development'

const serverUrl = isDevelopment
  ? 'http://localhost:4000'
  : 'https://178-79-138-81.ip.linodeusercontent.com'

axios.defaults.baseURL =
  `${serverUrl}/api/v3/`

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

setupI18nCountries()
