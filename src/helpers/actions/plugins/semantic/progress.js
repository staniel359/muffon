export function set (
  element,
  options
) {
  $(
    element
  ).progress(
    options
  )
}

export function reset (
  element
) {
  $(
    element
  ).progress(
    'reset'
  )

  $(
    element
  ).progress(
    'remove success'
  )

  $(
    element
  ).progress(
    'remove error'
  )
}

export function setTotalCount (
  element,
  value
) {
  $(
    element
  ).progress(
    'set total',
    value
  )
}

export function increment (
  element
) {
  $(
    element
  ).progress(
    'increment'
  )
}

export function setValue (
  element,
  value
) {
  $(
    element
  ).progress(
    'set progress',
    value
  )
}
