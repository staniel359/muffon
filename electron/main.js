import {
  app
} from 'electron'
import {
  isSingleInstance,
  handleHarmfulSwitches
} from './helpers/utils.js'
import initialize from './actions/app/initialize.js'

handleHarmfulSwitches()

if (isSingleInstance) {
  initialize()
} else {
  app.quit()
}
