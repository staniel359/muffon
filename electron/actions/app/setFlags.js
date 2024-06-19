import {
  app
} from 'electron'
import getElectronStoreKey from '../electronStore/getKey.js'

export default function () {
  const isWithCache =
    getElectronStoreKey(
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
