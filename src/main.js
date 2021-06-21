import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import { init as setSentry } from '#/plugins/sentry'
import i18n from '#/plugins/i18n'

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
