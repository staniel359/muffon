import {
  app
} from 'electron'
import getSettingsKey from '../settings/getKey.js'

export default function () {
  const isWithCache =
    getSettingsKey(
      'system.isWithCache'
    )

  if (!isWithCache) {
    app
      .commandLine
      .appendSwitch(
        'disable-http-cache'
      )
  }
}
