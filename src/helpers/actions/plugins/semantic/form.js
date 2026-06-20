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

export function reset (
  element
) {
  $(
    element
  ).form(
    'reset'
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

export function validateField (
  element,
  field
) {
  $(
    element
  ).form(
    'validate field',
    field
  )
}
