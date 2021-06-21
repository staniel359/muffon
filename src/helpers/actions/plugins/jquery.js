export const toggleClass = (el, className, value) => {
  $(el).toggleClass(
    className, !!value
  )
}

export const setPercentWidth = (el, value) => {
  el.style.width = `${value}%`
}

export const clone = el => {
  return $(el).clone()[0]
}

export const addClass = (el, value) => {
  $(el).addClass(value)
}

export const insertAfter = (el, after) => {
  $(el).after(after)
}

export const remove = el => {
  $(el).remove()
}
