import store from '*/plugins/store'
import {
  setDimmer,
  toggleDimmer,
  setSidebar,
  showSidebar,
  toggleSidebar,
  hideSidebar
} from '*/helpers/actions/plugins/semantic'

export function setLoaderDimmer (
  element,
  options
) {
  store.dispatch(
    'layout/setLoaderDimmer',
    element
  )

  setDimmer(
    store.state.layout.loaderDimmer,
    options
  )
}

export function toggleLoaderDimmer (
  bool
) {
  toggleDimmer(
    store.state.layout.loaderDimmer,
    bool
  )
}

export function setPlayerPanel (
  element,
  options
) {
  store.dispatch(
    'layout/setPlayerPanel',
    element
  )

  setSidebar(
    store.state.layout.playerPanel,
    options
  )
}

export function showPlayerPanel () {
  showSidebar(
    store.state.layout.playerPanel
  )
}

export function hidePlayerPanel () {
  hideSidebar(
    store.state.layout.playerPanel
  )
}

export function setQueuePanel (
  element,
  options
) {
  store.dispatch(
    'layout/setQueuePanel',
    element
  )

  setSidebar(
    store.state.layout.queuePanel,
    options
  )
}

export function toggleQueuePanel () {
  toggleSidebar(
    store.state.layout.queuePanel
  )
}

export function hideQueuePanel () {
  hideSidebar(
    store.state.layout.queuePanel
  )
}

export function focusOnSegment (
  element
) {
  const segmentTop = $(
    element
  ).offset().top

  const navbarHeight = 45
  const marginTop = 20

  const offsetTop =
    segmentTop - navbarHeight - marginTop

  function scrollToSegmentTop () {
    window.scrollTo(
      0,
      offsetTop
    )
  }

  setTimeout(
    scrollToSegmentTop,
    0
  )
}
