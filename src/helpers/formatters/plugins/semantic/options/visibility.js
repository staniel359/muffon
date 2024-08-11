export function main (
  {
    onTopPassed,
    onTopPassedReverse
  }
) {
  return {
    once: false,
    onTopPassed,
    onTopPassedReverse
  }
}

export function infiniteScrollObserver (
  {
    context,
    onTopVisible,
    onUpdate
  }
) {
  return {
    initialCheck: false,
    context,
    onTopVisible,
    onUpdate
  }
}

export function queue (
  {
    context,
    onOnScreen
  }
) {
  return {
    once: false,
    observeChanges: false,
    context,
    onOnScreen,
    onTopPassed: onOnScreen,
    onBottomPassed: onOnScreen
  }
}
