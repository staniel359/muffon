export function volume (
  {
    html
  }
) {
  const className =
    'ui popup main-popup main-volume-popup'

  return {
    position: 'top center',
    transition: 'fade up',
    variation: 'basic',
    closable: false,
    hoverable: true,
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

export function audioEqualizer (
  {
    html
  }
) {
  const className = 'ui popup main-popup'

  return {
    position: 'top center',
    transition: 'fade up',
    variation: 'basic',
    closable: false,
    hoverable: true,
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

export function source (
  {
    html
  }
) {
  const className = 'ui popup main-popup'

  return {
    position: 'top center',
    transition: 'fade up',
    variation: 'basic',
    delay: 0,
    className: {
      popup: className
    },
    html
  }
}

export function pageSelect (
  {
    html
  }
) {
  const className = 'ui popup main-popup'

  return {
    position: 'top center',
    transition: 'fade up',
    variation: 'basic',
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

export function artist (
  {
    html,
    onShow,
    onHide,
    onHidden
  }
) {
  const className =
    'ui popup main-popup main-artist-popup'

  return {
    position: 'top center',
    transition: 'fade up',
    variation: 'basic',
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
    onShow,
    onHide,
    onHidden
  }
}

export function lyricsAnnotation (
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

export function emoji (
  {
    html,
    onShow
  }
) {
  const className = 'ui popup main-popup'

  return {
    position: 'right center',
    transition: 'fade up',
    variation: 'basic',
    hoverable: true,
    preserve: true,
    className: {
      popup: className
    },
    delay: {
      show: 0,
      hide: 150
    },
    html,
    onShow
  }
}

export function profileInfo (
  {
    html
  }
) {
  const className = 'ui popup main-popup'

  return {
    position: 'right center',
    transition: 'fade up',
    variation: 'basic',
    delay: 0,
    className: {
      popup: className
    },
    html
  }
}

export function options (
  {
    html,
    onShow,
    onHide,
    onHidden
  }
) {
  const className = 'ui popup main-popup'

  return {
    position: 'bottom right',
    transition: 'fade up',
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
    onShow,
    onHide,
    onHidden
  }
}

export function optionsSubmenu (
  {
    html
  }
) {
  const className = 'ui popup main-popup'

  return {
    position: 'left center',
    transition: 'fade up',
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
