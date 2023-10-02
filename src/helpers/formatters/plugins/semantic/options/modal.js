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
    duration: 300,
    transition: 'scale',
    className: {
      innerDimmer: 'ui dimmer'
    },
    dimmerSettings: {
      duration: 300
    },
    onShow,
    onVisible
  }
}
