import {
  app
} from 'electron'
import setProtocols from './setProtocols'
import setupI18n from '#/plugins/i18n'
import setupDayjs from '#/plugins/dayjs'
import setFlags from './setFlags'
import setGlobalVariables from './setGlobalVariables'
import setEvents from './setEvents'
import setup from './setup'
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

  setFlags()

  setGlobalVariables()

  setProtocols()

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
