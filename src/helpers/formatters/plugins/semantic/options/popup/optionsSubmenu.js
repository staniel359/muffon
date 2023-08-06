export default function (
  {
    html
  }
) {
  const className = 'ui popup main-popup'

  return {
    position: 'left center',
    transition: 'fade down',
    variation: 'basic',
    closable: false,
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
