export function main (
  {
    isMultiple,
    onShow,
    onVisible
  }
) {
  return {
    autofocus: false,
    blurring: true,
    allowMultiple: isMultiple,
    duration: 200,
    transition: 'fade',
    className: {
      innerDimmer: 'ui dimmer'
    },
    dimmerSettings: {
      duration: 200
    },
    onShow,
    onVisible
  }
}
