export function set (
  element,
  options
) {
  $(
    element
  ).dimmer(
    options
  )
}

export function toggle (
  element,
  boolean
) {
  const value = (
    boolean ? 'show' : 'hide'
  )

  $(
    element
  ).dimmer(
    value
  )
}
