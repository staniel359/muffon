import 'slick-carousel'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export function setSlider (
  element,
  options
) {
  $(
    element
  ).slick(
    options
  )
}

export function setSliderOptions (
  element,
  options
) {
  $(
    element
  ).slick(
    'slickSetOption',
    options,
    true
  )
}

export function clearSliderPreviousImages (
  element
) {
  $(
    element
  ).slick(
    'slickRemove',
    null,
    null,
    true
  )
}

export function refreshSlider (
  element
) {
  $(
    element
  ).slick(
    'refresh'
  )
}

export function setSliderPosition (
  element
) {
  $(
    element
  ).slick(
    'setPosition'
  )
}

export function goToSliderSlide (
  element,
  index
) {
  $(
    element
  ).slick(
    'slickGoTo',
    index,
    true
  )
}
