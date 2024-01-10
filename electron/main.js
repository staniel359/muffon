import {
  app
} from 'electron'
import {
  isSingleInstance,
  handleHarmfulSwitches
} from '#/helpers/utils'
import initialize from './actions/app/initialize'

handleHarmfulSwitches()

if (isSingleInstance) {
  initialize()
} else {
  app.quit()
}
