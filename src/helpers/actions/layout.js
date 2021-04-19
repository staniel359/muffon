import store from '*/store'
import {
  setDimmer,
  toggleDimmer,
  setSidebar,
  showSidebar,
  toggleSidebar,
  hideSidebar
} from '#/actions/plugins/semantic'

export function setNavigationSections (value) {
  store.dispatch(
    'layout/setNavigationSections',
    value
  )
}

function loaderDimmer () {
  return store.state.layout.loaderDimmer
}

export function setLoaderDimmer (el, options) {
  store.dispatch('layout/setLoaderDimmer', el)

  setDimmer(loaderDimmer(), options)
}

export function toggleLoaderDimmer (bool) {
  toggleDimmer(loaderDimmer(), bool)
}

function playerPanel () {
  return store.state.layout.playerPanel
}

export function setPlayerPanel (el, options) {
  store.dispatch('layout/setPlayerPanel', el)

  setSidebar(playerPanel(), options)
}

export function showPlayerPanel () {
  showSidebar(playerPanel())
}

export function hidePlayerPanel () {
  hideSidebar(playerPanel())
}

function queuePanel () {
  return store.state.layout.queuePanel
}

export function setQueuePanel (el, options) {
  store.dispatch('layout/setQueuePanel', el)

  setSidebar(queuePanel(), options)
}

export function toggleQueuePanel () {
  toggleSidebar(queuePanel())
}

export function hideQueuePanel () {
  hideSidebar(queuePanel())
}

export function setIsQueuePanelVisible (value) {
  store.dispatch(
    'layout/setIsQueuePanelVisible',
    value
  )
}
