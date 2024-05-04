import {
  app
} from 'electron'
import setAppProtocols from './setProtocols'
import setupI18n from '#/plugins/i18n'
import setupDayjs from '#/plugins/dayjs'
import setAppFlags from './setFlags'
import setAppGlobalVariables from './setGlobalVariables'
import setAppEvents from './setEvents'
import setupApp from './setup'
import {
  appName,
  createFolderIfNotExists
} from '#/helpers/utils'
import {
  audioFolderPath,
  backgroundImagesFolderPath
} from '#/helpers/paths'

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
