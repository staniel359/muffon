import {
  app
} from 'electron'
import setAppProtocols from './setProtocols.js'
import setupI18n from '../../plugins/i18n.js'
import setupDayjs from '../../plugins/dayjs.js'
import setAppFlags from './setFlags.js'
import setAppGlobalVariables from './setGlobalVariables.js'
import setAppEvents from './setEvents.js'
import setupApp from './setup.js'
import {
  appName,
  createFolderIfNotExists
} from '../../helpers/utils.js'
import {
  audioFolderPath,
  backgroundImagesFolderPath
} from '../../helpers/paths.js'

export default function () {
  createFolderIfNotExists(
    audioFolderPath
  )

  createFolderIfNotExists(
    backgroundImagesFolderPath
  )

  setupI18n()

  setupDayjs()

  setAppFlags()

  setAppGlobalVariables()

  setAppProtocols()

  setAppEvents()

  app
    .whenReady()
    .then(
      setupApp
    )

  app.setAppUserModelId(
    appName
  )
}
