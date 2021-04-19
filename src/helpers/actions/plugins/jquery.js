export function toggleClass (el, className, value) {
  $(el).toggleClass(className, !!value)
}

export function setPercentWidth (el, value) {
  el.style.width = `${value}%`
}

export function clone (el) {
  return $(el).clone()[0]
}

export function addClass (el, value) {
  $(el).addClass(value)
}

export function insertAfter (el, after) {
  $(el).after(after)
}

export function remove (el) {
  $(el).remove()
}
