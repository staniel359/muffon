export function setSlider (el, options) {
  $(el).slick(options)
}

export function setSliderOptions (el, options) {
  $(el).slick('slickSetOption', options, true)
}

export function clearSliderPrevImages (el) {
  $(el).slick('slickRemove', null, null, true)
}

export function refreshSlider (el) {
  $(el).slick('refresh')
}

export function setSliderPosition (el) {
  $(el).slick('setPosition')
}

export function goToSliderSlide (el, index) {
  $(el).slick('slickGoTo', index, true)
}
