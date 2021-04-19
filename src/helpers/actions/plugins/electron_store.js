import { getDistinctArray } from '#/utils'

const ElectronStore = require('electron-store')
const store = new ElectronStore()

export function getHistory (key, { isDistinct }) {
  const history = store.get(key, [])
  const historyScoped = isDistinct
    ? getDistinctArray(history)
    : history

  return [...historyScoped].map(item => {
    return { title: item }
  })
}

export function addToHistory (key, item) {
  const history = store.get(key, [])
  const isNewItem = item && item !== history[0]

  if (isNewItem) {
    store.set({ [key]: [item, ...history] })
  }
}
