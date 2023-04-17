import getElectronStoreKey from '#/actions/electronStore/getKey'

export default function () {
  return getElectronStoreKey(
    'layout.activeTabId'
  )
}
