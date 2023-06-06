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
    duration: 150,
    transition: 'fade',
    className: {
      innerDimmer: 'ui dimmer'
    },
    dimmerSettings: {
      duration: 150
    },
    onShow,
    onVisible
  }
}
