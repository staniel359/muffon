import {
  isWindows,
  isMacos,
  isLinux
} from '../../helpers/utils.js'
import getSettingsKey from '../settings/getKey.js'
import setSettings from '../settings/set.js'

export default function () {
  let isAutoupdateAvailable

  let isAutoupdateBeta

  let isAutoupdateEnabled =
    getSettingsKey(
      'updates.isAutoupdateEnabled'
    )

  if (isWindows) {
    isAutoupdateAvailable = true

    isAutoupdateBeta = true

    isAutoupdateEnabled ??= true
  } else if (isMacos) {
    isAutoupdateAvailable = false

    isAutoupdateBeta = false

    isAutoupdateEnabled ??= false
  } else if (isLinux) {
    isAutoupdateAvailable = true

    isAutoupdateBeta = true

    isAutoupdateEnabled ??= false
  }

  setSettings(
    {
      'updates.isAutoupdateAvailable': isAutoupdateAvailable,
      'updates.isAutoupdateBeta': isAutoupdateBeta,
      'updates.isAutoupdateEnabled': isAutoupdateEnabled
    }
  )
}
