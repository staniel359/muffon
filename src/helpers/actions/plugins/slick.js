import 'slick-carousel'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export const setSlider = (el, options) => {
  $(el).slick(options)
}

export const setSliderOptions = (el, options) => {
  $(el).slick(
    'slickSetOption',
    options,
    true
  )
}

export const clearSliderPrevImages = el => {
  $(el).slick(
    'slickRemove',
    null,
    null,
    true
  )
}

export const refreshSlider = el => {
  $(el).slick('refresh')
}

export const setSliderPosition = el => {
  $(el).slick('setPosition')
}

export const goToSliderSlide = (el, index) => {
  $(el).slick(
    'slickGoTo',
    index,
    true
  )
}
