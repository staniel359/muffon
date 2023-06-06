export function set (
  element,
  options
) {
  $(
    element
  ).checkbox(
    options
  )
}

export function check (
  element,
  boolean
) {
  const value = (
    boolean ? 'check' : 'uncheck'
  )

  $(
    element
  ).checkbox(
    value
  )
}
