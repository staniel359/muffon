import {
  isWindows,
  isMacos,
  isLinux
} from '../../helpers/utils.js'
import getElectronStoreKey from '../electronStore/getKey.js'
import setElectronStoreData from '../electronStore/setData.js'

export default function () {
  let isAutoupdateAvailable

  let isWithAutoupdate =
    getElectronStoreKey(
      'system.isWithAutoupdate'
    )

  if (isWindows) {
    isAutoupdateAvailable = true

    isWithAutoupdate ??= true
  } else if (isMacos) {
    isAutoupdateAvailable = false

    isWithAutoupdate ??= false
  } else if (isLinux) {
    isAutoupdateAvailable = true

    isWithAutoupdate ??= false
  }

  setElectronStoreData(
    {
      'system.isAutoupdateAvailable': isAutoupdateAvailable,
      'system.isWithAutoupdate': isWithAutoupdate
    }
  )
}
