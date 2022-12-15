import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import routes from './router/routes'

export default createRouter(
  {
    history: createWebHashHistory(),
    routes
  }
)
