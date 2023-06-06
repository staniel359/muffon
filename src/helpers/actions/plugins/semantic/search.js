export function set (
  element,
  options
) {
  $(
    element
  ).search(
    options
  )
}

export function setSource (
  element,
  source
) {
  $(
    element
  ).search(
    'setting',
    'source',
    source
  )
}
