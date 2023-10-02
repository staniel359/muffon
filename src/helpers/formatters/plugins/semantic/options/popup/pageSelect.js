export default function (
  {
    html
  }
) {
  const className =
    'ui popup main-popup extrasmall'

  return {
    position: 'top center',
    transition: 'fade up',
    variation: 'basic',
    exclusive: true,
    hoverable: true,
    className: {
      popup: className
    },
    delay: {
      show: 0,
      hide: 150
    },
    html
  }
}
