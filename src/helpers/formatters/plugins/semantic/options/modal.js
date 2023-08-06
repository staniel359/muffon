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
