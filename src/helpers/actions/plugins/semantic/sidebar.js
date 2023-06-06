export function set (
  element,
  options
) {
  $(
    element
  ).sidebar(
    options
  )
}

export function hide (
  element
) {
  $(
    element
  ).sidebar(
    'hide'
  )
}

export function toggle (
  element
) {
  $(
    element
  ).sidebar(
    'toggle'
  )
}
