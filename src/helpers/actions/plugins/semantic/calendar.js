export function set (
  element,
  options
) {
  $(
    element
  ).calendar(
    options
  )
}

export function reset (
  element
) {
  $(
    element
  ).calendar(
    'clear'
  )
}
