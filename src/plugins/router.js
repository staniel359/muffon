import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import routes from '@/helpers/data/plugins/router/routes'

export default createRouter(
  {
    history: createWebHashHistory(),
    routes
  }
)
