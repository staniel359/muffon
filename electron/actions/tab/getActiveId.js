import electronStore from '../../../shared/plugins/electronStore.js'

export default function getActiveId () {
  return electronStore.get(
    'layout.activeTabId'
  )
}
