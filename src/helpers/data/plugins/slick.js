export const artistImagesModalMainSliderOptions = ({ syncSlider } = {}) => {
  return {
    asNavFor: syncSlider,
    draggable: false,
    infinite: false
  }
}

export const artistImagesModalThumbsSliderOptions = ({ syncSlider } = {}) => {
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
