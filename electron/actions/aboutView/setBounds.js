import getAboutWindowSize from '../aboutWindow/getSize'

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
