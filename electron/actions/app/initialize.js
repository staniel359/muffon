import {
  app
} from 'electron'
import setupI18n from '#/plugins/i18n'
import setupDayjs from '#/plugins/dayjs'
import setFlags from './setFlags'
import setGlobalVariables from './setGlobalVariables'
import setEvents from './setEvents'
import setup from './setup'
import {
  appName
} from '#/helpers/utils'

export default function () {
  setupI18n()

  setupDayjs()

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
