export default function (
  {
    html,
    onShow,
    onHide,
    onHidden
  }
) {
  const className =
    'ui popup main-popup main-artist-popup'

  return {
    position: 'top center',
    transition: 'fade up',
    variation: 'basic',
    exclusive: true,
    hoverable: true,
    lastResort: true,
    className: {
      popup: className
    },
    delay: {
      show: 600,
      hide: 150
    },
    html,
    onShow,
    onHide,
    onHidden
  }
}
