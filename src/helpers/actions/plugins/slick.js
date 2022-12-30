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
