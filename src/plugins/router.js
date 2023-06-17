import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import routes from './router/routes'

const options = {
  history: createWebHashHistory(),
  routes
}

export default createRouter(
  options
)
