import getElectronStoreKey from '../electronStore/getKey.js'

export default function () {
  return getElectronStoreKey(
    'layout.activeTabId'
  )
}
