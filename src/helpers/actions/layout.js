import layoutStore from '@/stores/layout'
import {
  setDimmer,
  toggleDimmer,
  setSidebar,
  toggleSidebar,
  hideSidebar
} from '@/helpers/actions/plugins/semantic'

export function setLoaderDimmer (
  element,
  options
) {
  layoutStore().setLoaderDimmer(
    element
  )

  setDimmer(
    layoutStore().loaderDimmer,
    options
  )
}

export function toggleLoaderDimmer (
  bool
) {
  toggleDimmer(
    layoutStore().loaderDimmer,
    bool
  )
}

export function setPlayerPanel (
  element,
  options
) {
  layoutStore().setPlayerPanel(
    element
  )

  setSidebar(
    layoutStore().playerPanel,
    options
  )
}

export function setQueuePanel (
  element,
  options
) {
  layoutStore().setQueuePanel(
    element
  )

  setSidebar(
    layoutStore().queuePanel,
    options
  )
}

export function toggleQueuePanel () {
  toggleSidebar(
    layoutStore().queuePanel
  )
}

export function hideQueuePanel () {
  hideSidebar(
    layoutStore().queuePanel
  )
}

export function focusOnSegment (
  element
) {
  const segmentTop = $(
    element
  ).offset().top

  const navbarHeight = 50
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
