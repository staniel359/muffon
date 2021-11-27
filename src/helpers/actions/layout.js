import store from '&/store'
import {
  setDimmer,
  toggleDimmer,
  setSidebar,
  showSidebar,
  toggleSidebar,
  hideSidebar
} from '#/actions/plugins/semantic'

export const setLoaderDimmer = (el, options) => {
  store.dispatch(
    'layout/setLoaderDimmer',
    el
  )

  setDimmer(
    store.state.layout.loaderDimmer,
    options
  )
}

export const toggleLoaderDimmer = bool => {
  toggleDimmer(
    store.state.layout.loaderDimmer,
    bool
  )
}

export const setPlayerPanel = (el, options) => {
  store.dispatch(
    'layout/setPlayerPanel',
    el
  )

  setSidebar(
    store.state.layout.playerPanel,
    options
  )
}

export const showPlayerPanel = () => {
  showSidebar(
    store.state.layout.playerPanel
  )
}

export const hidePlayerPanel = () => {
  hideSidebar(
    store.state.layout.playerPanel
  )
}

export const setQueuePanel = (el, options) => {
  store.dispatch(
    'layout/setQueuePanel',
    el
  )

  setSidebar(
    store.state.layout.queuePanel,
    options
  )
}

export const toggleQueuePanel = () => {
  toggleSidebar(
    store.state.layout.queuePanel
  )
}

export const hideQueuePanel = () => {
  hideSidebar(
    store.state.layout.queuePanel
  )
}

export const focusOnSegment = el => {
  const segmentTop = $(el).offset().top
  const navbarHeight = 45
  const marginTop = 20
  const offsetTop =
    segmentTop - navbarHeight - marginTop

  window.scrollTo(0, offsetTop)
}
