export function focusOnSegment (segment) {
  const segmentTop = $(segment).offset().top
  const navbarHeight = 45
  const marginTop = 20
  const offsetTop = segmentTop - navbarHeight - marginTop

  window.scrollTo(0, offsetTop)
}
