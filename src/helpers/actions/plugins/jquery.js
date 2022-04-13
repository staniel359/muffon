export function toggleClass (
  element,
  className,
  value
) {
  $(
    element
  ).toggleClass(
    className,
    !!value
  )
}

export function setPercentWidth (
  element,
  value
) {
  element.style.width = `${value}%`
}

export function clone (
  element
) {
  return $(
    element
  ).clone()[0]
}

export function addClass (
  element,
  value
) {
  $(
    element
  ).addClass(
    value
  )
}

export function insertAfter (
  element,
  after
) {
  $(
    element
  ).after(
    after
  )
}

export function remove (
  element
) {
  $(
    element
  ).remove()
}
