import {
  isWindows,
  isMacos,
  isLinux
} from '../../helpers/utils.js'
import getElectronStoreKey from '../electronStore/getKey.js'
import setElectronStoreData from '../electronStore/setData.js'

export default function () {
  let isAutoupdateSupported

  let willAutoupdate =
    getElectronStoreKey(
      'system.willAutoupdate'
    )

  if (isWindows) {
    isAutoupdateSupported = true

    willAutoupdate ??= true
  } else if (isMacos) {
    isAutoupdateSupported = false

    willAutoupdate ??= false
  } else if (isLinux) {
    isAutoupdateSupported = true

    willAutoupdate ??= false
  }

  setElectronStoreData(
    {
      'system.isAutoupdateSupported': isAutoupdateSupported,
      'system.willAutoupdate': willAutoupdate
    }
  )
}
