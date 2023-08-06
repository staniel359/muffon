export default function (
  {
    html,
    inline,
    onShow,
    onHide,
    onHidden
  }
) {
  const className = 'ui popup main-popup'

  return {
    position: 'bottom right',
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
    html,
    inline,
    onShow,
    onHide,
    onHidden
  }
}
