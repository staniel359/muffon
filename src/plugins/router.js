import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import routes from '#/data/plugins/router/routes'

export default createRouter({
  history: createWebHashHistory(),
  routes
})
