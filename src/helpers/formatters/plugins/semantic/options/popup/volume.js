export default function (
  {
    html
  }
) {
  const className =
    'ui popup main-popup main-volume-popup small'

  return {
    position: 'top center',
    transition: 'fade up',
    variation: 'basic',
    closable: false,
    exclusive: true,
    hoverable: true,
    inline: true,
    preserve: true,
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
