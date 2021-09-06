import { createApp } from 'vue'
import axios from 'axios'
import 'semantic/dist/semantic.min.js'
import 'semantic/dist/semantic.min.css'
import '*/assets/styles/Main.sass'
import '*/assets/styles/Sources.sass'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import { init as setSentry } from '#/plugins/sentry'

const isDevelopment =
  process.env.NODE_ENV === 'development'

const getServerUrl = () => {
  if (isDevelopment) {
    return 'http://localhost:4000'
  } else {
    return 'https://muffon.endorphine.by'
  }
}

axios.defaults.baseURL =
  `${getServerUrl()}/api/v1/`

const app = createApp(App)

app
  .use(router)
  .use(store)
  .use(i18n)
  .mount('#app')

if (!isDevelopment) {
  setSentry(app)
}
