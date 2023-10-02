import {
  changeClass
} from '@/helpers/actions/plugins/jquery'

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

export function handleFadeShow (
  element,
  direction
) {
  function changeShowClass () {
    changeClass(
      element,
      'fade in',
      `fade ${direction} in`
    )
  }

  setTimeout(
    changeShowClass,
    0
  )
}

export function handleFadeVisible (
  element,
  direction
) {
  changeClass(
    element,
    'center',
    `${direction} center`
  )
}

export function handleFadeHide (
  element,
  direction
) {
  function changeHideClass () {
    changeClass(
      element,
      'fade out',
      `fade ${direction} out`
    )
  }

  setTimeout(
    changeHideClass,
    0
  )
}
