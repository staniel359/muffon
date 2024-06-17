import {
  app
} from 'electron'
import {
  isSingleInstance,
  handleHarmfulSwitches
} from './helpers/utils.js'
import initialize from './actions/app/initialize.js'
import exit from './actions/app/exit.js'

handleHarmfulSwitches()

if (isSingleInstance) {
  initialize()
} else {
  exit()
}
