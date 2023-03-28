import getElectronStoreKey from '../electronStore/getKey.js'

export default function getActiveId () {
  return getElectronStoreKey(
    'layout.activeTabId'
  )
}
