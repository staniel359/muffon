import { ipcRenderer } from 'electron'
import local from '#/plugins/local'
import store from '*/store'

export const setGlobalData = data => {
  local.set(data)

  updateStore(data)
}

export const updateStore = data => {
  return ipcRenderer.invoke(
    'update-store',
    JSON.stringify(data)
  )
}

export const updateTab = data => {
  const { tabId } = store.state.layout

  const tabs = local.get(
    'layout.tabs'
  )

  const isMatchedTab = tabData => {
    return tabData.uuid === tabId
  }

  const tab = tabs.find(isMatchedTab)

  const updateTabKeyValue = ([key, value]) => {
    tab[key] = value
  }

  Object.entries(data).forEach(
    updateTabKeyValue
  )

  ipcRenderer.send(
    'update-tabs',
    tabs
  )
}
