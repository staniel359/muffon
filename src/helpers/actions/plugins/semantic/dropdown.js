export function set (
  element,
  options
) {
  $(
    element
  ).dropdown(
    options
  )
}

export function setValue (
  element,
  value
) {
  $(
    element
  ).dropdown(
    'set selected',
    value,
    null,
    true
  )
}

export function reset (
  element
) {
  $(
    element
  ).dropdown(
    'restore defaults'
  )
}
