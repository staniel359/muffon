export function set (
  element,
  options
) {
  $(
    element
  ).slider(
    options
  )
}

export function setValue (
  element,
  value
) {
  $(
    element
  ).slider(
    'set value',
    value
  )
}
