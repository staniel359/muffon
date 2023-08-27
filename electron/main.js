import {
  app
} from 'electron'
import {
  isSingleInstance
} from '#/helpers/utils'
import initialize from './actions/app/initialize'

if (isSingleInstance) {
  initialize()
} else {
  app.quit()
}
