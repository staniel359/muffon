export default function (
  {
    html,
    onShow
  }
) {
  const className =
    'ui popup main-popup main-annotation-popup'

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
    onShow
  }
}
