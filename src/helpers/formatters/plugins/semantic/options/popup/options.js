export default function (
  {
    html,
    isShowToTop,
    isNested,
    onShow,
    onHidden
  }
) {
  const className = 'ui popup main-popup'

  const position = (
    isShowToTop ? 'top right' : 'bottom right'
  )

  const transition = (
    isShowToTop ? 'fade up' : 'fade down'
  )

  return {
    on: 'click',
    variation: 'basic',
    exclusive: !isNested,
    lastResort: true,
    observeChanges: false,
    className: {
      popup: className
    },
    delay: {
      show: 0,
      hide: 150
    },
    position,
    transition,
    html,
    onShow,
    onHidden
  }
}
