import layoutStore from '@/stores/layout'
import {
  set as setDimmer,
  toggle as toggleDimmer
} from '@/helpers/actions/plugins/semantic/dimmer'
import {
  set as setSidebar,
  toggle as toggleSidebar,
  hide as hideSidebar
} from '@/helpers/actions/plugins/semantic/sidebar'

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

export function focusOnPageElement (
  element
) {
  const segmentTop = $(
    element
  ).offset().top

  const navbarHeight = 50
  const marginTop = 20

  const offsetTop = (
    segmentTop -
      navbarHeight -
      marginTop
  )

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

export function focusOnListElement (
  element,
  list
) {
  const elementOffsetTop =
    element.offsetTop

  const paddingTop = 14

  const offsetTop = (
    elementOffsetTop -
      paddingTop
  )

  list.scrollTo(
    0,
    offsetTop
  )
}
