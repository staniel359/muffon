import {
  isSingleInstance,
  handleHarmfulSwitches
} from './helpers/utils.js'
import initialize from './actions/app/initialize.js'
import quit from './actions/app/quit.js'

handleHarmfulSwitches()

if (isSingleInstance) {
  initialize()
} else {
  quit()
}
