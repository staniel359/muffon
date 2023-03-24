import {
  app
} from 'electron'
import setFlags from './setFlags.js'
import setGlobalVariables from './setGlobalVariables.js'
import setEvents from './setEvents.js'
import setup from './setup.js'
import {
  appName
} from '../../utils.js'

export default function initialize () {
  setFlags()

  setGlobalVariables()

  setEvents()

  app
    .whenReady()
    .then(
      setup
    )

  app.setAppUserModelId(
    appName
  )
}
