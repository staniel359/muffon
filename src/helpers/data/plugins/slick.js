export function artistImagesModalMainSliderOptions (
  {
    syncSlider
  } = {}
) {
  return {
    asNavFor: syncSlider,
    draggable: false,
    infinite: false
  }
}

export function artistImagesModalThumbsSliderOptions (
  {
    syncSlider
  } = {}
) {
  return {
    arrows: false,
    asNavFor: syncSlider,
    centerMode: true,
    draggable: false,
    focusOnSelect: true,
    infinite: false,
    slidesToShow: 5
  }
}
