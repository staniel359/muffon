export default function (
  {
    html
  }
) {
  const className = 'ui popup main-popup small'

  return {
    position: 'top center',
    transition: 'fade up',
    variation: 'basic',
    exclusive: true,
    delay: 0,
    className: {
      popup: className
    },
    html
  }
}
