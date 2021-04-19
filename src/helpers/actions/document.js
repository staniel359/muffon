export function focusOnSegment (segment) {
  const segmentTop = $(segment).offset().top
  const navbarHeight = 40
  const marginTop = 20
  const offsetTop = segmentTop - navbarHeight - marginTop

  window.scrollTo(0, offsetTop)
}
