import {
  app
} from 'electron'
import setupI18n from '../../plugins/i18n.js'
import setFlags from './setFlags.js'
import setGlobalVariables from './setGlobalVariables.js'
import setEvents from './setEvents.js'
import setup from './setup.js'
import {
  appName
} from '../../utils.js'

export default function initialize () {
  setupI18n()

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
