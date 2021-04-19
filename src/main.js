import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// import { init as setSentry } from '#/plugins/sentry'
import i18n from '#/plugins/i18n'

axios.defaults.baseURL = 'http://localhost:4000/api/v1/'

const app = createApp(App)

// setSentry(app)

app
  .use(router)
  .use(store)
  .use(i18n)
  .mount('#app')

// window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor
