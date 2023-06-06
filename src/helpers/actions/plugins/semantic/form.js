export function set (
  element,
  options
) {
  $(
    element
  ).form(
    options
  )
}

export function addFieldError (
  element,
  field,
  error
) {
  $(
    element
  ).form(
    'add prompt',
    field,
    error
  )
}
