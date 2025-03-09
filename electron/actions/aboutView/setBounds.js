import getAboutWindowSize from '../aboutWindow/getSize.js'

export default function () {
  const [
    width,
    height
  ] = getAboutWindowSize()

  const boundsOptions = {
    x: 0,
    y: 0,
    width,
    height
  }

  aboutView.setBounds(
    boundsOptions
  )
}
