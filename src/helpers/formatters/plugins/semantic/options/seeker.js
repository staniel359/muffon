export function main (
  {
    onMove,
    onChange
  } = {}
) {
  return {
    max: 100,
    step: 0.25,
    onMove,
    onChange
  }
}

export function volume (
  {
    start
  } = {}
) {
  return {
    max: 1,
    step: 0.01,
    start
  }
}

export function transparency (
  {
    start
  } = {}
) {
  const step = 10

  function interpretLabel (
    value
  ) {
    if (value % 2 === 0) {
      return `${value * step}%`
    } else {
      return ' '
    }
  }

  return {
    max: 100,
    step,
    start,
    smooth: true,
    interpretLabel
  }
}

export function scale (
  {
    start
  } = {}
) {
  const min = 1
  const step = 0.2

  function interpretLabel (
    value
  ) {
    const percent = (
      min + value * step
    ) * 100

    return `${percent}%`
  }

  return {
    min,
    max: 2,
    step,
    start,
    smooth: true,
    interpretLabel
  }
}

export function scrobblePercent (
  {
    start
  } = {}
) {
  const step = 25

  function interpretLabel (
    value
  ) {
    return `${(value + 1) * step}%`
  }

  return {
    min: 25,
    max: 75,
    step,
    start,
    smooth: true,
    autoAdjustLabels: false,
    interpretLabel
  }
}

export function audioEqualizer (
  {
    start
  }
) {
  function interpretLabel (
    value
  ) {
    if (value === 12) {
      return 0
    } else {
      return ' '
    }
  }

  return {
    step: 0,
    max: 12,
    min: -12,
    autoAdjustLabels: false,
    smooth: true,
    start,
    interpretLabel
  }
}
