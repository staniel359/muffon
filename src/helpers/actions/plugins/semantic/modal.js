export function set (
  element,
  options
) {
  $(
    element
  ).modal(
    options
  )
}

export function show (
  element
) {
  $(
    element
  ).modal(
    'show'
  )
}

export function hide (
  element
) {
  $(
    element
  ).modal(
    'hide'
  )
}
