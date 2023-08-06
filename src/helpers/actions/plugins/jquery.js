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

export function changeClass (
  element,
  className,
  value
) {
  const elementClassName =
    element[0].className

  const newClassName =
    elementClassName.replace(
      className,
      value
    )

  $(
    element
  ).attr(
    'class',
    newClassName
  )
}
