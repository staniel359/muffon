export function main (
  {
    syncSlider,
    isRtl
  }
) {
  return {
    asNavFor: syncSlider,
    draggable: false,
    infinite: false,
    fade: true,
    rtl: isRtl
  }
}

export function thumbs (
  {
    syncSlider,
    isRtl
  }
) {
  return {
    arrows: false,
    asNavFor: syncSlider,
    centerMode: true,
    draggable: false,
    focusOnSelect: true,
    infinite: false,
    slidesToShow: 5,
    rtl: isRtl
  }
}
