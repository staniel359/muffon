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
