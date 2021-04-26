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

export function updateHistory (key, item) {
  const history = store.get(key, [])
  const isNewItem = item && item !== history[0]

  if (isNewItem) {
    store.set({ [key]: [item, ...history] })
  }
}

export function setIsDarkMode (value) {
  store.set({ isDarkMode: value })
}

export function getIsDarkMode () {
  return store.get('isDarkMode', null)
}

export function setPlayerPlaying (value) {
  store.set({ playerPlaying: value })
}

export function getPlayerPlaying () {
  return store.get('playerPlaying', null)
}

export function setPlayerCurrentTrackId (value) {
  store.set({ playerCurrentTrackId: value })
}

export function getPlayerCurrentTrackId () {
  return store.get('playerCurrentTrackId', null)
}

export function setPlayerVariants (value) {
  store.set({ playerVariants: value })
}

export function getPlayerVariants () {
  return store.get('playerVariants', [])
}

export function setPlayerSourceId (value) {
  store.set({ playerSourceId: value })
}

export function getPlayerSourceId (value) {
  return store.get('playerSourceId', 'vk')
}

export function setQueueTracks (value) {
  store.set({ queueTracks: value })
}

export function getQueueTracks () {
  return store.get('queueTracks', [])
}

export function setQueueCurrentTrackId (value) {
  store.set({ queueCurrentTrackId: value })
}

export function getQueueCurrentTrackId () {
  return store.get('queueCurrentTrackId', null)
}

export function setIsQueueAutoplay (value) {
  store.set({ isQueueAutoplay: value })
}

export function getIsQueueAutoplay () {
  return store.get('isQueueAutoplay', true)
}
