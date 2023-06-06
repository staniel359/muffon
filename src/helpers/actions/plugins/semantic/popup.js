export function set (
  element,
  options
) {
  $(
    element
  ).popup(
    options
  )
}

export function reposition (
  element
) {
  try {
    $(
      element
    ).popup(
      'reposition'
    )
  } catch {
    return false
  }
}

export function show (
  element
) {
  $(
    element
  ).popup(
    'show'
  )
}

export function hide (
  element
) {
  $(
    element
  ).popup(
    'hide'
  )
}

export function destroy (
  element
) {
  $(
    element
  ).popup(
    'destroy'
  )
}
