import {
  isWindows,
  isMacos,
  isLinux
} from '../../helpers/utils.js'
import getElectronStoreKey from '../electronStore/getKey.js'
import setElectronStoreData from '../electronStore/setData.js'

export default function () {
  let isAutoupdateAvailable

  let isAutoupdateBeta

  let isAutoupdateEnabled =
    getElectronStoreKey(
      'updates.isAutoupdateEnabled'
    )

  if (isWindows) {
    isAutoupdateAvailable = true

    isAutoupdateBeta = false

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

  setElectronStoreData(
    {
      'updates.isAutoupdateAvailable': isAutoupdateAvailable,
      'updates.isAutoupdateBeta': isAutoupdateBeta,
      'updates.isAutoupdateEnabled': isAutoupdateEnabled
    }
  )
}
